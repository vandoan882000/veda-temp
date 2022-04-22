

const uniqueId = "shoppage";
/** @type HTMLElement */
const { Component, html, render, renderWithElement} = veda.utils.csr;
const container = document.querySelector(`[data-id="${uniqueId}"]`);

if(!!container) {
  //new SelectCustom();
  veda.plugins.select(container, {
    onChange: (value) => {
      console.log(value);
    }
  });
}

