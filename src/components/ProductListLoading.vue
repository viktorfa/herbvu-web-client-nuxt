<template>
  <div class="flex flex-wrap justify-around">
    <template v-for="(product, index) in _products">
      <ProductListItem
        class="loading-product-list-item"
        :key="index"
        v-bind="product"
        :showDealerLogo="showDealerLogo"
        :showSubtitle="showSubtitle"
      />
    </template>
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem";

const loadingProduct = {
  dealer: "kolonial.no",
  description: ". ord.pris 36,50. united bakeries, 700g",
  href: "https://shopgun.com/publications/paged/c7c8h8F/pages/6",
  id: "shopgun:product:ad7cUC8T",
  image_url: "/logo-256x256.png",
  price: 24.9,
  subtitle: ". ord.pris 36,50. united bakeries, 700g",
  title: "Fransk solsikkebrød",
  value: "35,57 kr/kg",
};

export default {
  name: "ProductListLoading",
  components: { ProductListItem },
  props: {
    count: { type: Number, default: 10 },
    showSubtitle: { type: Boolean, default: true },
    showDealerLogo: { type: Boolean, default: true },
  },
  computed: {
    _products() {
      return new Array(this.count).fill(loadingProduct);
    },
  },
};
</script>

<style>
.loading-product-list-item {
  animation: blur-pulse 2s infinite;
  pointer-events: none;
}
@keyframes blur-pulse {
  0% {
    filter: blur(4px);
  }
  50% {
    filter: blur(8px);
  }
  100% {
    filter: blur(4px);
  }
}
</style>

