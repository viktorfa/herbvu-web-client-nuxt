<template>
  <div class="result-list-item flex flex-col text-center">
    <nuxt-link
      :to="`/tilbud/${encodeURIComponent(id)}`"
      class="search-result-link flex flex-col justify-between"
    >
      <div>
        <div v-lazyload v-if="showDealerLogo && dealerLogoSrc">
          <img
            class="dealer-logo-image mx-auto"
            :data-url="dealerLogoSrc"
            :alt="dealer"
          />
        </div>
        <div v-else-if="showDealerLogo" class="font-semibold">{{ dealer }}</div>
        <div
          v-if="showSubtitle"
          class="text-lg font-semibold result-list-item-heading clamp-2 leading-tight h-12 my-1"
        >
          {{ title }}
        </div>
        <div
          v-else
          style="height: 67.5px;"
          class="text-lg font-semibold result-list-item-heading clamp-3 leading-tight my-1"
        >
          {{ title }}
        </div>
        <div
          v-if="showSubtitle"
          class="result-list-item-subtitle clamp-2 leading-tight h-10"
        >
          <span v-if="truncatedSubtitle">
            {{ truncatedSubtitle }}
          </span>
        </div>
      </div>
      <div>
        <div v-lazyload>
          <img
            onerror="this.classList.add('not-loaded-product'); this.src='/icon.png';"
            class="result-list-item-image"
            :data-url="image_url"
            :alt="title"
          />
        </div>
        <div v-if="formattedPrice" class="result-list-item-price my-0">
          <strong>{{ formattedPrice }}</strong>
        </div>
        <div class="text-gray-800" v-if="value">{{ value }}</div>
        <div v-else class="invisible">_</div>
        <div class="text-gray-800" v-if="size">{{ size }}</div>
        <div v-else class="invisible">_</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { formatPrice } from "~/util/products/conversion";
import { getDealerLogoSrc } from "~/util/products";
export default {
  name: "ProductListItem",
  props: {
    price: { type: [Number, String], required: true },
    prePrice: { type: [Number, String] },
    title: { type: String, required: true },
    subtitle: String,
    image_url: String,
    href: String,
    value: String,
    size: String,
    id: { type: String, required: true },
    dealer: String,
    description: String,
    showDealerLogo: { type: Boolean, default: true },
    showSubtitle: { type: Boolean, default: true },
  },
  computed: {
    dealerLogoSrc() {
      if (this.showDealerLogo) {
        return getDealerLogoSrc(this.dealer);
      }
      return "";
    },
    truncatedSubtitle() {
      return this.subtitle;
    },
  },
  data: function() {
    return {
      formattedPrice: formatPrice(this.price),
    };
  },
};
</script>

<style scoped>
.dealer-logo-image {
  max-height: 32px;
  max-width: 140px;
}
.result-list-item {
  width: calc(50% - 0.6rem);
  margin: 0.5rem 0.3rem;
  border-width: 0;
  border-style: solid;
  border-bottom-width: 2px;
  height: 390px;
  display: flex;
  flex-grow: initial;
}
.result-list-item-image {
  height: 180px;
  margin-right: auto;
  margin-left: auto;
  object-fit: contain;
}

@media only screen and (min-width: 481px) {
  .result-list-item {
    width: 200px;
    margin: 0.5rem;
  }
}
</style>
