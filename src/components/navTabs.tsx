'use client';

import { Link } from 'waku';
import { useRouter } from 'waku/router/client';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/posts', label: '博客/Blog' },
  { to: '/gallery', label: '畫廊/Gallery' },
];

export const NavTabs = () => {
  const router = useRouter();
  const path = router?.path || '/';

  return (
    <nav className="mt-5 text-lg">
      {navItems.map((item) => {
        const isActive = path === item.to || (item.to !== '/' && path.startsWith(item.to));
        
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`mr-5 inline-block border-b-3 pb-1 transition-colors duration-[0.16s] ${
              isActive 
                ? 'border-[#103222] text-[#103222]' 
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
