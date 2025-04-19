import "dotenv/config";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as Redocusaurus from "redocusaurus";

const config: Config = {
  title: "Ragpi Documentation",
  tagline: "Ragpi Documentation",
  favicon: "img/ragpi-logo-black.png",

  url: "https://docs.ragpi.io",

  baseUrl: "/",

  organizationName: "ragpi",
  projectName: "ragpi",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  scripts: [
    {
      src: "https://cdn.jsdelivr.net/gh/ragpi/ragpi-web-widget@v0.1.1/dist/ragpi-widget.js",
      defer: true,
      "data-recaptcha-site-key": process.env.RECAPTCHA_SITE_KEY,
      "data-ragpi-gateway-url": process.env.RAGPI_GATEWAY_URL,
      "data-ragpi-sources": "ragpi_docs",
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          // sidebarCollapsed: false,
          editUrl: "https://github.com/ragpi/ragpi-docs",
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ["rss", "atom"],
        //     xslt: true,
        //   },
        //   onInlineTags: "warn",
        //   onInlineAuthors: "warn",
        //   onUntruncatedBlogPosts: "warn",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
    [
      "redocusaurus",
      {
        specs: [
          {
            spec: "./openapi.json",
            route: "/api/",
            url: "/openapi.json",
          },
        ],
        theme: {
          primaryColor: "#2e8555",
        },
      },
    ] satisfies Redocusaurus.PresetEntry,
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Ragpi",
      logo: {
        alt: "Ragpi Logo",
        src: "img/ragpi-logo-black.png",
        srcDark: "img/ragpi-logo-white.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "/api", label: "API Reference", position: "left" },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/ragpi/ragpi",
          position: "right",
          className: "header-github-link",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Ragpi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
