const uniqueId = "shoppage";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);



function createViewShopPage() {
  const listShopView = container.querySelectorAll(".shop-page__view");
  console.log(listShopView);
  const shoppage1 = container.querySelector(".shop-page1");
  const shoppage2 = container.querySelector(".shop-page2");

  function handleViewClick(event) {
    event.preventDefault();
    const currentCls = event.currentTarget.className.split(" ");
    if(currentCls.includes("shop-page__view1")) {
      shoppage2.style.display = "block";
      shoppage1.style.display = "none";
      listShopView[0].style.color = "black";
      listShopView[1].style.color = "gray";
    }
    else {
      shoppage1.style.display = "block";
      shoppage2.style.display = "none";
      listShopView[0].style.color = "gray";
      listShopView[1].style.color = "black";

    }
  }
  function handleView() {
    listShopView.forEach(viewItem => {
      viewItem.addEventListener("click", handleViewClick);
    })
  }
  function init() {
    handleView();
  }
  init();
}

createViewShopPage();
