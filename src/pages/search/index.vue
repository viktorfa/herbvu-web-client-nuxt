<template>
  <div class="text-center text-3xl">SØK</div>
</template>

<script>
import { getAllMetaInfo } from "~/util/meta-tags";

export default {
  name: "Search",
  head() {
    return getAllMetaInfo();
  },
};
</script>

<style>
</style>
