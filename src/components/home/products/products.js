const uniqueId = "products";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

class AddStore {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.init();
  }

  handleAdd() {
    const listCard = container.querySelectorAll(".product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      btnCompare.addEventListener("click", () => {
        const data = cartEl.querySelector(".product-card__data");
        window.veda.utils.store.set(""+this.storeName, (compare) => {
          const check = compare.find(item => item.id === JSON.parse(data.textContent).id);
          if(!!check) {
            return [...compare];
          }
          else
          {
            return [...compare,JSON.parse(data.textContent)];
          }
        })("compare/Add");
      })
    })
  }
  initStore() {
    window.veda.utils.store.create(this.storeName, {
      initialState: [],
      useStorage: true
    });
  }
  init() {
    this.initStore();
    this.handleAdd();
  }
}
if(!!container) {
  new AddStore("doanCompare","fa-compress");
  new AddStore("doanWishList","fa-heart");
  new AddStore("doanCart","product-card__add");
}






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
