

const uniqueId = "shoppage";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

if (!!container) {
  const { Component, html, render} = veda.utils.csr;
  const { collectionsFilters } = veda.plugins;
  const { message, productCompare, productWishList, productQuickView, productColor, cart } = veda.plugins;
  const { objectParse } = veda.utils;
  let unsubscribeCompare = () => {};
  let unsubscribeWishList = () => {};
  let loadding = false;
  function checkHasItem(productData, storeData) {
    return storeData?.some((item) => item.id === productData.id);
  }
  function changeStatus(el, hasItem) {
    if (hasItem()) {
      el.setAttribute("data-tooltip-active", true);
      el.classList.add("toggle-active-js");
    } else {
      el.setAttribute("data-tooltip-active", false);
      el.classList.remove("toggle-active-js");
    }
    return hasItem;
  }
  function handleCompare() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const compareDataEl = card.querySelector(".product-card-data-js");
      const productData = objectParse(compareDataEl.textContent);
      const btnCompareEl = card.querySelector(".compare-toggle-js");
      const ratingCustom = card.querySelector(".compare-rating-js");
      const hasItem = () => checkHasItem(productData, productCompare.getData());
      changeStatus(btnCompareEl, hasItem);
      btnCompareEl.addEventListener("click", () => {
        productCompare.toggleProduct({
          ...productData,
          rating: ratingCustom?.innerHTML,
        });
        const tooltipText = btnCompareEl.getAttribute("data-tooltip-text");
        const tooltipActiveText = btnCompareEl.getAttribute(
          "data-tooltip-active-text"
        );
        changeStatus(btnCompareEl, hasItem);
        if (hasItem()) {
          tooltipText && message.success(tooltipText);
        } else {
          tooltipActiveText && message.error(tooltipActiveText);
        }
      });
    });
    unsubscribeCompare();
    unsubscribeCompare = productCompare.subscribe((state) => {
      const listCard = container.querySelectorAll(".product-card-js");
      listCard.forEach((card) => {
        const compareDataEl = card.querySelector(".product-card-data-js");
        const productData = objectParse(compareDataEl.textContent);
        const btnCompareEl = card.querySelector(".compare-toggle-js");
        const hasItem = () => checkHasItem(productData, state);
        changeStatus(btnCompareEl, hasItem);
      });
    });
  }
  function handleWishList() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const compareDataEl = card.querySelector(".product-card-data-js");
      const productData = objectParse(compareDataEl.textContent);
      const btnWishListEl = card.querySelector(".wishlist-toggle-js");
      const hasItem = () => checkHasItem(productData, productWishList.getData());
      changeStatus(btnWishListEl, hasItem);
      btnWishListEl.addEventListener("click", () => {
        productWishList.toggleWishList(productData);
        const tooltipText = btnWishListEl.getAttribute("data-tooltip-text");
        const tooltipActiveText = btnWishListEl.getAttribute(
          "data-tooltip-active-text"
        );
        changeStatus(btnWishListEl, hasItem);
        if (hasItem()) {
          tooltipText && message.success(tooltipText);
        } else {
          tooltipActiveText && message.error(tooltipActiveText);
        }
      });
    });
    unsubscribeWishList();
    unsubscribeWishList = productWishList.subscribe((state) => {
      const listCard = container.querySelectorAll(".product-card-js");
      listCard.forEach((card) => {
        const dataEl = card.querySelector(".product-card-data-js");
        const productData = objectParse(dataEl.textContent);
        const btnWishList = card.querySelector(".wishlist-toggle-js");
        const hasItem = () => checkHasItem(productData, state);
        changeStatus(btnWishList, hasItem);
      });
    });
  }
  function handleCart() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const cartDataEl = card.querySelector(".product-card-data-js");
      const productData = objectParse(cartDataEl.textContent);
      const btnAddCart = card.querySelector(".product-card-add-js");
      btnAddCart.addEventListener("click", async (event) => {
        event.preventDefault();
        if (!loadding) {
          loadding = true;
          const spinner = "<div class='veda-spinner' style='--spinner-color:red'></div>";
          btnAddCart.insertAdjacentHTML('afterbegin', spinner);
          cart.addToCart(productData).finally(() => {
            const currentSpinner = btnAddCart.querySelector('.veda-spinner');
            currentSpinner.remove();
            loadding = false;
          });
        }
      });
    });
  }
  function handleQuickView() {
    const listCard = container.querySelectorAll(".product-card-js");
    listCard.forEach((card) => {
      const cartDataEl = card.querySelector(".product-card-data-js");
      const productData = objectParse(cartDataEl.textContent);
      const btnQuickView = card.querySelector(".quickview-toggle-js");
      btnQuickView.addEventListener("click", () =>
        productQuickView.togglePopup(productData)
      );
    });
  }
  function handleColor() {
    const listCard = container.querySelectorAll(".product-card-js");
    productColor.init({
      onChange: (color, image, currentEl) => {
        const currentImage = currentEl
          .closest(".product-card-js")
          .querySelector(".product-card-image-js");
        currentImage.src = image;
        console.log("selected color:", color);
      },
    });
    listCard.forEach((card) => {
      const cartDataEl = card.querySelector(".product-card-data-js");
      const productData = objectParse(cartDataEl.textContent);
      const colorWrapper = card.querySelector(".product-card-colors-js");
      productColor.render(colorWrapper, productData);
    });
  }
  function productActions() {
    handleCompare();
    handleWishList();
    handleQuickView();
    handleCart();
    handleColor();
  }
  class ViewAs {
    constructor() {
      this.view1 = container.querySelector(".yasmina-shop-page__view1");
      this.view2 = container.querySelector(".yasmina-shop-page__view2");
      this.init();
    }
    handleView1(event) {
      event.preventDefault();
      const shoppage1 = container.querySelector(".shop-page1");
      const shoppage2 = container.querySelector(".shop-page2");
      shoppage1.classList.remove("d:block");
      shoppage1.classList.add("d:none");
      shoppage2.classList.remove("d:none");
      shoppage2.classList.add("d:block");
      this.view1.classList.add("yasmina-shop-page__view-active");
      this.view2.classList.remove("yasmina-shop-page__view-active");
    }
    handleView2(event) {
      event.preventDefault();
      const shoppage1 = container.querySelector(".shop-page1");
      const shoppage2 = container.querySelector(".shop-page2");
      shoppage2.classList.remove("d:block");
      shoppage2.classList.add("d:none");
      shoppage1.classList.remove("d:none");
      shoppage1.classList.add("d:block");
      this.view1.classList.remove("yasmina-shop-page__view-active");
      this.view2.classList.add("yasmina-shop-page__view-active");
    }
    handleDOM() {
      this.view1.addEventListener("click", this.handleView1.bind(this));
      this.view2.addEventListener("click", this.handleView2.bind(this));
    }
    init() {
      this.handleDOM();
    }
  }
  productActions();
  new ViewAs();
  async function getContentCollections(url) {
    const domParser = new DOMParser();
    const res = await fetch(url);
    const html = await res.text();
    const doc = domParser.parseFromString(html, "text/html");
    const contentCollectionsEl = doc.querySelector(".content-collections-js");
    if (contentCollectionsEl) {
      const contentCollections = contentCollectionsEl.innerHTML;
      return contentCollections;
    }
    return "";
  }

  collectionsFilters(container, {
    formSelector: ".filter-form-js",
    sortBySelector: ".filter-sort-by-js",
    refineRootSelector: ".filter-refine-js",
    clearAllRootSelector: ".filter-clear-all-js",
    priceStep: 0.01,
    renderRefineItem({ item, onRemove }) {
      return html`
        <div
          key=${item.value}
          class="pos:relative d:inline-block bd:1px_solid_color-gray2 w:fit-content p:2px_25px_2px_5px cur:pointer c:color-gray4 ff:font-primary mr:5px mb:5px"
        >
          <span class="c:color-gray4">${item.label}</span>
          <span
            class="cur:pointer"
          >
            <i class="fal fa-times pos:absolute t:55% r:1% trf:translate(-50%,-50%) c:color-gray4 c:color-gray9!|h" onClick=${onRemove}></i>
          </span>
        </div>
      `;
    },
    renderClearAllButton({ onClear }) {
      const text =
        container
          .querySelector(".filter-clear-all-js")
          ?.getAttribute("data-text") ?? "Clear All";
      return html`<div
        class="c:color-dark ff:font-primary bgc:color-light bgc:color-light|h! bd:none! c:color-gray9|h! p:0! c:color-primary|h!"
        onClick=${onClear}
      >
        ${text}
      </div>`;
    },
    async onChange({ url, urlRequest, category, done }) {
      try {
        const sectionId = container.querySelector("[data-shopify-id]").getAttribute("data-shopify-id");
        if (category) {
          url.pathname = `/${category}`;
          urlRequest.pathname = `/${category}`;
        }
        if (sectionId) {
          urlRequest.search = `${urlRequest.search}&section_id=${sectionId}`;
        }
        const content = await getContentCollections(url);
        const contentCollectionsEl = container.querySelector(
          ".content-collections-js"
        );
        contentCollectionsEl.innerHTML = content;
        productActions();
        done();
      } catch (err) {
        console.log(err);
      }
    },
    onChangePrice({ min, max }) {
      const priceViewEl = container.querySelector(".filter-price-view-js");
      priceViewEl.textContent = `${min} - ${max}`;
    },
    refineListener(items) {
      const refineWrapperEl = container.querySelector(
        ".filter-refine-wrapper-js"
      );
      if (items.length) {
        refineWrapperEl.classList.add("d:block");
      } else {
        refineWrapperEl.classList.remove("d:block");
      }
    },
  });

}
