import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const version = packageJson.version ?? 'N/A';
const repoOwner = 'Acceltra65535';
const repoName = 'blog';

const shortSha = (value) => (value ? value.slice(0, 7) : undefined);

let commitId =
    shortSha(process.env.VITE_BUILD_COMMIT_ID) ??
    shortSha(process.env.GITHUB_SHA) ??
    shortSha(process.env.COMMIT_SHA) ??
    shortSha(process.env.SHORT_SHA) ??
    shortSha(process.env.CI_COMMIT_SHA) ??
    undefined;

if (!commitId) {
    try {
        commitId = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
    } catch {
        const branch =
            process.env.GITHUB_REF_NAME ??
            process.env.BRANCH_NAME ??
            process.env.CI_COMMIT_REF_NAME ??
            'master';

        try {
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branch}`, {
                headers: {
                    Accept: 'application/vnd.github+json',
                    'User-Agent': `${repoName}-build-script`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                commitId = shortSha(data.sha) ?? 'N/A';
            } else {
                commitId = 'N/A';
            }
        } catch {
            commitId = 'N/A';
        }
    }
}

const targetUrl = new URL('../src/generated/buildInfo.ts', import.meta.url);
await mkdir(new URL('./', targetUrl), { recursive: true });
await writeFile(
    targetUrl,
    `export const buildInfo = ${JSON.stringify({ version, commitId })} as const;\n`
);

const fontResult = spawnSync('node', ['scripts/prepare-fonts.mjs'], {
    stdio: 'inherit',
});

if ((fontResult.status ?? 1) !== 0) {
    process.exit(fontResult.status ?? 1);
}

const result = spawnSync('waku', ['build'], {
    stdio: 'inherit',
    env: {
        ...process.env,
        VITE_BUILD_VERSION: version,
        VITE_BUILD_COMMIT_ID: commitId,
    },
});

process.exit(result.status ?? 1);