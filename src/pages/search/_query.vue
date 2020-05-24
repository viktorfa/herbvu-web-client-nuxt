<template>
  <div>
    <client-only>
      <SortAndFilterMenu />
    </client-only>
    <div v-show="isSearching === true" class="text-3xl text-center">
      <p>searching for</p>
      <strong>{{ queryString }}</strong>
    </div>
    <div
      v-show="searchResults.length === 0 && showSearchResults && !isSearching"
      class="text-3xl text-center"
    >
      <p>No hits on</p>
      <strong>{{ queryString }}</strong>
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

export default {
  name: "Search",
  components: {
    SearchResults,
    SortAndFilterMenu,
  },
  head() {
    return getAllMetaInfo({
      title: this.searchQuery
        ? `Products for "${this.searchQuery}"`
        : undefined,
    });
  },
  computed: {
    ...mapState([
      "searchResults",
      "filteredResults",
      "isSearching",
      "searchQuery",
    ]),
    showSearchResults() {
      return !this.isSearching && !!this.searchResults;
    },
    queryString() {
      return this.$route.params.query;
    },
  },
  watch: {
    searchQuery(newValue) {
      if (this.$ga && newValue && newValue.length && newValue.length > 0) {
        this.$ga.event({
          eventCategory: "interaction",
          eventAction: "search",
          eventLabel: newValue,
        });
        this.$ga.page(`/search/?s=${newValue}`);
      }
    },
    queryString(newQuery) {
      this.handleNewQuery(newQuery);
    },
  },
  created() {
    this.$store.commit("setIsSearching", true);
  },
  mounted() {
    this.$store.commit("setIsSearching", false);
    this.handleNewQuery(this.queryString);
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

<style></style>
