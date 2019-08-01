import dotenv from "dotenv-safe";
import { getOffers } from "./static-routes";
dotenv.config();

export default {
  mode: "universal",
  srcDir: "src",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
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
  modules: [],
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
  generate: {
    async routes() {
      const prefix = "/tilbud/";
      const offers = await getOffers();
      console.info(`Generating ${offers.length} product pages.`);
      return offers.map((offer) => ({
        route: `${prefix}${offer.uri}`,
        payload: offer,
      }));
    },
  },
};
