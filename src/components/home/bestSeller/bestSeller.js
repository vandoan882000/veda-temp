const uniqueId = "products";
/** @type HTMLElement */
const containers = document.querySelectorAll(`[data-id="${uniqueId}"]`);

if(!!containers) {
  const { debounce } = veda.utils;
  containers.forEach(container => {
    if(container.querySelector(".veda-swiper")) {
      function handleSwiper() {
        const swiperEl = container.querySelector(".veda-swiper");
        const swiperBtnPrev = container.querySelector(".swiper-button-prev");
        const swiperBtnNext = container.querySelector(".swiper-button-next");
        if (swiperEl) {
          if (window.screen.width < 982) {
            swiperEl.setAttribute("data-options", `{
              speed: 400,
              spaceBetween: 20,
              centeredSlides: false,
              slidesPerView: 1,
              touchRatio: 0.3,
            }`);
            swiperBtnPrev.classList.add("trf:translateX(15px)");
            swiperBtnNext.classList.add("trf:translateX(-15px)");
            veda.plugins.swiper(container);
          } else if (window.screen.width > 982) {
            swiperEl.setAttribute("data-options", `{
              speed: 400,
              spaceBetween: 20,
              centeredSlides: false,
              slidesPerView: 4,
              touchRatio: 0.3,
            }`);
            swiperBtnPrev.classList.remove("trf:translateX(15px)");
            swiperBtnNext.classList.remove("trf:translateX(-15px)");
            veda.plugins.swiper(container);
          }
        }

      }
      handleSwiper();
      window.addEventListener("resize", debounce(event => handleSwiper(event)));
    }
  });


}


