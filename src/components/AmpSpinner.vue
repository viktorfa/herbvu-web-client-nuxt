<template>
  <div>
    <fa :icon="fa.faSpinner" class="spinner" />
  </div>
</template>

<script>
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
export default {
  computed: {
    fa() {
      return { faSpinner };
    },
  },
};
</script>

<style>
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>