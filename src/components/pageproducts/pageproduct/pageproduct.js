import { CartService } from "../../home/products/products.js";
const uniqueId = "pageproduct";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map } = veda.utils;
const { VQuery : $$ } = veda.utils;
const { message } = veda.plugins;
const PREFIX = 'yasmina';
const cartService = new CartService();
class PageProduct {
  constructor() {
    this.init();
    store.subscribe(`${PREFIX}WishList`,this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}Cart`);
  }
  getDataWishList() {
    return store.get(`${PREFIX}WishList`);
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
    const { data } = this.getDataWishList();
    const productEl = container.querySelector(".yasmina-page-product");
    const btnWishlist = productEl.querySelector(".yasmina-page-product__btn-wish-list");
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
  handleAddWishList() {
    this.handleChangeStatus();
    const productEl = container.querySelector(".yasmina-page-product");
    const btnWishlist = productEl.querySelector(".yasmina-page-product__btn-wish-list");
    const dataEl = productEl.querySelector(".yasmina-page-product__data");
    btnWishlist.addEventListener("click", () => {
      const newItem = JSON.parse(dataEl.textContent);
      const { id: newId } = newItem;
      store.set(`${PREFIX}WishList`, (state) => {
        const dataHasNewItem = state.data.filter(item => item.id === newId);
          // Neu ma trong mang data da co chua san pham nay roi
          // thi khi ta bam vao nut compare se xoa di
        if (dataHasNewItem.length > 0) {
          message.error(`Remove from Wishlist`);
          return {
            ...state,
            data: state.data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)
          };
        }
          // Neu trong data chua co product do thi ta se them vao
        message.success(`Add to Wishlist`);
        return {
          ...state,
          data: [...state.data, newItem]
        };
      })('toggle');
    });
  }
  handleAddCart() {
    const productEl = container.querySelector(".yasmina-page-product");
    const btnCart = productEl.querySelector(`.yasmina-page-product-btn-add-cart`);
    const dataEl = productEl.querySelector(".yasmina-page-product__data");
    const newItem = JSON.parse(dataEl.textContent);
    btnCart.addEventListener("click", this.debounce(() => {
    const data = this.getData();
    const hasItem = data.filter(item => item.product_id === newItem.id);
    if(hasItem.length > 0) {
      const prevData = data.filter(item => item.product_id === newItem.id);
      const prevItem = prevData[0];
      const defaultHtml = btnCart.innerHTML;
      btnCart.textContent = 'Loading...';
      cartService.update(prevItem.id, prevItem.quantity + 1, () => {
        btnCart.textContent = defaultHtml;
        cartService.getData(() => {});
      });
    }
    else {
      const defaultHtml = btnCart.innerHTML;
      btnCart.innerHTML = 'Loading...';
      cartService.insert(newItem, () => {
        btnCart.innerHTML = defaultHtml;
        cartService.getData(() => {});
      });

    }

    }));

  }
  handleDOM() {
    const sizeElText = container.querySelector(".yasmina-page-product__sizes");
    const sizeElList = container.querySelectorAll(".yasmina-page-product__size-input");
    sizeElList.forEach(sizeEl => {
      sizeEl.addEventListener("click", () => {
        sizeElText.textContent = "Size : " + sizeEl.value;
      });
    })
    this.handleAddCart();
    this.handleAddWishList();
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
