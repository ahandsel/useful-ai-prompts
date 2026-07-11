// .vitepress/config.mts
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

// Deployed under a sub-path on GitHub Pages, so public-asset URLs in `head`
// must include this base - VitePress does not prepend it automatically.
const base = '/useful-ai-prompts/';

// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: 'Useful AI Prompts',
  description:
    'A curated collection of AI prompts for ChatGPT, Claude, and other LLMs. Curated by @ahandsel.',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'ai prompts, prompt engineering, chatgpt, claude, llm, ahandsel, GitHub, VitePress',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    footer: {
      message:
        'Found it helpful? <a href="https://ko-fi.com/ahandsel" target="_blank">Consider buying me coffee ☕</a>',
    },

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home  🤖', link: '/' },
      {
        text: 'Copy in the Wild  ✍️',
        link: 'https://ahandsel.github.io/copy-in-the-wild/',
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ahandsel/useful-ai-prompts',
      },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
        },
        link: 'https://ko-fi.com/ahandsel',
      },
    ],
    editLink: {
      pattern:
        'https://github.com/ahandsel/useful-ai-prompts/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
  },
  base,
  // Content pages live in contents/ but are served at the site root, keeping
  // public URLs (/, /jp-to-en, ...) stable and free of the contents/ prefix.
  rewrites: (id) =>
    id.startsWith('contents/') ? id.slice('contents/'.length) : id,
  sitemap: {
    hostname: 'https://ahandsel.github.io/useful-ai-prompts/',
  },
  ignoreDeadLinks: true,
};

const vitePressSidebarOptions = [
  // https://vitepress-sidebar.cdget.com/guide/options
  {
    basePath: null,
    capitalizeEachWords: false,
    capitalizeFirst: false,
    collapsed: true,
    collapseDepth: 1,
    documentRootPath: 'contents/',
    excludeByGlobPattern: ['README.md', '**/snippets/**'],
    followSymLinks: false,
    frontmatterOrderDefaultValue: 10,
    frontmatterTitleFieldName: 'title',
    includeDotFiles: false,
    includeEmptyFolder: false,
    includeFolderIndexFile: true,
    includeRootIndexFile: false,
    sortFolderTo: 'top',
    sortMenusByFrontmatterOrder: true,
    useFolderLinkFromIndexFile: true,
    useFolderTitleFromIndexFile: true,
    useTitleFromFileHeading: true,
    useTitleFromFrontmatter: true,
  },
];

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions),
);
