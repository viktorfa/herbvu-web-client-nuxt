import dotenv from "dotenv-safe";

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
    routes() {
      const prefix = "/tilbud/";
      return ["shopgun:product:368dONsT", "shopgun:product:6fbbo1QT"].map(
        (id) => ({
          route: `${prefix}${id}`,
          payload: {
            _id: "5d3d39fbe81a2f9f105658b9",
            uri: "shopgun:product:21dbkuYT",
            brand: null,
            dealer: "Coop Prix",
            description: "2 varianter. 4 x 125 g. Pr kg 179,80",
            heading: "Coop laksefilet",
            href: "https://shopgun.com/publications/paged/2bdbCZF/pages/1",
            image_url:
              "https://d3ikkoqs9ddhdl.cloudfront.net/img/offer/crop/zoom/21dbkuYT.jpg?m=0",
            piece_value: null,
            pieces: { from: 4, to: 4 },
            pricing: { price: 89.9, pre_price: null, currency: "NOK" },
            provenance: "shopgun",
            provenance_id: "21dbkuYT",
            quantity: {
              unit: {
                symbol: "g",
                type: "quantity",
                si: { symbol: "kg", factor: 0.001 },
              },
              size: { min: 500, max: 500 },
              pieces: { min: null, max: null },
            },
            quantity_value: null,
            run_from: "2019-07-21T22:00:00.000Z",
            run_till: "2019-08-04T21:59:59.000Z",
            size: { from: 125, to: 125 },
            unit: { symbol: "g", si: { symbol: "kg", factor: 0.001 } },
            is_offer: true,
            score: 1.5,
          },
        }),
      );
    },
  },
};
