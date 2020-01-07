<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-1/2 h-64 shadow p-2" v-for="cat in categories" :key="cat.slug">
        <nuxt-link :to="`/${cat.slug}`">
          <div
            class="h-full w-full flex items-end justify-center md:items-center hover:font-bold center-bg-image"
            :style="`background-image: url(${cat.image})`"
          >
            <h3
              role="button"
              class="border-2 rounded border-red-800 text-2xl bg-white px-2"
            >{{cat.text}}</h3>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from "./helpers";
export default {
  name: "CategoryCards",
  data() {
    return {
      categories,
    };
  },
};
</script>

<style>
</style>