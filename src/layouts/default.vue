<template>
  <v-app>
    <div>
      <NavigationDrawer />
      <div class="bg-b1 text-t1">
        <div class="max-w-content mx-auto p-2">
          <div class="flex flex-col md:flex-row">
            <div class="h-12 my-1 text-center">
              <nuxt-link to="/" name="Hjem">
                <img src="/logo-horizontal.svg" class="h-full mx-auto" alt="Logo" />
              </nuxt-link>
            </div>
            <div class="flex fluid my-auto justify-between md:ml-4 w-full">
              <client-only placeholder>
                <template v-slot:placeholder>
                  <div class="search-bar-placeholder"></div>
                </template>
                <SearchBarComponent>
                  <template v-slot:prepend-inner></template>
                </SearchBarComponent>
              </client-only>
              <TopMenuButton />
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-content mx-auto" id="main-content">
        <nuxt />
      </div>
      <Footer />
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
    Footer: () =>
      import(/* webpackChunkName: "Footer" */ "../components/Footer.vue"),
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
