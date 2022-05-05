

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const {map , store, offset} = veda.utils;
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const filterContainer = document.querySelector(`[data-id="yasmina-filter"]`);
const products = document.querySelector(`[data-id="products"]`);
const { collectionsFilters } = veda.plugins;
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

if (!!container) {
  const { slider, select } = veda.plugins;
  const { queryString, debounce } = veda.utils;
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
          class="p:3px m:5px bdrs:3px bd:1px_solid_color-gray3"
        >
          <span>${item.label}</span>
          <span class="cur:pointer p:3px">
            <i class="fal fa-times" onClick=${onRemove}></i>
          </span>
        </div>
      `;
    },
    renderClearAllButton({ onClear }) {
      return html`<button onClick=${onClear}>Clear All</button>`;
    },
    onChange({ url, category, done }) {
      // fetch(url).then(res => {
      //   console.log(res);
      //   done();
      // }).catch(err => {})
      console.log(url, category);
      done();
    },
    onChangePrice({ min, max }) {
      const priceViewEl = container.querySelector(".petify-price-view");
      priceViewEl.textContent = `${min} - ${max}`;
    },
  });
//   const formEl = container.querySelector(".petify-filter-form");
//   const inputEls = formEl.querySelectorAll("input");
//   const sortByEl = container.querySelector(".petify-sort-by");
//   console.log(container);
//   const sortByName = "sort_by";
//   const minName = "filter.v.price.gte";
//   const maxName = "filter.v.price.lte";
//   const minPriceEl = document.querySelector(`input[name="${minName}"]`);
//   const maxPriceEl = container.querySelector(`input[name='${maxName}']`);
//   let sortByValue = "";
//   let params = queryString.parse(window.location.search);
//   const paramsObj = queryString.parse(window.location.search, true);

//   formEl.addEventListener("submit", (event) => {
//     event.preventDefault();
//   });

//   function getKeys(arr) {
//     return arr.map(([key]) => key);
//   }

//   const range = slider({
//     el: container.querySelector(".petify-price-range"),
//     value: [
//       paramsObj["filter.v.price.gte"] || minPriceEl.min,
//       paramsObj["filter.v.price.lte"] || maxPriceEl.max,
//     ],
//     range: true,
//     onChange(value) {
//       const priceMinEl = formEl.querySelector(
//         'input[name="filter.v.price.gte"]'
//       );
//       const priceMaxEl = formEl.querySelector(
//         'input[name="filter.v.price.lte"]'
//       );
//       priceMinEl.value = value[0];
//       priceMaxEl.value = value[1];
//     },
//     onChanged(value) {
//       const [minValue, maxValue] = value;
//       if (getKeys(params).includes(minName)) {
//         params = params.reduce((arr, [key, val]) => {
//           return [...arr, key === minName ? [minName, minValue] : [key, val]];
//         }, []);
//       } else {
//         params.push([minName, minValue]);
//       }
//       if (getKeys(params).includes(maxName)) {
//         params = params.reduce((arr, [key, val]) => {
//           return [...arr, key === maxName ? [maxName, maxValue] : [key, val]];
//         }, []);
//       } else {
//         params.push([maxName, maxValue]);
//       }
//       const url = new URL(
//         window.location.href.replace(window.location.seach, "")
//       );
//       url.search = queryString.stringify(params);
//       window.history.pushState(null, null, url.href);
//     },
//   });

//   select({
//     el: container.querySelector(".petify-sort-by"),
//     value: paramsObj[sortByName],
//     onChange(value) {
//       sortByValue = value;
//       if (sortByName) {
//         const name = sortByName;
//         if (getKeys(params).includes(name)) {
//           params = params.reduce((arr, [key, val]) => {
//             return [...arr, key === name ? [name, value] : [key, val]];
//           }, []);
//         } else {
//           params.push([name, value]);
//         }
//         const search = queryString.stringify(params);
//         const url = new URL(
//           window.location.href.replace(window.location.seach, "")
//         );
//         url.search = queryString.stringify(params);
//         window.history.pushState(null, null, url.href);
//       }
//     },
//   });

//   inputEls.forEach((inputEl) => {
//     const regexp = /text|number|email|phone/g;
//     const delay = regexp.test(inputEl.type) ? 400 : 0;

//     params.forEach(([key, val]) => {
//       if (key === inputEl.name) {
//         if (/checkbox|radio/g.test(inputEl.type)) {
//           if (val === inputEl.value) {
//             inputEl.setAttribute("checked", "checked");
//           }
//         } else {
//           inputEl.value = val;
//         }
//       }
//     });

//     inputEl.addEventListener(
//       "input",
//       debounce((event) => {
//         const { name, value, type } = event.target;
//         const formData = new FormData(formEl);
//         if (/filter.v.price.gte|filter.v.price.lte/g.test(name)) {
//           const minValue = formData.get("filter.v.price.gte");
//           const maxValue = formData.get("filter.v.price.lte");
//           range.setValue([minValue, maxValue]);
//         }
//         formData.set(sortByName, sortByValue);
//         const search = queryString.stringify(formData);
//         const url = new URL(
//           window.location.href.replace(window.location.search, "")
//         );
//         url.search = search;
//         // fetch(url).then(res => {
//         //   console.log(res);
//         //   window.history.pushState(null, null, url.href);
//         //   params = queryString.parse(window.location.search);
//         // }).catch(err => {})
//         console.log(url);
//         console.log(params);
//         console.log(queryString.parse(window.location.search))
//         window.history.pushState(null, null, url.href);
//         params = queryString.parse(window.location.search);
//       }, delay)
//     );
//   });
// }

}
// if(!!container) {
//   const forms = container.querySelectorAll('.filter_form');
//   forms.forEach(form => {

//     const inputEls = form.querySelectorAll('input');

//     const params = {};

//     form.addEventListener('submit', event => {
//       event.preventDefault();
//     })

//     inputEls.forEach(inputEl => {
//       const delay = /text|search|number|email|phone/g.test(inputEl.type) ? 400 : 0;
//       inputEl.addEventListener('input', debounce(event => {
//         const { name, value } = event.target;
//         params[name] = value;
//         const strParams = new URLSearchParams(params).toString();
//         const url = new URL(window.location.href.replace(window.location.search, ''));
//         url.search = strParams;
//         console.log(strParams);
//         // strParams.forEach((value, key) => {
//         //    console.log(key, value);
//         // })
//         // for (const [key, value] of strParams) {
//         //   console.log(key, value);
//         // }
//         // fetch(url).then(res => {
//         //   console.log(res);
//         //   // window.history.pushState('html', 'pageTitle', url);
//         // }).catch(err => {})
//         window.history.pushState({}, '',url )
//       }, delay));
//     })
//   });

//   // const forms = container.querySelectorAll('#filter_form');
//   // forms.forEach(form => {
//   //   form.addEventListener('submit', (e) => {
//   //     e.preventDefault();
//   //         const formData = new FormData(form);
//   //         const params = new URLSearchParams(formData);
//   //         const url = new URL(window.location.href.replace(window.location.search, ''));
//   //         url.search = params;
//   //         fetch(url).then(res => {
//   //           // Làm cái gì đó ở đây
//   //             console.log(res);
//   //             window.history.pushState('html', 'pageTitle', url);
//   //         }).catch(err => {})
//   //   })
//   // })

//   new ViewAs();
//   veda.plugins.select(container, {
//     onChange: (value) => {
//       const valueEl = container.querySelector(".yasmina-sort-by-value");
//       valueEl.setAttribute("value", value);
//       valueEl.value = value;
//       console.log(value);
//     }
//   });
//   veda.plugins.slider({
//     el: container.querySelector('.veda-slider'),
//     min: 0,
//     max: 100,
//     step: 1,
//     range: true,
//     value: [16, 80],
//     onChange: value => {
//       // console.log(value);
//       const gte = container.querySelector("#gte");
//       const lte = container.querySelector("#lte");
//       gte.value = value[0];
//       lte.value = value[1];
//     },
//     onChanged: value => {
//       console.log(value);
//     }
//   });
// }




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
