const uniqueId = "products";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store , map } = veda.utils;
const message = veda.plugins.createMessage();
const PREFIX = 'yasmina';


store.create("yasminaCompare", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("yasminaWishList", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("yasminaCart", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("yasminaCurrentProduct", {
  initialState: {},
  useStorage: true
});
store.create(PREFIX+"QuickView", {
  initialState: {
    visible: false,
    data: {}
  },
  useStorage: true
});
class AddStore {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.el = container.querySelector(".row");
    this.init();
    const _this = this;
    store.subscribe(`${PREFIX}${this.storeName}`, this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  handleChangeStatus() {
    const { data } = this.getData();
    const listCard = container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if(hasItem) {
        if(btnCompare.hasAttribute("data-tooltip")) {
          btnCompare.setAttribute("data-tooltip",btnCompare.getAttribute("data-tooltip-active-text"));
          btnCompare.style.backgroundColor = "#f23333";
          btnCompare.style.color = "#fff";
        }
      } else {
        if(btnCompare.hasAttribute("data-tooltip")) {
          btnCompare.setAttribute("data-tooltip",btnCompare.getAttribute("data-tooltip-text"));
          btnCompare.style.backgroundColor = "white";
          btnCompare.style.color = "black";
        }
      }

    })
  }
  handleAdd() {
    const listCard = container.querySelectorAll(".yasmina-product-card");
    this.handleChangeStatus();
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      btnCompare.addEventListener("click", () => {
        const newItem = JSON.parse(dataEl.textContent);
        const { id: newId } = newItem;
        store.set(`${PREFIX}${this.storeName}`, (state) => {
          const dataHasNewItem = state.data.filter(item => item.id === newId);
          // Neu ma trong mang data da co chua san pham nay roi
          // thi khi ta bam vao nut compare se xoa di
          if (dataHasNewItem.length > 0) {
            message.error(`Remove from ${this.storeName}`);
            return {
              ...state,
              data: state.data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)
            };
          }
          // Neu trong data chua co product do thi ta se them vao
          message.success(`Add to ${this.storeName}`);
          return {
            ...state,
            data: [...state.data, newItem]
          };
        })('toggle');
      });

    })
  }
  initStore() {
    store.create(`${PREFIX}${this.storeName}`, {
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
    return store.get(`${PREFIX}${this.storeName}`);
  }
  handleAdd() {
    const {data} = this.getData();
    const listCard = container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCart = cartEl.querySelector("."+this.elName);
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      btnCart.parentNode.addEventListener("click", () => {
        if(hasItem) {
          message.error(`Đã có trong giỏ hàng`);
        }
        else {
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
              store.set(`${PREFIX}${this.storeName}`, (items) => {
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
              message.success(`Add to ${this.storeName}`);
            })
        }

      });
    })
  }
  initStore() {
    store.create(`${PREFIX}${this.storeName}`, {
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
class AddStoreCurrentProduct {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.el = container.querySelector(".row");
    this.init();
    const _this = this;
  }
  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  handleAdd() {
    const listCard = container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName);
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");

      btnCompare.addEventListener("click", () => {
        const newItem = JSON.parse(dataEl.textContent);
        const { id: newId } = newItem;
        store.set(`${PREFIX}${this.storeName}`, (state) => newItem);
      });


    })
  }
  initStore() {
    store.create(`${PREFIX}${this.storeName}`, {
      initialState: {},
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
class QuickViewPopop {
  constructor(storeName, classEl) {
    this.storeName = storeName;
    this.classEl = classEl;
    this.el = this.createComparePortal();
    this.mounted();
    this.init();
    this.handleAdd();
    store.subscribe(PREFIX+this.storeName, this.init.bind(this));
  }
  mounted() {
    this.compareBtnEl = container.querySelectorAll("."+this.classEl);
    this.compareBtnEl.forEach(btnEl => {
      btnEl.parentNode.addEventListener("click", () => {
        this.handleTogglePopup();
      });
    })

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
  // handleRemoveCompare(event) {
  //   store.set(PREFIX + this.storeName,compare => {
  //     return {
  //       ...compare,
  //       data: compare.data.filter(item => item.id !== event.currentTarget.getAttribute("data-id"))
  //     }
  //   })(this.storeName + "/remove");
  // }
  handleAdd() {
    const listCard = container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.classEl).parentNode;
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      btnCompare.addEventListener("click", () => {
        const newItem = JSON.parse(dataEl.textContent);
        const { id: newId } = newItem;

        store.set(`${PREFIX}${this.storeName}`, (state) => {
          return {
            ...state,
            data: {...newItem}
          };
        })('toggle');
      });

    })
  }
  handleDOM() {
    // const { visible , data } = this.getData();
    const closeEl = document.querySelector('.close-quickview');

    if (closeEl) {
      closeEl.addEventListener('click', this.handleTogglePopup.bind(this));
    }
    // if (visible) {
    //   const removeCompare = document.querySelectorAll('.remove-compare');
    //   removeCompare.forEach(removeEl => {
    //     removeEl.parentNode.addEventListener("click", this.handleRemoveCompare.bind(this));
    //   })
    // }
  }

  render() {
    const { visible , data } = this.getData();
    if (!visible) {
      return ''
    }
    return /*html */`
      <div class="compare-container d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close-quickview pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:930px h:590px bgc:#fff mt:120px ov:auto">
          <div class="d:flex ai:center jc:center w:100% h:100%">
            <div class="veda-image-cover w:400px h:100%" css="--aspect-ratio: 3/4">
              <img class="yasmina-product-card__image w:100%" src="${ data.featured_image.src}" alt="${ data.title }">
            </div>
            <div class="w:530px h:100% pl:30px">
              <div class="fw:500 fz:30px c:color-gray9">${data.title}</div>
              <div>${data.price}</div>
              <div>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti et...</div>
              <div>View details</div>
              <div>Color: Yellow</div>
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
class CardColors {
  constructor(el) {
    /** @type {HTMLElement} */
    this.el = el;
    /** @type {HTMLElement | null} */
    this.variantJsonEl = this.getVariantJsonEl();
    this.state = {
      colors: [],
      selectedColor: '',
      variants: []
    }
    this.mounted();
    this.init();
  }

  static map(arr, callback) {
    return arr.map(callback).join('')
  }

  setState(state) {
    if (typeof state === 'function') {
      this.state = { ...this.state, ...state(this.state) }
    } else {
      this.state = { ...this.state, ...state }
    }
  }

  mounted() {
    this.optionEl = this.el.querySelector(".yasmina-product-card__options-json");
    if (!!this.optionEl) {
      const { textContent } = this.optionEl;
      const newData = JSON.parse(textContent).find(item => /Colou?r/g.test(item.name)) || {};
      const variants = JSON.parse(this.variantJsonEl.textContent) || {};
      this.setState(prevState => ({
        colors: newData.values || prevState.colors,
        selectedColor: newData.selected_value || prevState.selectedColor,
        variants: variants || prevState.variants
      }));
    }
  }

  getVariantJsonEl() {
    const variantJsonEl = this.el.nextElementSibling
    if (variantJsonEl.className.includes("yasmina-product-card__variants-json")) {
      return variantJsonEl;
    }
    return null;
  }

  checkColor(color) {
    return veda.utils.getColorNames().includes(color.toLowerCase());
  }

  render() {
    const { colors, selectedColor } = this.state;
    return CardColors.map(colors, color => {
      if (!this.checkColor(color)) {
        return ``;
      }
      const active = color.toLowerCase() === selectedColor.toLowerCase();
      return `
        <div class="yasmina-product-card__colors-item w:32px h:32px bdrs:16px m:10px_6px_0px_6px cur:pointer p:3px bgcp:content-box ${active ? 'bd:1px_solid_color-dark' : 'bd:1px_solid_color-gray2'}" style="background-color: ${color.toLowerCase()}"></div>
      `
    })
  }

  updateImage() {
    const { variants, selectedColor } = this.state;
    const variant = variants.find(variant => variant.options.map(item => item.toLowerCase()).includes(selectedColor));
    const { src } = variant.image;
    const imgEl = this.el.closest('.yasmina-product-card').querySelector('.yasmina-product-card__image');
    imgEl.src = src;
  }

  handleClick(event) {
    const currentEl = event.currentTarget;
    const colorEls = this.el.querySelectorAll('.yasmina-product-card__colors-item');
    this.setState({
      selectedColor: currentEl.style.backgroundColor
    });
    this.update();
    this.updateImage();
  }

  handleDOM() {
    const colorEls = this.el.querySelectorAll('.yasmina-product-card__colors-item');
    colorEls.forEach(colorEl => {
      colorEl.addEventListener('click', this.handleClick.bind(this));
    })
  }

  update() {
    this.init();
  }

  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}
if(!!container) {
  new AddStore("Compare","fa-repeat");
  new AddStore("WishList","fa-heart");
 //new AddStoreCurrentProduct("CurrentProduct","yasmina-product-card__name");
  new AddStoreCart("Cart","yasmina-product-card__add");
  new QuickViewPopop("QuickView","fa-eye");
  const colorWrapEls = container.querySelectorAll(".yasmina-product-card__colors");
  colorWrapEls.forEach(el => new CardColors(el));
}





