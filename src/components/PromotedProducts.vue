<template>
  <ProductList :products="_products" :show-subtitle="false" :page-size="16" />
</template>

<script>
import { getStandardProduct } from "../util/lib";
import ProductList from "./ProductList";

export default {
  name: "PromotedProducts",
  components: {
    ProductList,
  },
  props: {
    products: Array,
  },
  computed: {
    _products() {
      return this.products.map(getStandardProduct).filter(
        // unique by id
        ({ id }, index, arr) =>
          !arr.slice(index + 1).find(({ id: _id }) => id === _id),
      );
    },
  },
};
</script>
