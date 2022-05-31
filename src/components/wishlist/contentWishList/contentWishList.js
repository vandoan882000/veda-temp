const uniqueId = "wishlist";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { productWishList } = veda.plugins;
const PREFIX = "yasmina";

if(!!container) {
  veda.plugins.productWishList.renderWishList(container);
}
