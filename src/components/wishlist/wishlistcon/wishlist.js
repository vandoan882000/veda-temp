const uniqueId = "wishlist";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store, map ,objectParse, VQuery: $$ } = veda.utils;
const { Component, html, render, renderWithElement, createPortal} = veda.utils.csr;
const { message } = veda.plugins;
const PREFIX = "yasmina";

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
  // veda.plugins.productWishList.renderWishList(container);
  // render(html`<${Wishlist} />`, container);
  //new AddStore(container, "WishList", "fa-heart");
  // // new AddStoreCart(container, "Cart", "yasmina-product-card__add");
  // new QuickViewPopop(container, "QuickView","fa-eye");

}
