const uniqueId = "pageproduct";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map } = veda.utils;
const { VQuery : $$ } = veda.utils;
const { message } = veda.plugins;
const PREFIX = 'yasmina';
class PageProduct {
  constructor() {
    this.init();
    veda.plugins.productWishList.subscribe(this.handleChangeStatus.bind(this));
  }
  handleChangeImage(event) {
    const img = container.querySelector(".yasmina-page-product__img");
    const currentData = event.currentTarget;
    const data = event.currentTarget.parentNode.querySelector(".yasmina-page-product-variant-data").textContent;
    container.querySelector(".yasmina-page-product-color").innerHTML = `Color : ${JSON.parse(data).image.color}`;
    img.src = currentData.src;
    const images = container.querySelectorAll(".yasmina-page-product-image-select");
    images.forEach(image => {
      image.classList.remove("bd:1px_solid_color-dark");
    })
    currentData.classList.add("bd:1px_solid_color-dark");
  }
  debounce(fn, delay = 300) {
    let timeoutId = -1;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  handleChangeStatus() {
    const data = veda.plugins.productWishList.getData();
    const productEl = container.querySelector(".yasmina-page-product");
    const btnWishlist = productEl.querySelector(".veda-wishlist__btn-toggle");
    const dataEl = productEl.querySelector(".yasmina-page-product__data");
    const newItem = JSON.parse(dataEl.textContent);
    const { id: newId } = newItem;
    const dataHasNewItem = data.filter(item => item.id === newId);
    console.log(dataHasNewItem.length);
    if (dataHasNewItem.length > 0) {
      btnWishlist.style.backgroundColor = "#AF0707";
      btnWishlist.style.color = "#ffffff";
    } else {
      btnWishlist.style.backgroundColor = "#ffffff";
      btnWishlist.style.color = "#000000";
    }
  }
  handleDOM() {
    this.handleChangeStatus();
    const productEl = container.querySelector(".yasmina-page-product");
    const dataEl = productEl.querySelector(".yasmina-page-product__data");
    const dataWishList = JSON.parse(dataEl.textContent);
    const sizeElText = container.querySelector(".yasmina-page-product__sizes");
    const sizeElList = container.querySelectorAll(".yasmina-page-product__size-input");
    sizeElList.forEach(sizeEl => {
      sizeEl.addEventListener("click", () => {
        sizeElText.textContent = "Size : " + sizeEl.value;
      });
    })
    const btnAddCart = document.querySelector('.veda-cart__btn-add-cart');
    btnAddCart.addEventListener('click', this.debounce(() => {
      const quantityEl = document.querySelector('.yasmina-page-product__quantity');
      const ItemAdd = veda.plugins.cart.getData().filter(item => item.product_id === dataWishList.id);
      if(ItemAdd.length > 0) {
        veda.plugins.cart.updateCart(ItemAdd[0].id, Number(ItemAdd[0].quantity) + Number(quantityEl.value));
      } else {
        veda.plugins.cart.addToCart(dataWishList);
      }
    }));
    const btnWishlist = container.querySelector(".veda-wishlist__btn-toggle");
    btnWishlist.addEventListener("click", () => {
      veda.plugins.productWishList.toggleWishList(dataWishList);
    })
  }
  init() {
    const images = container.querySelectorAll(".yasmina-page-product-image-select");
    images.forEach(image => {
      image.addEventListener("click", this.handleChangeImage.bind(this));
    })
    this.handleDOM();
  }
}
if(container) {
  new PageProduct();
  veda.plugins.imageZoom(container);
}
