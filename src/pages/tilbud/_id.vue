<template>
  <div>
    <div v-show="isLoadingDetailProduct" class="flex align-center justify-center">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate />
    </div>
    <div
      v-show="!isLoadingDetailProduct && detailProductNotFound"
      class="flex flex-col align-center justify-center text-xl"
    >
      <p>Fant ikke tilbud. Mulig varen ikke finnes lenger.</p>
      <div>
        <nuxt-link to="/" replace>Tilbake</nuxt-link>
      </div>
    </div>
    <div v-show="!isLoadingDetailProduct" v-if="product" class="text-xs-center">
      <div class="flex justify-center">
        <div class="w-full max-w-4xl">
          <ProductDetail :product="product" />
        </div>
      </div>
      <h2
        v-show="_similarProducts.length > 0"
        class="text-2xl m-4 text-center"
      >Lignende varer</h2>
      <div>
        <div v-show="isLoadingSimilarProducts" class="flex align-center justify-center mt-4">
          <v-progress-circular :size="40" :width="7" color="purple" indeterminate />
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
import ProductDetail from "~/components/ProductDetail";
import { getStandardProduct } from "~/util/products/convert";
import { getAllMetaInfoForProduct, getAllMetaInfo } from "~/util/meta-tags";

export default {
  name: "OfferDetail",
  components: {
    ProductList,
    ProductDetail,
  },
  head() {
    if (this.product) {
      const metaInfo = getAllMetaInfoForProduct(this.product);
      return { ...metaInfo, titleTemplate: "%s - allematpriser.no" };
    } else {
      return getAllMetaInfo();
    }
  },
  data() {
    return { staticDetailProduct: null };
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
    product() {
      if (this.detailProduct) {
        return getStandardProduct(this.detailProduct);
      } else if (this.staticDetailProduct) {
        return getStandardProduct(this.staticDetailProduct);
      }
      return null;
    },
    offerId() {
      return this.$route.params.id;
    },
  },
  watch: {
    product() {
      this.$store.dispatch("LOAD_SIMILAR_PRODUCTS", {
        product: this.detailProduct,
      });
    },
  },
  async asyncData({ store, params, payload }) {
    // We don't use await on client, as that makes the page transition faster.
    // On SSR, we need the product to be fetched for SEO.
    if (process.client) {
      store.dispatch("LOAD_DETAIL_PRODUCT", {
        id: params.id,
      });
    } else if (payload) {
      return {
        staticDetailProduct: payload,
      };
    } else {
      await store.dispatch("LOAD_DETAIL_PRODUCT", {
        id: params.id,
      });
    }
  },
  mounted() {
    if (this.detailProduct || this.staticDetailProduct) {
      this.$store.dispatch("LOAD_SIMILAR_PRODUCTS", {
        product: this.detailProduct || this.staticDetailProduct,
      });
    }
  },
  methods: {
    handleClickMenu() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
