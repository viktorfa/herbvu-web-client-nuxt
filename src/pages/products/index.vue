<template>
  <div>
    <div class="text-xs-center offer-search-results">
      <ProductListBanner class="bg-amp-purple text-white"
        >Selected products</ProductListBanner
      >
      <div
        v-if="isLoadingPromotedProducts"
        class="text-center absolute mx-auto w-full"
      >
        <AmpSpinner :size="20" :width="3" color="purple" indeterminate />
      </div>
      <PromotedProducts :products="promotedProducts" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PromotedProducts from "../../components/PromotedProducts.vue";
import ProductListBanner from "../../components/ProductListBanner.vue";
import AmpSpinner from "../../components/AmpSpinner.vue";
import { getAllMetaInfo } from "../../util/meta-tags";

export default {
  name: "MainPage",
  components: {
    PromotedProducts,
    ProductListBanner,
    AmpSpinner,
  },
  computed: {
    ...mapState(["promotedProducts", "isLoadingPromotedProducts"]),
  },
  async fetch({ store }) {
    if (process.server) {
      await store.dispatch("LOAD_PROMOTED_PRODUCTS");
    }
  },
  mounted() {
    this.$store.dispatch("UPDATE_PROMOTED_PRODUCTS");
  },
  metaInfo: {
    ...getAllMetaInfo(),
  },
};
</script>
