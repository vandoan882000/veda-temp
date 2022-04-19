

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const container = document.querySelector(`[data-id="${uniqueId}"]`);

class SelectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
    };
  }
  render() {
    const { content } = this.state;
    return html`
      <div class="w:190px h:43px bd:1px_solid_color-gray3 pl:15px cur:pointer d:flex ai:center">
        <div class="select-custom__content w:150px cur:pointer d:flex ai:center fz:15px fw:400 c:color-gray4">${content}</div>
        <i class="fal fa-angle-down"></i>
      </div>
    `;
  }
}
class SelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
  }
  render() {
    const { item } = this.state;
    return html`
      <li class="select-custom__item w:188px h:43px fz:15px fw:400 pl:15px cur:pointer bgc:color-gray3!|h d:flex ai:center">${item.text}</li>
    `;
  }
}
class SelectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEl: props.list,
    };
  }
  render() {
    const { listEl } = this.state;
    return html`
      <ul class="select-custom pos:absolute t:50px l:57px w:190px z:100 bgc:color-light bd:1px_solid_color-gray3">
        ${listEl.map((item,index) => html`<${SelectItem} key=${index} item=${item} />`)}
      </ul>
    `;
  }
}
class SelectCustom  {
  constructor() {
    this.state = {
      show : false
    }
    this.listel = [
      {text: "Featured", type: "left"},
      {text: "Best selling", type: "left"},
      {text: "Alphabetically, A-Z", type: "left"},
      {text: "Alphabetically, Z-A", type: "left"},
      {text: "Price, high to low", type: "left"},
      {text: "Date, old to new", type: "left"},

    ]
    this.render();
  }
  handleSelect(event) {
    render(`${event.currentTarget.textContent}`,container.querySelector(".select-custom__content"));
  }

  renderSelect() {
    return html`
      <${SelectContent} content="Featured"  />
      <${SelectListItem} list=${this.listel} />
    `;
  }
  render() {
    render(this.renderSelect(), document.querySelector(".yasmina-select-option"));
  }

}

if(!!container) {
  //new SelectCustom();
  veda.plugins.select(container, {
    onChange: (value) => {
      console.log(value);
    }
  });
}

