<template>
  <v-btn icon :aria-label="name" @click.stop="handleClickButton">
    <v-icon>{{icon}}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "TopMenuButton",
  computed: {
    icon() {
      const { path } = this.$route;
      if (path.startsWith("/tilbud/")) {
        return "arrow_back";
      }
      return "menu";
    },
    name() {
      const { path } = this.$route;
      if (path.startsWith("/tilbud/")) {
        return "Tilbake";
      }
      return "Åpne meny";
    },
  },
  methods: {
    handleClickButton() {
      if (this.$route.path.startsWith("/tilbud/")) {
        /** Kinda hacky way to know whether to go back to search or back to home page. */
        if (this.$store.state.searchQuery) {
          this.$router.go(-1);
        } else {
          this.$router.push("/");
        }
      } else {
        this.$store.commit("setShowDrawer", !this.$store.state.showDrawer);
      }
    },
  },
};
</script>

<style>
</style>
