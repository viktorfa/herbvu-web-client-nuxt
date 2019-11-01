<template>
  <div>
    <div>
      <v-btn icon :aria-label="name" @click.stop="handleClickButton">
        <v-icon class="text-t1">{{icon}}</v-icon>
      </v-btn>
    </div>
    <div v-show="showMenu" class="w-full fixed left-0 top-0 bg-b1 h-screen z-10">
      <div class="max-w-sm mx-auto py-2">
        <div class="fixed right-0 h-12 flex align-center">
          <button
            class="p-2 text-2xl md:text-3xl"
            @click="handleClickButton"
            aria-label="Lukk meny"
          >LUKK</button>
        </div>
        <div class="flex flex-col align-center">
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
export default {
  name: "FullScreenMenu",
  computed: {
    showMenu() {
      return this.$route.hash.includes("menu=1");
    },
    icon() {
      const { path } = this.$route;
      return "menu";
    },
    name() {
      const { path } = this.$route;
      return "Åpne meny";
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