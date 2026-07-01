'use client';

import { useEffect, useState } from 'react';
import { Link } from 'waku';

export const Header = () => {
    const [pathname, setPathname] = useState('/');

    useEffect(() => {
    const updatePathname = () => {
        setPathname(window.location.pathname);
    };

    updatePathname();

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
         originalPushState.apply(this, args);
         window.dispatchEvent(new Event('locationchange'));
    };

    window.history.replaceState = function (...args) {
         originalReplaceState.apply(this, args);
         window.dispatchEvent(new Event('locationchange'));
    };

    window.addEventListener('popstate', updatePathname);
    window.addEventListener('locationchange', updatePathname);

    return () => {
       window.history.pushState = originalPushState;
       window.history.replaceState = originalReplaceState;
       window.removeEventListener('popstate', updatePathname);
       window.removeEventListener('locationchange', updatePathname);
    };
}, []);

    const isHome = pathname === '/';
    const isPosts = pathname.startsWith('/posts');
    const isGallery = pathname.startsWith('/gallery');

    const tabBaseClass = 'mr-5 inline-block border-b-3 border-transparent pb-1 transition-colors';
    const tabActiveClass = 'border-b-[#103222] text-[#103222]';
    const tabInactiveClass = 'text-gray-600 hover:text-gray-900';

  return (
      <header className="flex w-full flex-col items-start border-b-2 border-dashed border-gray-500 p-6 pb-0">
          <h2 className="flex items-baseline gap-1 text-3xl font-bold tracking-tight">
              <Link to="/">Alex Yuan</Link>
              <span>/</span>
              <span className="text-xl text-neutral-400">Emondora256</span>
          </h2>
          <nav className="mt-5 text-lg">
              <a
                  href="/"
                  className={`${tabBaseClass} ${isHome ? tabActiveClass : tabInactiveClass}`}
                  aria-current={isHome ? 'page' : undefined}
              >
                  Home
              </a>
              <a
                  href="/posts"
                  className={`${tabBaseClass} ${isPosts ? tabActiveClass : tabInactiveClass}`}
                  aria-current={isPosts ? 'page' : undefined}
              >
                  博客/Blog
              </a>
              <a
                  href="/gallery"
                  className={`${tabBaseClass} ${isGallery ? tabActiveClass : tabInactiveClass}`}
                  aria-current={isGallery ? 'page' : undefined}
              >
                  畫廊/Gallery
              </a>
          </nav>
          <div className="lg:mt-5 flex items-center gap-5">
              <img
                  src="/images/dti.svg"
                  alt="dti"
                  className="block h-18 w-100.25 object-contain object-bottom lg:h-18 lg:w-185"
              />
          </div>
      </header>
  );
};
