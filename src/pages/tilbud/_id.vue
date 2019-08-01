<template>
  <div>
    <div v-show="isLoadingDetailProduct" class="flex align-center justify-center">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    </div>
    <div
      v-show="!isLoadingDetailProduct && detailProductNotFound"
      class="flex flex-col align-center justify-center text-xl"
    >
      <p>Fant ikke tilbud. Mulig varen ikke finnes lenger.</p>
      <p>
        <router-link to="/" replace>Tilbake</router-link>
      </p>
    </div>
    <div class="text-xs-center" v-show="!isLoadingDetailProduct" v-if="product">
      <div class="flex justify-center">
        <v-card text class="w-full max-w-4xl">
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
            <v-btn outlined text color="orange" :href="product.href" target="_blank">Se annonse</v-btn>
            <no-ssr>
              <ProductShareDialog :product="product" />
            </no-ssr>
          </v-card-actions>
        </v-card>
      </div>
      <h2
        v-show="_similarProducts.length > 0"
        class="text-2xl m-4 w-full text-center"
      >Lignende varer</h2>
      <div>
        <div v-show="isLoadingSimilarProducts" class="flex align-center justify-center mt-4">
          <v-progress-circular :size="40" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <ProductList
          v-show="!isLoadingSimilarProducts && _similarProducts"
          :products="_similarProducts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ProductList from "~/components/ProductList";
import ProductShareDialog from "~/components/ProductShareDialog";
import { getStandardProduct, formatPrice } from "~/util/lib";
import { getDealerLogoSrc } from "~/util/helpers";
import { getAllMetaInfoForProduct } from "~/util/meta-tags";

export default {
  name: "OfferDetail",
  components: {
    ProductList,
    ProductShareDialog,
  },
  metaInfo() {
    if (this.product) {
      const metaInfo = getAllMetaInfoForProduct(this.product);
      return { ...metaInfo, titleTemplate: "%s - allematpriser.no" };
    }
  },
  computed: {
    ...mapState([
      "detailProduct",
      "similarProducts",
      "isLoadingSimilarProducts",
      "isLoadingDetailProduct",
      "detailProductNotFound",
    ]),
    _similarProducts() {
      return this.similarProducts
        .filter((offer) => offer.uri !== this.offerId)
        .map(getStandardProduct);
    },
    dealerLogoSrc() {
      return this.product ? getDealerLogoSrc(this.product.dealer) : "";
    },
    product() {
      if (this.detailProduct) {
        return getStandardProduct(this.detailProduct);
      }
      return null;
    },
    offerId() {
      return this.$route.params.id;
    },
    offerExpired() {
      const now = new Date();
      const expiryDate = new Date(this.detailProduct.run_till);
      if (expiryDate < now) {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleClickMenu: function() {
      this.$router.go(-1);
    },
    formatPrice,
  },
  watch: {
    product() {
      this.$store.dispatch("LOAD_SIMILAR_PRODUCTS", {
        product: this.detailProduct,
      });
    },
  },
  async fetch({ store, params, payload }) {
    // We don't use await on client, as that makes the page transition faster.
    // On SSR, we need the product to be fetched for SEO.
    if (process.client) {
      console.log("is client");
      console.log("params");
      console.log(params);
      store.dispatch("LOAD_DETAIL_PRODUCT", {
        id: params.id,
      });
    } else {
      if (payload) {
        store.commit("setDetailProduct", payload);
      } else {
        await store.dispatch("LOAD_DETAIL_PRODUCT", {
          id: params.id,
        });
      }
    }
  },
};
</script>

<style></style>
