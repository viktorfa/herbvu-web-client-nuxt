<template>
  <div>
    <div v-show="isSearching === true" class="text-3xl text-center">
      <p>søker etter</p>
      <strong>{{ queryString }}</strong>
    </div>
    <div
      v-show="searchResults.length === 0 && showSearchResults && !isSearching"
      class="text-3xl text-center"
    >
      <p>Ingen treff på</p>
      <strong>{{ queryString }}</strong>
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

export default {
  name: "Search",
  components: {
    SearchResults,
  },
  head() {
    return getAllMetaInfo({
      title: this.searchQuery ? `Tilbud på "${this.searchQuery}"` : undefined,
    });
  },
  computed: {
    ...mapState(["searchResults", "isSearching", "searchQuery"]),
    showSearchResults() {
      return !this.isSearching && !!this.searchResults;
    },
    queryString() {
      return this.$route.params.query;
    },
  },
  watch: {
    searchQuery(newValue) {
      if (window.ga && newValue && newValue.length && newValue.length > 0) {
        console.log(`Sending GA search event.`);
        window.ga("gtag_UA_132355293_1.send", "event", {
          eventCategory: "interaction",
          eventAction: "search",
          eventLabel: newValue,
        });
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
    console.log("Search mounted");
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

<style>
</style>
