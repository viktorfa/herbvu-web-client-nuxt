<template>
  <div>
    <div v-if="offers.length > 0" class="offer-search-results">
      <ProductListBanner class="bg-amp-purple text-white">{{ offers.length }} tilbud</ProductListBanner>
      <ProductList :useInfiniteScroll="false" :products="offers" :showSubtitle="false" />
    </div>
  </div>
</template>

<script>
import sortBy from "lodash/sortBy";
import ProductList from "./ProductList";
import ProductListBanner from "../components/ProductListBanner.vue";
import { getStandardProduct } from "~/util/products/convert";

const isOffer = (result) => !!result.provenance;
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
