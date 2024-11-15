class Tree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
          <style>
            .node-item:not(.root-node-item) {
              padding-left: 15px;
            }
          </style>
          <div id="tree"></div>
      `;
  }

  set data(value) {
    this._data = value;
    this.renderTree(this._data, this.shadowRoot.getElementById("tree"), true);
  }

  get data() {
    return this._data;
  }

  renderTree(nodes, container, isRoot) {
    nodes.forEach((node) => {
      const nodeItem = document.createElement("div");
      nodeItem.classList.add("node-item");
      isRoot && nodeItem.classList.add("root-node-item");
      nodeItem.textContent = node.name;

      if (node.children && node.children.length > 0) {
        this.renderTree(node.children, nodeItem);
      }

      container.appendChild(nodeItem);
    });
  }
}

customElements.define("uc-tree", Tree);
