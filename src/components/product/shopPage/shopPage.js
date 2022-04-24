

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const container = document.querySelector(`[data-id="${uniqueId}"]`);
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
if(!!container) {
  //new SelectCustom();
  new ViewAs();
  veda.plugins.select(container, {
    onChange: (value) => {
      console.log(value);
    }
  });
}

