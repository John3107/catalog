import { mapActions, mapGetters, mapMutations } from "vuex";
import filters from "@/modules/catalog/components/filters/index.vue";
import card from "@/modules/catalog/components/card/index.vue";
import linearActivity from "@/components/linear-activity/index.vue";

export default {
  name: "catalog",
  components: {
    filters,
    card,
    linearActivity,
  },
  mounted() {
    if (!this.$route.query?.min) {
      this.fetchProducts().then(() => {
        this.fetchCategories().then(() => {
          this.filterParams.forEach((el) => {
            if (el.name === "Price") {
              this.$router.push({
                path: `/catalog/filter?min=${el.data.min}&max=${el.data.max}&categories=&rating=`,
              });
            }
          });
        });
      });
    } else {
      const filterParamsArray = [];
      filterParamsArray.push({
        type: "price",
        data: { min: this.$route.query.min, max: this.$route.query.max },
      });
      if (this.$route.query.categories) {
        filterParamsArray.push({
          type: "categories",
          data: this.$route.query.categories.split(","),
        });
      }
      if (this.$route.query.rating) {
        filterParamsArray.push({
          type: "rating",
          data: `${this.$route.query.rating}+`,
        });
      }
      this.fetchFilteredProducts(filterParamsArray).then(() => {
        this.fetchCategories();
      });
    }
  },
  computed: {
    ...mapGetters({
      productsList: "catalog/products",
      globalRequestFlag: "catalog/globalLoader",
      filterParams: "catalog/filters",
    }),
  },

  methods: {
    ...mapMutations({
      setProducts: "catalog/SET_PRODUCTS",
    }),
    ...mapActions({
      fetchProducts: "catalog/GET_PRODUCTS",
      fetchCategories: "catalog/GET_CATEGORIES",
      fetchCurrentProduct: "catalog/GET_PRODUCT",
      fetchFilteredProducts: "catalog/GET_FILTERED_PRODUCTS",
    }),
    selectProduct(prod) {
      this.fetchCurrentProduct(prod.id).then(() => {
        this.$router.push({ path: `product/${prod.title}` });
      });
    },
  },
};
