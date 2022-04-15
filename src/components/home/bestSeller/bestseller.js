const uniqueId = "bestseller";
/** @type HTMLElement */
const container = document.querySelector(`[data-id="${uniqueId}"]`);
const { store , map } = veda.utils;
const message = veda.plugins.createMessage();
const PREFIX = 'doan';
store.create("doanCompare", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("doanWishList", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
store.create("doanCart", {
  initialState: {
    visible: false,
    data: []
  },
  useStorage: true
});
class AddStore {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.el = container.querySelector(".row");
    this.init();
    const _this = this;
    store.subscribe(`${PREFIX}${this.storeName}`, this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  handleChangeStatus() {
    const { data } = this.getData();
    const listCard = container.querySelectorAll(".product-card");
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      const dataEl = cartEl.querySelector(".product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      if(hasItem) {
        if(btnCompare.hasAttribute("data-tooltip")) {
          btnCompare.setAttribute("data-tooltip",btnCompare.getAttribute("data-tooltip-active-text"));
          btnCompare.style.backgroundColor = "#f23333";
          btnCompare.style.color = "#fff";
        }
      } else {
        if(btnCompare.hasAttribute("data-tooltip")) {
          btnCompare.setAttribute("data-tooltip",btnCompare.getAttribute("data-tooltip-text"));
          btnCompare.style.backgroundColor = "white";
          btnCompare.style.color = "black";
        }
      }

    })
  }
  handleAdd() {
    const listCard = container.querySelectorAll(".product-card");
    this.handleChangeStatus();
    listCard.forEach(cartEl => {
      const btnCompare = cartEl.querySelector("."+this.elName).parentNode;
      const dataEl = cartEl.querySelector(".product-card__data");

      btnCompare.addEventListener("click", () => {
        const newItem = JSON.parse(dataEl.textContent);
        const { id: newId } = newItem;
        store.set(`${PREFIX}${this.storeName}`, (state) => {
          const dataHasNewItem = state.data.filter(item => item.id === newId);
          // Neu ma trong mang data da co chua san pham nay roi
          // thi khi ta bam vao nut compare se xoa di
          if (dataHasNewItem.length > 0) {
            message.error(`Remove from ${this.storeName}`);
            return {
              ...state,
              data: state.data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)
            };
          }
          // Neu trong data chua co product do thi ta se them vao
          message.info(`Add to ${this.storeName}`);
          return {
            ...state,
            data: [...state.data, newItem]
          };
        })('toggle');
      });

      // if(hasItem) {

      //   btnCompare.addEventListener("click", () => {
      //     console.log("prev",hasItem);
      //     hasItem = !hasItem;
      //     store.set(""+this.storeName, (items) => {
      //         return {
      //           ...items,
      //           data: [...data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)]
      //         };
      //     })(this.storeName+"/Add");
      //     console.log("af",hasItem);
      //   });

      // }
      // else {
      //   btnCompare.addEventListener("click", () => {
      //     console.log("prev",hasItem);
      //     hasItem = !hasItem;
      //     store.set(""+this.storeName, (items) => {
      //         return {
      //           ...items,
      //             data: [...items.data,JSON.parse(dataEl.textContent)]
      //         };
      //     })(this.storeName+"/Add");
      //     console.log("af",hasItem);
      //   });
      // }


    })
  }
  initStore() {
    store.create(`${PREFIX}${this.storeName}`, {
      initialState: {
        visible: false,
        data: []
      },
      useStorage: true
    });
  }
  render() {

  }
  init() {
    this.initStore();
    this.handleAdd();
  }
}
class AddStoreCart {
  constructor(storeName,elName) {
    this.storeName = storeName;
    this.elName = elName;
    this.el = container.querySelector(".row");
    this.init();
    // store.subscribe(storeName,this.handleChangeStatus.bind(this));
  }
  getData() {
    return store.get(`${PREFIX}${this.storeName}`);
  }
  handleAdd() {
    const {data} = this.getData();
    const listCard = container.querySelectorAll(".product-card");
    listCard.forEach(cartEl => {
      const btnCart = cartEl.querySelector("."+this.elName);
      const dataEl = cartEl.querySelector(".product-card__data");
      let hasItem = !!data.find(item => item.id === JSON.parse(dataEl.textContent).id);
      btnCart.parentNode.addEventListener("click", () => {
        if(hasItem) {
          message.error(`Đã có trong giỏ hàng`);
        }
        else {
          const defaultHtml = btnCart.innerHTML;
          btnCart.innerHTML = 'Loading...';
          fetch('https://624eadac53326d0cfe5dba36.mockapi.io/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "quantity": 31,
              "title": "new",
              "price": 19768,
              "original_price": 10,
              "discounted_price": 88,
              "line_price": 4,
              "original_line_price": 28,
              "final_price": 49
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              store.set(`${PREFIX}${this.storeName}`, (items) => {
                return {
                  ...items,
                  data: [...items.data,JSON.parse(dataEl.textContent)]
                };
              })(this.storeName + "/Add");
            })
            .catch(err => {
              console.log(err);
            })
            .finally(() => {
              btnCart.innerHTML = defaultHtml;
              message.info(`Add to ${this.storeName}`);
            })
        }

        // store.set(`${PREFIX}${this.storeName}`, (items) => {

        //     return {
        //       ...items,
        //       data: [...data.filter(item => item.id !== JSON.parse(dataEl.textContent).id)]
        //     };
        // })(this.storeName+"/Add");
      });
    })
  }
  initStore() {
    store.create(`${PREFIX}${this.storeName}`, {
      initialState: {
        visible: false,
        data: []
      },
      useStorage: true
    });
  }
  render() {

  }
  init() {
    this.initStore();
    this.handleAdd();
  }
}
if(!!container) {
  new AddStore("Compare","fa-repeat");
  new AddStore("WishList","fa-heart");
  new AddStoreCart("Cart","product-card__add");
}


