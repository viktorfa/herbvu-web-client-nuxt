<template>
  <div>
    <div class="bg-b1 text-t1">
      <div class="max-w-content mx-auto p-1">
        <div class="h-12 my-1 flex items-center absolute right-0 md:float-right md:static">
          <FullScreenMenu />
        </div>
        <div class="flex flex-col md:flex-row items-center">
          <div class="h-12 my-1 text-center">
            <nuxt-link to="/" name="Hjem">
              <img src="/logo-horizontal.svg" class="h-full mx-auto" alt="Logo" />
            </nuxt-link>
          </div>
          <div class="flex my-auto justify-between md:ml-4 w-full">
            <client-only placeholder>
              <template v-slot:placeholder>
                <div class="search-bar-placeholder"></div>
              </template>
              <SearchBarComponent />
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-content mx-auto" id="main-content">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import FullScreenMenu from "../components/FullScreenMenu";
export default {
  components: {
    SearchBarComponent: () =>
      import(
        /* webpackChunkName: "SearchBarComponent" */ "../components/SearchBarComponent.vue"
      ),
    Footer: () =>
      import(/* webpackChunkName: "Footer" */ "../components/Footer.vue"),
    FullScreenMenu,
  },
};
</script>

<style>
.search-bar-placeholder {
  height: calc(86px + 0.3rem);
  visibility: hidden;
}
</style>
