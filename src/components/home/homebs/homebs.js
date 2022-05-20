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
  function changeStatus(btnCompare, productData, lstProduct ) {
    let hasItem = lstProduct?.some(item => item.id === productData.id);
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
  veda.plugins.swiper(container);
  //new AddStore(container, "Compare", "fa-repeat");
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const compareDataEl = card.querySelector(".yasmina-product-card__data");
    const productData = JSON.parse(compareDataEl.textContent);
    //button add compare
    const btnCompare = card.querySelector('.veda-compare__btn-toggle');
    const btnQuickView = card.querySelector('.veda-quickview__btn-toggle');
    const btnWishList = card.querySelector('.veda-wishlist__btn-toggle');
    const btnAddCart = card.querySelector('.veda-cart__btn-add-cart');
    const ratingCustom = card.querySelector('.veda-compare__rating-custom');
    changeStatus(btnCompare, productData, veda.plugins.productCompare.getData());
    veda.plugins.productCompare.subscribe(() => {
      changeStatus(btnCompare, productData, veda.plugins.productCompare.getData());
    })
    btnCompare.addEventListener('click', () => {
      veda.plugins.productCompare.toggleProduct({
        ...productData,
        rating: ratingCustom?.innerHTML,
      });
      changeStatus(btnCompare, productData) ? message.success("Added to compare") : message.error("Removed from compare");
    });
    changeStatus(btnWishList, productData, veda.plugins.productWishList.getData());
    veda.plugins.productWishList.subscribe(() => {
      changeStatus(btnWishList, productData, veda.plugins.productWishList.getData());
    })
    btnWishList.addEventListener("click", () => veda.plugins.productWishList.toggleWishList(productData));
    veda.plugins.productQuickView.customQuickView({
      link: "/pageproduct.html",
    })
    btnQuickView.addEventListener("click", () => veda.plugins.productQuickView.togglePopop(productData));
    btnAddCart.addEventListener('click', () => {
      veda.plugins.cart.addToCart(productData);
    });
  })
  // new AddStore(container, "WishList", "fa-heart");
  // new AddStoreCart(container, "Cart", "yasmina-product-card__add");
  // new QuickViewPopop(container, "QuickView","fa-eye");
  const colorWrapEls = container.querySelectorAll(".yasmina-product-card__colors");
  colorWrapEls.forEach(el => new CardColors(el));
}


