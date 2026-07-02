import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { spawnSync } from 'node:child_process';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const version = packageJson.version ?? 'unknown';

let commitId = 'unknown';
try {
    commitId = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
    // keep fallback
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