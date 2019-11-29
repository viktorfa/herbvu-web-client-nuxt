<template>
  <div>
    <div v-show="isSearching === true" class="text-3xl text-center">
      <p>finner tilbud på</p>
      <strong>{{ categoryObject.query }}</strong>
    </div>
    <div
      v-show="searchResults.length === 0 && showSearchResults && !isSearching"
      class="text-3xl text-center"
    >
      <p>Ingen tilbud på</p>
      <strong>{{ categoryObject.query }}</strong>
    </div>
    <div v-show="showSearchResults">
      <SearchResults :results="searchResults" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getAllMetaInfo } from "~/util/meta-tags";
import SearchResults from "~/components/SearchResults.vue";
import { categories } from "~/components/CategoryCards/helpers";

export default {
  name: "CategoryPage",
  components: {
    SearchResults,
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
    ...mapState(["searchResults", "isSearching", "searchQuery"]),
    showSearchResults() {
      return !this.isSearching && !!this.searchResults;
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
      this.handleNewQuery(newObject.query);
    },
  },
  created() {
    this.$store.commit("setIsSearching", true);
  },
  mounted() {
    this.$store.commit("setIsSearching", false);
    this.handleNewQuery(this.categoryObject.query);
  },
  methods: {
    handleNewQuery(newQuery) {
      if (
        newQuery &&
        newQuery.length &&
        newQuery.length > 0 &&
        newQuery !== this.searchQuery
      ) {
        this.$store.dispatch("EXECUTE_SEARCH_QUERY", {
          queryString: newQuery,
        });
      }
    },
  },
};
</script>

<style>
</style>
