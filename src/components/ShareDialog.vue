<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <slot name="activator">
        <v-btn outlined text color="blue darken-4" v-on="on">Del</v-btn>
      </slot>
    </template>
    <v-card class="flex flex-col items-center">
      <div class="text-2xl my-2 text-center">{{title}}</div>
      <input
        class="w-full text-center"
        readonly
        type="text"
        :value="url"
        :id="`${_uid}share-url-input`"
      />
      <v-card-actions class="flex justify-center">
        <v-btn large icon @click="handleClickCopy" name="Kopier link" aria-label="Kopier link">
          <v-icon size="xx-large" color="grey">mdi-content-copy</v-icon>
        </v-btn>
        <v-btn
          large
          icon
          v-for="({ icon, href, color }) in _socialLinkData"
          :key="icon"
          :href="href"
        >
          <v-icon size="xx-large" :color="color">{{icon}}</v-icon>
        </v-btn>
      </v-card-actions>
      <div class="text-uppercase text-gray-600" v-show="showCopySuccessMessage">Kopiert</div>
      <div style="visibility: hidden;" v-show="!showCopySuccessMessage">_</div>
    </v-card>
  </v-dialog>
</template>

<script>
import { getSocialLinkData } from "~/util/sharing";

export default {
  name: "ShareDialog",
  props: {
    title: { type: String, required: true },
    url: { type: String, required: true },
    socialLinkData: { type: Array, default: () => [] },
  },
  data() {
    return {
      dialog: false,
      showCopySuccessMessage: false,
    };
  },
  computed: {
    _socialLinkData() {
      if (this.url) {
        return getSocialLinkData(this.url);
      }
      return this.socialLinkData;
    },
  },
  methods: {
    handleClickCopy() {
      const inputElement = document.getElementById(
        `${this._uid}share-url-input`,
      );

      // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
      inputElement.contentEditable = true;
      inputElement.readOnly = false;
      const range = document.createRange();
      if (window.chrome) {
        range.selectNode(inputElement);
      } else {
        range.selectNodeContents(inputElement);
      }
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      inputElement.setSelectionRange(0, 9999);
      inputElement.contentEditable = false;
      inputElement.readOnly = true;

      const copyResult = document.execCommand("copy");
      inputElement.blur();

      if (copyResult) {
        this.showCopySuccessMessage = true;
        setTimeout(() => {
          this.showCopySuccessMessage = false;
        }, 3000);
      } else {
        console.warn("Could not copy.");
      }
    },
  },
};
</script>

<style>
</style>
