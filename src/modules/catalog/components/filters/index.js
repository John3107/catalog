import { mapActions, mapGetters } from "vuex";
import MultiRangeSlider from "multi-range-slider-vue";
import inputSelect from "@/components/input-select/index.vue";

export default {
  name: "filters",
  components: {
    MultiRangeSlider,
    inputSelect,
  },
  data() {
    return {
      barMinValue: 0,
      barMaxValue: 0,
    };
  },
  computed: {
    ...mapGetters({
      filterParams: "catalog/filters",
    }),
  },

  methods: {
    ...mapActions({
      fetchFilteredProducts: "catalog/GET_FILTERED_PRODUCTS",
    }),
    inputValues(e) {
      this.barMinValue = e.minValue;
      this.barMaxValue = e.maxValue;
    },
    inputRangeData() {
      this.$router.push({
        path: `/catalog/filter?min=${this.barMinValue}&max=${this.barMaxValue}&categories=${this.$route.query.categories}&rating=${this.$route.query.rating}`,
      });
      this.fetchFilteredProducts({
        type: "price",
        data: { min: this.barMinValue, max: this.barMaxValue },
      });
    },
    inputSelectData(e) {
      switch (e.type) {
        case "rating": {
          this.$router.push({
            path: `/catalog/filter?min=${this.$route.query.min}&max=${
              this.$route.query.max
            }&categories=${this.$route.query.categories}&rating=${
              [...e.data][0]
            }`,
          });
          break;
        }
        case "categories": {
          this.$router.push({
            path: `/catalog/filter?min=${this.$route.query.min}&max=${this.$route.query.max}&categories=${e.data}&rating=${this.$route.query.rating}`,
          });
          break;
        }
      }
      this.fetchFilteredProducts(e);
    },
    resetAll() {
      this.$router
        .push({
          path: `/catalog/filter`,
        })
        .then(() => {
          window.location.reload();
        });
    },
  },
};
