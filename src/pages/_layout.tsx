import '../styles.css';

import type { ReactNode } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { inlineBinaryDataUri } from '../lib/inlineAsset';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div>
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <Header />
      <main className="flex flex-1 flex-col items-start p-6 *:min-h-64 *:min-w-64">
        {children}
      </main>
      <Footer />
    </div>
  );
}

const getData = async () => {
  const icon = await inlineBinaryDataUri('public/images/favicon.png', 'image/png');

  const data = {
    description: 'Documenting the Internet!',
    icon,
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
