import { CartService } from "../../home/products/products.js";
const uniqueId = "headers";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse, VQuery: $$ } = veda.utils;
const { Component, html, render, renderWithElement, createPortal} = veda.utils.csr;
const { message } = veda.plugins;
const cartService = new CartService();
// console.log(container.offsetHeight);

// window.addEventListener("scroll", () => {
//   console.log("body",document.querySelector("body").scrollTop);
//   // if(document.querySelector("#root").screenY > container.offsetHeight) {
//   //   // container.classList.add("sticky-menu");
//   //   console.log(document.querySelector("#root").screenY);
//   // }
//   // else {
//   //   // container.classList.remove("sticky-menu");
//   //   console.log(window.screenY);
//   // }
// })

//veda.plugins.themeToggle(container);
const PREFIX = 'yasmina';

store.create(`${PREFIX}Compare`, {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create(`${PREFIX}WishList`, {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create(`${PREFIX}Cart`, {
  initialState: [],
  useStorage: true
});
store.create(`${PREFIX}CartVisible`, {
  initialState: false,
  useStorage: false
});
class StoreBadge {
  constructor(storeName, elClass) {
    this.storeName = storeName;
    this.el = container.querySelector(`.${elClass}`);
    this.init();
    store.subscribe(`${PREFIX}${this.storeName}`,this.init.bind(this));
  }

  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }

  render() {
    let count;
    if(this.storeName === "Cart") {
      count = this.getData().length;
    }
    else {
      count = this.getData().data.length;
    }

    if (!count) {
      return ''
    }
    return /*html*/`<div class="d:flex jc:center ai:center c:color-light pos:absolute b:50% l:80% w:16px h:16px fz:9px bdrs:8px bgc:red fw:500">${count}</div>`;
  }
  init() {
    this.el.innerHTML = this.render();
  }
}
class ComparePopupItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { item, onRemove, height, width} = this.props;
    return html`
      <div class="d:flex fld:column">
      <div class="bd:1px_solid_color-gray3 bdstart:0px! miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px" style="min-height: ${height};border-left:0px;width: ${width}">
        <div class="yasmina-product-card d:flex fld:column ai:center ta:center">
          <div class="product-card__img w:100% pos:relative ov:hidden">
            <div class="pet-product-card__image">
              <a href="#" class="veda-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
                <img class="product-card__image bd:none!" src="${ item.featured_image.src}" alt="">
              </a>
            </div>
            <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
              <div data-id=${item.id} class="yasmina-product-card__icon-bg cur:pointer bgc:color-dark!|h c:color-light!|h" data-tooltip="Remove Compare" data-tooltip-position="left" onClick=${onRemove}>
                <i class="remove-compare fal fa-times"></i>
              </div>
            </div>
          </div>
          <div class="product-card__content d:flex fld:column jc:center ai:center">
            <div class="product-card__brand c:color-gray5 mt:11px fw:400 fz:14px ">${item.vendor}</div>
            <a class="product-card__name fz:16px mt:15px c:color-dark bd:none!" href="#">${item.title}</a>
            <a class="product-card__price mt:14px bd:none!" href="#">
             <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none bd:none!">$${item.price }</ins>
            </a>
          </div>
        </div>
      </div>
      </div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center" style="border-left:0px;border-top:0px;width: ${width}">
        <i class="far fa-star c:#FEAA01 fz:24px"></i>
        <i class="far fa-star c:#FEAA01 fz:24px"></i>
        <i class="far fa-star c:#FEAA01 fz:24px"></i>
        <i class="far fa-star c:#FEAA01 fz:24px"></i>
        <i class="far fa-star c:#FEAA01 fz:24px"></i>
      </div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}">Description</div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}" >Availability</div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}">${item.type}</div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}">SKU</div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}"></div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}"></div>
      <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;width: ${width}">Option</div>
      </div>
      `
  }
}
class ComparePopupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visible: false,
    }
    this.mounted();
    store.subscribe(`${PREFIX}Compare`, this.handleGetItems.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}Compare`);
  }
  handleGetItems() {
    const { data, visible } = this.getData();
    this.setState({
      items: data,
      visible: visible,
    });
  }
  mounted() {
    this.compareBtnEl = container.querySelector(`.menu__card-compare`);
    this.compareBtnEl.parentNode.addEventListener('click', this.handleTogglePopup.bind(this));
  }
  getWidthMax() {
    const { data } = this.getData();
    return `${(1080 * 25 / 100) * data.length}px`;
  }
  getWidth() {
    return `${1080 * 25 / 100}px`;
  }
  getHeight() {
    return `380px`;
  }
  getMaxHeight() {
    const contentEl = document.querySelector(`.compare-content`);
    return `${contentEl.clientHeight - 685}px`;
  }
  handleTogglePopup() {
    store.set(`${PREFIX}Compare`,items => {
      return {
        ...items,
        visible : !items.visible
      }
    });
  }
  handleRemoveCompare(event) {
    store.set(`${PREFIX}Compare`,compare => {
      return {
        ...compare,
        data: compare.data.filter(item => item.id !== event.currentTarget.getAttribute("data-id"))
      }
    })(`${PREFIX}Compare`+ "/remove");
  }
  renderItem = item => {
    return  html`<${ComparePopupItem} key=${item.id} item=${item} onRemove=${this.handleRemoveCompare} height=${this.getHeight()} width=${this.getWidth()} />`;
  };
  render() {
    const { visible , items } = this.state;
    const { map } = veda.utils;
    const contentEl = document.querySelector(`.compare-content`);


    if (!visible) {
      return ''
    }
    if(items.length === 0) {
      return html`
      <div class="compare-container d:flex ai:flex-start jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4" onClick=${this.handleTogglePopup}></div>
        <div class="w:90% w:1218px@md h:85vh bgc:#fff mt:4% ov:auto pos:relative ml:30px">
          <div class="d:flex fld:column ai:center jc:center">
            <h2 class="fz:35px mt:60px ta:center fw:500 c:color-gray9">Compare Empty</h2>
            <div class="fz:25px lh:32px mt:7px mb:30px ta:center fw:400 c:color-gray9">Please add product to compare</div>
          </div>
        </div>
        <div class="close cur:pointer w:30px h:30px ta:center mt:3% ml:-20px z:100 bdrs:15px bgc:color-light" onClick=${this.handleTogglePopup}>
          <i class="fal fa-times c:color-gray9 fz:20px c:color-gray9 lh:30px c:color-primary|h"></i>
        </div>
      </div>
      `
    }

    return /*html*/html`
      <div class="compare-container d:flex ai:flex-start jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4" onClick=${this.handleTogglePopup}></div>
        <div class="veda-scrollbar w:90% w:1218px@md h:85vh bgc:#fff mt:4% ov:auto pos:relative ml:30px">
          <div class="compare-content d:flex fld:column ai:center jc:center">
            <h2 class="fz:35px mt:60px ta:center fw:500 c:color-gray9">Compare</h2>
            <div class="fz:25px lh:32px mt:7px mb:30px ta:center fw:400 c:color-gray9">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <div class="w:100% d:flex">
              <div class="z:99">
               <div class="w:125px bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px" style="height: ${this.getHeight()}">
                 Product
                </div>
                <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">
                  Rating
                </div>
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
                  ${items.map(this.renderItem)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="close cur:pointer w:30px h:30px ta:center mt:3% ml:-20px z:100 bdrs:15px bgc:color-light" onClick=${this.handleTogglePopup}>
          <i class="fal fa-times c:color-gray9 fz:20px c:color-gray9 lh:30px c:color-primary|h"></i>
        </div>
      </div>
    `

  }
}
class ComparePopupAction {


}

// class ComparePopupContaner {
//   constructor(data) {
//     this.el = this.createComparePortal();
//     this.init();
//   }
//   createComparePortal() {
//     const rootEl = document.querySelector('#root');
//     const el = document.createElement('div');
//     rootEl.appendChild(el);
//     return el;
//   }
//   init() {
//     render(html`<${ComparePopup}/>`,this.el);
//   }
// }
// class ComparePopop {
//   constructor(storeName, classEl) {
//     this.storeName = storeName;
//     this.classEl = classEl;
//     this.el = this.createComparePortal();
//     this.compareData = objectParse(container.querySelector(".compare-popup-data").textContent);
//     this.mounted();
//     this.init();
//     store.subscribe(`${PREFIX}${this.storeName}`, this.init.bind(this));
//   }
//   mounted() {
//     this.compareBtnEl = container.querySelector(`.${this.classEl}`);
//     this.compareBtnEl.parentNode.addEventListener('click', this.handleTogglePopup.bind(this));
//   }

//   createComparePortal() {
//     const rootEl = document.querySelector('#root');
//     const el = document.createElement('div');
//     rootEl.appendChild(el);
//     return el;
//   }

//   getData() {
//     return store.get(`${PREFIX}${this.storeName}`);
//   }

//   handleTogglePopup() {
//     store.set(`${PREFIX}${this.storeName}`,items => {
//       return {
//         ...items,
//         visible : !items.visible
//       }
//     });
//   }
//   handleRemoveCompare(event) {
//     store.set(`${PREFIX}${this.storeName}`,compare => {
//       return {
//         ...compare,
//         data: compare.data.filter(item => item.id !== event.currentTarget.getAttribute("data-id"))
//       }
//     })(this.storeName + "/remove");
//   }
//   handleDOM() {
//     const { visible , data } = this.getData();
//     const closeEl = document.querySelectorAll('.close');
//     if (closeEl) {
//       closeEl.forEach(elClose => {
//         elClose.addEventListener('click', this.handleTogglePopup.bind(this));
//       })
//     }
//     if (visible) {
//       const removeCompare = document.querySelectorAll('.remove-compare');
//       removeCompare.forEach(removeEl => {
//         removeEl.parentNode.addEventListener("click", this.handleRemoveCompare.bind(this));
//       })
//     }
//   }
//   getWidthMax() {
//     const { data } = this.getData();
//     return `${(1095 * 25 / 100) * data.length}px`;
//   }
//   getWidth() {
//     return `${1095 * 25 / 100}px`;
//   }
//   getHeight() {
//     return `380px`;
//   }
//   render() {
//     const { visible , data } = this.getData();
//     const { map } = veda.utils;
//     if (!visible) {
//       return ''
//     }
//     if(data.length === 0) {
//       return /*html */`
//       <div class="compare-container d:flex ai:flex-start jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
//         <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
//         <div class="w:90% w:1218px@md h:85vh bgc:#fff mt:4% ov:auto pos:relative ml:30px">
//           <div class="d:flex fld:column ai:center jc:center">
//             <h2 class="fz:35px mt:60px ta:center fw:500 c:color-gray9">Compare Empty</h2>
//             <div class="acbxyz"></div>
//             <div class="fz:25px lh:32px mt:7px mb:30px ta:center fw:400 c:color-gray9">Please add product to compare</div>
//           </div>
//         </div>
//         <div class="close cur:pointer w:30px h:30px ta:center mt:3% ml:-20px z:100 bdrs:15px bgc:color-light">
//           <i class="fal fa-times c:color-gray9 fz:20px c:color-gray9 lh:30px c:color-primary|h"></i>
//         </div>
//       </div>
//       `
//     }
//     return /*html*/`
//       <div class="compare-container d:flex ai:flex-start jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
//         <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
//         <div class="veda-scrollbar w:90% w:1218px@md h:85vh bgc:#fff mt:4% ov:auto pos:relative ml:30px">
//           <div class="d:flex fld:column ai:center jc:center">
//             <h2 class="fz:35px mt:60px ta:center fw:500 c:color-gray9">Compare</h2>
//             <div class="acbxyz"></div>
//             <div class="fz:25px lh:32px mt:7px mb:30px ta:center fw:400 c:color-gray9">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
//             <div class="w:100% d:flex">
//               <div class="z:99">
//                 ${this.compareData.product_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px" style="height: ${this.getHeight()}">
//                  ${this.compareData.product_title}
//                 </div>`:''}
//                 ${this.compareData.rating_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">
//                   ${this.compareData.rating_title}
//                 </div>`:''}
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Description</div>
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Availability</div>
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Product Type</div>
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">SKU</div>
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Size</div>
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Color</div>
//                 <div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px" style="border-top:0px;">Option</div>
//               </div>
//               <div class="ov:auto">
//                 <div class="maw:3000px d:flex w:auto flw:wrap" style="width:${this.getWidthMax()}">
//                   ${map(data,item => `
//                   <div class="d:flex fld:column" style="width: ${this.getWidth()}">
//                     ${this.compareData.product_enable?`<div class="bd:1px_solid_color-gray3 bdstart:0px! miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px w:100%" style="min-height: ${this.getHeight()};border-left:0px;">
//                     <div class="yasmina-product-card d:flex fld:column ai:center ta:center">
//                       <div class="product-card__img w:100% pos:relative ov:hidden">
//                         <div class="pet-product-card__image">
//                           <a href="#" class="veda-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
//                             <img class="product-card__image bd:none!" src="${ item.featured_image.src}" alt="">
//                           </a>
//                         </div>
//                         <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
//                           <div data-id=${item.id} class="yasmina-product-card__icon-bg cur:pointer bgc:color-dark!|h c:color-light!|h" data-tooltip="Remove Compare" data-tooltip-position="left">
//                             <i class="remove-compare fal fa-times"></i>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="product-card__content d:flex fld:column jc:center ai:center">
//                         <div class="product-card__brand c:color-gray5 mt:11px fw:400 fz:14px ">${item.vendor}</div>
//                           <a class="product-card__name fz:16px mt:15px c:color-dark bd:none!" href="#">${item.title}</a>
//                           <a class="product-card__price mt:14px bd:none!" href="#">
//                             <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none bd:none!">$${item.price }</ins>
//                           </a>
//                         </div>
//                       </div>
//                   </div>`:''}
//                   ${this.compareData.rating_enable?`<div class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center" style="border-left:0px;border-top:0px;">
//                     <i class="far fa-star c:#FEAA01 fz:24px"></i>
//                     <i class="far fa-star c:#FEAA01 fz:24px"></i>
//                     <i class="far fa-star c:#FEAA01 fz:24px"></i>
//                     <i class="far fa-star c:#FEAA01 fz:24px"></i>
//                     <i class="far fa-star c:#FEAA01 fz:24px"></i>
//                   </div>`:''}
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">Description</div>
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;" >Availability</div>
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">${item.type}</div>
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">SKU</div>
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">

//                   </div>
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">

//                   </div>
//                   <div class="bd:1px_solid_color-gray3 miw:100px fz:15px fw:400 va:top padding:35px_10px_35px_10px h:98px w:100% ta:center c:color-dark" style="border-left:0px;border-top:0px;">Option</div>
//                   </div>
//                 `)}
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="close cur:pointer w:30px h:30px ta:center mt:3% ml:-20px z:100 bdrs:15px bgc:color-light">
//           <i class="fal fa-times c:color-gray9 fz:20px c:color-gray9 lh:30px c:color-primary|h"></i>
//         </div>
//       </div>
//     `

//   }

//   init() {
//     this.el.innerHTML = this.render();
//     this.handleDOM();
//   }
// }

class CartPopop {
  constructor(storeName, classEl) {
    this.storeName = storeName;
    this.classEl = classEl;
    this.el = this.createComparePortal();
    this.mounted();
    this.initChangeVisible();
    this.currentCart = "1";
    store.subscribe(`${PREFIX}${this.storeName}`, this.init.bind(this));
    store.subscribe(`${PREFIX}CartVisible`, this.initChangeVisible.bind(this));
  }
  mounted() {
    this.compareBtnEl = container.querySelector(`.${this.classEl}`);
    this.compareBtnEl.parentNode.addEventListener('click', this.handleTogglePopup.bind(this));
  }

  createComparePortal() {
    const rootEl = document.querySelector('#root');
    const el = document.createElement('div');
    rootEl.appendChild(el);
    return el;
  }

  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  getDataCart() {
    return store.get(`${PREFIX}Cart`);
  }
  getDataCartVisible() {
    return store.get(`${PREFIX}CartVisible`);
  }
  handleTogglePopup() {
    const visible = this.getDataCartVisible();
    if (visible) {
      const cartContainer = document.querySelector(".menu-cart__container");
      setTimeout(() => {
        if(cartContainer) {
          cartContainer.style.transform = "translateX(100%)";
        }
      }, 0);
      setTimeout(() => {
        if(cartContainer) {
          store.set(`${PREFIX}CartVisible`,items => {
            return !items
          });
        }
      }, 200);
    }
    else {
      store.set(`${PREFIX}CartVisible`,items => {
        return !items
      });
    }

  }
  handleRemoveCart(event) {
    const currentId  = event.currentTarget.getAttribute("data-id");
    store.set(`${PREFIX}${this.storeName}`,carts => {
      return [...carts.filter(item => item.id !== currentId)]
    })(this.storeName+"/remove");
    message.error("Remove product from cart");
    cartService.delete(currentId);

  }
  handleDOM() {
    const visible = this.getDataCartVisible();
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
      this.handleChangeCurrentCart();
    }
    else {

    }
  }

  async updateStore() {
    const data = await cartService.getData();
    await store.set(`${PREFIX}Cart`, (items) => {
      return [...data];
    });
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
  handleChangeCurrentCart() {
    const lstCounter = document.querySelectorAll(".veda-counter");
    lstCounter.forEach(counter => {
      counter.addEventListener("click", () => {
        const currentId  = counter.getAttribute("data-id");
        console.log(currentId);
        this.currentCart = currentId;
      });
    });
  }
  async updateCart(id, quantity) {
    await cartService.update(id, quantity);
    await this.updateStore();
  }
  handleChangeQuantity(id , quantity) {
    const lstCounter = document.querySelectorAll(".veda-counter");
    if(quantity > 0) {
      this.updateCart(id, quantity);
    }
    else {
      store.set(`${PREFIX}Cart`, (items) => {
        return [...items.filter(item => item.id !== id)];
      });
      message.error(`Remove from Cart`);
      cartService.delete(id);
    }
  }
  render() {
    const data = this.getData();
    const visible = this.getDataCartVisible();
    const { map } = veda.utils;
    let totalPrice = data.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    },0);

    if (!visible) {
      return "";
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
          <div class="close-cart pos:absolute t:5px r:10px w:25px h:25px fz:25px cur:pointer">
            <i class="fal fa-times"></i>
          </div>
          <div><h4 class="fz:20px ml:15px mt:10px">SHOPPING CART</h4></div>
          <div class="d:flex fld:column jc:flex-start h:90%">
            <div class="d:flex fld:column jc:flex-start h:80% ovx:auto">
              ${map(data,item => {
                return /*html*/`<div class="yasmina-cart-popup-item pos:relative d:flex fld:row pt:10px ml:10px mr:10px bdb:1px_solid_color-gray4 pb:10px pl:10px">
                  <button data-id=${item.id} class="yasmina-remove-cart pos:absolute t:0 r:0 bgc:color-light! bgc:color-light|h! c:color-gray9 c:color-primary|h! bd:none!"><i class="fal fa-times"></i></button>
                  <div class="w:100px">
                    <a class="veda-image-cover d:block w:100%" css="--aspect-ratio: 3/5">
                      <img src=${item.image} alt="image-cart" />
                    </a>
                  </div>
                  <div class="pl:10px">
                    <div class="fw:600">${item.title}</div>
                    <div>${item.vendor}</div>
                    <div>$${item.price}</div>
                    <div class="veda-counter d:flex w:105px h:30px bd:1px_solid_color-gray3 bdrs:15px mt:5px
                    mb:10px" data-id="${item.id}" data-options="{ value: ${item.quantity} }">
                      <div class="veda-counter__decrement w:20px h:100% ta:center cur:pointer lh:30px pl:10px"><i class="fal fa-minus fz:13px"></i></div>
                      <input class="veda-counter__input w:65px h:100% ta:center lh:30px fw:600 bd:none! o:none! ta:center" type="number" data-button="disabled"/>
                      <div class="veda-counter__increment w:20px h:100% ta:center cur:pointer lh:30px pr:10px"><i class="fal fa-plus fz:13px"></i></div>
                    </div>

                  </div>
                </div>`
              })}
            </div>
            <div>
              <div class="d:flex jc:space-between mt:20px mb:10px"><div class="ml:10px fw:600">Subtotal:</div><div class="mr:10px fw:600">$${totalPrice}</div></div>
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
  initChangeVisible() {
    const visible = this.getDataCartVisible();
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
    veda.plugins.counter(this.el, {
      step: 1,
      value: 0,
      onChange: this.debounce((value) => {
        this.handleChangeQuantity(this.currentCart, value);
      })
    });
    this.handleDOM();
  }
  init() {
    const visible = this.getDataCartVisible();
    this.el.innerHTML = this.render();
    if(visible) {
      const cartContainer = document.querySelector(".menu-cart__container");
      if(cartContainer) {
        cartContainer.style.transform = "translateX(0)";
      }
    }
    veda.plugins.counter(this.el, {
      step: 1,
      value: 0,
      onChange: this.debounce((value) => {
        this.handleChangeQuantity(this.currentCart, value);
      })
    });
    this.handleDOM();
  }
}
new StoreBadge("Compare", "menu__card-compare");
new StoreBadge("WishList", "menu__wish-list");
new StoreBadge("Cart", "menu__cart");
// new ComparePopop("Compare", "menu__card-compare");
renderWithElement(createPortal(html`<div class="compare-poppup"><${ComparePopupView} /></div>`,document.querySelector('#root')),"abczxzx");
// new ComparePopupContaner();
new CartPopop("Cart", "menu__cart");


// const { Component, html, withStore, render} = veda.utils.csr;
// class Counter extends Component {
//   constructor(props) {
//     super(props);
//   }

//   handleClick() {
//     console.log("test");
//   }

//   render() {
//     const { store, actions, kt ,id, cls} = this.props;
//     console.log(this.props)
//     return html`
//       <div onClick=${this.handleClick.bind(this)} id=${id} class=${cls}>${kt}acsa</div>
//     `
//   }
// }

// const CounterWithStore = withStore('count')(Counter);

//render(html`<${CounterWithStore} id=${"a1"} kt=${123} cls=${"cls"}/>`,document.querySelector(".acbxyz"));

