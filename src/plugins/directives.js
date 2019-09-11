import Vue from "vue";

import lazyload from "~/directives/LazyLoadDirective";
import enterViewport from "~/directives/EnterViewportDirective";

Vue.directive("lazyload", lazyload);
Vue.directive("enter-viewport", enterViewport);
