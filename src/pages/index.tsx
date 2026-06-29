import { Link } from 'waku';
import { Counter } from '../components/counter';

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <h2 className="text-xl tracking-tight">{data.headline}</h2>
      <p className="my-4">{data.body}</p>
      <p className="my-4">An Engineer, part time on open source.</p>
      <p className="my-4">I enjoy building full-stack apps with TypeScript and React.</p>
      <p className="my-4">Recently I have been exploring server components and static rendering.</p>
      <p className="my-4">Thanks for visiting my site and reading my notes.</p>
      <img src="/images/myimage.jpg" alt="My image" className="mt-4" />
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Home | Motoko\'s Blog',
    headline: '这个页面先鸽着，还没想好要写啥 (',
    body: 'A CS UG Student, part time on open source.',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
