// import "./home/products/products.js";
// import "./cart/cartContainer/cartContainer.js";
// import "./product/shopPage/shopPage.js";
function createMenu({
  createMenuButton
}) {
  /**
   * @type {HTMLElement}
   */
  const navEl = document.querySelector(".nav-mobile");
  const menu = document.querySelector(".vdoan-menu-mobile--2");
  const menuSearch = document.querySelector(".vdoan-menu-mobile__search-container");
  /**
   * @type {HTMLUListElement}
   */
  const buttonShowMenu = createMenuButton();
  function renderMenuButton() {
    navEl.appendChild(buttonShowMenu);
  }
  function handleButtonClick() {
    const iconMenu = buttonShowMenu.children[0];
    if( iconMenu.className == "far - fa-bars") {
      menu.style.display = "block";
      menuSearch.style.display = "flex";
      iconMenu.className = "fas fa-times"
    }
    else
    {
      menu.style.display = "none";
      menuSearch.style.display = "none";
      iconMenu.className = "far - fa-bars";
    }

  }
  function handleButton() {
    buttonShowMenu.addEventListener("click", handleButtonClick);
  }



  function init() {
    renderMenuButton();
    handleButton();
  }

  init();
}
createMenu({
  createMenuButton() {
    const buttonShowMenu = document.createElement("button");
    buttonShowMenu.className = "btn-show";
    buttonShowMenu.id = "btn-show";
    const iconBar = document.createElement("i");
    iconBar.className = "far - fa-bars"
    buttonShowMenu.appendChild(iconBar);
    return buttonShowMenu;
  },

});

function sizeScreen() {
  // const nav = document.getElementById("nav");
  /**
   * @type {HTMLElement}
   */
  const navEl = document.querySelector(".nav");
  const navElMobile = document.querySelector(".nav-mobile");
  const menu1 = document.querySelector(".vdoan-menu-mobile--1");
  const menu2 = document.querySelector(".vdoan-menu-mobile--2");
  const buttonMenu = document.getElementById("btn-show");
  const menuSearch = document.querySelector(".vdoan-menu-mobile__search-container");
  function initMenu() {
    if(window.innerWidth < 1000)
    {
      buttonMenu.style.display = "flex";
      menu1.style.display = "flex";
      menu2.style.display = "none";
      menuSearch.style.display = "none";
      navEl.style.display = "none"
      navElMobile.style.display = "block";
    }
    else
    {
      buttonMenu.style.display = "none";
      menu1.style.display = "none";
      menu2.style.display = "none";
      menuSearch.style.display = "none";
      navEl.style.display = "block";
      navElMobile.style.display = "none"
    }
  }
  function resizeScreen(){
    if(window.innerWidth < 1000)
    {
      buttonMenu.style.display = "flex";
      menu1.style.display = "flex";
      menu2.style.display = "none";
      menuSearch.style.display = "none";
      navEl.style.display = "none"
      navElMobile.style.display = "block";
    }
    else
    {
      buttonMenu.style.display = "none";
      menu1.style.display = "none";
      menu2.style.display = "none";
      menuSearch.style.display = "none";
      navEl.style.display = "block"
      navElMobile.style.display = "none"
    }
  }
  function init() {
    initMenu();
    window.addEventListener('resize', resizeScreen );
    // console.log(buttonMenu);
  }
  init();
}

sizeScreen();
console.log("123");
