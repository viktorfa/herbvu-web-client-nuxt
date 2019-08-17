<template>
  <v-navigation-drawer v-model="showDrawer" fixed clipped app>
    <div class="flex flex-col justify-between h-full">
      <v-list dense>
        <v-list-item>
          <router-link to="/" class="w-full flex" title="Hjem">
            <v-list-item-avatar>
              <img src="/logo-256x256.png" alt="logo" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span class="text-lg">allematpriser.no</span>
              </v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">Instillinger</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="https://crowdsource.allematpriser.no">
          <v-list-item-action>
            <v-icon>add</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text text--darken-4">Legg til tilbud</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="text-center">
        <p>{{commitSha.substring(0, 8)}}</p>
        <p>© {{now.getUTCFullYear()}} allematpriser.no</p>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { commitSha } from "~/config/vars";

export default {
  name: "NavigationDrawer",
  data() {
    return {
      now: new Date(),
      commitSha,
    };
  },
  computed: {
    showDrawer: {
      get() {
        return this.$store.state.showDrawer;
      },
      set(newValue) {
        return this.$store.commit("setShowDrawer", newValue);
      },
    },
  },
};
</script>

<style>
</style>
