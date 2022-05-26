const uniqueId = "bestseller";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

if(!!container) {
  const { message, productCompare, productWishList, productQuickView, productColor, cart } = veda.plugins;
  let unsubscribeCompare = () => {};
  let unsubscribeWishList = () => {};
  let loadding = false;
  function checkHasItem(productData, storeData) {
    return storeData?.some((item) => item.id === productData.id);
  }
  function changeStatus(el, hasItem) {
    if (hasItem()) {
      el.setAttribute("data-tooltip-active", true);
      el.classList.add("toggle-active-js");
    } else {
      el.setAttribute("data-tooltip-active", false);
      el.classList.remove("toggle-active-js");
    }
    return hasItem;
  }
  function handleCompare() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const compareDataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(compareDataEl.textContent);
      const btnCompareEl = card.querySelector(".compare-toggle-js");
      const ratingCustom = card.querySelector(".compare-rating-js");
      const hasItem = () => checkHasItem(productData, productCompare.getData());
      changeStatus(btnCompareEl, hasItem);
      btnCompareEl.addEventListener("click", () => {
        productCompare.toggleProduct({
          ...productData,
          rating: ratingCustom?.innerHTML,
        });
        const tooltipText = btnCompareEl.getAttribute("data-tooltip-text");
        const tooltipActiveText = btnCompareEl.getAttribute(
          "data-tooltip-active-text"
        );
        changeStatus(btnCompareEl, hasItem);
        if (hasItem()) {
          tooltipText && message.success(tooltipText);
        } else {
          tooltipActiveText && message.error(tooltipActiveText);
        }
      });
    });
    unsubscribeCompare();
    unsubscribeCompare = productCompare.subscribe((state) => {
      const listCard = container.querySelectorAll(".product-card-js");
      listCard.forEach((card) => {
        const compareDataEl = card.querySelector(".product-card-data-js");
        const productData = JSON.parse(compareDataEl.textContent);
        const btnCompareEl = card.querySelector(".compare-toggle-js");
        const hasItem = () => checkHasItem(productData, state);
        changeStatus(btnCompareEl, hasItem);
      });
    });
  }
  function handleWishList() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const compareDataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(compareDataEl.textContent);
      const btnWishListEl = card.querySelector(".wishlist-toggle-js");
      const hasItem = () =>
        checkHasItem(productData, productWishList.getData());
      productQuickView.customQuickView({
        link: "/pageproduct.html",
      });
      changeStatus(btnWishListEl, hasItem);
      btnWishListEl.addEventListener("click", () => {
        productWishList.toggleWishList(productData);
        const tooltipText = btnWishListEl.getAttribute("data-tooltip-text");
        const tooltipActiveText = btnWishListEl.getAttribute(
          "data-tooltip-active-text"
        );
        changeStatus(btnWishListEl, hasItem);
        if (hasItem()) {
          tooltipText && message.success(tooltipText);
        } else {
          tooltipActiveText && message.error(tooltipActiveText);
        }
      });
    });
    unsubscribeWishList();
    unsubscribeWishList = productWishList.subscribe((state) => {
      const listCard = container.querySelectorAll(".product-card-js");
      listCard.forEach((card) => {
        const dataEl = card.querySelector(".product-card-data-js");
        const productData = JSON.parse(dataEl.textContent);
        const btnWishList = card.querySelector(".wishlist-toggle-js");
        const hasItem = () => checkHasItem(productData, state);
        changeStatus(btnWishList, hasItem);
      });
    });
  }
  function handleCart() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const cartDataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(cartDataEl.textContent);
      const btnAddCart = card.querySelector(".product-card-add-js");
      btnAddCart.addEventListener("click", async (event) => {
        event.preventDefault();
        if (!loadding) {
          loadding = true;
          const currentLoaderEl = document.createElement('div');
          currentLoaderEl.classList = 'loader w:20px h:20px';
          btnAddCart.insertAdjacentElement('afterbegin', currentLoaderEl);
          cart.addToCart(productData).finally(() => {
            currentLoaderEl.remove();
            loadding = false;
          });
        }
      });
    });
  }
  function handleQuickView() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const cartDataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(cartDataEl.textContent);
      const btnQuickView = card.querySelector(".quickview-toggle-js");
      btnQuickView.addEventListener("click", () =>
        productQuickView.toggleDraw(productData)
      );
    });
  }
  function handleColor() {
    const listCard = container.querySelectorAll(".product-card-js");
    productColor.init({
      onChange: (color, image, currentEl) => {
        const currentImage = currentEl
          .closest(".product-card-js")
          .querySelector(".product-card-image-js");
        currentImage.src = image;
        console.log("selected color:", color);
      },
    });
    listCard.forEach((card) => {
      const cartDataEl = card.querySelector(".product-card-data-js");
      const productData = JSON.parse(cartDataEl.textContent);
      const colorWrapper = card.querySelector(".product-card-colors-js");
      productColor.render(colorWrapper, productData);
    });
  }
  function handleSwiper() {
    const swiperEl = container.querySelector(".veda-swiper");
    const swiperBtnPrev = container.querySelector(".swiper-button-prev");
    const swiperBtnNext = container.querySelector(".swiper-button-next");
    if (swiperEl) {
      if (window.screen.width < 982) {
        swiperEl.setAttribute("data-options", `{
          speed: 400,
          spaceBetween: 20,
          centeredSlides: false,
          slidesPerView: 1,
          touchRatio: 0.3,
        }`);
        swiperBtnPrev.classList.add("trf:translateX(15px)");
        swiperBtnNext.classList.add("trf:translateX(-15px)");
        veda.plugins.swiper(container);
      } else if (window.screen.width > 982) {
        swiperEl.setAttribute("data-options", `{
          speed: 400,
          spaceBetween: 20,
          centeredSlides: false,
          slidesPerView: 4,
          touchRatio: 0.3,
        }`);
        swiperBtnPrev.classList.remove("trf:translateX(15px)");
        swiperBtnNext.classList.remove("trf:translateX(-15px)");
        veda.plugins.swiper(container);
      }
    }

  }
  handleSwiper();
  handleCompare();
  handleWishList();
  handleQuickView();
  handleCart();
  handleColor();
  window.addEventListener("resize", event => handleSwiper(event));
}


