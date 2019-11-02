<template>
  <AmpButton icon :aria-label="name" @click.stop="handleClickButton">
    <AmpIcon class="text-t1">{{icon}}</AmpIcon>
  </AmpButton>
</template>

<script>
import AmpButton from "~/components/AmpButton";
import AmpIcon from "~/components/AmpIcon";
export default {
  name: "TopMenuButton",
  components: { AmpButton, AmpIcon },
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
