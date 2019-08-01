<template>
  <v-card text>
    <h1 class="text-3xl text-center w-full">{{product.title}}</h1>
    <v-img :src="product.image_url" aspect-ratio="2.4" contain :alt="product.title"></v-img>
    <p v-if="offerExpired" class="text-red-500 text-lg">Dette tilbudet er dessverre utgått.</p>
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
      <v-btn outlined text color="orange" :href="product.href" target="_blank">Se annonse</v-btn>
      <no-ssr>
        <ProductShareDialog :product="product" />
      </no-ssr>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductShareDialog from "~/components/ProductShareDialog";
import { formatPrice } from "~/util/lib";
import { getDealerLogoSrc } from "~/util/helpers";

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
