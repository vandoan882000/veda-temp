const uniqueId = "header";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse, VQuery: $$ } = veda.utils;



veda.plugins.themeToggle(container);
const PREFIX = 'yasmina';

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
  getWidthMax() {
    const { data } = this.getData();
    if (data.length >= 4) {
      return `${(1068 * 25 / 100) * data.length}px`;
    }
    if (data.length === 1) {
      return `${(1068 * 50 / 100) * data.length}px`;
    }
    return `${(1068 *(100 / data.length) /100) * data.length}px`;
  }
  getWidth() {
    const { data } = this.getData();
    if (data.length >= 4) {
      return `${1068 * 25 / 100}px`;
    }
    if (data.length === 1) {
      return `${1068 * 50 / 100}px`;
    }
    return `${1068 * (100 / data.length) /100}px`;
  }
  getHeight() {
    const { data } = this.getData();
    if (data.length >= 4) {
      return `380px`;
    }
    if (data.length == 3) {
      return `442px`;
    }
    if (data.length <= 2) {
      return `575px`;
    }
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
        <div class="close t:10% r:10% cur:pointer w:30px h:30px bgc:red pos:absolute ta:center"><i class="far fa-times c:color-gray9 fz:25px lh:30px"></i></div>
        <div class="w:1218px h:800px bgc:#fff mt:120px ov:auto pos:relative">
          <div class="d:flex fld:column ai:center jc:center">
            <h2 class="fz:35px mt:85px">Compare</h2>
            <div class="acbxyz"></div>
            <div class="fz:25px lh:32px mt:7px mb:80px">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <div class="w:100% d:flex">
              <div class="w:11% z:99">
                ${this.compareData.product_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px" style="height: ${this.getHeight()}">
                 ${this.compareData.product_title}
                </div>`:''}
                ${this.compareData.rating_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">
                  ${this.compareData.rating_title}
                </div>`:''}
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Description</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Availability</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Product Type</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">SKU</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Size</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Color</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px">Option</div>
              </div>
              <div class="w:89% ov:auto">
                <div class="maw:3000px d:flex w:auto flw:wrap" style="width:${this.getWidthMax()}">
                  ${map(data,item => `
                  <div class="d:flex fld:column" style="width: ${this.getWidth()}">
                    ${this.compareData.product_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px w:100%" style="min-height: ${this.getHeight()}">
                    <div class="yasmina-product-card d:flex fld:column ai:center ta:center">
                      <div class="product-card__img w:100% pos:relative ov:hidden">
                        <div class="pet-product-card__image">
                          <a href="#" class="veda-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
                            <img class="product-card__image bd:none!" src="${ item.featured_image.src}" alt="">
                          </a>
                        </div>
                        <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
                          <div data-id=${item.id} class="yasmina-product-card__icon-bg cur:pointer bgc:color-dark!|h c:color-light!|h" data-tooltip="Remove Compare" data-tooltip-position="left">
                            <i class="remove-compare fal fa-times"></i>
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
                      </div>
                  </div>`:''}
                  ${this.compareData.rating_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center">
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                  </div>`:''}
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark">Description</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" >Availability</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark">${item.type}</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark">SKU</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark">

                  </div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark">

                  </div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark">Option</div>
                  </div>
                `)}
                </div>

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
    return store.get(PREFIX + this.storeName);
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
    const closeEl = document.querySelectorAll('.close-cart');
    if (closeEl) {
      closeEl.forEach(elClose => {
        elClose.addEventListener('click', this.handleTogglePopup.bind(this));
      })
    }
    if (visible) {
      const removeCart = document.querySelectorAll('.yasmina-remove-cart');
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
      <div class="close-cart pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
      <div class="menu-cart__container w:350px h:800px bgc:#fff ov:auto pos:absolute t:0 r:0 trf:translateX(100%) trs:all_0.3s">
      <div class="close-cart pos:absolute t:5px r:10px w:25px h:25px fz:25px cur:pointer"><i class="far fa-times"></i></div>
        <div class="d:flex fld:column ai:center jc:center">
          <h2 class="fz:35px mt:85px">Cart Empty</h2>
        </div>
      </div>
      </div>
      `
    }

    return /*html*/`
      <div class="d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close-cart pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="menu-cart__container w:350px h:100% bgc:#fff ov:auto pos:absolute t:0 r:0 trf:translateX(100%) trs:all_0.3s pb:20px">
          <div class="close-cart pos:absolute t:5px r:10px w:25px h:25px fz:25px cur:pointer"><i class="far fa-times"></i></div>
          <div><h4 class="fz:20px ml:15px mt:10px">SHOPPING CART</h4></div>
          <div class="d:flex fld:column jc:flex-start h:90%">
            <div class="d:flex fld:column jc:flex-start h:80% ovx:auto">
              ${map(data,item => {
                return /*html*/`<div class=" d:flex fld:row pt:10px ml:10px mr:10px bdb:1px_solid_color-gray4 pb:10px">
                  <div class="w:100px">
                    <a class="veda-image-cover d:block w:100%" css="--aspect-ratio: 3/5">
                      <img src=${item.featured_image.url} alt="image-cart" />
                    </a>
                  </div>
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
                    <button class="yasmina-edit-cart"><i class="fas fa-edit"></i></button>
                    <button data-id=${item.id} class="yasmina-remove-cart"><i class="fas fa-trash-alt"></i></button>
                  </div>
                </div>`
              })}
            </div>
            <div>
              <div class="d:flex jc:space-between mt:20px mb:10px"><div class="ml:10px fw:600">Subtotal:</div><div class="mr:10px fw:600">$1234</div></div>
              <input class="ml:10px" type="checkbox"/> I agree with the terms and conditions
            </div>
            <div class="d:flex jc:center mt:10px h:40px">
              <a href="mycart.html" class="close-cart ta:center w:90% bd:1px_solid_color-gray4 bdrs:20px bgc:#43aeee c:color-light lh:40px">View cart</a>
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


const { Component, html, withStore, render} = veda.utils.csr;
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

