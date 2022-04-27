var store = {
  getState: function getState() {
    return {
      iframe: {
        liquidVariables: {
          data: {
            request: {},
            shop: {},
            translations: {},
            weight_with_unit: "",
          },
        },
      },
    };
  },
};
exports.store = store;
