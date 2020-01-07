import dotenv from "dotenv-safe";
import { getOffers } from "./build/static-routes";
import { getLinkTags } from "./build/head";
import { getAllMetaInfo } from "./src/util/meta-tags";
import { categories } from "./src/components/CategoryCards/helpers";
dotenv.config();

const { meta, title } = getAllMetaInfo();

export default {
  mode: "universal",
  srcDir: "src",
  /*
   ** Headers of the page
   */
  head: {
    title,
    htmlAttrs: { lang: "no" },
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
  loading: { color: "#0d7e12" },
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
    ["@nuxtjs/pwa", { manifest: { lang: "no" } }],
    [
      "@nuxtjs/sitemap",
      {
        hostname: "https://herbvu.com",
        exclude: ["/sok"],
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-69844447-1",
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
    async routes() {
      const prefix = "/tilbud/";
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
