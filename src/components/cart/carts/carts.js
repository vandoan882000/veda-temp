const uniqueId = "cartcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { map , store, debounce } = veda.utils;
const { message } = veda.plugins;
const { html, render } = veda.utils.csr;
const PREFIX = "yasmina";

function onChangeQuantity(event, id) {
  const currentEl = event.target;
  const quantity = currentEl.value;
  if (quantity == 0) {
    veda.plugins.cart.removeCart(id);
  } else {
    veda.plugins.cart.updateCart(id, quantity);
  }
}
function handleClickDecrement(event, id) {
  const currentEl = event.target;
  const quantityEl = currentEl.closest('.veda-counter').querySelector('.veda-counter__input');
  quantityEl.value = parseInt(quantityEl.value) - 1;
  if (quantityEl.value == 0) {
    veda.plugins.cart.removeCart(id);
  } else {
    veda.plugins.cart.updateCart(id, quantityEl.value);
  }
}
function handleClickIncrement(event, id) {
  const currentEl = event.target;
  const quantityEl = currentEl.closest('.veda-counter').querySelector('.veda-counter__input');
  quantityEl.value = parseInt(quantityEl.value) + 1;
  if (quantityEl.value == 0) {
    veda.plugins.cart.removeCart(id);
  } else {
    veda.plugins.cart.updateCart(id, quantityEl.value);
  }
}
if(!!container) {

  veda.plugins.countdown(container);
  veda.plugins.cart.customCart({
    renderCart: (product) => {
      return html`
        <tr class="card-cart fz:15px bd:none bdb:1px_solid_color-gray2">
          <td class="card-cart__content bd:none pt:30px pb:30px d:flex pl:0px!">
              <a href="#" class="veda-image-cover d:block w:140px bd:none! h:132px" css="--aspect-ratio: 4/4">
                <img src=${product.image} alt="product-card"></img>
              </a>
              <div class="card-cart__name pl:20px c:color-primary">
                <div class="card-cart__title c:color-dark mb:10px fw:500 fz:15px">${product.title}</div>
                <p class="mb:10px c:color-gray6 fz:15px fw:500">Color: </p>
                <a class="yasmina-card-cart__remove td:none bd:none c:color-primary fz:13px fw:400 cur:pointer" onClick=${() => veda.plugins.cart.removeCart(product.id)}>Remove</a>
              </div>
            </td>
            <td class=" bd:none va:middle!">
              <div class="c:color-dark fw:400 fz:20px">$${product.price}.00</div>
            </td>
            <td class=" bd:none va:middle!">
              <div data-id="${product.id}" class="veda-counter d:flex w:108px bd:1px_solid_color-gray3" data-options="{ value: ${product.quantity} }">
                <div class="veda-counter__decrement c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-start cur:pointer bgc:transparent!|h c:color-dark!|h ta:center" onClick=${debounce(event => handleClickDecrement(event, product.id))}>
                  <i class="fal fa-minus fz:13px w:100% h:100% lh:40px"></i>
                </div>
                <input class="veda-counter__input w:48px! h:40px p:0! bd:none! o:none ta:center fz:15px fw:500 c:color-gray9" type="number" data-button="disabled" onInPut=${debounce(event => onChangeQuantity(event, product.id))} value=${product.quantity}/>
                <div class="veda-counter__increment c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-end bgc:transparent!|h cur:pointer c:color-dark!|h ta:center" onClick=${debounce(event => handleClickIncrement(event, product.id))}>
                  <i class="fal fa-plus fz:13px w:100% h:100% lh:40px"></i>
                </div>
              </div>
            </td>
            <td class=" bd:none va:middle!">
              <p class="card-cart__total fz:20px fw:500 c:color-gray9">$${product.price * product.quantity}.00</p>
            </td>
          </tr>`;
    },
  });
  const cartWrapper = document.querySelector('.card-cart__tbody');
  veda.plugins.cart.subscribe(() => veda.plugins.cart.renderCart(cartWrapper))
  veda.plugins.cart.renderCart(cartWrapper);
  veda.plugins.slider({
    el: container.querySelector('.veda-slider'),
    min: 0,
    max: 500,
    step: 1,
    range: false,
    value: [100, 200],
    onChange: value => {
    },
    onChanged: value => {
    }
  });
  veda.plugins.select({
    el: document.querySelector(".select-country"),
    onChange: value => {
      console.log(value);
    }
  });
  veda.plugins.select({
    el: document.querySelector(".select-state"),
    onChange: value => {
      console.log(value);
    }
  });
}

