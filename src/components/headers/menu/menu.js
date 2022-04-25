const uniqueId = "headers";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse, VQuery: $$ } = veda.utils;
// console.log(container.offsetHeight);


window.addEventListener("scroll", () => {
  if(window.screenY > container.offsetHeight) {
    container.classList.add("sticky-menu");
  }
  else {
    container.classList.remove("sticky-menu");
  }
})

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
        <div class="w:90% w:1200px@md h:1000px bgc:#fff mt:120px ov:auto">
          <div class="d:flex fld:column ai:center jc:center w:100% h:100%">
            <h2>Compare Empty</h2>
            <p>Please add product to compare</p>
          </div>
        </div>
      </div>
      `
    }
    return /*html*/`
      <div class="compare-container d:flex ai:flex-start jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:90% w:1218px@md h:800px bgc:#fff mt:10% ov:auto pos:relative ml:30px">
          <div class="d:flex fld:column ai:center jc:center">
            <h2 class="fz:35px mt:60px ta:center fw:500 c:color-gray9">Compare</h2>
            <div class="acbxyz"></div>
            <div class="fz:25px lh:32px mt:7px mb:30px ta:center fw:400 c:color-gray9">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <div class="w:100% d:flex">
              <div class="z:99">
                ${this.compareData.product_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px" style="height: ${this.getHeight()}">
                 ${this.compareData.product_title}
                </div>`:''}
                ${this.compareData.rating_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">
                  ${this.compareData.rating_title}
                </div>`:''}
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Description</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Availability</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Product Type</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">SKU</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Size</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Color</div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Option</div>
              </div>
              <div class="ov:auto">
                <div class="maw:3000px d:flex w:auto flw:wrap" style="width:${this.getWidthMax()}">
                  ${map(data,item => `
                  <div class="d:flex fld:column" style="width: ${this.getWidth()}">
                    ${this.compareData.product_enable?`<div class="bd:1px_solid_color-gray3 bdstart:0px! miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px w:100%" style="min-height: ${this.getHeight()};border-left:0px;">
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
                  ${this.compareData.rating_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center" style="border-left:0px;border-top:0px;">
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    <i class="far fa-star c:#FEAA01 fz:24px"></i>
                  </div>`:''}
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">Description</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;" >Availability</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">${item.type}</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">SKU</div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">

                  </div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">

                  </div>
                  <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">Option</div>
                  </div>
                `)}
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="close cur:pointer w:30px h:30px ta:center mt:9%"><i class="far fa-times c:color-gray9 fz:35px c:color-gray9 c:color-primary|h"></i></div>
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
    const { visible } = this.getData();
    if (visible) {
      const cartContainer = document.querySelector(".menu-cart__container");
      setTimeout(() => {
        if(cartContainer) {
          cartContainer.style.transform = "translateX(100%)";
        }
      }, 0);
      setTimeout(() => {
        if(cartContainer) {
          store.set(PREFIX+ this.storeName,items => {
            return {
              ...items,
              visible : !items.visible
            }
          });
        }
      }, 200);
    }
    else {
      store.set(PREFIX+ this.storeName,items => {
        return {
          ...items,
          visible : !items.visible
        }
      });
    }

  }
  handleRemoveCart(event) {
    const currentId  = event.currentTarget.getAttribute("data-id");
    fetch('https://624eadac53326d0cfe5dba36.mockapi.io/cart/' + currentId, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        store.set(PREFIX + this.storeName,carts => {
          return {
            ...carts,
            data: carts.data.filter(item => item.id !== currentId)
          }
        })(this.storeName+"/remove");
      })
      .catch(err => {
        console.log(err);
        alert("Delete Cart Error");
      });

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
      return "";


      // const timeInterval = setInterval(() =>{
      //   return ""
      // },1000);
      // clearInterval(timeInterval);

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
        <div class="menu-cart__container w:95% w:350px@sm h:100% bgc:#fff ov:auto pos:absolute t:0 r:0 trf:translateX(100%) trs:all_0.3s pb:20px">
          <div class="close-cart pos:absolute t:5px r:10px w:25px h:25px fz:25px cur:pointer"><i class="far fa-times"></i></div>
          <div><h4 class="fz:20px ml:15px mt:10px">SHOPPING CART</h4></div>
          <div class="d:flex fld:column jc:flex-start h:90%">
            <div class="d:flex fld:column jc:flex-start h:80% ovx:auto">
              ${map(data,item => {
                return /*html*/`<div class=" d:flex fld:row pt:10px ml:10px mr:10px bdb:1px_solid_color-gray4 pb:10px">
                  <div class="w:100px">
                    <a class="veda-image-cover d:block w:100%" css="--aspect-ratio: 3/5">
                      <img src=${item.image} alt="image-cart" />
                    </a>
                  </div>
                  <div class="pl:10px">
                    <div class="fw:600">${item.title}</div>
                    <div>${item.vendor}</div>
                    <div>$${item.price}</div>
                    <div class="d:flex w:90px h:30px bd:1px_solid_color-gray3 bdrs:15px mt:5px
                    mb:10px">
                      <div class="w:20px h:100% ta:center cur:pointer lh:30px pl:10px"><i class="fal fa-minus fz:13px"></i></div>
                      <div class="w:50px h:100% ta:center lh:30px fw:600">1</div>
                      <div class="w:20px h:100% ta:center cur:pointer lh:30px pr:10px"><i class="fal fa-plus fz:13px"></i></div>
                    </div>
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
    const cartContainer = document.querySelector(".menu-cart__container");
    if (cartContainer) {
      if(visible) {
        cartContainer.style.transform = "translateX(0)";
      }
    }
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

