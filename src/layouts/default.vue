<template>
  <v-app class="v-application">
    <v-content class="container mx-auto">
      <NavigationDrawer />
      <no-ssr placeholder>
        <template v-slot:placeholder>
          <div class="search-bar-placeholder"></div>
        </template>
        <SearchBarComponent>
          <template v-slot:prepend-inner>
            <TopMenuButton />
          </template>
        </SearchBarComponent>
      </no-ssr>
      <div class="mx-1 sm:mx-0">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import SearchBarComponent from "../components/SearchBarComponent";
import TopMenuButton from "../components/TopMenuButton";
import NavigationDrawer from "../components/NavigationDrawer";
export default {
  components: {
    SearchBarComponent,
    TopMenuButton,
    NavigationDrawer,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>

<style>
.search-bar-placeholder {
  height: calc(86px + 0.3rem);
  visibility: hidden;
}
</style>
