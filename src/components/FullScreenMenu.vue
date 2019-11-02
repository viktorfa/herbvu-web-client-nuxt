<template>
  <div>
    <div>
      <AmpButton icon aria-label="Åpne meny" @click.stop="handleClickButton">
        <fa :icon="fa.faBars" />
      </AmpButton>
    </div>
    <div v-show="showMenu" class="w-full fixed left-0 top-0 bg-b1 h-screen z-10">
      <div class="max-w-sm mx-auto py-2">
        <div class="fixed right-0 h-12 flex items-center">
          <AmpButton
            class="p-2 text-2xl md:text-3xl"
            @click="handleClickButton"
            aria-label="Lukk meny"
          >
            <fa :icon="fa.faTimes" />
          </AmpButton>
        </div>
        <div class="flex flex-col items-center">
          <div>
            <nuxt-link to="/" title="Hjem">
              <img src="/logo-horizontal.svg" class="h-12 mx-auto" alt="Logo" />
            </nuxt-link>
          </div>
          <div class="text-center text-2xl leading-loose">
            <div>
              <a
                href="https://crowdsource.allematpriser.no"
                target="_blank"
                rel="noopener noreferrer"
              >Legg til tilbud</a>
            </div>
            <div class="text-gray-800">
              <span>Innstillinger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AmpButton from "~/components/AmpButton";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

export default {
  name: "FullScreenMenu",
  components: { AmpButton },
  computed: {
    fa() {
      return { faBars, faTimes };
    },
    showMenu() {
      return this.$route.hash.includes("menu=1");
    },
  },
  methods: {
    handleClickButton() {
      if (this.showMenu) {
        this.$router.replace({ hash: "" });
      } else {
        this.$router.replace({ hash: "menu=1" });
      }
    },
  },
};
</script>

<style>
</style>