<template>
  <div class="max-w-md text-xl w-full">
    <form @change.stop.prevent @submit.stop.prevent="submitSearchForm">
      <div class="flex items-center">
        <input
          ref="searchInputElement"
          type="search"
          v-model="typeInput"
          class="bg-white w-full rounded px-2 py-1"
          placeholder="Søk i 3 nettbutikker og alle tilbud"
          @blur="handleSearchInputBlur"
          @focus="showAutocomplete = true"
          :autofocus="false"
          aria-label="Søk"
        />
        <div
          class="flex justify-center items-center"
          style="width: 32px; margin-left: -32px;"
          aria-label="Tilbakestill søketekst"
          @click="clearTypeInput"
          v-show="!!typeInput"
        >
          <fa :icon="fa.faTimes" class="text-gray-700" />
        </div>
      </div>
      <div
        role="listbox"
        name="search-hint"
        class="search-hint bg-white rounded px-2 shadow absolute z-10"
        v-show="showAutocomplete"
      >
        <div
          @click="() => selectAutocomplete(x)"
          :key="x"
          :value="x"
          v-for="x in [...autocomplete.slice(0, 10)]"
          class="hover:text-blue-400 my-1"
        >{{x}}</div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getHints, initalize } from "~/util/search/autocomplete";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

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
      typeInput: "",
      showAutocomplete: false,
    };
  },
  computed: {
    ...mapState(["isSearching", "showDrawer", "searchResults"]),
    fa() {
      return { faTimes };
    },
    autocomplete() {
      return getHints(this.typeInput);
    },
  },
  methods: {
    handleSearchInputBlur() {
      // For some reason, the selectAutocomplete event does not happen unless there is a timeout.
      // Something to do with the blur and showing of the autocomplete list...
      setTimeout(() => {
        this.showAutocomplete = false;
      }, 50);
    },
    submitSearchForm() {
      this.queryInput = this.typeInput;
    },
    selectAutocomplete(text) {
      this.queryInput = text;
    },
    clearTypeInput() {
      this.typeInput = "";
      this.$refs.searchInputElement.blur();
    },
  },
  watch: {
    /** Focus input if search result is empty. Little bit complicated, as searchResult will update several times for a query. One of which might be empty. */
    searchResults(newValue) {
      return;
      /*
      if (newValue.length === 0) {
        this.$refs.searchInputElement.focus();
      }
      */
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
        this.typeInput = newValue;
        this.$refs.searchInputElement.blur();
      });
    },
    /**
     * Kinda hacky way to not focus search bar when clicking the buttons on the search bar.
     * But cannot find a cleaner way that works.
     */
    $route() {
      this.$nextTick(() => {
        this.$refs.searchInputElement.blur();
      });
    },
    /** Dropdown in search box should go away when opening side menu. */
    showDrawer(newValue) {
      if (newValue === true) {
        this.$refs.searchInputElement.blur();
      }
    },
  },
  mounted() {
    initalize();
  },
};
</script>

<style>
.search-hint {
  width: calc(100vw - 0.5rem);
}
@media screen and (min-width: 768px) {
  .search-hint {
    width: 28rem;
  }
}
</style>