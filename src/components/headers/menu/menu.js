
const uniqueId = "menu";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

if(!!container) {
  const { message, productCompare, productWishList, cart } = veda.plugins;
  const menuTextConfig = JSON.parse(container.querySelector(".menu-text-config-js").textContent);
  function initCompare() {
    const btnComparePopup = document.querySelector('.veda-compare-toggle-js');
    if(!btnComparePopup) {
      return;
    }
    const dataCompareOptions = btnComparePopup.getAttribute('data-options');
    productCompare.customCompare(veda.utils.objectParse(dataCompareOptions));
    //button popup
    btnComparePopup.addEventListener('click', () => {
      productCompare.togglePopup();
    });
    // compare badge
    const compareBadge = document.querySelector('.veda-compare-badge-js');
    compareBadge.innerHTML = productCompare.getData().length;
    productCompare.getData().length ? compareBadge.style.display = 'flex' : compareBadge.style.display = 'none';
    productCompare.subscribe((state) => {
      compareBadge.innerHTML = state.length;
      state.length ? compareBadge.style.display = 'flex' : compareBadge.style.display = 'none';
    });
  }
  function initWishList() {
    //wishlist badge
    const wishlistBadge = document.querySelector('.veda-wishlist-badge-js');
    if(!wishlistBadge) {
      return;
    }
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
          message.success(menuTextConfig.add_to_cart_success_text);
        }
        if(type === 'delete') {
          message.success(menuTextConfig.remove_from_cart_success_text);
        }
      },
      onError: (type) => {
        if(type === 'add') {
          message.error(menuTextConfig.add_to_cart_error_text);
        }
        if(type === 'delete') {
          message.error(menuTextConfig.remove_from_cart_error_text);
        }
      },
      totalPrice: 12345,
    })
    // button popup
    const btnCart = document.querySelector('.veda-cart-toggle-js');
    if(!btnCart) {
      return;
    }
    btnCart.addEventListener('click', () => {
    cart.toggleDraw();
    });
    // cart badge
    const cartBadge = document.querySelector('.veda-cart-badge-js');
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

