export default {
  created() {
    this.refetchPageForPreview();
  },

  methods: {
    refetchPageForPreview() {
      console.warn(
        'You must have a refetchPageForPreview method in order for Prismic Previews to work!',
      );
    },
  },
};
