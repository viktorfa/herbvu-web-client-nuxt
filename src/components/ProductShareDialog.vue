<template>
  <ShareDialog :social-link-data="socialLinkData" :title="product.title" :url="url" />
</template>

<script>
import { getSocialLinkDataForProduct } from "../util/sharing";
import { getAmpShareUrlForProduct } from "../util/helpers";
import ShareDialog from "./ShareDialog";
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
