<template>
  <div>
    <client-only>
      <SortAndFilterMenu />
    </client-only>
    <div v-show="isLoading === true" class="text-3xl text-center">
      <p>finner tilbud på</p>
      <strong>{{ categoryObject.text }}</strong>
    </div>
    <div
      v-show="searchResults.length === 0 && showSearchResults && !isLoading"
      class="text-3xl text-center"
    >
      <p>Ingen tilbud på</p>
      <strong>{{ categoryObject.text }}</strong>
    </div>
    <div v-show="showSearchResults">
      <SearchResults :results="filteredResults || searchResults" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getAllMetaInfo } from "~/util/meta-tags";
import SearchResults from "~/components/SearchResults.vue";
import SortAndFilterMenu from "~/components/SortAndFilterMenu.vue";
import { categories } from "~/components/CategoryCards/helpers";

export default {
  name: "CategoryPage",
  components: {
    SearchResults,
    SortAndFilterMenu,
  },
  head() {
    return getAllMetaInfo({
      title: this.categoryObject
        ? `Priskrig på ${this.categoryObject.text}`
        : undefined,
      image_url: this.categoryObject.image,
    });
  },
  computed: {
    ...mapState(["isLoading", "searchResults", "filteredResults"]),
    showSearchResults() {
      return !this.isLoading && !!this.searchResults;
    },
    categoryObject() {
      const cat = {
        ...categories.find((x) => x.slug === this.$route.params.category),
      };
      cat.query = cat.query || cat.slug;
      return cat;
    },
  },
  watch: {
    categoryObject(newObject) {
      this.handleNewCategory(newObject);
    },
  },
  created() {
    this.$store.commit("setIsLoading", true);
  },
  mounted() {
    this.handleNewCategory(this.categoryObject);
  },
  methods: {
    handleNewCategory(newCategoryObject) {
      if (newCategoryObject) {
        if (newCategoryObject.category) {
          this.$store.dispatch("LOAD_CATEGORY_PRODUCTS", {
            category: newCategoryObject.category,
          });
        } else if (newCategoryObject.query) {
          this.$store.dispatch("LOAD_CATEGORY_PRODUCTS", {
            queryString: newCategoryObject.query,
          });
        }
      }
    },
  },
};
</script>

<style></style>
