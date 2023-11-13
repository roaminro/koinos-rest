import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const config: Config = {
  title: 'Koinos Swagger API',
  tagline: 'Koinos is a cool technology. Spread the word!',
  favicon: 'img/favicon.ico',
  url: 'https://koinos-rest.vercel.app/swagger',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Koinos', // Usually your GitHub org/user name.
  projectName: 'Koinos Swagger API', // Usually your repo name.

  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/roaminro/koinos-rest'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/roaminro/koinos-rest'
        },
        theme: {
          customCss: './app/globals.css'
        }
      } satisfies Preset.Options
    ]
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        }
      }
    }
  ],

  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    image: '/koinos-logo.png',
    navbar: {
      title: 'Koinos Swagger API',
      logo: {
        alt: 'Koinos Logo',
        src: '/koinos-logo.png'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'koinosSwaggerSidebar',
          position: 'left',
          label: 'API Endpoints'
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/roaminro/koinos-rest',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Swagger',
              to: '/app/api'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus'
            // },
            {
              label: 'Discord',
              href: 'https://discord.gg/RnE5Fp4C'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/koinosnetwork'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/roaminro/koinos-rest'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Koinos. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
}

export default config
