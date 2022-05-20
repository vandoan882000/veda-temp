
const uniqueId = "menu";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse, VQuery: $$ } = veda.utils;
const { Component, html, render, renderWithElement, createPortal} = veda.utils.csr;
const { message } = veda.plugins;

//new StoreBadge("Compare", "menu__card-compare");
const btnComparePopup = document.querySelector('.veda-compare__popup');
const dataCompareOptions = btnComparePopup.getAttribute('data-options');
veda.plugins.productCompare.customCompare(veda.utils.objectParse(dataCompareOptions));
//button popup
btnComparePopup.addEventListener('click', () => {
  veda.plugins.productCompare.togglePopup();
});
// compare badge
const compareBadge = document.querySelector('.veda-compare__badge');
compareBadge.innerHTML = veda.plugins.productCompare.getData().length;
veda.plugins.productCompare.getData().length ? compareBadge.style.display = 'flex' : compareBadge.style.display = 'none';
veda.plugins.productCompare.subscribe((state) => {
  compareBadge.innerHTML = state.length;
  state.length ? compareBadge.style.display = 'flex' : compareBadge.style.display = 'none';
});
veda.plugins.cart.customCart({
  api: "https://624eadac53326d0cfe5dba36.mockapi.io/cart",
  onSuccess: (type) => {
    if(type === 'add') {
      veda.plugins.message.success("Add to cart");
    }
    if(type === 'delete') {
      veda.plugins.message.success("Remove from cart");
    }
  },
  onError: (type) => {
    if(type === 'add') {
      veda.plugins.message.error("Add to cart error");
    }
    if(type === 'delete') {
      veda.plugins.message.error("Remove from cart error");
    }
  },
  totalPrice: 12345,
 })
 const btnCart = document.querySelector('.veda-cart__popup');
  btnCart.addEventListener('click', () => {
  veda.plugins.cart.togglePopup();
  });
 const cartBadge = document.querySelector('.veda-cart__badge');
 cartBadge.innerHTML = veda.plugins.cart.getData()?.length??"0";
 veda.plugins.cart.getData().length ? cartBadge.style.display = 'flex' : cartBadge.style.display = 'none';
 veda.plugins.cart.subscribe((state) => {
  cartBadge.innerHTML = state.length;
  veda.plugins.cart.getData().length ? cartBadge.style.display = 'flex' : cartBadge.style.display = 'none';
 });
 const wishlistBadge = document.querySelector('.veda-wishlist__badge');
 wishlistBadge.innerHTML = veda.plugins.productWishList.getData()?.length??"0";
 veda.plugins.productWishList.getData().length ? wishlistBadge.style.display = 'flex' : wishlistBadge.style.display = 'none';
veda.plugins.productWishList.subscribe((state) => {
  wishlistBadge.innerHTML = state.length;
  veda.plugins.productWishList.getData().length ? wishlistBadge.style.display = 'flex' : wishlistBadge.style.display = 'none';
 });

