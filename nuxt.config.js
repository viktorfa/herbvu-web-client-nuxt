import dotenv from "dotenv-safe";
import { getOffers } from "./build/static-routes";
import { getLinkTags } from "./build/head";
import { getAllMetaInfo } from "./src/util/meta-tags";
import { categories } from "./src/components/CategoryCards/helpers";
dotenv.config();

const { meta, title } = getAllMetaInfo();

import config from "./src/page-data";

export default {
  mode: "universal",
  srcDir: "src",
  /*
   ** Headers of the page
   */
  head: {
    title,
    htmlAttrs: { lang: "en" },
    meta: [
      ...meta,
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
    ],
    link: [
      ...getLinkTags(),
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: config.bgColor },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/directives.js", "~/plugins/fa.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    //["nuxt-purgecss"],
    ["@nuxtjs/pwa", { manifest: { lang: "en" } }],
    [
      "@nuxtjs/sitemap",
      {
        hostname: `https://${config.hostname}`,
        exclude: ["/search"],
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: process.env.NUXT_ENV_GA_ID,
        trackEvent: true,
      },
    ],
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    extend(config, ctx) {},
    // We instead minify with golang which is magnitudes faster
    /*html: {
      minify: {
        collapseBooleanAttributes: false,
        decodeEntities: false,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: false,
        removeEmptyAttributes: false,
        removeRedundantAttributes: false,
        trimCustomFragments: false,
        useShortDoctype: false,
      },
    },
    optimization: { minimize: false },*/
  },
  purgeCSS: {
    content: ["./src/**/*.vue", "./src/**/*.html"],
  },
  generate: {
    concurrency: 100,
    async routes() {
      const prefix = "/products/";
      const offers = await getOffers();
      console.info(`Generating ${offers.length} product pages.`);
      return [
        ...categories.map((cat) => ({
          route: `/${cat.slug}`,
          payload: cat,
          url: `/${cat.slug}`,
        })),
        ...offers.map((offer) => ({
          route: `${prefix}${offer.uri}`,
          payload: offer,
          url: `${prefix}${offer.uri}`,
        })),
      ];
    },
  },
};
