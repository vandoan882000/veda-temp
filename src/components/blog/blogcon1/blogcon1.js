const uniqueId = "blogcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { collectionsFilters } = veda.plugins;
if(!!container) {
  collectionsFilters(container, {
    formSelector: ".petify-filter-form",
    priceStep: 0.01,
    onChange({ url, category, done }) {
      // fetch(url).then(res => {
      //   console.log(res);
      //   done();
      // }).catch(err => {})
      console.log(url, category);
      done();
    },
  });
}
