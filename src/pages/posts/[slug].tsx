import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

const markdownComponents: Components = {
    h1({ children }) {
        return <h1 className="mb-5 mt-8 text-3xl font-bold tracking-tight text-neutral-900">{children}</h1>;
    },
    h2({ children }) {
        return <h2 className="mb-4 mt-7 text-2xl font-semibold tracking-tight text-neutral-900">{children}</h2>;
    },
    h3({ children }) {
        return <h3 className="mb-3 mt-6 text-[1.35rem] font-semibold tracking-tight text-neutral-900">{children}</h3>;
    },
    p({ children }) {
        return <p className="my-5 text-[1.08rem] leading-8 text-neutral-800">{children}</p>;
    },
    blockquote({ children }) {
        return (
            <blockquote className="my-6 border-l-4 border-neutral-800 bg-[#F0EEEB] pl-5 pr-2 text-[1.06rem] leading-8 text-neutral-600 [&>p]:my-0">
                {children}
            </blockquote>
        );
    },
    a({ href, children }) {
        const label = Array.isArray(children) ? children.map(String).join('').trim() : String(children ?? '').trim();

        if (href && !label) {
            return <img src={href} alt="" className="my-5 max-w-full rounded-sm" />;
        }

        return (
            <a href={href} className="text-[#103222] underline underline-offset-4">
                {children}
            </a>
        );
    },
    img({ src, alt }) {
        return <img src={src} alt={alt ?? ''} className="my-5 max-w-full rounded-sm" />;
    },
    pre({ children }) {
        return (
        <pre className="my-5 overflow-x-auto rounded-sm border border-neutral-200 bg-[#f9f8f7] p-4 text-sm leading-6 text-neutral-900">
            {children}
        </pre>
        );
    },
    code({ className, children, ...props }) {
        const isBlockCode = className?.includes('language-');

        if (isBlockCode) {
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }

        return (
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.92em] text-neutral-800" {...props}>
                {children}
            </code>
        );
    },
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
            <title>{`${meta.title} | Emondora\'s Blog`}</title>

            <h1 className="text-4xl font-bold tracking-tight">{meta.title}</h1>
            <p className="my-4 text-neutral-500">{meta.summary}</p>
            <p className="mb-8 text-sm italic text-neutral-500">{meta.date}</p>

            <hr className="my-5 border-0 border-t-2 border-neutral-300" />

            <div className="max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypePrismPlus]}
                    components={markdownComponents}
                >
                    {content}
                </ReactMarkdown>
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