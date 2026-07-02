import { ImGithub, ImTwitter } from 'react-icons/im';
import { inlineSvgDataUri } from '../lib/inline-asset';

export const Header = async () => {
  const banner = await inlineSvgDataUri('images/dti.svg');

  return (
    <header className="flex w-full flex-col items-start border-b-2 border-dashed border-gray-500 p-6 pb-0">
      <h2 className="flex items-baseline gap-1 text-3xl font-bold tracking-tight">
        <a href="/">Alex Yuan</a>
        <span>/</span>
        <span className="text-xl text-neutral-400">Emondora256</span>
        <span className="pl-2">
          <a href="https://github.com/Acceltra65535" aria-label="GitHub" className="inline-flex">
            <ImGithub className="h-6 w-6" aria-hidden="true" />
          </a>
        </span>
        <span className="pl-2">
          <a href="https://x.com/sgdorae" aria-label="Twitter" className="inline-flex">
            <ImTwitter className="h-6 w-6 text-[#4ba6ee]" aria-hidden="true" />
          </a>
        </span>
      </h2>
      <nav className="mt-5 text-lg">
        <a href="/" className="mr-5 inline-block border-b-3 border-transparent pb-1 transition-colors text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a href="/posts" className="mr-5 inline-block border-b-3 border-transparent pb-1 transition-colors text-gray-600 hover:text-gray-900">
          博客/Blog
        </a>
        <a href="/gallery" className="mr-5 inline-block border-b-3 border-transparent pb-1 transition-colors text-gray-600 hover:text-gray-900">
          畫廊/Gallery
        </a>
      </nav>
      <div className="lg:mt-5 flex items-center gap-5">
        <img
          src={banner}
          alt="dti"
          className="block h-18 w-100.25 object-contain object-bottom lg:h-18 lg:w-185"
        />
      </div>
    </header>
  );
};