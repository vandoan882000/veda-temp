const uniqueId = "cartcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);


const {map , store} = veda.utils;
class CartRender {
  constructor() {
    this.el = document.querySelector(".card-cart__tbody");
    store.subscribe('yasminaCart', this.init.bind(this));
    this.init();
  }
  getData() {
    return store.get("yasminaCart");
  }
  render() {
    const {data} = this.getData();
      return map(data, item => {
        return /*html*/`
          <tr class="card-cart bdb:1px_solid_color-gray4 fz:15px">
            <td class="card-cart__content pt:30px pb:30px d:flex">
              <a href="#" class="veda-image-cover d:block w:140px " css="--aspect-ratio: 4/4">
                <img src=${item.featured_image.url} alt="product-card">
              </a>
              <div class="card-cart__name pl:20px c:color-primary">
                <div class="card-cart__title c:color-dark mb:10px fw:500">${item.title}</div>
                <p class="mb:10px">Color: Light Blue</p>
                <a class="card-cart__remove td:none bd:none" href="#">Remove</a>
              </div>
            </td>
            <td class="pt:30px pb:30px"><p class="card-cart__price c:color-dark">${item.price}</p></td>
              <td class="pt:30px pb:30px">
                <div class="card-cart__quantity d:flex w:fit-content bd:1px_solid_color-gray4">
                <button class="card-cart__sub c:color-dark w:30px h:40px bd:none o:none bgc:transparent cur:pointer bgc:transparent!|h c:color-dark!|h">-</button>
                <input type="text" class="card-cart__value w:60px! h:40px bd:none! o:none ta:center" value="1" min="1"/>
                <button class="card-cart__add c:color-dark w:30px h:40px bd:none o:none bgc:transparent bgc:transparent!|h cur:pointer c:color-dark!|h">+</button>
                </div>
                </td>
                <td class="pt:30px pb:30px">
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
  veda.plugins.countdown(container);
  veda.plugins.select(container, {
    onChange: (value) => {
      console.log(value);
    }
  });
  new CartRender();
}

