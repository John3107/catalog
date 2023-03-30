import { $http } from "@/utils/https";
import { uuid } from "vue-uuid";

import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_FILTERED_PRODUCTS,
  GET_PRODUCT,
} from "../action-types";
import {
  SET_PRODUCTS,
  SET_CURRENT_PRODUCT,
  SET_CATEGORIES,
  SET_LOADER,
} from "../mutation-types";

const state = {
  productsList: [],
  product: localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [],
  filterParams: [],
  filterSettings: [],
  catalogLoader: false,
  //DATA FOR FAKE BACKEND
  filterChangedParams: [],
};

const getters = {
  products: (state) => state.productsList,
  currentProduct: (state) => state.product,
  filters: (state) => state.filterParams,
  configured: (state) => state.filterSettings,
  globalLoader: (state) => state.catalogLoader,
};

const actions = {
  [GET_PRODUCTS]: async ({ commit }) => {
    commit(SET_LOADER, true);
    try {
      const response = await $http.get(`products/`);
      commit(SET_PRODUCTS, response.data);
    } catch (e) {
      throw e;
    } finally {
      commit(SET_LOADER, false);
    }
  },
  [GET_PRODUCT]: async ({ commit }, payload) => {
    commit(SET_LOADER, true);
    try {
      const response = await $http.get(`products/${payload}`);
      commit(SET_CURRENT_PRODUCT, response.data);
    } catch (e) {
      throw e;
    } finally {
      commit(SET_LOADER, false);
    }
  },
  [GET_CATEGORIES]: async ({ commit }) => {
    commit(SET_LOADER, true);
    try {
      const response = await $http.get(`products/categories`);
      commit(SET_CATEGORIES, response.data);
    } catch (e) {
      throw e;
    } finally {
      commit(SET_LOADER, false);
    }
  },
  [GET_FILTERED_PRODUCTS]: async ({ commit }, payload) => {
    commit(SET_LOADER, true);

    //FAKE BACKEND
    if (Array.isArray(payload)) {
      state.filterChangedParams = payload;
    } else {
      const searchChangedParams = state.filterChangedParams.find(
        (el) => el.type === payload.type
      );
      if (!searchChangedParams) {
        state.filterChangedParams.push(payload);
      } else {
        switch (payload.type) {
          case "categories": {
            if (!payload.data.length) {
              state.filterChangedParams = state.filterChangedParams.filter(
                (el) => el.type !== "categories"
              );
            }
            break;
          }
        }
      }
      state.filterChangedParams = state.filterChangedParams.map((el) =>
        el.type === payload.type ? { ...el, data: payload.data } : el
      );
    }

    try {
      const response = await $http.get(`products/`);

      let filteredData = state.filterChangedParams.length ? [] : response.data;
      state.filterChangedParams.forEach((el) => {
        switch (el.type) {
          case "categories": {
            if (filteredData.length) {
              filteredData = filteredData.filter((item) =>
                el.data.includes(item.category)
              );
            } else {
              filteredData = response.data.filter((item) =>
                el.data.includes(item.category)
              );
            }
            break;
          }
          case "rating": {
            if (filteredData.length) {
              filteredData = filteredData.filter(
                (item) => +[...el.data][0] <= item.rating.rate
              );
            } else {
              filteredData = response.data.filter(
                (item) => +[...el.data][0] <= item.rating.rate
              );
            }
            break;
          }
          case "price": {
            if (filteredData.length) {
              filteredData = filteredData.filter(
                (item) => el.data.min <= item.price && el.data.max >= item.price
              );
            } else {
              filteredData = response.data.filter(
                (item) => el.data.min <= item.price && el.data.max >= item.price
              );
            }
            break;
          }
        }
      });

      commit(SET_PRODUCTS, filteredData);
    } catch (e) {
      throw e;
    } finally {
      commit(SET_LOADER, false);
    }
  },
};

const mutations = {
  [SET_PRODUCTS](state, data) {
    state.productsList = data;
  },
  [SET_CURRENT_PRODUCT](state, data) {
    localStorage.setItem("product", JSON.stringify(data));
    state.product = data;
  },
  [SET_LOADER](state, data) {
    state.catalogLoader = data;
  },
  [SET_CATEGORIES](state, data) {
    //FAKE FILTER PARAMS FROM BACKEND
    const allPrices = state.productsList.map((el) => el.price);
    state.filterParams = [
      {
        name: "Price",
        type: "range",
        data: { min: Math.min(...allPrices), max: Math.max(...allPrices) },
        id: uuid.v1(),
      },
      { name: "Category", type: "checkbox", data, id: uuid.v1() },
      {
        name: "Rating",
        type: "radio",
        data: ["0+", "1+", "2+", "3+", "4+"],
        id: uuid.v1(),
      },
    ];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
