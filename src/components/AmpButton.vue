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
      const baseClass = "ripple uppercase font-semibold py-2 px-4 rounded";
      let extraClass = "";
      if (this.disabled) {
        extraClass = "bg-primary-200 text-primary-text-200";
      } else {
        extraClass = "bg-primary text-primary-text";
      }
      return `${baseClass} ${extraClass}`;
    },
  },
};
</script>

<style></style>
