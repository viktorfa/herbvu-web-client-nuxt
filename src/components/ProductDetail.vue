<template>
  <v-card text>
    <h1 class="text-3xl text-center w-full">{{product.title}}</h1>
    <v-img :src="product.image_url" aspect-ratio="2.4" contain :alt="product.title"></v-img>
    <p class="text-red-500 text-lg" v-if="offerExpired">Dette tilbudet er dessverre utgått.</p>
    <div class="flex flex-col items-center">
      <h3 class="headline mb-0">{{ formatPrice(product.price) }}</h3>
      <div>{{ product.description }}</div>
      <div>{{ product.value }}</div>
      <v-img
        v-if="dealerLogoSrc"
        class="dealer-logo-image"
        :src="dealerLogoSrc"
        :alt="product.dealer"
        contain
        width="160"
        max-height="32"
      />
      <div v-else>{{ product.dealer }}</div>
    </div>
    <v-card-actions>
      <v-btn
        outlined
        text
        color="blue darken-4"
        :href="product.href"
        target="_blank"
        rel="noopener"
      >Se annonse</v-btn>
      <client-only>
        <ProductShareDialog :product="product" />
      </client-only>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductShareDialog from "~/components/ProductShareDialog";
import { formatPrice, getDealerLogoSrc } from "~/util/products";

export default {
  name: "ProductDetail",
  components: { ProductShareDialog },
  props: { product: { type: Object, required: true } },
  computed: {
    dealerLogoSrc() {
      return this.product ? getDealerLogoSrc(this.product.dealer) : "";
    },
    offerExpired() {
      const now = new Date();
      const expiryDate = new Date(this.product.runTill);
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
</style>
