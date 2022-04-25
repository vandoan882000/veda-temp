const uniqueId = "cartcontainer";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const {map , store, offset} = veda.utils;
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
      isDragging: false,
      prevPosition : 0
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
    const widthThumb = this.dragEl.offsetWidth / 2 ;
    this.el.querySelector(".range__bar").style.marginLeft = `${widthThumb / 2}px`;
    this.dragEl.style.left = `${value1}%`;

    if(multiple){
      if(value1 > value2){
        this.progressEl.style.left = `${value2 }%`;
        this.progressEl.style.width = `${value1 - value2}%`;
      }
      else{
        this.progressEl.style.left = `${value1}%`;
        this.progressEl.style.width = `${value2 - value1}%`;
      }
      this.dragEl1.style.left = `${value2}%`;

    }
    else {
      this.progressEl.style.width = `${value1}%`;
      this.progressEl.style.left = `${widthThumb / 2}px`;

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
  valueToPercent(value) {
    const containerWidth = this.el.offsetWidth;
    const minValuePercent = (100 * value) / containerWidth;
    return minValuePercent;
  }
  percentToValue(value) {
    return (this.opts.max * value) / 100;
  }
  handleDragStart(event) {
    const { target } = event.touches ? event.touches[0] : event;
    if (this.el.contains(target)) {
      const index = Number(event.target.getAttribute("data-index"));
      this.state.index = index;
      this.state.isDragging = true;
      if(index === 0) {
        this.state.prevPosition = Math.round(this.percentToValue(this.getValue1()));
      }
      else {
        this.state.prevPosition = Math.round(this.percentToValue(this.getValue2()));
      }
    }
  }

  handleDragging(event) {
    const { pageX } = event.touches ? event.touches[0] : event;
    const { isDragging, prevPosition } = this.state;
    const { step } = this.opts;
    if (isDragging) {
      let value =
        pageX - offset(this.el).left - this.dragEl.offsetWidth / 2;
      const valuePercent = this.valueToPercent(value);
      const currentValue = Math.round(this.percentToValue(valuePercent));
      if(currentValue == prevPosition + step || currentValue + step == prevPosition) {
        this.state.prevPosition = currentValue;
        this.setValue(valuePercent);
        this.update();
      }
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
      const minValue = Math.min(this.getValue1(),this.getValue2());
      const maxValue = Math.max(this.getValue1(),this.getValue2());
      onChange([Math.round(this.percentToValue(minValue)), Math.round(this.percentToValue(maxValue))]);
    } else {
      onChange(Math.round(this.percentToValue(this.getValue1())));
    }
  }

  init() {
    this.setPosition();
    window.addEventListener("mousedown", this.handleDragStart.bind(this));
    window.addEventListener("mousemove", this.handleDragging.bind(this));
    window.addEventListener("mouseup", this.handleDragEnd.bind(this));
    window.addEventListener("touchstart", this.handleDragStart.bind(this));
    window.addEventListener("touchmove", this.handleDragging.bind(this));
    window.addEventListener("touchend", this.handleDragEnd.bind(this));
  }
}




class CartRender {
  constructor() {
    this.el = document.querySelector(".card-cart__tbody");
    this.loader = this.createComparePortal();
    store.subscribe('yasminaCart', this.init.bind(this));
    this.updateStore();

  }
  getData() {
    return store.get("yasminaCart");
  }
  updateStore() {
    fetch('https://624eadac53326d0cfe5dba36.mockapi.io/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        store.set(`yasminaCart`, (items) => {
          return {
            visible: false,
            data: [...data]
            };
        })("/Add");
        this.init();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleDeleteCart(e) {
    const currentEl = e.currentTarget;
    const currentId = currentEl.getAttribute("data-id");
    this.loader.innerHTML = `
      <div class="d:flex fld:column ai:center jc:center pos:fixed t:0 l:0 z:999 w:100% h:100%">
        <div class="close pos:absolute t:0 l:0 z:-1 w:100% h:100% bgc:color-gray9.4"></div>
        <div class="w:1200px h:1000px bgc:transparent mt:120px ov:auto">
          <div class="d:flex fld:column ai:center jc:center w:100% h:100%">
           <div class="loader"></div>
          </div>
        </div>
      </div>`;
    fetch('https://624eadac53326d0cfe5dba36.mockapi.io/cart/' + currentId, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        store.set(`yasminaCart`, (items) => {
          return {
            ...items,
            data: [...items.data.filter(item => item.id !== data.id)]
          };
        })("CartDelete");
        this.loader.innerHTML = "";
        this.init();
      })
      .catch(err => {
        console.log(err);
        alert("Delete Cart Error");
      });

  }
  createComparePortal() {
    const rootEl = document.querySelector('#root');
    const el = document.createElement('div');
    rootEl.appendChild(el);
    return el;
  }
  handleDOM() {
    const lstRemoveEl = document.querySelectorAll(".yasmina-card-cart__remove");
    lstRemoveEl.forEach(el => {
      el.addEventListener("click", this.handleDeleteCart.bind(this));
    });
  }
  render() {
    const {data} = this.getData();
      return map(data, item => {
        return /*html*/`
          <tr class="card-cart bdb:1px_solid_color-gray2 fz:15px">
            <td class="card-cart__content pt:30px pb:30px d:flex">
              <a href="#" class="veda-image-cover d:block w:140px bd:none! h:132px" css="--aspect-ratio: 4/4">
                <img src=${item.image} alt="product-card">
              </a>
              <div class="card-cart__name pl:20px c:color-primary">
                <div class="card-cart__title c:color-dark mb:10px fw:500 fz:15px">${item.title}</div>
                <p class="mb:10px c:color-gray6 fz:15px fw:500">Color: Light Blue</p>
                <a class="yasmina-card-cart__remove td:none bd:none c:color-primary fz:13px fw:400 cur:pointer" data-id=${item.id}>Remove</a>
              </div>
            </td>
            <td class="pt:30px pb:30px"><p class="card-cart__price c:color-dark fw:400 fz:20px">$${item.price}</p></td>
              <td class="pt:30px pb:30px">
                <div class="card-cart__quantity d:flex w:108px bd:1px_solid_color-gray3">
                  <button class="card-cart__sub c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-start cur:pointer bgc:transparent!|h c:color-dark!|h"><i class="fal fa-minus fz:13px"></i></button>
                  <input type="text" class="card-cart__value w:48px! h:40px bd:none! o:none ta:center fz:15px fw:500 c:color-gray9" value="1" min="1"/>
                  <button class="card-cart__add c:color-dark w:30px h:40px bd:none o:none bgc:transparent d:flex ai:center jc:flex-end bgc:transparent!|h cur:pointer c:color-dark!|h"><i class="fal fa-plus fz:13px"></i></button>
                </div>
                </td>
                <td class="pt:30px pb:30px">
                  <p class="card-cart__total fz:20px fw:500 c:color-gray9">$${item.price}</p>
                </td>
              </tr>`
    });
  }
  init() {
    this.el.innerHTML = this.render();
    this.handleDOM();
  }
}
if(!!container) {
  store.set(`yasminaCart`, (items) => {
    return {
      ...items,
      visible: false,
      };
  })("/Add");
  veda.plugins.countdown(container);
  veda.plugins.select(container, {
    onChange: (value) => {
      console.log(value);
    }
  });
  new CartRender();
  new Range({
    el: ".range",
    min: 0,
    max: 300,
    multiple: true,
    value: [10, "max"],
    step: 150,
    onChange(value) {
      console.log(value);
    }
  });
}

