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
  head() {
    return getAllMetaInfo();
  },
};
</script>

<style>
</style>
