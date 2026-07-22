import { ImGithub, ImTwitter } from 'react-icons/im';
import { inlineSvgDataUri } from '../lib/inlineAsset';
import { FaSteam } from "react-icons/fa";
import { NavTabs } from './navTabs';

export const Header = async () => {
  const banner = await inlineSvgDataUri('public/images/dti.svg');

  return (
    <header className="flex w-full flex-col items-start border-b-2 border-dashed border-gray-500 p-6 pb-0">
      <h2 className="flex items-baseline gap-1 text-3xl font-bold tracking-tight">
        <a className="max-[465px]:text-[22px]" href="/">Alex Yuan</a>
        <span className="max-[465px]:text-[22px]">/</span>
        <span className="max-[465px]:text-[16px] text-xl text-neutral-400">Emondora256</span>
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
        <span className="pl-2">
          <a href="https://steamcommunity.com/profiles/76561198089424717" aria-label="Steam" className="inline-flex">
            <FaSteam className="h-6 w-6 text-[#133165]" aria-hidden="true" />
          </a>
        </span>
      </h2>
      <NavTabs />
      <div className="lg:mt-5 flex items-center gap-5">
        <img
          src={banner}
          alt="dti"
          className="block h-18 w-135 object-contain object-bottom lg:h-18 lg:w-160"
        />
      </div>
    </header>
  );
};