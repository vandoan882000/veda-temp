

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const {map , store, offset} = veda.utils;
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const filterContainer = document.querySelector(`[data-id="yasmina-filter"]`);
const products = document.querySelector(`[data-id="products"]`);
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
function debounce(fn, delay = 300) {
  let timeoutId = -1;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}



if(!!container) {
  const forms = container.querySelectorAll('.filter_form');
  forms.forEach(form => {

    const inputEls = form.querySelectorAll('input');

    const params = {};

    form.addEventListener('submit', event => {
      event.preventDefault();
    })

    inputEls.forEach(inputEl => {
      const delay = /text|search|number|email|phone/g.test(inputEl.type) ? 400 : 0;
      inputEl.addEventListener('input', debounce(event => {
        const { name, value } = event.target;
        params[name] = value;
        const strParams = new URLSearchParams(params).toString();
        const url = new URL(window.location.href.replace(window.location.search, ''));
        url.search = strParams;
        console.log(strParams);
        // strParams.forEach((value, key) => {
        //    console.log(key, value);
        // })
        // for (const [key, value] of strParams) {
        //   console.log(key, value);
        // }
        // fetch(url).then(res => {
        //   console.log(res);
        //   // window.history.pushState('html', 'pageTitle', url);
        // }).catch(err => {})
        window.history.pushState({}, '',url )
      }, delay));
    })
  });

  // const forms = container.querySelectorAll('#filter_form');
  // forms.forEach(form => {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //         const formData = new FormData(form);
  //         const params = new URLSearchParams(formData);
  //         const url = new URL(window.location.href.replace(window.location.search, ''));
  //         url.search = params;
  //         fetch(url).then(res => {
  //           // Làm cái gì đó ở đây
  //             console.log(res);
  //             window.history.pushState('html', 'pageTitle', url);
  //         }).catch(err => {})
  //   })
  // })

  new ViewAs();
  veda.plugins.select(container, {
    onChange: (value) => {
      const valueEl = container.querySelector(".yasmina-sort-by-value");
      valueEl.setAttribute("value", value);
      valueEl.value = value;
      console.log(value);
    }
  });
  veda.plugins.slider(container, {
    min: 0,
    max: 100,
    step: 1,
    range: true,
    value: [16, 80],
    onChange: value => {
      // console.log(value);
      const gte = container.querySelector("#gte");
      const lte = container.querySelector("#lte");
      gte.value = value[0];
      lte.value = value[1];
    },
    onChanged: value => {
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
