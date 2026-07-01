import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Frontmatter = {
    title: string;
    summary: string;
    date: string;
};

const POSTS_DIR = path.resolve(process.cwd(), 'private');

const parsePost = (raw: string): { meta: Frontmatter; content: string } => {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    const frontmatterBlock = match?.[1];
    const content = match?.[2] ?? raw;

    if (!frontmatterBlock) {
        return {
            meta: { title: 'Untitled', summary: '', date: '1970-01-01' },
            content,
        };
    }

    const map = new Map<string, string>();
    for (const line of frontmatterBlock.split('\n')) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        map.set(key, value);
    }

    return {
        meta: {
            title: map.get('title') || 'Untitled',
            summary: map.get('summary') || '',
            date: map.get('date') || '1970-01-01',
        },
        content,
    };
};

const getStaticSlugs = async () => {
    const files = await readdir(POSTS_DIR);
    return files.filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''));
};

type PostPageProps = {
    slug: string;
};

export default async function PostDetailPage({ slug }: PostPageProps) {
    const filePath = path.resolve(POSTS_DIR, `${slug}.md`);
    const raw = await readFile(filePath, 'utf8');
    const { meta, content } = parsePost(raw);

    return (
        <div className="w-full max-w-none">
            <title>{`${meta.title} | Posts`}</title>

            <h1 className="text-4xl font-bold tracking-tight">{meta.title}</h1>
            <p className="my-4 text-neutral-500">{meta.summary}</p>
            <p className="mb-8 text-sm text-neutral-500">{meta.date}</p>

            <hr className="my-8 border-neutral-300" />

            <div className="prose prose-neutral max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
        </div>
    );
}

export const getConfig = async () => {
    const staticPaths = await getStaticSlugs();

    return {
        render: 'static',
        staticPaths,
    } as const;
};