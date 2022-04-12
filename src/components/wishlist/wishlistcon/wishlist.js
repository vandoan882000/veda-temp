const uniqueId = "wishlist";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const {store} = veda.utils;
class WishList {
  constructor() {
    this.el = container.querySelector(".col-md-12");
    this.init();
  }

  getData() {
    return store.get("doanCart");
  }
  render() {

  }
  init() {

  }
}
