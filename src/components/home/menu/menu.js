const uniqueId = "header";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map } = veda.utils;

store.create('doanCompareVisible', {
  initialState: false,
})

class CompareBadge {
  constructor() {
    this.el = container.querySelector(".menu__card-compare");
    this.init();
    store.subscribe("doanCompare",this.init.bind(this));
  }

  getData() {
    return store.get('doanCompare');
  }

  render() {
    const count = this.getData().length;
    if (!count) {
      return ''
    }

    return /*html*/`<div class="d:flex jc:center ai:center c:color-light pos:absolute b:50% l:80% w:16px h:16px fz:9px bdrs:8px bgc:red fw:500">${count}</div>`;
  }
  init() {
    this.el.insertAdjacentHTML('beforeend', this.render());
  }
}

class ComparePopop {
  constructor() {
    this.el = this.createComparePortal();
    this.compareBtnEl = container.querySelector(".menu__card-compare");
    this.init();
    store.subscribe('doanCompare', this.init.bind(this));
    store.subscribe('doanCompareVisible', this.init.bind(this));
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

  handleDOM() {
    const closeEl = document.querySelector('.close');
    this.compareBtnEl.addEventListener('click', this.handleTogglePopup.bind(this));
    if (closeEl) {
      closeEl.addEventListener('click', this.handleTogglePopup.bind(this));
    }
  }

  render() {
    const { visible } = this.getData();

    if (!visible) {
      return ''
    }

    return /*html*/`
      <div class="pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:300px h:300px bd:1px_solid_red bgc:#fff">
          <button class="close">Close</button>
        </div>
      </div>
    `
  }

  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}

new CompareBadge();
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



