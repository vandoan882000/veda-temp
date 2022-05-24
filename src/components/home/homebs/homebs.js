const uniqueId = "bestseller";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store , map, debounce } = veda.utils;
const { message, productCompare, productWishList, productQuickView, productColor, cart } = veda.plugins;
const PREFIX = 'yasmina';
let unsubscribeCompare = undefined;
let unsubscribeWishList = undefined;

function changeStatus(el, productData, lstProduct, destination , messageShow = false ) {
  let hasItem = lstProduct?.some(item => item.id === productData.id);
  if(hasItem) {
    el.setAttribute("data-tooltip-active",true);
    el.style.backgroundColor = "#AF0707";
    el.style.color = "#ffffff";
    if (messageShow) {
      message.success(`Added to ${destination}`);
    }
  } else {
    el.setAttribute("data-tooltip-active",false);
    el.style.backgroundColor = "#ffffff";
    el.style.color = "#000000";
    if (messageShow) {
      message.error(`Removed from ${destination}`);
    }
  }
  return hasItem;
}

function handleCompare() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const compareDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(compareDataEl.textContent);
    const btnCompare = card.querySelector('.veda-compare__btn-toggle');
    const ratingCustom = card.querySelector('.veda-compare__rating-custom');
    changeStatus(btnCompare, productData, productCompare.getData(), "Compare");
    btnCompare.addEventListener('click', () => {
      productCompare.toggleProduct({
        ...productData,
        rating: ratingCustom?.innerHTML,
      });
      changeStatus(btnCompare, productData, productCompare.getData(), "Compare", true);
    });

  });
  unsubscribeCompare?.();
  unsubscribeCompare = productCompare.subscribe((state) => {
    const listCard = container.querySelectorAll('.yasmina-product-card');
    listCard.forEach(card => {
      const compareDataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(compareDataEl.textContent);
      const btnCompare = card.querySelector('.veda-compare__btn-toggle');
      changeStatus(btnCompare, productData, state, "Compare");
    });
  });
}
function handleWishList() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const compareDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(compareDataEl.textContent);
    const btnWishList = card.querySelector('.veda-wishlist__btn-toggle');
    productQuickView.customQuickView({
      link: "/pageproduct.html",
    })
    changeStatus(btnWishList, productData, productWishList.getData(), "Wishlist");
    btnWishList.addEventListener("click", () => {
      productWishList.toggleWishList(productData)
      changeStatus(btnWishList, productData, productWishList.getData(), "Wishlist", true);
    });
  });
  unsubscribeWishList?.();
  unsubscribeWishList = productWishList.subscribe((state) => {
    const listCard = container.querySelectorAll('.yasmina-product-card');
    listCard.forEach(card => {
      const dataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(dataEl.textContent);
      const btnWishList = card.querySelector('.veda-wishlist__btn-toggle');
      changeStatus(btnWishList, productData, state, "Wish List");
    });
  });
}
function handleCart() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const cartDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(cartDataEl.textContent);
    const btnAddCart = card.querySelector('.veda-cart__btn-add-cart');
    btnAddCart.addEventListener('click', debounce(() => {
      cart.addToCart(productData);
    }));
  });
}
function handleQuickView() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const cartDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(cartDataEl.textContent);
    const btnQuickView = card.querySelector('.veda-quickview__btn-toggle');
    btnQuickView.addEventListener("click", () => productQuickView.togglePopup(productData));
  });
}
function handleColor() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  productColor.init({
    onChange: (color, image, currentEl) => {
      const currentImage = currentEl.closest(".yasmina-product-card").querySelector('.yasmina-product-card__image');
      currentImage.src = image;
      console.log("selected color:", color);
    },
  })
  listCard.forEach(card => {
    const cartDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(cartDataEl.textContent);
    const colorWrapper = card.querySelector('.yasmina-product-card__colors');
    productColor.render(colorWrapper, productData);
  });
}
if(!!container) {
  veda.plugins.swiper(container);
  handleCompare();
  handleWishList();
  handleQuickView();
  handleCart();
  handleColor();
}


