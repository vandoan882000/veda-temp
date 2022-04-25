

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const {map , store, offset} = veda.utils;
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const filterContainer = document.querySelector(`[data-id="yasmina-filter"]`);
const products = document.querySelector(`[data-id="products"]`);
class Range {
  constructor(options) {
    this.opts = options;
    this.el = this.getEl();
    this.dragEl = this.el.querySelector("[data-index='0']");
    this.dragEl1 = this.el.querySelector("[data-index='1']");
    this.progressEl = this.el.querySelector(".range__progress");
    this.state = {
      value: [0 , 20],
      index: 0,
      isDragging: false
    };

    this.init();
  }

  getEl() {
    if (typeof this.opts.el === "string") {
      return document.querySelector(this.opts.el);
    }
    return this.opts.el;
  }

  setPosition() {
    //const { minValue, maxValue, type } = this.state;
    let value1 = this.getValue1();
    if(value1 < 0) {
      value1 = 0;
    }
    if(value1 > 100) {
      value1 = 100;
    }

    let value2 = this.getValue2();
    if(value2 < 0) {
      value2 = 0;
    }
    if(value2 > 100) {
      value2 = 100;
    }
    const { multiple } = this.opts;
    const containerWidth = this.el.offsetWidth;
    const widthThumb = this.dragEl.offsetWidth / 2 / containerWidth * 100;
    this.dragEl.style.left = `${value1 - widthThumb}%`;
    this.dragEl1.style.left = `${value2 - widthThumb}%`;
    if(multiple){
      if(value1 > value2){
        this.progressEl.style.left = `${value2}%`;
        this.progressEl.style.width = `${value1 - value2}%`;
      }
      else{
        this.progressEl.style.left = `${value1}%`;
        this.progressEl.style.width = `${value2 - value1}%`;
      }

    }
    else {
      this.progressEl.style.width = `${value1}%`;
    }


  }
  update() {
    this.setPosition();
  }
  setValue(value) {
    this.state.value[this.state.index] = value;
  }
  getValue1() {
    return this.state.value[0];
  }
  getValue2() {
    return this.state.value[1];
  }
  getValue() {
    return this.state.value[this.state.index];
  }
  handleDragStart(event) {

    if (this.el.contains(event.target)) {
      const index = Number(event.target.getAttribute("data-index"));
      this.state.index = index;
      this.state.isDragging = true;
    }
  }

  pixelToPercent(value) {
    const containerWidth = this.el.offsetWidth;
    const minValuePercent = (100 * value) / containerWidth;
    return minValuePercent;
  }
  percentToPixel(value) {
    return (this.opts.max * value) / 100;
  }
  handleDragging(event) {
    const { isDragging } = this.state;
    if (isDragging) {
      let value =
        event.pageX - offset(this.el).left - this.dragEl.offsetWidth / 2;
      const valuePercent = this.pixelToPercent(value);
      this.setValue(valuePercent);
      this.update();
    }
  }

  handleDragEnd(event) {
    const { max, onChange, multiple } = this.opts;
    this.state.isDragging = false;
    let value1 = this.getValue1();
    if(value1 < 0) {
      this.state.value[0] = 0;
    }
    if(value1 > 100) {
      this.state.value[0] = 100;
    }

    let value2 = this.getValue2();
    if(value2 < 0) {
      this.state.value[1] = 0;
    }
    if(value2 > 100) {
      this.state.value[1] = 100;
    }
    if (multiple) {
      onChange([this.percentToPixel(Math.min(this.getValue1(),this.getValue2())), this.percentToPixel(Math.max(this.getValue1(),this.getValue2()))]);
    } else {
      onChange(this.percentToPixel(this.getValue1()));
    }
  }

  init() {
    this.setPosition();
    window.addEventListener("mousedown", this.handleDragStart.bind(this));
    window.addEventListener("mousemove", this.handleDragging.bind(this));
    window.addEventListener("mouseup", this.handleDragEnd.bind(this));
  }
}
class ViewAs {
  constructor() {
    this.view1 = container.querySelector(".yasmina-page-product-view-as1");
    this.view2 = container.querySelector(".yasmina-page-product-view-as2");
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
    this.view1.classList.remove("bd:1px_solid_color-gray2");
    this.view1.classList.remove("c:color-gray2");
    this.view1.classList.remove("c:color-gray2!|h");
    this.view1.classList.add("bd:1px_solid_color-gray9");
    this.view1.classList.add("c:color-gray9");
    this.view1.classList.add("c:color-gray9!|h");
    this.view2.classList.remove("bd:1px_solid_color-gray9");
    this.view2.classList.remove("c:color-gray9");
    this.view2.classList.remove("c:color-gray9!|h");
    this.view2.classList.add("bd:1px_solid_color-gray2");
    this.view2.classList.add("c:color-gray2");
    this.view2.classList.add("c:color-gray2!|h");
  }
  handleView2(event) {
    event.preventDefault();
    const shoppage1 = container.querySelector(".shop-page1");
    const shoppage2 = container.querySelector(".shop-page2");
    shoppage2.classList.remove("d:block");
    shoppage2.classList.add("d:none");
    shoppage1.classList.remove("d:none");
    shoppage1.classList.add("d:block");
    this.view2.classList.remove("bd:1px_solid_color-gray2");
    this.view2.classList.remove("c:color-gray2");
    this.view2.classList.remove("c:color-gray2!|h");
    this.view2.classList.add("bd:1px_solid_color-gray9");
    this.view2.classList.add("c:color-gray9");
    this.view2.classList.add("c:color-gray9!|h");
    this.view1.classList.remove("bd:1px_solid_color-gray9");
    this.view1.classList.remove("c:color-gray9");
    this.view1.classList.remove("c:color-gray9!|h");
    this.view1.classList.add("bd:1px_solid_color-gray2");
    this.view1.classList.add("c:color-gray2");
    this.view1.classList.add("c:color-gray2!|h");
  }
  handleDOM() {
    this.view1.addEventListener("click", this.handleView1.bind(this));
    this.view2.addEventListener("click", this.handleView2.bind(this));
  }
  init() {
    this.handleDOM();
  }
}
class BrandFilter {
  constructor() {
    this.brandContent = filterContainer.querySelector(".yasmina-filter__brand-content");
    this.listData = products.querySelectorAll(".yasmina-product-card__data");
    this.init();
  }
  handleBrandItem(event) {
    event.preventDefault();
    console.log(event.target.textContent);
    this.listData.forEach(item => {
      const brand = JSON.parse(item.textContent).vendor;
      if (brand === event.target.textContent) {
        item.parentNode.parentNode.style.display = "block";
      }
      else {
        item.parentNode.parentNode.style.display = "none";
      }
    })
  }
  handleDOM() {
    const lstBrandItems = this.brandContent.querySelectorAll(".yasmina-filter-brand-item");
    lstBrandItems.forEach(item => {
      item.addEventListener("click", this.handleBrandItem.bind(this));
    })
  }
  render() {
    let brands = [];
    this.listData.forEach(item => {
      const brand = JSON.parse(item.textContent).vendor;
      if (!brands.includes(brand)) {
        brands.push(brand);
      }
    })
    return `${map(brands, item => {
      return `<li class="yasmina-filter-brand-item mb:5px">
      <a class="c:color-dark fz:15px ff:font-primary" href="#">${item}</a>
    </li>`
    })}`
  }
  init() {
    this.brandContent.innerHTML = this.render();
    this.handleDOM();
  }
}
class TagFilter {
  constructor() {
    this.tagContent = filterContainer.querySelector(".yasmina-filter__tag-content");
    this.listData = products.querySelectorAll(".yasmina-product-card__data");
    this.init();
  }
  handleTagItem(event) {
    event.preventDefault();
    console.log(event.target.textContent);
    this.listData.forEach(item => {
      const tag = JSON.parse(item.textContent).tags;
      if (tag.includes(event.target.textContent)) {
        item.parentNode.parentNode.style.display = "block";
      }
      else {
        item.parentNode.parentNode.style.display = "none";
      }
    })
  }
  handleDOM() {
    const lstTagItems = this.tagContent.querySelectorAll(".yasmina-filter-tag-item");
    lstTagItems.forEach(item => {
      item.addEventListener("click", this.handleTagItem.bind(this));
    })
  }
  render() {
    let tags = [];
    this.listData.forEach(item => {
      const tag = JSON.parse(item.textContent).tags;
      tag.forEach(item => {
        if (!tags.includes(item)) {
          tags.push(item);
        }
      })
    })
    return `${map(tags, item => {
      return `<a href="#" class="yasmina-filter-tag-item d:inline-block bd:1px_solid_color-gray2 p:2px_5px_2px_5px mb:10px ta:center cur:pointer ff:font-primary fz:15px c:color-gray9 c:color-gray9!|h mr:5px">${item}</a>`
    })}`
  }
  init() {
    this.tagContent.innerHTML = this.render();
    this.handleDOM();
  }
}

if(!!container) {
  //new SelectCustom();
  new ViewAs();
  veda.plugins.select(container, {
    onChange: (value) => {
      console.log(value);
    }
  });
}
if(filterContainer) {
  new BrandFilter();
  new TagFilter();
  new Range({
    el: ".range",
    min: 0,
    max: 300,
    multiple: true,
    value: [10, "max"],
    step: 1,
    onChange(value) {
      console.log(value);
    }
  });
}


// const htmlStr = `
// <div class="ovx:auto h:80px">
//   <ul class="vdoan-menu vdoan-menu--1 d:flex ai:center m:0 p:0 h:60px list-style:none">
//                   <li class="vdoan-menu__list d:inline-block bdr:1px_solid_color-light">
//         <a href=# class="vdoan-menu__link--primary w:100% pl:15px pr:15px fz:17px fw:800 cur:pointer c:color-light whs:nowrap">YASMINA</a>
//       </li>
//                   <li class="vdoan-menu__list d:inline-block bdr:1px_solid_color-light">
//         <a href=# class="vdoan-menu__link--primary w:100% pl:15px pr:15px fz:17px fw:800 cur:pointer c:color-light whs:nowrap">GENTLEMAN</a>
//       </li>
//                   <li class="vdoan-menu__list d:inline-block bdr:1px_solid_color-light">
//         <a href=# class="vdoan-menu__link--primary w:100% pl:15px pr:15px fz:17px fw:800 cur:pointer c:color-light whs:nowrap">Belle Doll</a>
//       </li>
//                   <li class="vdoan-menu__list d:inline-block bdr:1px_solid_color-light">
//         <a href=# class="vdoan-menu__link--primary w:100% pl:15px pr:15px fz:17px fw:800 cur:pointer c:color-light whs:nowrap">Amber.</a>
//       </li>
//                   <li class="vdoan-menu__list d:inline-block bdr:1px_solid_color-light">
//         <a href=# class="abc vdoan-menu__link--primary w:100% pl:15px pr:15px fz:17px fw:800 cur:pointer c:color-light whs:nowrap">GLASSY</a>
//       </li>
//               </ul>
// </div>
// `

// const domParser = new DOMParser();

// const doc = domParser.parseFromString(htmlStr, "text/html");

// const abc = doc.querySelector('.abc');

// console.log(abc)
