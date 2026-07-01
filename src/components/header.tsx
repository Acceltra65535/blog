import { Link } from 'waku';

export const Header = () => {
  return (
      <header className="flex w-full flex-col items-start border-b-2 border-dashed border-gray-500 p-6 pb-0">
          <h2 className="text-3xl font-bold tracking-tight">
              <Link to="/">Alex Yuan</Link>
          </h2>
          <nav className="mt-5 text-lg">
              <a href="/" className="mr-5">
                  Home
              </a>
              <a href="/posts" className="mr-5">
                  博客 / Blog
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
