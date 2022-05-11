const uniqueId = "wishlist";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse, VQuery: $$ } = veda.utils;
const { Component, html, render, renderWithElement, createPortal} = veda.utils.csr;
const { message } = veda.plugins;
const PREFIX = "yasmina";
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

store.create(`${PREFIX}QuickView`, {
  initialState: {
    visible: false,
    data: {}
  },
});
class CartService {
  constructor() {
    this.api = "https://624eadac53326d0cfe5dba36.mockapi.io/cart";
    this.headers = {
      'Content-Type': 'application/json'
    }
  }
  async getData() {
    try {
      const res = await fetch( this.api , {
        method: 'GET',
        headers: this.headers,
      })
      if(res.status !== 200) {
        throw new Error(res.statusText);
      } else {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
      return [];
    }


  }
  async insert(newItem) {
    const res = await fetch( this.api , {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        quantity: 1,
        title: `${newItem.title}`,
        price: newItem.price,
        original_price: newItem.price,
        discounted_price: newItem.price,
        line_price: 4,
        original_line_price: newItem.price,
        final_price: newItem.price,
        image: `${newItem.featured_image.url}`,
        vendor: `${newItem.vendor}`,
        product_id: `${newItem.id}`,
      })
    })
    await message.success(`Add to Cart Successfully`);

  }
  delete(id) {
    fetch( `${this.api}/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        message.error(`Remove from Cart`);
      })
      .catch(err => {
        alert("Delete Cart Error");
      });
  }
  async update(id, quantity) {
    await fetch( `${this.api}/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        "quantity": quantity,
      })
    })
    await message.success(`Add to Cart Successfully`);
  }
}
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData().data,
    }
    this.unmount = undefined;
  }
  componentDidMount() {
    this.unmount = store.subscribe(`${PREFIX}WishList`, this.updateState.bind(this));
  }
  componentWillUnmount() {
    this.unmount?.();
  }
  getData() {
    return store.get(`${PREFIX}WishList`);
  }
  updateState() {
    this.setState({
      data: this.getData().data
    });

  }
  render() {
    const { data } = this.state;
    setTimeout(() => {
      const colorWrapEls = container.querySelectorAll(".yasmina-product-card__colors");
      colorWrapEls.forEach(el => new CardColors(el));
    },500);
    return html`${data.map((product) => {
      return html`
      <div class="col-lg-3 mt:0px!">
          <div class="yasmina-product-card d:flex fld:column ai:center ta:center mb:15px pb:15px">
            <script class="yasmina-product-card__data" type="application/json">${JSON.stringify(product)}</script>
            <div class="yasmina-product-card__img w:100% pos:relative ov:hidden">
              <div class="pet-product-card__image">
                <a href="/pageproduct.html" class="veda-image-cover d:block h:412px">
                  <img class="yasmina-product-card__image h:auto!" src="${ product.featured_image.src}" alt="${ product.title }" style="aspect-ratio: 3/4">
                </a>
              </div>
              <div class="yasmina-product-card__add-content pos:absolute b:0 l:0 w:100% bgc:color-dark h:50px trf:translateY(50px) trs:all_0.3s ta:center lts:0.15px fw:600 fz:17px">
                <a class="yasmina-product-card__add cur:pointer fz:17px pos:absolute td:none w:100% h:100% va:middle lh:50px t:50% l:50% trf:translate(-50%,-50%) c:color-light c:color-light!|h">ADD TO CART</a>
              </div>
              <div class="yasmina-product-card__state pos:absolute t:5px l:5px d:flex">
                ${product.compare_at_price > product.price?html`<div class="yasmina-product-card__sale d:flex jc:center ai:center w:60px h:30px bgc:#219653 mr:5px bdrs:2px">
                <p class="fz:16px pos:absolute z:10 fw:600 c:color-light">Sale</p>
                </div>`:html``}
              </div>
              <div class="yasmina-product-card__status pos:absolute t:10px r:10px w:35px h:127px">
                <div class="yasmina-product-card__icon-bg cur:pointer bgc:color-dark!|h c:color-light!|h" data-tooltip="Add to wishlist" data-tooltip-position="left" data-tooltip-active=true data-tooltip-text="Add to wishlist" data-tooltip-active-text="Remove from wishlist">
                  <i class="fal fa-heart"></i>
                </div>
                <div class="yasmina-product-card__icon-bg--hidden cur:pointer bgc:color-dark!|h c:color-light!|h" data-tooltip="Quick view" data-tooltip-text="Quick view" data-tooltip-position="left" data-tooltip-active=false >
                  <i class="fal fa-eye"></i>
                </div>
                <div class="yasmina-product-card__icon-bg--hidden cur:pointer bgc:color-dark!|h c:color-light!|h" data-tooltip="Compare to other products" data-tooltip-position="left" data-tooltip-active=false data-tooltip-text="Add to compare" data-tooltip-active-text="Remove from compare">
                  <i class="fal fa-repeat"></i>
                </div>
              </div>
            </div>
            </div>
            <div class="yasmina-product-card__content d:flex fld:column jc:center ai:center">
              <div class="yasmina-product-card__brand c:color-gray5 mt:11px fz:14px">${product.vendor}</div>
              <a class="yasmina-product-card__name fz:16px mt:15px c:color-dark" href="/pageproduct.html">${product.title}</a>
              <a class="yasmina-product-card__price mt:14px" href="#">
                <ins class="yasmina-product-card__cost fw:500 fz:15px c:color-primary td:none"> $${ product.price }.00</ins>
                ${product.compare_at_price > product.price?html`<del class="yasmina-product-card__discount fw:500 fz:15px c:color-gray5 td:none ml:5px">$${ product.compare_at_price }.00</del>`:html``}

              </a>

              <div class="yasmina-product-card__colors d:flex">
                <script class="yasmina-product-card__options-json" type="application/json">${ JSON.stringify(product.options_with_values)}</script>
              </div>
              <script class="yasmina-product-card__variants-json" type="application/json">${ JSON.stringify(product.variants)}</script>

            </div>
          </div>
        </div>
      `
    })}`;
  }
}

const cartService = new CartService();
class AddStore {
  constructor(container, storeName, elName) {
    this.container = container;
    this.storeName = storeName;
    this.elName = elName;
    this.el = this.container.querySelector(".row");
    this.init();
    const _this = this;
    store.subscribe(`${PREFIX}${this.storeName}`, this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  handleChangeStatus() {
    const { data } = this.getData();
    const listCard = this.container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector(`.${this.elName}`).parentNode;
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if(hasItem) {
        btnCompare.setAttribute("data-tooltip-active",true);
        btnCompare.style.backgroundColor = "#AF0707";
        btnCompare.style.color = "#ffffff";
      } else {
        btnCompare.setAttribute("data-tooltip-active",false);
        btnCompare.style.backgroundColor = "#ffffff";
        btnCompare.style.color = "#000000";
      }

    })
  }
  handleAdd() {
    const listCard = this.container.querySelectorAll(".yasmina-product-card");
    this.handleChangeStatus();
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector(`.${this.elName}`).parentNode;
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
  constructor(container, storeName, elName) {
    this.container = container;
    this.storeName = storeName;
    this.elName = elName;
    this.el = this.container.querySelector(".row");
    this.init();
    // store.subscribe(storeName,this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
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
  async insertCart(newItem, btnCart, defaultHtml) {
    await cartService.insert(newItem);
    await this.updateStore();
    btnCart.innerHTML = defaultHtml;
  }
  async updateCart(id, quantity, btnCart, defaultHtml) {
    await cartService.update(id, quantity);
    await this.updateStore();
    btnCart.innerHTML = defaultHtml;
  }
  handleAdd() {
    const listCard = this.container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCart = cartEl.querySelector(`.${this.elName}`);
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      const newItem = JSON.parse(dataEl.textContent);
      btnCart.parentNode.addEventListener("click", this.debounce(() => {
        const data = this.getData();
        const hasItem = data.filter(item => item.product_id === newItem.id);
        if(hasItem.length > 0) {
          const prevData = data.filter(item => item.product_id === newItem.id);
          const prevItem = prevData[0];
          const defaultHtml = btnCart.innerHTML;
          btnCart.innerHTML = 'Loading...';
          this.updateCart(prevItem.id, prevItem.quantity + 1, btnCart, defaultHtml);
        } else {
          const defaultHtml = btnCart.innerHTML;
          btnCart.innerHTML = 'Loading...';
          this.insertCart(newItem, btnCart, defaultHtml);

        }

      }));
    })
  }
  initStore() {
    store.create(`${PREFIX}${this.storeName}`, {
      initialState: [],
      useStorage: true
    });
  }
  async init() {
    await this.updateStore();
    await this.initStore();
    await this.handleAdd();


  }
}
class QuickViewPopop {
  constructor(container, storeName, classEl) {
    this.container = container;
    this.storeName = storeName;
    this.classEl = classEl;
    this.el = this.createComparePortal();
    this.initStore();
    this.handleAdd();
    store.subscribe(`${PREFIX}${this.storeName}`, this.init.bind(this));
  }

  createComparePortal() {
    const rootEl = document.querySelector('#root');
    if(!document.querySelector('.yasmina-quickview-portal')) {
      const el = document.createElement('div');
      el.className = 'yasmina-quickview-portal';
      rootEl.appendChild(el);
      return el;
    }
    else {
      const el = document.querySelector('.yasmina-quickview-portal');
      return el;
    }

  }

  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  getDataCart() {
    return store.get(`${PREFIX}Cart`);
  }
  handleTogglePopup() {
    store.set(`${PREFIX}${this.storeName}`,items => {
      return {
        ...items,
        visible : !items.visible
      }
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
  handleAdd() {
    const listCard = this.container.querySelectorAll(".yasmina-product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector(`.${this.classEl}`).parentNode;
      const dataEl = cartEl.querySelector(".yasmina-product-card__data");
      btnCompare.addEventListener("click", () => {
        const newItem = JSON.parse(dataEl.textContent);
        store.set(`${PREFIX}${this.storeName}`, (state) => {
          return {
            ...state,
            data: {...newItem}
          };
        })('toggle');
        store.set(`${PREFIX}${this.storeName}`,items => {
          return {
            ...items,
            visible : !items.visible
          }
        });
      });

    })
  }
  async updateStore() {
    const data = await cartService.getData();
    await store.set(`${PREFIX}Cart`, (items) => {
      return [...data];
    });
  }
  async insertCart(newItem, btnCart, defaultHtml) {
    await cartService.insert(newItem);
    await this.updateStore();
    btnCart.innerHTML = defaultHtml;
  }
  async updateCart(id, quantity, btnCart, defaultHtml) {
    await cartService.update(id, quantity);
    await this.updateStore();
    btnCart.innerHTML = defaultHtml;
  }
  async handleAddCart() {
    const dataQuickView = this.getData().data;
    const listCard = document.querySelector(".quickview-container");
    const btnCart = listCard.querySelector(".yasmina-quickview-add-cart");
      btnCart.addEventListener("click", this.debounce(() => {
        console.log("add to cart");
        const data = this.getDataCart();
        console.log(data , dataQuickView.id);
        const hasItem = data.filter(item => item.product_id === dataQuickView.id);
        const cartQuantity = document.querySelector(".yasmina-quickview-quantity-add-cart");
        const cartQuantityValue = Number(cartQuantity.value);
        if(hasItem.length > 0) {
          const prevData = data.filter(item => item.product_id === dataQuickView.id);
          const prevItem = prevData[0];
          const defaultHtml = btnCart.innerHTML;
          btnCart.innerHTML = 'Loading...';
          this.updateCart(prevItem.id, prevItem.quantity + cartQuantityValue, btnCart, defaultHtml);
        }
        else {
          const defaultHtml = btnCart.innerHTML;
          btnCart.innerHTML = 'Loading...';
          this.insertCart(dataQuickView, btnCart, defaultHtml);
        }

      }));
  }
  handleDOM() {
    const { visible , data } = this.getData();
    const closeEl = document.querySelectorAll('.close-quickview');
    if (closeEl) {
      closeEl.forEach(elClose => {
        elClose.addEventListener('click', this.handleTogglePopup.bind(this));
      })
    }
    if(visible) {
      new QuickViewCardColors("yasmina-quickview-colors");
      this.handleAddCart();
    }
    // if (visible) {
    //   const removeCompare = document.querySelectorAll('.remove-compare');
    //   removeCompare.forEach(removeEl => {
    //     removeEl.parentNode.addEventListener("click", this.handleRemoveCompare.bind(this));
    //   })
    // }
  }
  initStore() {
    store.create(`${PREFIX}QuickView`, {
      initialState: {
        visible: false,
        data: {}
      },
      useStorage: true
    });
  }
  render() {
    const { visible , data } = this.getData();
    if (!visible) {
      return ''
    }

    return /*html */`
      <div class="quickview-container d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close-quickview pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:90% w:930px@md h:590px bgc:#fff mt:4% ov:auto">
          <div class="pos:relative d:flex ai:center jc:center w:100% h:100%">
            <div class="close-quickview pos:absolute t:10px r:10px fz:20px cur:pointer c:#C4C4C4 c:color-gray9|h w:30px h:30px ta:center">
              <i class="fal fa-times"></i>
            </div>
            <div class="veda-image-cover miw:200px w:400px h:100%" css="--aspect-ratio: 3/4">
              <img class="yasmina-quickview-image w:100%" src="${ data.featured_image.src ? data.featured_image.src :""}" alt="${ data.title }">
            </div>
            <div class="w:530px h:100% pl:30px ov:auto">
              <div class="fw:500 fz:30px c:color-gray9 mt:26px">${data.title}</div>
              <div class="fw:400 fz:25px c:color-gray9 mt:5px">$${data.price}.00</div>
              <div class="fw:400 fz:14px ff:font-secondary c:#6F6F6F mt:17px">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti et...</div>
              <div class="mt:18px td:underline cur:pointer"><a href="/pageproduct.html" class="fw:400 fz:15px c:color-gray9!">View details</a></div>
              <div class="yasmina-quickview-color-text fw:500 fz:15px mt:23px">${(data.options_with_values[1]?.name=="Color"||data.options_with_values[1]?.name=="Colour")?`Color: ${data.options_with_values[1].selected_value}`:""}</div>
              <div class="yasmina-quickview-colors d:flex"></div>
              <div class="fw:500 fz:15px mt:12px">Quantity</div>
              <div class="d:flex mt:9px flw:wrap">
                <input class="yasmina-quickview-quantity-add-cart w:84px! h:52px! fz:15px fw:300 c:color-gray9 bdrs:0px! ta:center mb:10px! mr:10px!" type="number" value="1" min="1" />
                <button class="yasmina-btn__primary yasmina-quickview-add-cart bgc:color-dark bgc:color-dark!|h bd:none! c:color-light c:color-light!|h p:17px_70px_17px_70px@md cur:pointer m:0px_5px_0px_10px fw:500 bdrs:0px! fz:15px lts:0.15px w:236px@md h:52px whs:nowrap">ADD TO CART</button>
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
class QuickViewCardColors {
  constructor(el) {
    /** @type {HTMLElement} */
    this.el = document.querySelector(`.${el}`);
    this.data = this.getData().data;
    /** @type {HTMLElement | null} */
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
  getData() {
    return store.get(`${PREFIX}QuickView`);
  }
  setState(state) {
    if (typeof state === 'function') {
      this.state = { ...this.state, ...state(this.state) }
    } else {
      this.state = { ...this.state, ...state }
    }
  }

  mounted() {
    const newData = this.data.options_with_values.find(item => /Colou?r/g.test(item.name)) || {};
    const variants = this.data.variants;
    this.setState(prevState => ({
      colors: newData.values || prevState.colors,
      selectedColor: newData.selected_value || prevState.selectedColor,
      variants: variants || prevState.variants
    }));
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
    const imgEl = document.querySelector(".yasmina-quickview-image");
    imgEl.src = src;
    const colorTextEl = document.querySelector(".yasmina-quickview-color-text");
    colorTextEl.innerHTML = `Color: ${variant.options[1]}`;
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
  countColorShow() {
    const { colors } = this.state;
    return colors.filter(color => this.checkColor(color));
  }
  render() {
    const { selectedColor } = this.state;
    let index = 0;
    const colors = this.countColorShow();
    return CardColors.map(colors, color => {
      index = index + 1;
      if (!this.checkColor(color)) {
        return ``;
      }
      const active = color.toLowerCase() === selectedColor.toLowerCase();
      return `
        <div class="yasmina-product-card__colors-item w:32px h:32px bdrs:16px m:10px_4px_0px_4px cur:pointer p:3px bgcp:content-box ${active ? 'bd:1px_solid_color-dark' : 'bd:1px_solid_color-gray2'}" style="background-color: ${color.toLowerCase()};display:${index > 3 ? "none" : "block"}"></div>
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
  // handleShowColor() {
  //   const colorEls = this.el.querySelectorAll('.yasmina-product-card__colors-item');
  //   const colorPlus = this.el.querySelector(".yasmina-product-card__colors-plus");
  //   colorEls.forEach(colorEl => {
  //     colorEl.style.display = "block";
  //     colorPlus.style.display = "none";
  //   })
  // }
  init() {
    const colors = this.countColorShow();
    this.el.innerHTML = this.render();
    if(colors.length > 3) {
      const btnPlusViewColor = document.createElement("div");
      btnPlusViewColor.className = "yasmina-product-card__colors-plus d:flex ai:center jc:flex-start w:auto h:32px m:10px_4px_0px_4px fz:14px fw:600 ff:font-secondary c:color-gray9";
      btnPlusViewColor.textContent = `+${colors.length - 3}`;
      this.el.appendChild(btnPlusViewColor);
    }
    this.handleDOM();
  }
}

if(!!container) {
  render(html`<${Wishlist} />`, container);
  new AddStore(container, "Compare", "fa-repeat");
  new AddStore(container, "WishList", "fa-heart");
  new AddStoreCart(container, "Cart", "yasmina-product-card__add");
  new QuickViewPopop(container, "QuickView","fa-eye");

}
