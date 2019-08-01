<template>
  <ProductList :products="this._products" :showSubtitle="false" :pageSize="16" />
</template>

<script>
import ProductList from "./ProductList";
import { getStandardProduct } from "../util/lib";

export default {
  name: "PromotedProducts",
  components: {
    ProductList,
  },
  props: {
    products: Array,
  },
  computed: {
    _products: function() {
      return this.products.map(getStandardProduct).filter(
        // unique by id
        ({ id }, index, arr) =>
          !arr.slice(index + 1).find(({ id: _id }) => id === _id),
      );
    },
  },
};
</script>
