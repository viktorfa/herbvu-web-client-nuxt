<template>
  <div>
    <div v-if="!dialog">
      <AmpButton text="Del" @click="dialog = true" />
    </div>
    <div v-else>
      <div
        class="fixed w-screen h-screen left-0 top-0 z-40"
        @click="dialog = false"
        :style="{background: 'rgba(0, 0, 0, 0.4)'}"
      ></div>
      <div class="fixed z-50 dialog-center-box bg-b1 text-t1 w-full max-w-md rounded">
        <div class="flex flex-col items-center">
          <div class="text-2xl my-2 text-center">{{title}}</div>
          <input
            class="w-full text-center"
            readonly
            type="text"
            :value="url"
            :id="`${_uid}share-url-input`"
          />
          <div class="flex justify-center">
            <AmpButton @click="handleClickCopy" name="Kopier link" aria-label="Kopier link">
              <fa :icon="fa.faCopy" />
            </AmpButton>
            <AmpButton v-for="({ icon, href }, i) in _socialLinkData" :key="i" :href="href">
              <fa :icon="icon" />
            </AmpButton>
          </div>
          <div class="text-uppercase text-gray-600" v-show="showCopySuccessMessage">Kopiert</div>
          <div style="visibility: hidden;" v-show="!showCopySuccessMessage">_</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSocialLinkData } from "~/util/sharing";
import AmpButton from "./AmpButton";

import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";

export default {
  name: "ShareDialog",
  components: {
    AmpButton,
  },
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
    fa() {
      return { faCopy };
    },
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
.dialog-center-box {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
