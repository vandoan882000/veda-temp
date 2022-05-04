import { CartService } from "../../home/products/products.js";
const uniqueId = "cartcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { map , store } = veda.utils;
const { message } = veda.plugins;
const PREFIX = "yasmina";
store.create(`${PREFIX}Cart`, {
  initialState: [],
  useStorage: true
});
store.create(`${PREFIX}CartVisible`, {
  initialState: false,
  useStorage: false
});
const cartService = new CartService();
class CartRender {
  constructor() {
    this.el = document.querySelector(".card-cart__tbody");
    this.loader = this.createComparePortal();
    this.currentCart = "1";
    store.subscribe('yasminaCart', this.init.bind(this));
    this.updateStore();

  }
  getData() {
    return store.get("yasminaCart");
  }
  async updateStore() {
    const data = await cartService.getData();
    await store.set(`${PREFIX}Cart`, (items) => {
      return [...data];
    });
  }
  handleDeleteCart(e) {
    const currentEl = e.currentTarget;
    const currentId = currentEl.getAttribute("data-id");
    cartService.delete(currentId);

  }
  createComparePortal() {
    const rootEl = document.querySelector('#root');
    const el = document.createElement('div');
    rootEl.appendChild(el);
    return el;
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
  async updateCart(id, quantity) {
    await cartService.update(id, quantity);
    await this.updateStore();
  }
  handleChangeCurrentCart() {
    const lstCounter = document.querySelectorAll(".veda-counter");
    lstCounter.forEach(counter => {
      counter.addEventListener("click", () => {
        const currentId  = counter.getAttribute("data-id");
        this.currentCart = currentId;
      });
    });
  }
  handleChangeQuantity(id , quantity) {
    const lstCounter = document.querySelectorAll(".veda-counter");
    if(quantity > 0) {
      this.updateCart(id, quantity);
    }
    else {
      this.updateStore();
      message.error(`Remove from Cart`);
      cartService.delete(id);
    }
  }

  handleDOM() {
    const lstRemoveEl = document.querySelectorAll(".yasmina-card-cart__remove");
    lstRemoveEl.forEach(el => {
      el.addEventListener("click", this.handleDeleteCart.bind(this));
    });
    veda.plugins.counter(container,{
      step: 1,
    });
    this.handleChangeCurrentCart();
    veda.plugins.select(container, {
      onChange: (value) => {
        this.handleChangeQuantity(this.currentCart, value);
        console.log(this.currentCart, value);
      }
    });
  }
  render() {
    const data = this.getData();
      return map(data, item => {
        return /*html*/`
          <tr class="card-cart fz:15px bd:none bdb:1px_solid_color-gray2">
            <td class="card-cart__content  bd:none pt:30px pb:30px d:flex">
              <a href="#" class="veda-image-cover d:block w:140px bd:none! h:132px" css="--aspect-ratio: 4/4">
                <img src=${item.image} alt="product-card">
              </a>
              <div class="card-cart__name pl:20px c:color-primary">
                <div class="card-cart__title c:color-dark mb:10px fw:500 fz:15px">${item.title}</div>
                <p class="mb:10px c:color-gray6 fz:15px fw:500">Color: Light Blue</p>
                <a class="yasmina-card-cart__remove td:none bd:none c:color-primary fz:13px fw:400 cur:pointer" data-id=${item.id}>Remove</a>
              </div>
            </td>
            <td class=" bd:none va:middle!">
              <div class="c:color-dark fw:400 fz:20px">$${item.price}</div>
            </td>
            <td class=" bd:none va:middle!">
              <div data-id="${item.id}" class="veda-counter d:flex w:108px bd:1px_solid_color-gray3" data-options="{ value: ${item.quantity} }">
                <div class="veda-counter__decrement c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-start cur:pointer bgc:transparent!|h c:color-dark!|h ta:center">
                  <i class="fal fa-minus fz:13px w:100% h:100% lh:40px"></i>
                </div>
                <input class="veda-counter__input w:48px! h:40px bd:none! o:none ta:center fz:15px fw:500 c:color-gray9" type="number" data-button="disabled" />
                <div class="veda-counter__increment c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-end bgc:transparent!|h cur:pointer c:color-dark!|h ta:center">
                  <i class="fal fa-plus fz:13px w:100% h:100% lh:40px"></i>
                </div>
              </div>
            </td>
            <td class=" bd:none va:middle!">
              <p class="card-cart__total fz:20px fw:500 c:color-gray9">$${item.price * item.quantity}</p>
            </td>
          </tr>`
    });
  }
  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}
if(!!container) {
  //veda.plugins.countdown(container);
  new CartRender();
  // veda.plugins.slider({
  //   el: container.querySelector('.veda-slider'),
  //   min: 0,
  //   max: 500,
  //   step: 1,
  //   range: false,
  //   value: [0, 200],
  //   onChange: value => {
  //      console.log(value);
  //   },
  //   onChanged: value => {
  //      console.log(value);
  //   }
  //});
}

