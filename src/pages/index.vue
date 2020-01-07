<template>
  <div>
    <div class="text-xs-center offer-search-results">
      <CategoryCards />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CategoryCards from "../components/CategoryCards";
import { getAllMetaInfo } from "../util/meta-tags";

export default {
  name: "MainPage",
  components: {
    CategoryCards,
  },
  metaInfo: {
    ...getAllMetaInfo(),
  },
};
</script>
