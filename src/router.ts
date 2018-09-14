import Vue from "vue";
import Router from "vue-router";
import Converter from "./views/Converter.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "converter",
      component: Converter,
    },
  ],
});
