const uniqueId = "wishlist";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { productWishList } = veda.plugins;

if(!!container) {
  veda.plugins.productWishList.renderWishList(container);
}
