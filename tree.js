class Tree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.nodeElements = [];
    this.shadowRoot.innerHTML = `
          <style>
            #tree {
              padding: 8px;
              width: max-content;
            }

            .node-item:not(.root-node-item) {
              padding-left: 15px;
            }

            .node-name {
              padding: 5px 0;
            }

            :host:not([clickable]) .node-name {
              pointer-events: none;
            }

            :host([clickable]) .node-name {
              cursor: pointer;
            }

            :host([clickable]) .node-name.disabled {
              cursor: not-allowed;
              opacity: 0.5;
            }
          </style>
          <div id="tree"></div>
      `;
  }

  set data(value) {
    this._data = value;
    this._deleteEventListeners();
    this._renderTree(this._data, this.shadowRoot.getElementById("tree"), true);
  }

  get data() {
    return this._data;
  }

  _deleteEventListeners() {
    for (const nodeItem of this.nodeElements) {
      nodeItem.nodeNameElement?.removeEventListener("click", () => {
        this._onNodeClicked(nodeItem.node);
      });
    }
    this.nodeElements = [];
  }

  _renderTree(nodes, container, isRoot) {
    nodes.forEach((node) => {
      const nodeItem = document.createElement("div");
      nodeItem.classList.add("node-item");
      isRoot && nodeItem.classList.add("root-node-item");
      const nodeNameElement = document.createElement("div");
      nodeNameElement.textContent = node.name;
      nodeNameElement.classList.add("node-name");
      node.disabled && nodeNameElement.classList.add("disabled");
      nodeNameElement.addEventListener("click", () => {
        this._onNodeClicked(node);
      });
      nodeItem.appendChild(nodeNameElement);

      if (node.children && node.children.length > 0) {
        this._renderTree(node.children, nodeItem);
      }

      this.nodeElements.push({
        node,
        nodeNameElement,
      });
      container.appendChild(nodeItem);
    });
  }

  _onNodeClicked(node) {
    if (node.disabled) return;
    const event = new CustomEvent("node-click", {
      detail: node,
    });
    this.dispatchEvent(event);
  }
}

customElements.define("uc-tree", Tree);
