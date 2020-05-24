<template>
  <div>
    <div class="flex flex-wrap justify-around">
      <template v-for="product in _products">
        <ProductListItem
          :key="product.id"
          v-bind="product"
          :showDealerLogo="showDealerLogo"
          :showSubtitle="showSubtitle"
        />
      </template>
    </div>
    <div class="flex justify-center">
      <AmpButton
        @click="showMore"
        v-if="isMore"
        v-enter-viewport="useInfiniteScroll ? showMore : null"
        >more</AmpButton
      >
      <br v-else />
    </div>
  </div>
</template>

<script>
import take from "lodash/take";
import ProductListItem from "./ProductListItem";
import AmpButton from "./AmpButton";

export default {
  name: "ProductList",
  components: { ProductListItem, AmpButton },
  props: {
    products: Array,
    showSubtitle: { type: Boolean, default: true },
    showDealerLogo: { type: Boolean, default: true },
    pageSize: { type: Number, default: 10 },
    useInfiniteScroll: { type: Boolean, default: true },
  },
  data() {
    return {
      pageNumber: 1,
    };
  },
  computed: {
    limit() {
      return this.pageSize * this.pageNumber;
    },
    isMore() {
      return this.products.length > this.limit;
    },
    _products() {
      return take(this.products, this.limit);
    },
  },
  methods: {
    showMore: function() {
      this.pageNumber += 1;
    },
  },
};
</script>
