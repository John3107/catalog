import { mapGetters } from "vuex";
import rating from "@/components/rating/index.vue";

export default {
  name: "product",
  components: {
    rating,
  },
  data() {
    return {
      menu: [
        "All about",
        "Description",
        "Characteristics",
        "Certificates",
        "Comments",
        "Question",
      ],
    };
  },
  computed: {
    ...mapGetters({
      product: "catalog/currentProduct",
    }),
  },
};
