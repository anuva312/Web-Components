class Tree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._selectedNodeElement = null;
    this._selectedNode = null;
    this._nodeElements = {};
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

            .node-name.selected {
              color: #0b3f85;
              font-weight: 600;
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
    for (const nodeId in this._nodeElements) {
      let nodeItem = this._nodeElements[nodeId];
      nodeItem.nodeNameElement?.removeEventListener("click", () => {
        this._onNodeClicked(nodeItem.node);
      });
    }
    this._nodeElements = {};
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

      this._nodeElements[node.id] = {
        node,
        nodeNameElement,
      };
      container.appendChild(nodeItem);
    });
  }

  _onNodeClicked(node) {
    if (node.disabled || node.id === this._selectedNode?.id) return;
    const event = new CustomEvent("node-click", {
      detail: node,
    });
    this.setSelected(node.id);
    this.dispatchEvent(event);
  }

  setSelected(nodeId) {
    if (nodeId === this._selectedNode?.id) return;
    const selectedNode = this._nodeElements[nodeId];
    if (this._selectedNodeElement) {
      this._selectedNodeElement.classList.remove("selected");
    }
    if (selectedNode) {
      this._selectedNode = selectedNode.node;
      this._selectedNodeElement = selectedNode.nodeNameElement;
      this._selectedNodeElement.classList.add("selected");
    } else {
      this._selectedNode = null;
      this._selectedNodeElement = null;
    }
  }

  clearSelected() {
    if (this._selectedNodeElement) {
      this._selectedNodeElement.classList.remove("selected");
      this._selectedNode = null;
      this._selectedNodeElement = null;
    }
  }

  getSelected() {
    return this._selectedNode;
  }
}

customElements.define("uc-tree", Tree);
