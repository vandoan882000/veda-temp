const uniqueId = "cartcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

// veda.plugins.countdown(container);
const {map , store} = veda.utils;
class CartRender {
  constructor() {
    this.el = document.querySelector(".card-cart__tbody");
    store.subscribe('doanCart', this.init.bind(this));
    this.init();
  }
  getData() {
    return store.get("doanCart");
  }
  render() {
    const {data} = this.getData();
      return map(data, item => {
        return`
        <tr class="card-cart">
          <td class="card-cart__content">
            <a href="#" class="core-image-cover d:block w:140px bd:none!" css="--aspect-ratio: 4/4">
              <img src=${item.featured_image.url} alt="product-card">
            </a>
            <div class="card-cart__name">
              <div class="card-cart__title c:color-dark mb:10px">${item.title}</div>
              <p class="mb:10px">Color: Light Blue</p>
              <a class="card-cart__remove td:none bd:none" href="#">Remove</a>
            </div>
          </td>
          <td><p class="card-cart__price c:color-dark">${item.price}</p></td>
          <td>
            <div class="card-cart__quantity d:flex">
              <button class="card-cart__sub c:black">-</button>
              <input type="text" class="card-cart__value" value="1"/>
              <button class="card-cart__add c:black">+</button>
            </div>
          </td>
          <td>
            <p class="card-cart__total">${item.price}</p>
          </td>
        </tr>`
    });
  }
  init() {
    this.el.innerHTML = this.render();
  }
}
if(!!container) {
  new CartRender();
}

