const uniqueId = "bestseller";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store , map, debounce } = veda.utils;
const { message } = veda.plugins;
const PREFIX = 'yasmina';
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
function changeStatus(el, productData, lstProduct, destination , messageShow = false ) {
  let hasItem = lstProduct?.some(item => item.id === productData.id);
  if(hasItem) {
    el.setAttribute("data-tooltip-active",true);
    el.style.backgroundColor = "#AF0707";
    el.style.color = "#ffffff";
    if (messageShow) {
      message.success(`Added to ${destination}`);
    }
  } else {
    el.setAttribute("data-tooltip-active",false);
    el.style.backgroundColor = "#ffffff";
    el.style.color = "#000000";
    if (messageShow) {
      message.error(`Removed from ${destination}`);
    }
  }
  return hasItem;
}
function handleCompare() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const compareDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(compareDataEl.textContent);
    const btnCompare = card.querySelector('.veda-compare__btn-toggle');
    const ratingCustom = card.querySelector('.veda-compare__rating-custom');
    changeStatus(btnCompare, productData, veda.plugins.productCompare.getData(), "Compare");
    btnCompare.addEventListener('click', () => {
      veda.plugins.productCompare.toggleProduct({
        ...productData,
        rating: ratingCustom?.innerHTML,
      });
      changeStatus(btnCompare, productData, veda.plugins.productCompare.getData(), "Compare", true);
    });
  });
}
function handleWishList() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const compareDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(compareDataEl.textContent);
    const btnWishList = card.querySelector('.veda-wishlist__btn-toggle');
    veda.plugins.productQuickView.customQuickView({
      link: "/pageproduct.html",
    })
    changeStatus(btnWishList, productData, veda.plugins.productWishList.getData(), "Wishlist");
    btnWishList.addEventListener("click", () => {
      veda.plugins.productWishList.toggleWishList(productData)
      changeStatus(btnWishList, productData, veda.plugins.productWishList.getData(), "Wishlist", true);
    });
  });
}
function handleCart() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const cartDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(cartDataEl.textContent);
    const btnAddCart = card.querySelector('.veda-cart__btn-add-cart');
    btnAddCart.addEventListener('click', debounce(() => {
      veda.plugins.cart.addToCart(productData);
    }));
  });
}
function handleQuickView() {
  const listCard = container.querySelectorAll('.yasmina-product-card');
  listCard.forEach(card => {
    const cartDataEl = card.querySelector(".product-card-data-js");
    const productData = JSON.parse(cartDataEl.textContent);
    const btnQuickView = card.querySelector('.veda-quickview__btn-toggle');
    btnQuickView.addEventListener("click", () => veda.plugins.productQuickView.togglePopup(productData));
  });
}
if(!!container) {
  veda.plugins.swiper(container);
  handleCompare();
  handleWishList();
  handleQuickView();
  handleCart();
  const colorWrapEls = container.querySelectorAll(".yasmina-product-card__colors");
  colorWrapEls.forEach(el => new CardColors(el));
}


