export default {
  name: "input-select",
  props: {
    title: {
      type: String,
      default: "name",
    },
    type: {
      type: String,
      default: "text",
    },
    filterData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItems:
        this.type === "checkbox"
          ? this.$route.query.categories
            ? this.$route.query.categories?.split(",")
            : []
          : `${this.$route.query.rating}+`,
    };
  },
  watch: {
    selectedItems() {
      this.$emit("input-data", {
        type: this.type === "checkbox" ? "categories" : "rating",
        data: this.selectedItems,
      });
    },
  },
};
