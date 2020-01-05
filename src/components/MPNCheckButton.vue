<template>
  <button
    v-if="checked"
    class="bg-orange-200 hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-1 px-4 border border-solid border-orange-500 hover:border-transparent rounded"
  >{{text}}</button>
  <button
    v-else
    class="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-1 px-4 border border-solid border-orange-500 hover:border-transparent rounded"
  >{{text}}</button>
</template>

<script>
export default {
  name: "MPNCheckButton",
  props: {
    text: { type: String, required: true },
    checked: { type: Boolean, required: true },
  },
};
</script>

<style>
button:focus {
  border: 1px solid;
}
button:focus,
button::-moz-focus-inner {
  outline: none;
}
</style>
