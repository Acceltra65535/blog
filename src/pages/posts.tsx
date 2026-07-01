import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { Link } from 'waku';

type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
};

const POSTS_DIR = path.resolve(process.cwd(), 'private');

const parseFrontmatter = (markdown: string) => {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  const frontmatterBlock = match?.[1];
  if (!frontmatterBlock) {
    return { title: 'Untitled', date: '1970-01-01' };
  }

  const lines = frontmatterBlock.split('\n');
  const map = new Map<string, string>();

  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
    map.set(key, value);
  }

  return {
    title: map.get('title') || 'Untitled',
    date: map.get('date') || '1970-01-01',
  };
};

const getPosts = async (): Promise<PostMeta[]> => {
  const files = await readdir(POSTS_DIR);
  const mdFiles = files.filter((name) => name.endsWith('.md'));

  const posts = await Promise.all(
      mdFiles.map(async (fileName) => {
        const fullPath = path.join(POSTS_DIR, fileName);
        const raw = await readFile(fullPath, 'utf8');
        const { title, date } = parseFrontmatter(raw);

        return {
          slug: fileName.replace(/\.md$/, ''),
          title,
          date,
        };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
      <div>
        <title>Posts | Motoko&apos;s Blog</title>
        <h1 className="text-4xl font-bold tracking-tight">writing/</h1>
        <p className="my-4">Thoughts on web development, open source, and my life.</p>

        <ul className="mt-6 space-y-3">
          {posts.map((post) => (
              <li key={post.slug} className="flex items-baseline gap-3">
                <time className="min-w-28 text-base opacity-70">{post.date}</time>
                <Link to={`/posts/${post.slug}`} className="underline underline-offset-4">
                  {post.title}
                </Link>
              </li>
          ))}
        </ul>
      </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};