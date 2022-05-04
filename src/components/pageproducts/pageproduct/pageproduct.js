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
  init() {
    const images = container.querySelectorAll(".yasmina-page-product-image-select");
    images.forEach(image => {
      image.addEventListener("click", this.handleChangeImage.bind(this));
    })
  }
}
if(container) {
  new PageProduct();
  veda.plugins.imageZoom(container);
}
