import { Link } from 'waku';

const navItems = [
  { to: '/', label: 'Home', current: true },
  { to: '/posts', label: '博客/Blog' },
  { to: '/gallery', label: '畫廊/Gallery' },
];

export const NavTabs = () => (
  <nav className="mt-5 text-lg">
    {navItems.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className={`mr-5 inline-block border-b-3 border-transparent pb-1 transition-colors ${
          item.current ? 'border-b-[#103222] text-[#103222]' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {item.label}
      </Link>
    ))}
  </nav>
);
