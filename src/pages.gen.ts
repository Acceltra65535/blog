// deno-fmt-ignore-file
// biome-ignore-all format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse, SearchCodecsForPages } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Gallery_getConfig } from './pages/gallery';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Posts_getConfig } from './pages/posts';
// prettier-ignore
import type { getConfig as File_PostsSlug_getConfig } from './pages/posts/[slug]';
// prettier-ignore
import type { getConfig as File_Layout_getConfig } from './pages/_layout';

// prettier-ignore
type Page =
| ({ path: '/gallery' } & GetConfigResponse<typeof File_Gallery_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/posts' } & GetConfigResponse<typeof File_Posts_getConfig>)
| ({ path: '/posts/[slug]' } & GetConfigResponse<typeof File_PostsSlug_getConfig>);

// prettier-ignore
type Layout =
| ({ path: '/' } & Awaited<ReturnType<typeof File_Layout_getConfig>>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
    layouts: Layout;
  }
  interface SearchCodecsConfig extends SearchCodecsForPages<Page> {}
}
