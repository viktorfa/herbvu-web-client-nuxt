<template>
  <div class="text-center text-3xl">SØK</div>
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
  metaInfo() {
    return getAllMetaInfo({
      title: this.searchQuery ? `Tilbud på "${this.searchQuery}"` : undefined,
    });
  },
};
</script>

<style>
</style>
