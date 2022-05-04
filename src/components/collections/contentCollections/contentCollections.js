const uniqueId = "collections";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);

// if (!!container) {
//   const { slider, select } = veda.plugins;
//   const { queryString, debounce } = veda.utils;

//   const formEl = container.querySelector(".petify-filter-form");
//   const inputEls = formEl.querySelectorAll("input");
//   const sortByEl = container.querySelector(".petify-sort-by");
//   const sortByName = "sort_by";
//   const minName = "filter.v.price.gte";
//   const maxName = "filter.v.price.lte";
//   const minPriceEl = container.querySelector(`[name='${minName}']`);
//   const maxPriceEl = container.querySelector(`[name='${maxName}']`);
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
//         window.history.pushState(null, null, url.href);
//         params = queryString.parse(window.location.search);
//       }, delay)
//     );
//   });
// }
