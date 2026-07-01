import { Link } from 'waku';

export default async function HomePage() {
    const data = await getData();

    return (
        <div>
            <title>{data.title}</title>
            <h2 className="text-xl tracking-tight">{data.headline}</h2>
            <p className="my-4">{data.body}</p>
            <p className="my-4">摸鱼！</p>
        </div>
    );
}

const getData = async () => {
    const data = {
        title: 'Gallery | Emondora\'s Blog',
        headline: '这里是 Gallery',
        body: '还没想好要写什么，先鸽着 (',
    };

    return data;
};

export const getConfig = async () => {
    return {
        render: 'static',
    } as const;
};
