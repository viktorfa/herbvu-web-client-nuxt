<template>
  <div>
    <div v-if="offers.length > 0" class="offer-search-results">
      <ProductListBanner class="bg-b1 text-white"
        >{{ offers.length }} offers</ProductListBanner
      >
      <ProductList
        :useInfiniteScroll="false"
        :products="offers"
        :showSubtitle="false"
      />
    </div>
  </div>
</template>

<script>
import sortBy from "lodash/sortBy";
import ProductList from "./ProductList";
import ProductListBanner from "../components/ProductListBanner.vue";
import { getStandardProduct } from "~/util/products/convert";

const isOffer = (result) => !!result.provenance;
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
  },
};
</script>
