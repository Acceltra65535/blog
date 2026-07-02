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

      <h3 className="mt-5 text-2xl font-bold text-[#103222]">Reading List</h3>
      <p className="mt-2">The Kite Runner/追风筝的人</p>
      <p className="mt-2">The Last Wish/白狼崛起, 猎魔人卷一</p>
      <p className="mt-2">Sword of Destiny/宿命之剑, 猎魔人卷二</p>
      <p className="mt-2">Blood of Elves/精灵之血, 猎魔人卷三</p>
      <p className="mt-2">Time of Contempt/轻蔑时代, 猎魔人卷四</p>
      <p className="mt-2">Baptism of Fire/火之洗礼, 猎魔人卷五</p>

      <h3 className="mt-5 text-2xl font-bold text-[#103222]">Movies/Shows</h3>
      <p className="mt-2">The Expanse/苍穹浩瀚 2015–2022</p>
      <p className="mt-2">Stranger Things/怪奇物語 2016–2025</p>
      <p className="mt-2">The 100/地球百子 2014–2020</p>
      <p className="mt-2">Dark/闇 2017–2020</p>
      <p className="mt-2">The Walking Dead/行尸走肉 2010–2022</p>
      <p className="mt-2">The Last Ship/末日孤艦 2014–2018</p>

      <h3 className="mt-5 text-2xl font-bold text-[#103222]">Games</h3>
      <p className="mt-2">Battlefield 3/戰地風雲3 2011</p>
      <p className="mt-2">Battlefield 4/戰地風雲4 2013</p>
      <p className="mt-2">Grand Theft Auto V/侠盗猎车手5 2013</p>
      <p className="mt-2">Tom Clancy's Rainbow Six Siege/彩虹六号: 围攻 2015</p>
      <p className="mt-2">The Witcher 3: Wild Hunt/巫师3: 狂猎 2015</p>

      <h3 className="mt-5 text-2xl font-bold text-[#103222]">Publications</h3>
      <p className="mt-2">Not yet.</p>

      <img src="https://ghchart.rshah.org/Acceltra65535" alt="GitHub Contributions" className="mt-10 max-w-full" />
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
