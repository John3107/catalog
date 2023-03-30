import rating from "@/components/rating/index.vue";

export default {
  name: "card",
  components: {
    rating,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
