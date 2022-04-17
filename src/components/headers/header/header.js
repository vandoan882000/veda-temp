const uniqueId = "header";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

if (!!container) {
  const menu = veda.plugins.mobileMenu(container, {
    navSelector: ".pet-nav",
    menuSelector: ".pet-nav__menu",
    linkSelector: ".pet-nav__link",
    subMenuSelector: ".pet-nav__sub-list",
    backClassName:
      "pet-nav__list-item-back p:15px c:color-gray9 bdb:1px_solid_color-gray2",
    closeClassName:
      "pet-nav__close p:8px_15px c:color-gray9 bdb:1px_solid_color-gray2",
  });

  function checkResponsive() {
    if (window.innerWidth > 992) {
      menu.destroy();
    } else {
      menu.init();
    }
  }

  checkResponsive();

  window.addEventListener("resize", checkResponsive);
}
