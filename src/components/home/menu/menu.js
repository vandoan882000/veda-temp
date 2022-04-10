const uniqueId = "header";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map } = veda.utils;
veda.plugins.themeToggle(container);
const PREFIX = 'doan'

store.create('doanCompareVisible', {
  initialState: false,
});
store.create("doanCompare", {
  initialState: [],
  useStorage: true
});
store.create("doanWishList", {
  initialState: [],
  useStorage: true
});
store.create("doanCart", {
  initialState: [],
  useStorage: true
});
class StoreBadge {
  constructor(storeName, elClass) {
    this.storeName = storeName;
    this.el = container.querySelector("."+elClass);
    this.init();
    store.subscribe(""+storeName,this.init.bind(this));
  }

  getData() {
    return store.get(""+this.storeName);
  }

  render() {
    const count = this.getData().length;
    if (!count) {
      return '0'
    }
    return `${count}`;
  }
  init() {
    this.el.innerHTML = this.render();
  }
}

class ComparePopop {
  static compareElClick = undefined;
  constructor() {
    this.el = this.createComparePortal();
    this.mounted();
    this.init();
    store.subscribe('doanCompare', this.init.bind(this));
    store.subscribe('doanCompareVisible', this.init.bind(this));
  }
  addEventCompare() {
    if(!ComparePopop.compareElClick) {
      ComparePopop.compareElClick = true;
      this.compareBtnEl.parentNode.addEventListener('click', this.handleTogglePopup.bind(this));
    }
  }
  mounted() {
    this.compareBtnEl = container.querySelector(".menu__card-compare");
  }

  createComparePortal() {
    const rootEl = document.querySelector('#root');
    const el = document.createElement('div');
    rootEl.appendChild(el);
    return el;
  }

  getData() {
    return {
      compare: store.get('doanCompare'),
      visible: store.get('doanCompareVisible')
    };
  }

  handleTogglePopup() {
    store.set('doanCompareVisible', state => !state)('compare/visible');
  }
  handleRemoveCompare(event) {
    store.set("doanCompare",compare => {
      return compare.filter(item => item.id !== event.currentTarget.id);
    })("compare/remove");
  }
  handleDOM() {
    const { visible , compare } = this.getData();
    const closeEl = document.querySelectorAll('.close');
    this.addEventCompare();
    if (closeEl) {
      closeEl.forEach(elClose => {
        elClose.addEventListener('click', this.handleTogglePopup.bind(this));
      })
    }
    if (visible) {
      console.log("width",this.getWidth());
      const removeCompare = document.querySelectorAll('.remove-compare');
      removeCompare.forEach(removeEl => {
        removeEl.parentNode.addEventListener("click", this.handleRemoveCompare.bind(this));
      })
    }
  }
  getWidth() {
    const { compare } = this.getData();
    if (compare.length > 4) {
      return '25%';
    }
    if (compare.length === 1) {
      return '50%';
    }
    return `${100 / compare.length}%`;
  }
  render() {
    const { visible , compare } = this.getData();
    const { map } = veda.utils;
    if (!visible) {
      return ''
    }
    if(compare.length === 0) {
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
            <div class="fz:25px lh:32px mt:7px mb:80px">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <div class="w:100% ov:auto">
              <table class="compare-container__table bd:1px_solid_color-gray3 w:auto">
              <tbody>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Product</td>
                  ${map(compare, item => /*html*/`<td class="bd:1px_solid_color-gray3 miw:270px padding:35px_10px_35px_10px" style="width: ${this.getWidth()}">
                    <div class="product-card d:flex fld:column ai:center ta:center">
                      <div class="product-card__img w:100% pos:relative ov:hidden">
                        <div class="pet-product-card__image">
                          <a href="#" class="core-image-cover d:block bd:none!" css="--aspect-ratio: 3/4">
                            <img class="product-card__image bd:none!" src="${ item.featured_image.src}" alt="">
                          </a>
                        </div>
                        <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
                          <div id=${item.id} class="product-card__icon-bg cur:pointer" data-tooltip="Remove Compare" data-tooltip-position="left">
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
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Rating</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px ta:center">
                      <i class="far fa-star c:#FEAA01 fz:24px"></i>
                      <i class="far fa-star c:#FEAA01 fz:24px"></i>
                      <i class="far fa-star c:#FEAA01 fz:24px"></i>
                      <i class="far fa-star c:#FEAA01 fz:24px"></i>
                      <i class="far fa-star c:#FEAA01 fz:24px"></i>
                    </td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Description</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px ta:center">a</td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Availability</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px">${item.type}</td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Product Type</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px">${item.handle}</td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">SKU</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px">${item.handle}</td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Size</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px">${item.handle}</td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Color</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px">${item.handle}</td>`)}
                </tr>
                <tr>
                  <td class="bd:1px_solid_color-gray3 miw:100px fz:18px fw:500 va:top padding:35px_10px_35px_10px">Option</td>
                  ${map(compare, item => `<td class="bd:1px_solid_color-gray3 miw:270px va:top padding:35px_10px_35px_10px">${item.handle}</td>`)}
                </tr>
              </tbody>
            </table>
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
new StoreBadge("doanCompare","menu__card-compare");
new StoreBadge("doanWishList","menu__wish-list");
new StoreBadge("doanCart","menu__cart");
new ComparePopop();

// class CompareProduct {
//   constructor() {

//     this.init();
//   }

//   getData() {
//     return store.get('compare');
//   }

//   handleShowCompareClick() {
//     const root = document.getElementById("root");
//     const compareBox = document.querySelector(".compare-container");
//     if(compareBox.style.display == "block") {
//       compareBox.style.display = "none";
//       root.style.opacity = "1";
//     }
//     else {
//       compareBox.style.display = "block";
//       root.style.opacity = "0.7";
//     }
//   }

//   handleShowCompare() {
//     document.querySelector(".fa-box-up").addEventListener("click", this.handleShowCompareClick.bind(this));
//   }
//   renderNumberCompare() {
//     document.querySelector(".menu__card-compare").innerHTML = this.getData().length || "0";
//     const { store } = veda.utils;
//     if (store.get()) {
//       const { compare } = store.get();
//       document.querySelector(".menu__card-compare").innerHTML = compare.length
//     };
//     store.subscribe("compare", (compare) => {
//       document.querySelector(".menu__card-compare").innerHTML = compare.length;
//     });
//   }
//   render() {
//     const compare = this.getData();
//     this.renderNumberCompare();
//     const compareContent = document.querySelector(".compare-container__content");
//     compareContent.innerHTML = `
//     <div class="row">
//       <div class="col-md-12">
//         <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
//         ${map(compare, item => {
//           return `
//             <div class="product-card d:flex fld:column ai:center ta:center mb:15px pb:15px">
//             <div class="product-card__img w:100% pos:relative ov:hidden">
//               <div class="pet-product-card__image">
//                 <a href="#" class="core-image-cover d:block" css="--aspect-ratio: 3/4">
//                   <img class="product-card__image" src="${ item.featured_image.src}" alt="">
//                 </a>
//               </div>
//               <div class="product-card__add pos:absolute b:0 l:0 w:100% bgc:color-dark h:50px trf:translateY(50px) trs:all_0.3s ta:center lts:0.15px fw:600 fz:17px">
//                 <a class="pos:absolute td:none w:100% h:100% va:middle lh:50px t:50% l:50% trf:translate(-50%,-50%) c:color-light" href="#">ADD TO CART</a>
//               </div>
//               <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
//                 <div class="product-card__icon-bg" data-tooltip="Remove Compare" data-tooltip-position="left">
//                  <i class="fas fa-times"></i>
//                 </div>
//               </div>
//             </div>
//             <div class="product-card__content d:flex fld:column jc:center ai:center">
//               <div class="product-card__brand c:color-gray5 mt:11px">${item.vendor}</div>
//               <a class="product-card__name fz:16px mt:15px c:color-dark" href="#">${item.title}</a>
//               <a class="product-card__price mt:14px" href="#">
//                 <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none">${item.price }</ins>
//               </a>
//             </div>
//           </div>
//           `
//         })}
//       </div>
//      </div>
//     </div>
//     `
//   }
//   init() {
//     this.render();
//     this.handleShowCompare();
//   }
// }
// new CompareProduct();



