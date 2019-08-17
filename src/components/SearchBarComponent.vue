<template>
  <v-combobox
    ref="searchInput"
    v-model="queryInput"
    :search-input.sync="searchInput"
    label="Søk i 3 nettbutikker og alle tilbud"
    type="search"
    solo
    clearable
    :loading="isSearching === true"
    class="search-input"
    :items="autocomplete"
    :menu-props="{
        closeOnClick: false,
        closeOnContentClick: false,
        openOnClick: false,
      }"
  >
    <template v-slot:prepend-inner>
      <slot name="prepend-inner"></slot>
    </template>
  </v-combobox>
</template>

<script>
import { mapState } from "vuex";

import { getHints } from "~/util/search/autocomplete";

export default {
  name: "SearchBarComponent",
  data() {
    return {
      /**
       * The actual selected query term that should execute a search query on change.
       * Should be global through router.
       */
      queryInput: this.$route.params.query || this.$store.state.searchQuery,
      /** The input to the combobox that should only determine hints for autocomplete. Should be local state. */
      searchInput: "",
    };
  },
  computed: {
    ...mapState(["isSearching", "showDrawer", "searchResults"]),
    autocomplete() {
      return getHints(this.searchInput);
    },
  },
  watch: {
    /** Focus input if search result is empty. */
    searchResults(newValue) {
      if (newValue.length === 0) {
        this.$refs.searchInput.focus();
      }
    },
    /** Communicates the current query with the router. */
    queryInput(newValue) {
      if (newValue && newValue.length > 0) {
        if (this.$route.path.startsWith("/sok/")) {
          this.$router.replace(`/sok/${newValue}`);
        } else {
          this.$router.push(`/sok/${newValue}`);
        }
      }
      this.$nextTick(() => {
        this.$refs.searchInput.blur();
      });
    },
    /**
     * Kinda hacky way to not focus search bar when clicking the buttons on the search bar.
     * But cannot find a cleaner way that works.
     */
    $route() {
      this.$nextTick(() => {
        this.$refs.searchInput.blur();
      });
    },
    /** Dropdown in search box should go away when opening side menu. */
    showDrawer(newValue) {
      if (newValue === true) {
        this.$refs.searchInput.blur();
      }
    },
  },
};
</script>

<style>
.v-autocomplete__content {
  top: 56px !important; /* Autocomplete for type-ahead covers all screen on mobile so we push it down */
}
</style>
