import { Link } from 'waku';

export const Header = () => {
  return (
      <header className="flex w-full flex-col items-start p-6">
          <h2 className="text-3xl font-bold tracking-tight">
              <Link to="/">Alex Yuan</Link>
          </h2>
          <nav className="mt-[20px]">
              <a href="/" className="mr-[20px]">
                  Home
              </a>
              <a href="/blog" className="mr-[20px]">
                  博客 / Blog
              </a>
          </nav>
      </header>
  );
};
