const uniqueId = "pageproduct";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map, debounce } = veda.utils;
const { VQuery : $$ } = veda.utils;
const { message, cart, productWishList, imageZoom } = veda.plugins;
const PREFIX = 'yasmina';
class PageProduct {
  constructor() {
    this.init();
    productWishList.subscribe(this.handleChangeStatus.bind(this));
  }
  handleChangeImage(event) {
    const imgEl = container.querySelector(".yasmina-page-product__img");
    const currentData = event.currentTarget;
    const data = event.currentTarget.parentNode.querySelector(".yasmina-page-product-variant-data").textContent;
    container.querySelector(".yasmina-page-product-color").innerHTML = `Color : ${JSON.parse(data).image.color}`;
    imgEl.src = currentData.src;
    const images = container.querySelectorAll(".yasmina-page-product-image-select");
    images.forEach(image => {
      image.classList.remove("bd:1px_solid_color-dark");
    })
    currentData.classList.add("bd:1px_solid_color-dark");
  }
  handleChangeStatus() {
    const data = productWishList.getData();
    const productEl = container.querySelector(".yasmina-page-product");
    const btnWishlist = productEl.querySelector(".wishlist-toggle-js");
    const dataEl = productEl.querySelector(".yasmina-page-product__data");
    const newItem = JSON.parse(dataEl.textContent);
    const { id: newId } = newItem;
    const dataHasNewItem = data.some(item => item.id === newId);
    if (dataHasNewItem) {
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
    //button add cart
    const btnAddCart = document.querySelector('.product-card-add-js');
    btnAddCart.addEventListener('click', debounce(() => {
      const quantityEl = document.querySelector('.yasmina-page-product__quantity');
      const itemAdd = cart.getData().filter(item => item.product_id === dataWishList.id);
      if(itemAdd.length > 0) {
        cart.updateCart(itemAdd[0].id, Number(itemAdd[0].quantity) + Number(quantityEl.value));
      } else {
        cart.addToCart(dataWishList);
      }
    }));
    const btnWishlist = container.querySelector(".wishlist-toggle-js");
    btnWishlist.addEventListener("click", () => {
      productWishList.toggleWishList(dataWishList);
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
  imageZoom(container);
}
