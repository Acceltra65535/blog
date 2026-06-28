import { Link } from 'waku';

export const Header = () => {
  return (
      <header className="flex w-full items-center p-6">
          <h2 className="text-3xl font-bold tracking-tight">
              <Link to="/">Alex Yuan</Link>
          </h2>
      </header>
  );
};
