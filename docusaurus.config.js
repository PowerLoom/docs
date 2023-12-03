// @ts-nocheck
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// @ts-ignore
const lightCodeTheme = require("prism-react-renderer/themes/github");
// @ts-ignore
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
//const lightCodeTheme = require('prism-react-renderer/themes/github');
//const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Get Started with Powerloom',
  tagline: 'Powerloom helps build advanced smart contract-based applications in DeFi, web3 gaming, and more with our streamlined cross-chain data integration.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://powerloom-docs-245iq.ondigitalocean.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'powerloom', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem",
          //docLayoutComponent: "@theme/DocPage",
          // docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),

    ],

  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },



      //Github Code Snippet Block
      // github codeblock theme configuration
      codeblock: {
        showGithubLink: true,
        githubLinkLabel: 'View on GitHub',
        showRunmeLink: false,
        runmeLinkLabel: 'Checkout via Runme'
      },


      // Replace with your project's social card
      image: 'img/powerloom-social-card.jpg',
      navbar: {
        title: 'Powerloom',
        logo: {
          alt: 'Powerloom',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/powerloom',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            label: 'Discord',
            href: 'https://discord.com/powerloom',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/PowerloomHQ',
          },
          {
            label: 'Medium',
            href: 'https://medium.com/powerloom',
          },
          {
            label: 'Telegram',
            href: 'https://t.me/powerloomhq',
          },
          {
            label: 'Blog',
            href: 'https://blog.powerloom.io',
          },
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/company/powerloom/',
          },
          {
            label: 'Website',
            href: 'https://www.powerloom.io/',
          },
          {
            label: 'Careers',
            href: 'https://careers.powerloom.io/'
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Powerloom Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["ruby", "csharp", "php"],
      },

    }),

    plugins: [
      [
        "docusaurus-plugin-openapi-docs",
        {
          id: "openapi",
          docsPluginId: "classic",
          config: {
            poolerdocs: {
              specPath: "examples/core_api.yaml",
              outputDir: "docs/build-with-powerloom/snapshotter-node/core-api",
              downloadUrl:
                "https://raw.githubusercontent.com/PaloAltoNetworks/docusaurus-template-openapi-docs/main/examples/petstore.yaml",
              sidebarOptions: {
                groupPathsBy: "tag",
                categoryLinkSource: "tag",
              },
            },
          },
        },
      ],
    ],

  themes: [
    'docusaurus-theme-github-codeblock',
    'docusaurus-theme-openapi-docs'

  ]
};

module.exports = config;