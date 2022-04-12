const uniqueId = "products";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store , map } = veda.utils;
class AddStore {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.el = container.querySelector(".row");
    this.init();
    store.subscribe(storeName,this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(""+this.storeName);
  }
  handleChangeStatus() {
    const {data} = this.getData();
    const listCard = container.querySelectorAll(".product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      const dataEl = cartEl.querySelector(".product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if(hasItem) {
        if(btnCompare.hasAttribute("data-tooltip")) {
          btnCompare.setAttribute("data-tooltip",btnCompare.getAttribute("data-tooltip-active-text"));
          btnCompare.style.backgroundColor = "black";
        }
      }
      else {
        if(btnCompare.hasAttribute("data-tooltip")) {
          btnCompare.setAttribute("data-tooltip",btnCompare.getAttribute("data-tooltip-text"));
          btnCompare.style.backgroundColor = "white";
        }
      }

    })
  }
  handleAdd() {
    const {data} = this.getData();
    const listCard = container.querySelectorAll(".product-card");
    this.handleChangeStatus();
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      const dataEl = cartEl.querySelector(".product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if(hasItem) {
        btnCompare.addEventListener("click", () => {
          store.set(""+this.storeName, (items) => {
              return {
                ...items,
                data: [...data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)]
              };
          })(this.storeName+"/Add");
        });
      }
      else {
        btnCompare.addEventListener("click", () => {
          store.set(""+this.storeName, (items) => {
              return {
                ...items,
                  data: [...items.data,JSON.parse(dataEl.textContent)]
              };
          })(this.storeName+"/Add");
        });
      }


    })
  }
  initStore() {
    store.create(this.storeName, {
      initialState: {
        visible: false,
        data: []
      },
      useStorage: true
    });
  }
  render() {

  }
  init() {
    this.initStore();
    this.handleAdd();
  }
}
class AddStoreCart {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.el = container.querySelector(".row");
    this.init();
    // store.subscribe(storeName,this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(this.storeName);
  }
  handleAdd() {
    const {data} = this.getData();
    const listCard = container.querySelectorAll(".product-card");
    listCard.forEach(cartEl => {
      const btnCart = cartEl.querySelector("."+this.elName);
      const dataEl = cartEl.querySelector(".product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if(hasItem) {
        btnCart.parentNode.addEventListener("click", () => {
          store.set(this.storeName, (items) => {
              return {
                ...items,
                data: [...data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)]
              };
          })(this.storeName+"/Add");
        });
      }
      else {
        btnCart.parentNode.addEventListener("click", () => {
          const defaultHtml = btnCart.innerHTML;
          btnCart.innerHTML = 'Loading...';
          fetch('https://624eadac53326d0cfe5dba36.mockapi.io/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "quantity": 31,
              "title": "new",
              "price": 19768,
              "original_price": 10,
              "discounted_price": 88,
              "line_price": 4,
              "original_line_price": 28,
              "final_price": 49
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              store.set(this.storeName, (items) => {
                return {
                  ...items,
                  data: [...items.data,JSON.parse(dataEl.textContent)]
                };
              })(this.storeName + "/Add");
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              btnCart.innerHTML = defaultHtml;
            })
        });
      }


    })
  }
  initStore() {
    store.create(this.storeName, {
      initialState: {
        visible: false,
        data: []
      },
      useStorage: true
    });
  }
  render() {

  }
  init() {
    this.initStore();
    this.handleAdd();
  }
}
if(!!container) {
  new AddStore("doanCompare","fa-compress");
  new AddStore("doanWishList","fa-heart");
  new AddStoreCart("doanCart","product-card__add");
}

// class ProductCard {
//   constructor() {
//     this.el = container.querySelector(".row");
//     this.dataProduct = JSON.parse(container.querySelector(".product-all-data").textContent).slice(0,8);
//     this.init();
//     store.subscribe("doanCompare",this.init.bind(this));
//     store.subscribe("doanWishList",this.init.bind(this));
//     store.subscribe("doanCart",this.init.bind(this));
//   }
//   render() {
//     return /*html*/`
//       <script class="product-all-data" type="application/json">${container.querySelector(".product-all-data").textContent}</script>
//      ${map(this.dataProduct,item => {
//        return `
//        <div class="col-lg-3">
//         <div class="product-card d:flex fld:column ai:center ta:center mb:15px pb:15px">
//          <script class="product-card__data" type="application/json">${JSON.stringify(item)}</script>
//           <div class="product-card__img w:100% pos:relative ov:hidden">
//             <div class="pet-product-card__image h:400px">
//               <a href="#" class="core-image-cover d:block h:100%" >
//                 <img class="product-card__image" src="${ item.featured_image.src}_400x" alt="${ item.title }">
//               </a>
//             </div>
//             <div class="product-card__add-content pos:absolute b:0 l:0 w:100% bgc:color-dark h:50px trf:translateY(50px) trs:all_0.3s ta:center lts:0.15px fw:600 fz:17px">
//               <a class="product-card__add cur:pointer pos:absolute td:none w:100% h:100% va:middle lh:50px t:50% l:50% trf:translate(-50%,-50%) c:color-light">ADD TO CART</a>
//             </div>
//             <div class="product-card__state pos:absolute t:5px l:5px d:flex">
//               <div class="product-card__sale d:flex jc:center ai:center w:60px h:30px bgc:#219653 mr:5px bdrs:2px">
//                 <p class="fz:16px pos:absolute z:10 fw:600 c:color-light">Sale</p>
//               </div>
//             </div>
//             <div class="product-card__status pos:absolute t:10px r:10px w:35px h:127px">
//               <div class="product-card__icon-bg cur:pointer" data-tooltip="Add to wishlist" data-tooltip-position="left" data-tooltip-active="false" data-tooltip-text="Add to wishlist" data-tooltip-active-text="Remove to wishlist">
//                 <i class="far fa-heart"></i>
//               </div>
//               <div class="product-card__icon-bg--hidden cur:pointer" data-tooltip="Quick view" data-tooltip-position="left" >
//                 <i class="far fa-eye"></i>
//               </div>
//               <div class="product-card__icon-bg--hidden cur:pointer" data-tooltip="Compare to other products" data-tooltip-position="left" data-tooltip-active="false" data-tooltip-text="Add to compare" data-tooltip-active-text="Remove to compare">
//                 <i class="fas fa-compress"></i>
//               </div>
//             </div>
//           </div>
//           <div class="product-card__content d:flex fld:column jc:center ai:center">
//             <div class="product-card__brand c:color-gray5 mt:11px">${item.vendor}</div>
//             <a class="product-card__name fz:16px mt:15px c:color-dark" href="#">${item.title}</a>
//             <a class="product-card__price mt:14px" href="#">
//               <ins class="product-card__cost fw:500 fz:15px c:color-primary td:none">${ item.price }</ins>
//             </a>
//             <div class="product-card__color d:flex">
//               <div class="circle__active--yellow"></div>
//               <div class="circle--blue"></div>
//               <div class="circle--violet"></div>
//               <div class="circle--plus">+1</div>
//               </div>
//           </div>
//         </div>
//       </div>
//        `
//      })}
//     `
//   }
//   init() {
//     this.el.innerHTML = this.render();
//     new AddStore("doanCompare","fa-compress");
//     new AddStore("doanWishList","fa-heart");
//     new AddStore("doanCart","product-card__add");
//   }
// }
// if(container) {
//   new ProductCard();
// }





// window.veda.utils.store.subscribe("compare", (count) => {
//   document.getElementById("compare").innerHTML = count;
// });
// const colorEls = container.querySelectorAll('.product-card__colors');

// colorEls.forEach(colorEl => {
//   const data = JSON.parse(colorEl.textContent);
//   colorEl.insertAdjacentHTML('afterend', `<div class="product-card__color">${data.map(item => {
//     return `<div class="circle--blue aaa" data-color="${item}" style="background-color: ${item}"></div>`
//   }).join('')}</div>`);


//   // console.log(variants)




//   // colorEl.remove();
// });


// container.querySelectorAll('.aaa').forEach(el => {
//   el.addEventListener('click', (event) => {
//     const currentEl = event.currentTarget;
//     const color = currentEl.getAttribute('data-color');
//     const parentEl = currentEl.parentNode;
//     const variants = JSON.parse(parentEl.nextElementSibling.textContent);
//     const variantFilters = variants.filter(item => {
//       return item.options.includes(color)
//     });
//     //  console.log(variantFilters);
//     const images = variantFilters.map(variant => variant.image);
//     const image = images[0];
//     const currentCart = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
//     const currentImage = currentCart.querySelector(".product-card__image");
//     if(image) {
//       let tempImg = image.src;
//       tempImg = tempImg.replace(/(https:.*)(.jpg.*)/g,"$1"+"_400x"+"$2");
//       currentImage.src = tempImg;
//     }
//     else
//     {
//       console.log("no image");
//     }

//     // console.log(images);
//     // console.log(variants);
//   })
// })
