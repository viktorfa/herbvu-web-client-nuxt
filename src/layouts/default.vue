<template>
  <v-app>
    <div class="container mx-auto">
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
    </div>
  </v-app>
</template>

<script>
import TopMenuButton from "../components/TopMenuButton";
export default {
  components: {
    SearchBarComponent: () =>
      import(
        /* webpackChunkName: "SearchBarComponent" */ "../components/SearchBarComponent.vue"
      ),
    NavigationDrawer: () =>
      import(
        /* webpackChunkName: "NavigationDrawer" */ "../components/NavigationDrawer.vue"
      ),
    TopMenuButton,
  },
};
</script>

<style>
.search-bar-placeholder {
  height: calc(86px + 0.3rem);
  visibility: hidden;
}
</style>
