import { readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const getBuildInfo = async () => {
    let version = 'unknown';
    let commitId = 'unknown';

    try {
        const packageJsonText = await readFile(new URL('../../package.json', import.meta.url), 'utf-8');
        const packageJson = JSON.parse(packageJsonText) as { version?: string };
        version = packageJson.version ?? 'unknown';
    } catch {
        // keep fallback
    }

    try {
        commitId = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    } catch {
        // keep fallback
    }

    return { version, commitId };
};

export const Footer = async () => {
    const { version, commitId } = await getBuildInfo();
    const builtDate = new Date().toISOString().slice(0, 7);

  return (
      <footer className="w-full p-6 pb-10 text-center">
          <div className="flex flex-col items-center text-center">
              <img
                  src="/images/cyberswallow.svg"
                  alt="cyberswallow"
                  className="mb-3 h-18 w-32 object-contain"
              />
              <p>Version <strong>{`${version}-${commitId}`}</strong> (built <strong>{builtDate}</strong>)</p>
              <p>Copyright © 2026 Alex Yuan. All rights reserved.</p>
              <p>Served by ProjektAcceltra Komputerowa Infrastructure</p>
          </div>
      </footer>
  );
};
