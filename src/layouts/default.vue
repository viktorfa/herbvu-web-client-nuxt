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
import SearchBarComponent from "../components/SearchBarComponent";
import TopMenuButton from "../components/TopMenuButton";
import NavigationDrawer from "../components/NavigationDrawer";
export default {
  components: {
    SearchBarComponent,
    TopMenuButton,
    NavigationDrawer,
  },
};
</script>

<style>
.search-bar-placeholder {
  height: calc(86px + 0.3rem);
  visibility: hidden;
}
</style>
