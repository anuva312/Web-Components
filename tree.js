class Tree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <div id="tree"></div>
    `;
  }
}

customElements.define("uc-tree", Tree);
