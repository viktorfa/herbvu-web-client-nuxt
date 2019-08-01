<template>
  <ShareDialog :socialLinkData="socialLinkData" :title="product.title" :url="url" />
</template>

<script>
import ShareDialog from "./ShareDialog";
import { getSocialLinkDataForProduct } from "../util/sharing";
import { getAmpShareUrlForProduct } from "../util/helpers";
export default {
  name: "ProductShareDialog",
  components: {
    ShareDialog,
  },
  props: {
    product: { type: Object, required: true },
  },
  data() {
    return {
      socialLinkData: getSocialLinkDataForProduct(this.product),
      url: getAmpShareUrlForProduct(this.product),
    };
  },
};
</script>

<style>
</style>
