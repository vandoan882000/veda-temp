
const uniqueId = "menu";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

if(!!container) {
  const { message, productCompare, productWishList, cart } = veda.plugins;
  function initCompare() {
    const btnComparePopup = document.querySelector('.veda-compare__popup');
    const dataCompareOptions = btnComparePopup.getAttribute('data-options');
    productCompare.customCompare(veda.utils.objectParse(dataCompareOptions));
    //button popup
    btnComparePopup.addEventListener('click', () => {
      productCompare.togglePopup();
    });
    // compare badge
    const compareBadge = document.querySelector('.veda-compare__badge');
    compareBadge.innerHTML = productCompare.getData().length;
    productCompare.getData().length ? compareBadge.style.display = 'flex' : compareBadge.style.display = 'none';
    productCompare.subscribe((state) => {
      compareBadge.innerHTML = state.length;
      state.length ? compareBadge.style.display = 'flex' : compareBadge.style.display = 'none';
    });
  }
  function initWishList() {
    //wishlist badge
    const wishlistBadge = document.querySelector('.veda-wishlist__badge');
    wishlistBadge.innerHTML = productWishList.getData()?.length??"0";
    productWishList.getData().length ? wishlistBadge.style.display = 'flex' : wishlistBadge.style.display = 'none';
    productWishList.subscribe((state) => {
      wishlistBadge.innerHTML = state.length;
      productWishList.getData().length ? wishlistBadge.style.display = 'flex' : wishlistBadge.style.display = 'none';
    });
  }
  function initCart() {
    //init cart
    cart.customCart({
      api: "https://624eadac53326d0cfe5dba36.mockapi.io/cart",
      onSuccess: (type) => {
        if(type === 'add') {
          message.success("Add to cart");
        }
        if(type === 'delete') {
          message.success("Remove from cart");
        }
      },
      onError: (type) => {
        if(type === 'add') {
          message.error("Add to cart error");
        }
        if(type === 'delete') {
          message.error("Remove from cart error");
        }
      },
      totalPrice: 12345,
    })
    // button popup
    const btnCart = document.querySelector('.veda-cart__popup');
    btnCart.addEventListener('click', () => {
    cart.toggleDraw();
    });
    // cart badge
    const cartBadge = document.querySelector('.veda-cart__badge');
    cartBadge.innerHTML = cart.getData()?.length??"0";
    cart.getData().length ? cartBadge.style.display = 'flex' : cartBadge.style.display = 'none';
    cart.subscribe((state) => {
      cartBadge.innerHTML = state.length;
      cart.getData().length ? cartBadge.style.display = 'flex' : cartBadge.style.display = 'none';
    });
  }
  initCompare();
  initWishList();
  initCart();

}

