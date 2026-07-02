export const Footer = async () => {
    const version = import.meta.env.VITE_BUILD_VERSION ?? 'N/A';
    const commitId = import.meta.env.VITE_BUILD_COMMIT_ID ?? 'N/A';
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
              <p>Powered by ProjektAcceltra Komputerowa Infrastructure</p>
          </div>
      </footer>
  );
};