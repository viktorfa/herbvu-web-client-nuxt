<template>
  <div class="result-list-item flex flex-col text-center">
    <router-link :to="`/tilbud/${id}`" class="search-result-link flex flex-col justify-between">
      <div>
        <div v-lazyload v-if="showDealerLogo && dealerLogoSrc">
          <img class="dealer-logo-image" :data-url="dealerLogoSrc" :alt="dealer" />
        </div>
        <div v-else-if="showDealerLogo" class="font-semibold">{{dealer}}</div>
        <div class="text-lg font-semibold result-list-item-heading">{{ title }}</div>
        <div v-if="showSubtitle" class="result-list-item-subtitle">{{ truncatedSubtitle }}</div>
      </div>
      <div>
        <div v-lazyload>
          <img class="result-list-item-image" :data-url="image_url" :alt="title" />
        </div>
        <div v-if="formattedPrice" class="result-list-item-price my-0">
          <strong>{{ formattedPrice }}</strong>
        </div>
        <div v-if="value">{{ value }}</div>
        <div v-else :style="{visibility: 'hidden'}">_</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { formatPrice } from "../util/lib";
import { getDealerLogoSrc } from "../util/helpers";
export default {
  name: "ProductListItem",
  props: {
    price: { type: [Number, String], required: true },
    title: { type: String, required: true },
    subtitle: String,
    image_url: String,
    href: String,
    value: String,
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
      const maxLength = 56;
      if (
        this.showSubtitle &&
        this.subtitle &&
        this.subtitle.length > maxLength
      ) {
        return `${this.subtitle.substring(0, maxLength - 3)}...`;
      }
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

<style>
.dealer-logo-image {
  margin: auto;
  max-height: 32px;
  max-width: 160px;
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

.search-result-link {
  color: inherit !important;
  text-decoration: none;
}
.result-list-item-subtitle {
  white-space: pre;
  overflow: hidden;
}
</style>
