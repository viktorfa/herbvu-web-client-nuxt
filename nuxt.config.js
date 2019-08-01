import dotenv from "dotenv-safe";
import { getOffers } from "./build/static-routes";
import { getLinkTags } from "./build/head";
import { getAllMetaInfo } from "./src/util/meta-tags";
dotenv.config();

export default {
  mode: "universal",
  srcDir: "src",
  /*
   ** Headers of the page
   */
  head: {
    ...getAllMetaInfo(),
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
    "@nuxtjs/sitemap",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-132355293-1",
      },
    ],
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ["~/assets/variables.scss"],
    treeShake: false,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  purgeCSS: {
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
    content: [
      "./**/*.vue",
      "./**/*.html",
      "./node_modules/vuetify/src/**/*.js",
    ].filter(function(f) {
      return !/\/$/.test(f);
    }),
  },
  sitemap: {
    hostname: "https://allematpriser.no",
    exclude: ["/sok"],
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
