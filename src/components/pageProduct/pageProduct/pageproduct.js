// const uniqueId = "pageproduct";
// /** @type HTMLElement */
// const container = document.querySelector(`[data-id="${uniqueId}"]`);
// const { store, map } = veda.utils;
// const { VQuery : $$ } = veda.utils;
// const message = veda.plugins.createMessage();
// const PREFIX = 'doan';

// class PageProduct {
//   constructor() {
//     this.init();
//   }
//   getData() {
//     return store.get(`${PREFIX}CurrentProduct`);
//   }
//   init() {
//     $$(".yasmina-page-product__image").html(`<img class="w:100%" src="${this.getData().featured_image.src}" alt="">`);
//     $$(".yasmina-page-product__title").html(`${this.getData().title}`);
//     $$(".yasmina-page-product__vendor").html(`Vendor: ${this.getData().vendor}`);
//     $$(".yasmina-page-product__sku").html(`Sku: ${this.getData().variants[0].sku}`);
//     $$(".yasmina-page-product__availability").html(`Availability: ${this.getData().variants.length} in stock`);
//     $$(".yasmina-page-product__type").html(`Product Type: ${this.getData().type}`);
//     $$(".yasmina-page-product__price").html(`$${this.getData().price}`);
//     // $$(".yasmina-page-product__description").html(`${this.getData().description}`);
//   }
// }
// if(container) {
//   new PageProduct();
// }
