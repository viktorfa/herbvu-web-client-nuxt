import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";

import SearchBarComponent from "../SearchBarComponent.vue";

describe("SearchBarComponent", () => {
  let localVue;
  let vuetify;
  let store;
  let actions;
  let state;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    localVue.use(Vuetify);
    state = {};
    actions = {};
    vuetify = new Vuetify();
    store = new Vuex.Store({ actions, state });
    router = new VueRouter();
  });
  it("should render", () => {
    const mountedComponent = shallowMount(SearchBarComponent, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(mountedComponent).toBeTruthy();
  });
});
