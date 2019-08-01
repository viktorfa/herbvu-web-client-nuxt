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
    <v-btn @click="showMore" v-if="isMore" color="info" block text>mer</v-btn>
    <br v-else />
  </div>
</template>

<script>
import take from "lodash/take";
import ProductListItem from "./ProductListItem";

export default {
  name: "ProductList",
  components: { ProductListItem },
  props: {
    products: Array,
    showSubtitle: { type: Boolean, default: true },
    showDealerLogo: { type: Boolean, default: true },
    pageSize: { type: Number, default: 10 },
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
