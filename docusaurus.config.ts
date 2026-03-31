import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const baseUrl = process.env.BASE_URL || '/CS4535-Fall-2026/';

const config: Config = {
  title: 'CS 4535: Software Design & Delivery',
  tagline: 'Professional Practicum Capstone — AI & Open Source',
  favicon: 'img/favicon.ico',

  url: 'https://neu-se.github.io',
  baseUrl: baseUrl,

  organizationName: 'neu-se',
  projectName: 'cs4535-fall-2026',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/neu-se/cs4535-fall-2026/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/software-that-ships-social.webp',
    navbar: {
      title: 'CS 4535 Fall 2026',
      logo: {
        alt: 'Pawtograder Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {to: '/syllabus', label: 'Syllabus', position: 'left'},
        {to: '/apply', label: 'Apply', position: 'left'},
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course',
          items: [
            // {label: 'Syllabus', to: '/syllabus'},
            {label: 'Apply', to: '/apply'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Pawtograder on GitHub', href: 'https://github.com/pawtograder'},
          ],
        },
      ],
      copyright: `CS 4535 — Northeastern University, Khoury College of Computer Sciences`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'typescript', 'bash'],
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
