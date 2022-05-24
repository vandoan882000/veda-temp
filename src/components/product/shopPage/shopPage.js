

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const {map , store, offset} = veda.utils;
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const filterContainer = document.querySelector(`[data-id="yasmina-filter"]`);
const products = document.querySelector(`[data-id="products"]`);
const { collectionsFilters } = veda.plugins;

class Tags extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector(".yasmina-product-box__tags");
    this.tags = this.getTags();
  }
  getTags() {
    let tags = [];
    const lstData = container.querySelectorAll(".product-card-data-js");
    lstData.forEach(dataEl => {
      const data = JSON.parse(dataEl.textContent);
      data.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      })
    })
    return tags;
  }
  render() {
    const { tags } = this;
    return html`
        ${tags.map(tag => html`
        <div class="d:flex pos:relative ai:center h:28px jc:center mr:5px ta:center cur:pointer ff:font-primary fz:15px p:2px_5px_2px_5px mb:10px">
            <label class="w:100% h:28px cur:pointer cur:pointer d:flex jc:center">
                <input class="yasmina-filter-input-tag pos:absolute v:hidden" type="checkbox" name="filter.v.tag" value="${tag}" data-label="${tag}"/>
                <div class="pos:absolute w:100% h:100% bd:1px_solid_color-gray2"></div>
                <span class="ta:center lh:28px fz:15px fw:400 c:color-gray9">${tag}</span>
            </label>
        </div>
        `)}
    `;
  }
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


if (!!container) {
  const { collectionsFilters } = veda.plugins;
  const { html } = veda.utils.csr;
  const domParser = new DOMParser();

  async function getContentCollections(url) {
    const res = await fetch(url);
    const html = await res.text();
    const doc = domParser.parseFromString(html, "text/html");
    const contentCollectionsEl = doc.querySelector(
      ".pretify-content-collections"
    );
    if (contentCollectionsEl) {
      const contentCollections = contentCollectionsEl.innerHTML;
      return contentCollections;
    }
    return "";
  }
  collectionsFilters(container, {
    formSelector: ".petify-filter-form",
    sortBySelector: ".petify-sort-by",
    refineRootSelector: ".petify-refine",
    clearAllRootSelector: ".petify-clear-all",
    priceStep: 0.01,
    renderRefineItem({ item, onRemove }) {
      return html`
        <div
          key=${item.value}
          class="product-box__box-refine pos:relative d:inline-block bd:1px_solid_color-gray2 w:fit-content p:2px_25px_2px_5px cur:pointer c:color-gray4 ff:font-primary mr:5px mb:5px"
        >
          <span class="c:color-gray4">${item.label}</span>
          <span class="cur:pointer">
            <i class="fal fa-times pos:absolute t:55% r:1% trf:translate(-50%,-50%) c:color-gray4 c:color-gray9!|h" onClick=${onRemove}></i>
          </span>
        </div>
      `;
    },
    renderClearAllButton({ onClear }) {
      return html`<button class="c:color-dark ff:font-primary bgc:color-light bgc:color-light|h! bd:none! c:color-gray9|h! p:0! c:color-primary|h!" onClick=${onClear}>Clear All</button>`;
    },
    onChange({ url, category, done }) {
      const sectionId = container.getAttribute("data-shopify-id");
      if (category) {
        url.pathname = `/product.html/${category}`;
      }
      url.search = `${url.search}&section_id=${sectionId}`;
      getContentCollections(url).then((content) => {
        // console.log(content);
        done();
      });
    },
    onChangePrice({ min, max }) {
      const priceViewEl = container.querySelector(".petify-price-view");
      priceViewEl.textContent = `${min} - ${max}`;
    },
    refineListener(items) {
      const refineWrapperEl = container.querySelector(
        ".pretify-refine-wrapper"
      );
      if (items.length) {
        refineWrapperEl.classList.add("d:block");
      } else {
        refineWrapperEl.classList.remove("d:block");
      }
    },
  });
  new ViewAs();
  render(html`<${Tags} />`, container.querySelector(".yasmina-product-box__tags"));
}
