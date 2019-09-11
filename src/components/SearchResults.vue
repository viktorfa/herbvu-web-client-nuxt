<template>
  <div>
    <div v-if="offers.length > 0" class="offer-search-results">
      <ProductListBanner class="bg-amp-purple text-white">{{ offers.length }} tilbud</ProductListBanner>
      <ProductList :useInfiniteScroll="false" :products="offers" :showSubtitle="false" />
      <br />
    </div>
    <div v-if="kolonialProducts.length > 0" class="kolonial-search-results">
      <ProductListBanner class="bg-kolonial-yellow text-white">
        {{ kolonialProducts.length }}
        {{ `${kolonialProducts.length > 1 ? "varer" : "vare"}` }} fra
        kolonial.no
      </ProductListBanner>
      <ProductList :useInfiniteScroll="false" :products="kolonialProducts" :showDealerLogo="false" />
    </div>
    <div v-if="menyProducts.length > 0" class="meny-search-results">
      <ProductListBanner class="bg-meny-red text-white">
        {{ menyProducts.length }}
        {{ `${menyProducts.length > 1 ? "varer" : "vare"}` }} fra
        meny.no
      </ProductListBanner>
      <ProductList :useInfiniteScroll="false" :products="menyProducts" :showDealerLogo="false" />
    </div>
    <div v-if="europrisProducts.length > 0" class="europris-search-results">
      <ProductListBanner class="bg-europris-green text-white">
        {{ europrisProducts.length }}
        {{ `${europrisProducts.length > 1 ? "varer" : "vare"}` }} fra
        europris.no
      </ProductListBanner>
      <ProductList :useInfiniteScroll="false" :products="europrisProducts" :showDealerLogo="false" />
    </div>
  </div>
</template>

<script>
import sortBy from "lodash/sortBy";
import ProductList from "./ProductList";
import ProductListBanner from "../components/ProductListBanner.vue";
import { getStandardProduct } from "~/util/products/convert";

const isOffer = (result) =>
  result.provenance === "shopgun" || result.provenance === "custom";
const isKolonial = (result) => result.provenance === "kolonial";
const isMeny = (result) => result.provenance === "meny";
const isEuropris = (result) => result.provenance === "europris";
const sortResults = (results) => sortBy(results, (result) => -result.score);

export default {
  name: "SearchResults",
  components: {
    ProductList,
    ProductListBanner,
  },
  props: {
    results: Array,
  },
  computed: {
    offers: function() {
      return (
        sortResults(this.results.filter(isOffer)).map(getStandardProduct) || []
      );
    },
    kolonialProducts: function() {
      console.log("kolonial computed starting");
      const startTime = new Date().getTime();
      const result =
        sortResults(this.results.filter(isKolonial)).map(getStandardProduct) ||
        [];
      console.log("kolonial computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    menyProducts: function() {
      console.log("meny computed starting");
      const startTime = new Date().getTime();
      const result =
        sortResults(this.results.filter(isMeny)).map(getStandardProduct) || [];
      console.log("meny computed finished");
      console.log(`time elapsed: ${new Date().getTime() - startTime}`);
      return result;
    },
    europrisProducts: function() {
      return (
        sortResults(this.results.filter(isEuropris)).map(getStandardProduct) ||
        []
      );
    },
  },
};
</script>
