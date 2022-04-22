const uniqueId = "cartcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const {map , store} = veda.utils;
store.create("yasminaC", {
  initialState: {
    data: []
  },
  useStorage: true
});

class CartRender {
  constructor() {
    this.el = document.querySelector(".card-cart__tbody");
    store.subscribe('yasminaCart', this.init.bind(this));
    this.init();
  }
  getData() {
    return store.get("yasminaCart");
  }
  updateStore() {
    fetch('https://624eadac53326d0cfe5dba36.mockapi.io/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        store.set(`yasminaC`, (items) => {
          return {
            data: [...data]
            };
        })("/Add");
        console.log("done");
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const {data} = this.getData();
      return map(data, item => {
        return /*html*/`
          <tr class="card-cart bdb:1px_solid_color-gray2 fz:15px">
            <td class="card-cart__content pt:30px pb:30px d:flex">
              <a href="#" class="veda-image-cover d:block w:140px bd:none! h:132px" css="--aspect-ratio: 4/4">
                <img src=${item.featured_image.src} alt="product-card">
              </a>
              <div class="card-cart__name pl:20px c:color-primary">
                <div class="card-cart__title c:color-dark mb:10px fw:500 fz:15px">${item.title}</div>
                <p class="mb:10px c:color-gray6 fz:15px fw:500">Color: Light Blue</p>
                <a class="card-cart__remove td:none bd:none c:color-primary fz:13px fw:400" href="#">Remove</a>
              </div>
            </td>
            <td class="pt:30px pb:30px"><p class="card-cart__price c:color-dark fw:400 fz:20px">$${item.price}</p></td>
              <td class="pt:30px pb:30px">
                <div class="card-cart__quantity d:flex w:108px bd:1px_solid_color-gray3">
                  <button class="card-cart__sub c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-start cur:pointer bgc:transparent!|h c:color-dark!|h"><i class="fal fa-minus fz:13px"></i></button>
                  <input type="text" class="card-cart__value w:48px! h:40px bd:none! o:none ta:center fz:15px fw:500 c:color-gray9" value="1" min="1"/>
                  <button class="card-cart__add c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-end bgc:transparent!|h cur:pointer c:color-dark!|h"><i class="fal fa-plus fz:13px"></i></button>
                </div>
                </td>
                <td class="pt:30px pb:30px">
                  <p class="card-cart__total fz:20px fw:500 c:color-gray9">$${item.price}</p>
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

