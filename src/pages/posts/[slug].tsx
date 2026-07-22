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

const fixCjkEmphasis = (markdown: string): string => {

    // Fix CommonMark emphasis delimiter rules for Notion Markdown CJK text.
    // causing CommonMark parsers to fail when delimiters touch CJK text/punctuation.
    // Safely insert spaces outside **...** when adjacent to CJK without corrupting inner text or double-spacing.
    const cjkRegex = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/;
    return markdown.replace(/(\s*)(\*\*([\s\S]+?)\*\*)(\s*)/g, (match, sBefore, boldBlock, inner, sAfter, offset, fullStr) => {
        const prevChar = offset > 0 ? fullStr[offset - 1] : '';
        const nextChar = offset + match.length < fullStr.length ? fullStr[offset + match.length] : '';

        const needSpaceBefore = !sBefore && cjkRegex.test(prevChar);
        const needSpaceAfter = !sAfter && cjkRegex.test(nextChar);

        const prefix = needSpaceBefore ? ' ' : '';
        const suffix = needSpaceAfter ? ' ' : '';

        return `${sBefore}${prefix}${boldBlock}${suffix}${sAfter}`;
    });
};

const parsePost = (raw: string): { meta: Frontmatter; content: string } => {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    const frontmatterBlock = match?.[1];
    const content = match?.[2] ?? raw;

    if (!frontmatterBlock) {
        return {
            meta: { title: 'Untitled', summary: '', date: '1970-01-01' },
            content: fixCjkEmphasis(content),
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
        content: fixCjkEmphasis(content),
    };
};

const getStaticSlugs = async () => {
    const files = await readdir(POSTS_DIR);
    return files.filter((name) => name.endsWith('.md')).map((name) => name.replace(/\.md$/, ''));
};

const markdownComponents: Components = {
    h1({ children }) {
        return <h1 className="mb-5 mt-8 text-3xl font-bold tracking-tight text-[#103222]">{children}</h1>;
    },
    h2({ children }) {
        return <h2 className="mb-4 mt-7 text-2xl font-bold tracking-tight text-[#103222]">{children}</h2>;
    },
    h3({ children }) {
        return <h3 className="mb-3 mt-6 text-[1.35rem] font-bold tracking-tight text-[#103222]">{children}</h3>;
    },
    p({ children }) {
        return <p className="my-5 text-[1.08rem] leading-8 text-neutral-800">{children}</p>;
    },
    blockquote({ children }) {
        return (
            <blockquote className="my-6 border-l-4 border-[#103222] bg-[#F0EEEB] px-5 py-3 text-[1.06rem] leading-8 text-neutral-600 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>p]:my-2">
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
    hr() {
        return <hr className="my-8 border-0 border-t-2 border-neutral-300" />;
    },
    ul({ children }) {
        return <ul className="my-4 ml-6 list-disc space-y-2 text-[1.08rem] leading-8 text-neutral-800">{children}</ul>;
    },
    ol({ children }) {
        return <ol className="my-4 ml-6 list-decimal space-y-2 text-[1.08rem] leading-8 text-neutral-800">{children}</ol>;
    },
    li({ children }) {
        return <li className="pl-1">{children}</li>;
    },
    table({ children }) {
        return (
            <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-300 text-left text-sm text-neutral-800">
                    {children}
                </table>
            </div>
        );
    },
    thead({ children }) {
        return <thead className="bg-neutral-100 font-semibold text-neutral-900">{children}</thead>;
    },
    tbody({ children }) {
        return <tbody className="divide-y divide-neutral-200">{children}</tbody>;
    },
    tr({ children }) {
        return <tr className="hover:bg-neutral-50/50">{children}</tr>;
    },
    th({ children }) {
        return <th className="border border-neutral-300 px-4 py-2 font-semibold">{children}</th>;
    },
    td({ children }) {
        return <td className="border border-neutral-300 px-4 py-2">{children}</td>;
    },
    strong({ children }) {
        return <strong className="font-bold text-neutral-900">{children}</strong>;
    },
    em({ children }) {
        return <em className="italic">{children}</em>;
    },
    u({ children }) {
        return <u className="underline underline-offset-4">{children}</u>;
    },
    span({ children, ...props }: any) {
        const isUnderline = props.underline === 'true' || props['data-underline'] === 'true';
        const color = props.color;
        let cls = '';
        if (isUnderline) cls += ' underline underline-offset-4';

        return (
            <span className={cls || undefined} style={color ? { color } : undefined} {...props}>
                {children}
            </span>
        );
    },
    del({ children }) {
        return <del className="line-through text-neutral-500">{children}</del>;
    },
    pre({ children }) {
        return (
            <pre className="my-5 overflow-x-auto rounded-sm border border-neutral-200 bg-[#f9f8f7] p-4 text-sm leading-6 text-neutral-900 font-mono">
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
            <code className="rounded bg-[#efeee9] px-1.5 py-0.5 font-['BlogEnglish'] text-[0.9em] text-[#eb5757] break-words" {...props}>
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