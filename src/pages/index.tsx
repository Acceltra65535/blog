import { Link } from 'waku';

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
        <h2 className="text-xl tracking-tight"><strong>Hi, I'm Alex Yuan!</strong> {data.headline}</h2>
      <p className="my-4">{data.body}</p>
      <p className="my-4">I specialize in building systems software, with a particular focus on cloud computing. I also enjoy developing full-stack apps with TypeScript and React, and I have a strong interest in computer networks.</p>
      <p className="my-4">A little ghost working on L2/L3，但什么都学不会 ( Blowing water while touching fish and drinking coffee/apple juice/維他檸檬茶</p>
      <p className="my-4">Thanks for visiting my site and reading my notes.</p>
      <img src="/images/myimage.jpg" alt="My image" className="mt-4" />
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Home | Emondora\'s Blog',
    headline: '这里是 Emondora 的博客',
    body: 'A CS UG student, computer engineer, and researcher focusing on high-performance computing and accelerating science.',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
