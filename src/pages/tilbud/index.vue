<template>
  <div>
    <div class="text-xs-center offer-search-results">
      <ProductListBanner class="bg-amp-purple text-white">Utvalgte tilbud</ProductListBanner>
      <ProductListLoading v-if="isLoadingPromotedProducts" />
      <PromotedProducts v-else :products="promotedProducts" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PromotedProducts from "~/components/PromotedProducts.vue";
import ProductListLoading from "~/components/ProductListLoading.vue";
import ProductListBanner from "~/components/ProductListBanner.vue";
import { getAllMetaInfo } from "~/util/meta-tags";

export default {
  name: "MainPage",
  components: {
    PromotedProducts,
    ProductListLoading,
    ProductListBanner,
  },
  metaInfo: {
    ...getAllMetaInfo(),
  },
  computed: {
    ...mapState(["promotedProducts", "isLoadingPromotedProducts"]),
  },
};
</script>
