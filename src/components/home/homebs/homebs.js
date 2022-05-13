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
function changeStatus(btnCompare, dataCompare) {
  let hasItem = !!veda.plugins.productCompare.getData().find(item => item.id === dataCompare.id);
  if(hasItem) {
    btnCompare.setAttribute("data-tooltip-active",true);
    btnCompare.style.backgroundColor = "#AF0707";
    btnCompare.style.color = "#ffffff";
  } else {
    btnCompare.setAttribute("data-tooltip-active",false);
    btnCompare.style.backgroundColor = "#ffffff";
    btnCompare.style.color = "#000000";
  }
  return hasItem;
}
const cartService = new CartService();
if(!!container) {
  veda.plugins.swiper(container);
  //new AddStore(container, "Compare", "fa-repeat");
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
      const compareDataEl = card.querySelector(".yasmina-product-card__data");
      const compareData = JSON.parse(compareDataEl.textContent);
      //button add compare
      const btnCompare = card.querySelector('.veda-compare__btn-toggle');
      const ratingCustom = card.querySelector('.veda-compare__rating-custom');
      changeStatus(btnCompare, compareData);
      veda.plugins.productCompare.subscribe(() => {
        changeStatus(btnCompare, compareData);
      })
      btnCompare.addEventListener('click', () => {
        veda.plugins.productCompare.toggleProduct({
          ...compareData,
          rating: ratingCustom?.innerHTML,
        });
        changeStatus(btnCompare, compareData) ? message.success("Added to compare") : message.error("Removed from compare");
      });
  })
  new AddStore(container, "WishList", "fa-heart");
  new AddStoreCart(container, "Cart", "yasmina-product-card__add");
  new QuickViewPopop(container, "QuickView","fa-eye");
  const colorWrapEls = container.querySelectorAll(".yasmina-product-card__colors");
  colorWrapEls.forEach(el => new CardColors(el));
}


