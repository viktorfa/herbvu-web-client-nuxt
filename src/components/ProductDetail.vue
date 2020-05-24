<template>
  <div class="shadow p-2 md:p-4">
    <h1 class="text-3xl text-center w-full">{{ product.title }}</h1>
    <div class>
      <img
        :src="product.image_url"
        :alt="product.title"
        onerror="this.classList.add('not-loaded-product'); this.src='/icon.png';"
        class="product-detail-image m-auto"
      />
    </div>
    <p class="text-red-500 text-lg" v-if="offerExpired">
      This offer is expired.
    </p>
    <div class="flex flex-col items-center">
      <h3 class="headline mb-0">{{ formatPrice(product.price) }}</h3>
      <div>{{ product.description }}</div>
      <div class="text-gray-800">{{ product.value }}</div>
      <div class="text-gray-800">{{ product.size }}</div>
      <img
        v-if="dealerLogoSrc"
        class="dealer-logo-image"
        :src="dealerLogoSrc"
        :alt="product.dealer"
      />
      <div v-else>{{ product.dealer }}</div>
    </div>
    <div class="flex justify-center">
      <a :href="product.href" target="_blank" rel="noopener">
        <AmpButton>See product</AmpButton>
      </a>
      <client-only>
        <ProductShareDialog :product="product" />
      </client-only>
    </div>
  </div>
</template>

<script>
import ProductShareDialog from "~/components/ProductShareDialog";
import AmpButton from "~/components/AmpButton";
import { getDealerLogoSrc } from "~/util/products";
import { formatPrice } from "~/util/products/conversion";

export default {
  name: "ProductDetail",
  components: { ProductShareDialog, AmpButton },
  props: { product: { type: Object, required: true } },
  computed: {
    dealerLogoSrc() {
      return this.product ? getDealerLogoSrc(this.product.dealer) : "";
    },
    offerExpired() {
      const now = new Date();
      const expiryDate = new Date(this.product.validThrough);
      if (expiryDate < now) {
        return true;
      }
      return false;
    },
  },
  methods: {
    formatPrice,
  },
};
</script>

<style>
.product-detail-image {
  object-fit: contain;
  max-height: 50vh;
}
</style>
