import dotenv from "dotenv-safe";
import { getOffers } from "./build/static-routes";
import { getLinkTags } from "./build/head";
import { getAllMetaInfo } from "./src/util/meta-tags";
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
    htmlAttrs: {lang: "no"},
    meta: [
      ...meta,
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
    ],
    link: [
      ...getLinkTags(),
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/directives.js"],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/vuetify",
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "@nuxtjs/sitemap",
      {
        hostname: "https://allematpriser.no",
        exclude: ["/sok"],
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-132355293-1",
        trackEvent: true,
      },
    ],
    [
      "@nuxtjs/google-tag-manager",
      {
        id: "GTM-WLK7HLS",
        respectDoNotTrack: true,
        dev: true,
      },
    ],
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ["~/assets/variables.scss"],
    // treeShake: false,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    // We instead minify with golang which is magnitudes faster
    html: {
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
    optimization: { minimize: false },
  },
  purgeCSS: {
    // Adding all these Vuetify classes bloates our css a lot.
    // Should replace add Vuetify theme CSS to our own css files so save
    // some 40kb in the CSS bundle.
    whitelistPatterns: [/^v-/, /^theme--/, /--text$/],
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_:/]+/g) || [];
          }
        },
      },
    ],
    content: ["./src/**/*.vue", "./src/**/*.html"],
  },
  generate: {
    async routes() {
      const prefix = "/tilbud/";
      const offers = await getOffers();
      console.info(`Generating ${offers.length} product pages.`);
      return offers.map((offer) => ({
        route: `${prefix}${offer.uri}`,
        payload: offer,
        url: `${prefix}${offer.uri}`,
      }));
    },
  },
};
