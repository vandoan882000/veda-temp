const uniqueId = "header";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse } = veda.utils;
veda.plugins.themeToggle(container);
const PREFIX = 'doan';

store.create(PREFIX+"Compare", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create(PREFIX+"WishList", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create(PREFIX+"Cart", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});

class StoreBadge {
  constructor(storeName, elClass) {
    this.storeName = storeName;
    this.el = container.querySelector("."+elClass);
    this.init();
    store.subscribe(PREFIX+storeName,this.init.bind(this));
  }

  getData() {
    return store.get(PREFIX+this.storeName);
  }

  render() {
    const count = this.getData().data.length;
    if (!count) {
      return ''
    }
    return /*html*/`<div class="d:flex jc:center ai:center c:color-light pos:absolute b:50% l:80% w:16px h:16px fz:9px bdrs:8px bgc:red fw:500">${count}</div>`;
  }
  init() {
    this.el.innerHTML = this.render();
  }
}

class ComparePopop {
  constructor(storeName, classEl) {
    this.storeName = storeName;
    this.classEl = classEl;
    this.el = this.createComparePortal();
    this.compareData = objectParse(container.querySelector(".compare-popup-data").textContent);
    this.mounted();
    this.init();
    store.subscribe(PREFIX+this.storeName, this.init.bind(this));
  }
  mounted() {
    this.compareBtnEl = container.querySelector("."+this.classEl);
    this.compareBtnEl.parentNode.addEventListener('click', this.handleTogglePopup.bind(this));
  }

  createComparePortal() {
    const rootEl = document.querySelector('#root');
    const el = document.createElement('div');
    rootEl.appendChild(el);
    return el;
  }

  getData() {
    return store.get(PREFIX+this.storeName);
  }

  handleTogglePopup() {
    store.set(PREFIX+ this.storeName,items => {
      return {
        ...items,
        visible : !items.visible
      }
    });
  }
  handleRemoveCompare(event) {
    store.set(PREFIX + this.storeName,compare => {
      return {
        ...compare,
        data: compare.data.filter(item => item.id !== event.currentTarget.getAttribute("data-id"))
      }
    })(this.storeName + "/remove");
  }
  handleDOM() {
    const { visible , data } = this.getData();
    const closeEl = document.querySelectorAll('.close');
    if (closeEl) {
      closeEl.forEach(elClose => {
        elClose.addEventListener('click', this.handleTogglePopup.bind(this));
      })
    }
    if (visible) {
      const removeCompare = document.querySelectorAll('.remove-compare');
      removeCompare.forEach(removeEl => {
        removeEl.parentNode.addEventListener("click", this.handleRemoveCompare.bind(this));
      })
    }
  }
  getWidth() {
    const { data } = this.getData();
    if (data.length > 4) {
      return '25%';
    }
    if (data.length === 1) {
      return '50%';
    }
    return `${100 / data.length}%`;
  }
  render() {
    const { visible , data } = this.getData();
    const { map } = veda.utils;
    if (!visible) {
      return ''
    }
    if(data.length === 0) {
      return /*html */`
      <div class="compare-container d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:1200px h:1000px bgc:#fff mt:120px ov:auto">
          <div class="d:flex fld:column ai:center jc:center w:100% h:100%">
            <h2>Compare Empty</h2>
            <p>Please add product to compare</p>
          </div>
        </div>
      </div>
      `
    }
    return /*html*/`
      <div class="compare-container d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:1200px h:800px bgc:#fff mt:120px ov:auto pos:relative">
          <div class="close t:0 r:0 cur:pointer w:20px h:20px bgc:red pos:absolute ta:center">X</div>
          <div class="d:flex fld:column ai:center jc:center">
            <h2 class="fz:35px mt:85px">Compare</h2>
            <div class="acbxyz"></div>
            <div class="fz:25px lh:32px mt:7px mb:80px">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <div class="w:100% d:flex">
              <div class="w:11% z:99">
                <table class="compare-container__table bd:1px_solid_color-gray3">
                <tbody>
                  ${this.compareData.product_enable?`<tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:423px">${this.compareData.product_title}</td>
                  </tr>`:""}
                  ${this.compareData.rating_enable?`<tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">${this.compareData.rating_title}</td>
                  </tr>`:""}
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Description</td>
                  </tr>
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Availability</td>
                  </tr>
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Product Type</td>
                  </tr>
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">SKU</td>
                  </tr>
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Size</td>
                  </tr>
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Color</td>
                  </tr>
                  <tr>
                    <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Option</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <div class="w:89% ov:auto ml:-6px">
                <table class="compare-container__table bd:1px_solid_color-gray3 w:auto">
                <tbody>
                  ${this.compareData.product_enable?`<tr>
                    ${map(data, item => /*html*/`<td class="bd:1px_solid_color-gray3 miw:270px padding:35px_10px_35px_10px h:423px" style="width: ${this.getWidth()}">
                      <div class="product-card d:flex fld:column ai:center ta:center">
                        <div class="product-card__img w:100% pos:relative ov:hidden">
                          <div class="pet-product-card__image">
                            <a href="#" class="core-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
                              <img class="product-card__image bd:none!" src="${ item.featured_image.src}" alt="">
                            </a>
                          </div>
                          <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
                            <div data-id=${item.id} class="product-card__icon-bg cur:pointer" data-tooltip="Remove Compare" data-tooltip-position="left">
                              <i class="remove-compare fas fa-times"></i>
                            </div>
                          </div>
                        </div>
                        <div class="product-card__content d:flex fld:column jc:center ai:center">
                          <div class="product-card__brand c:color-gray5 mt:11px">${item.vendor}</div>
                            <a class="product-card__name fz:16px mt:15px c:color-dark bd:none!" href="#">${item.title}</a>
                            <a class="product-card__price mt:14px bd:none!" href="#">
                              <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none bd:none!">$${item.price }</ins>
                            </a>
                          </div>
                          <div class="product-card__add pos:static trf:translateY(0) mt:25px w:250px">
                            <a class="pos:absolute td:none w:100% h:100% va:middle lh:50px t:50% l:50% trf:translate(-50%,-50%) c:color-light" href="#">ADD TO CART</a>
                          </div>
                        </div>
                    </td>`)}
                  </tr>
                  `:""}

                  ${this.compareData.rating_enable?`<tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px ta:center h:98px">
                        <i class="far fa-star c:#FEAA01 fz:24px"></i>
                        <i class="far fa-star c:#FEAA01 fz:24px"></i>
                        <i class="far fa-star c:#FEAA01 fz:24px"></i>
                        <i class="far fa-star c:#FEAA01 fz:24px"></i>
                        <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    </td>`)}
                  </tr>`
                  :""}
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px ta:center h:98px">a</td>`)}
                  </tr>
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px h:98px">${item.type}</td>`)}
                  </tr>
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px h:98px">${item.handle}</td>`)}
                  </tr>
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px h:98px">${item.handle}</td>`)}
                  </tr>
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px h:98px">${item.handle}</td>`)}
                  </tr>
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px h:98px">${item.handle}</td>`)}
                  </tr>
                  <tr>
                    ${map(data, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px h:98px">${item.handle}</td>`)}
                  </tr>
                </tbody>
              </table>
              </div>
            </div>


          </div>

        </div>
      </div>
    `

  }

  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}
class CartPopop {
  constructor(storeName, classEl) {
    this.storeName = storeName;
    this.classEl = classEl;
    this.el = this.createComparePortal();
    this.mounted();
    this.init();
    store.subscribe(PREFIX + this.storeName, this.init.bind(this));
  }
  mounted() {
    this.compareBtnEl = container.querySelector("."+this.classEl);
    this.compareBtnEl.parentNode.addEventListener('click', this.handleTogglePopup.bind(this));
  }

  createComparePortal() {
    const rootEl = document.querySelector('#root');
    const el = document.createElement('div');
    rootEl.appendChild(el);
    return el;
  }

  getData() {
    return store.get(PREFIX+this.storeName);
  }

  handleTogglePopup() {
    store.set(PREFIX+ this.storeName,items => {
      return {
        ...items,
        visible : !items.visible
      }
    });
  }
  handleRemoveCart(event) {
    store.set(PREFIX + this.storeName,compare => {
      return {
        ...compare,
        data: compare.data.filter(item => item.id !== event.currentTarget.getAttribute("data-id"))
      }
    })(this.storeName+"/remove");
  }
  handleDOM() {
    const { visible , data } = this.getData();
    const closeEl = document.querySelectorAll('.close');
    if (closeEl) {
      closeEl.forEach(elClose => {
        elClose.addEventListener('click', this.handleTogglePopup.bind(this));
      })
    }
    if (visible) {
      const removeCart = document.querySelectorAll('.doan-remove-cart');
      removeCart.forEach(removeEl => {
        removeEl.addEventListener("click", this.handleRemoveCart.bind(this));
      })
    }
    else {

    }
  }

  render() {
    const { visible , data } = this.getData();
    const { map } = veda.utils;
    if (!visible) {
      const cartContainer = document.querySelector(".menu-cart__container");
      if(cartContainer) {
        cartContainer.style.transform = "translateX(100%)";
      }
      // const timeInterval = setInterval(() =>{
      //   return ""
      // },1000);
      // clearInterval(timeInterval);
      return ""
    }
    if(data.length === 0) {
      return /*html */`
      <div class="d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
      <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
      <div class="menu-cart__container w:350px h:800px bgc:#fff ov:auto pos:absolute t:0 r:0 trf:translateX(100%) trs:all_0.3s">
        <div class="pos:absolute t:0 r:0">X</div>
        <div class="d:flex fld:column ai:center jc:center">
          <h2 class="fz:35px mt:85px">Cart Empty</h2>
        </div>
      </div>
      </div>
      `
    }

    return /*html*/`
      <div class="d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="menu-cart__container w:350px mah:800px bgc:#fff ov:auto pos:absolute t:0 r:0 trf:translateX(100%) trs:all_0.3s pb:20px">
          <div class="close pos:absolute t:5px r:10px w:25px h:25px fz:25px cur:pointer"><i class="far fa-times"></i></div>
          <div><h4 class="fz:20px ml:15px mt:10px">SHOPPING CART</h4></div>
          <div class="d:flex fld:column jc:flex-start mah:90%">
            <div class="d:flex fld:column jc:flex-start mah:80%">
              ${map(data,item => {
                return /*html*/`<div class=" d:flex fld:row pt:10px ml:10px mr:10px bdb:1px_solid_color-gray4 pb:10px">
                  <div><img class="w:100px h:100px" src=${item.featured_image.url} alt="" /></div>
                  <div class="pl:10px">
                    <div class="fw:600">${item.title}</div>
                    <div>${item.vendor}</div>
                    <div>$${item.price}</div>
                    <div class="d:flex w:90px h:30px bd:1px_solid_color-gray3 bdrs:15px mt:5px
                    mb:10px">
                      <div class="w:20px h:100% ta:center cur:pointer fw:600 fz:20px lh:30px">-</div>
                      <div class="w:50px h:100% ta:center lh:30px fw:600">1</div>
                      <div class="w:20px h:100% ta:center cur:pointer fw:600 fz:20px lh:30px">+</div>
                    </div>
                    <button class="doan-edit-cart"><i class="fas fa-edit"></i></button>
                    <button data-id=${item.id} class="doan-remove-cart"><i class="fas fa-trash-alt"></i></button>
                  </div>
                </div>`
              })}
            </div>
            <div>
              <div class="d:flex jc:space-between mt:20px mb:10px"><div class="ml:10px fw:600">Subtotal:</div><div class="mr:10px fw:600">$1234</div></div>
              <input class="ml:10px" type="checkbox"/> I agree with the terms and conditions
            </div>
            <div class="d:flex jc:center mt:10px h:40px">
              <a href="mycart.html" class="close ta:center w:90% bd:1px_solid_color-gray4 bdrs:20px bgc:#43aeee c:color-light lh:40px">View cart</a>
            </div>


          </div>

        </div>
      </div>
    `

  }
  init() {
    const { visible , data } = this.getData();
    this.el.innerHTML = this.render();
    if(visible) {
      const timeInterval = setInterval(() =>{
        const cartContainer = document.querySelector(".menu-cart__container");
        if(cartContainer) {
          cartContainer.style.transform = "translateX(0)";
        }
        clearInterval(timeInterval);
      },100);
    }

    this.handleDOM();
  }
}
new StoreBadge("Compare","menu__card-compare");
new StoreBadge("WishList","menu__wish-list");
new StoreBadge("Cart","menu__cart");
new ComparePopop("Compare","menu__card-compare");
new CartPopop("Cart","menu__cart");


const {Component, html, withStore, render} = veda.utils.csr;
class Counter extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log("test");
  }

  render() {
    const { store, actions, kt ,id, cls} = this.props;
    console.log(this.props)
    return html`
      <div onClick=${this.handleClick.bind(this)} id=${id} class=${cls}>${kt}acsa</div>
    `
  }
}

const CounterWithStore = withStore('count')(Counter);

//render(html`<${CounterWithStore} id=${"a1"} kt=${123} cls=${"cls"}/>`,document.querySelector(".acbxyz"));
