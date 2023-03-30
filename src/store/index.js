import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import camelCase from "lodash/camelCase";
const requireModule = require.context("./modules/", false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === "./index.js") return;
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ""));
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default,
  };
});

export default new Vuex.Store({
  modules,
});
