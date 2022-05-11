import { CartService, AddStore, AddStoreCart, CardColors, QuickViewPopop, QuickViewCardColors} from "../products/products.js";
const uniqueId = "bestseller";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store , map } = veda.utils;
const { message } = veda.plugins;
const PREFIX = 'yasmina';

store.create("yasminaCompare", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("yasminaWishList", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("yasminaCart", {
  initialState: [],
  useStorage: true
});

store.create(`${PREFIX}QuickView`, {
  initialState: {
    visible: false,
    data: {}
  },
});
const cartService = new CartService();
if(!!container) {
  veda.plugins.swiper(container);
  new AddStore(container, "Compare", "fa-repeat");
  new AddStore(container, "WishList", "fa-heart");
  new AddStoreCart(container, "Cart", "yasmina-product-card__add");
  new QuickViewPopop(container, "QuickView","fa-eye");
  const colorWrapEls = container.querySelectorAll(".yasmina-product-card__colors");
  colorWrapEls.forEach(el => new CardColors(el));
}


