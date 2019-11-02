<template>
  <button v-bind="$attrs" v-on="$listeners" :class="computedClass" :disabled="disabled">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: "AmpButton",
  props: {
    text: String,
    disabled: Boolean,
  },
  computed: {
    computedClass() {
      const baseClass = "uppercase py-2 px-4 rounded";
      let extraClass = "";
      if (this.disabled) {
        extraClass = "bg-b1 text-t1";
      } else {
        extraClass = "bg-b1 text-t1";
      }
      return `${baseClass} ${extraClass}`;
    },
  },
};
</script>

<style></style>
