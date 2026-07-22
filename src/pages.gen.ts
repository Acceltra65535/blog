import type { PathsForPages, GetConfigResponse } from 'waku/router';
import type { getConfig as File_Gallery_getConfig } from './pages/gallery';
import type { getConfig as File_Index_getConfig } from './pages/index';
import type { getConfig as File_PostsSlug_getConfig } from './pages/posts/[slug]';
import type { getConfig as File_Posts_getConfig } from './pages/posts';

type Page =
  | ({ path: '/gallery' } & GetConfigResponse<typeof File_Gallery_getConfig>)
  | ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
  | ({ path: '/posts/[slug]' } & GetConfigResponse<typeof File_PostsSlug_getConfig>)
  | ({ path: '/posts' } & GetConfigResponse<typeof File_Posts_getConfig>);

declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
