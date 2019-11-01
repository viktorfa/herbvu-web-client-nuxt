<template>
  <v-btn icon :aria-label="name" @click.stop="handleClickButton">
    <v-icon class="text-t1">{{icon}}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "TopMenuButton",
  computed: {
    icon() {
      const { path } = this.$route;
      return "menu";
    },
    name() {
      const { path } = this.$route;
      return "Åpne meny";
    },
  },
  methods: {
    handleClickButton() {
      this.$store.commit("setShowDrawer", !this.$store.state.showDrawer);
    },
  },
};
</script>

<style>
</style>
