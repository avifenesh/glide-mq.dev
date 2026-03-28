import { defineConfig } from 'vitepress'
import typedocSidebar from '../api/typedoc-sidebar.json'

export default defineConfig({
  title: 'glide-mq',
  description: 'AI-native message queue for Node.js on Valkey/Redis Streams',
  base: '/',

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'glide-mq' }],
    ['meta', { property: 'og:description', content: 'AI-native message queue for Node.js on Valkey/Redis Streams' }],
  ],

  lastUpdated: true,
  cleanUrls: true,

  markdown: {
    defaultHighlightLang: 'typescript',
  },

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Migration', link: '/migration/' },
      { text: 'Integrations', link: '/integrations/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Usage', link: '/guide/usage' },
            { text: 'Agent Skills', link: '/guide/skills' },
          ],
        },
        {
          text: 'AI-Native Features',
          items: [
            { text: 'AI-Native Overview', link: '/guide/ai-native' },
            { text: 'Vector Search', link: '/guide/vector-search' },
          ],
        },
        {
          text: 'Core Features',
          items: [
            { text: 'Advanced', link: '/guide/advanced' },
            { text: 'Workflows', link: '/guide/workflows' },
            { text: 'Broadcast', link: '/guide/broadcast' },
            { text: 'Step Jobs', link: '/guide/step-jobs' },
            { text: 'Testing', link: '/guide/testing' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Observability', link: '/guide/observability' },
            { text: 'Serverless', link: '/guide/serverless' },
            { text: 'Durability', link: '/guide/durability' },
          ],
        },
        {
          text: 'Internals',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Wire Protocol', link: '/guide/wire-protocol' },
          ],
        },
      ],

      '/migration/': [
        {
          text: 'Migration Guides',
          items: [
            { text: 'Overview', link: '/migration/' },
            { text: 'From BullMQ', link: '/migration/from-bullmq' },
            { text: 'From Bee-Queue', link: '/migration/from-bee-queue' },
          ],
        },
      ],

      '/integrations/': [
        {
          text: 'Framework Integrations',
          items: [
            { text: 'Overview', link: '/integrations/' },
            { text: 'Hono', link: '/integrations/hono' },
            { text: 'Fastify', link: '/integrations/fastify' },
            { text: 'NestJS', link: '/integrations/nestjs' },
            { text: 'Hapi', link: '/integrations/hapi' },
            { text: 'Dashboard', link: '/integrations/dashboard' },
          ],
        },
      ],

      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
            { text: 'Basics', link: '/examples/basics' },
            { text: 'Scheduling', link: '/examples/scheduling' },
            { text: 'Workflows', link: '/examples/workflows' },
            { text: 'Broadcast', link: '/examples/broadcast' },
            { text: 'Frameworks', link: '/examples/frameworks' },
            { text: 'Serverless', link: '/examples/serverless' },
            { text: 'Advanced', link: '/examples/advanced' },
            { text: 'AI Pipelines', link: '/examples/ai-pipelines' },
          ],
        },
      ],

      '/api/': [
        {
          text: 'API Reference',
          items: typedocSidebar,
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/avifenesh/glide-mq' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/glide-mq' },
    ],

    editLink: {
      pattern: 'https://github.com/avifenesh/glide-mq.dev/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright 2025-present glide-mq contributors',
    },
  },
})
