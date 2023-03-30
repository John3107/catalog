export default {
  name: "rating",
  props: {
    rate: {
      type: Number,
      default: 5,
    },
    count: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    ratingFiller() {
      return Math.abs((this.rate / 5) * 100 - 100).toFixed(0);
    },
  },
};
