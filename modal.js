class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isModalOpen = false;
    this._confirmButtonLabel = "Confirm";
    this._cancelButtonLabel = "Cancel";
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop{
                position : fixed;
                top : 0;
                left : 0;
                background : rgba(0, 0, 0, 0.25);
                width : 100%;
                height : 100vh;
                display : none;
            }
            
            #modal{
                position : fixed;
                top : 25%;
                left : 25%;
                width : 50%;
                background : white;
                box-shadow : 2px 2px #ccc;
                border-radius : 5px;
                display : none;
            }

            header{
                font-size : 18px;
                font-weight :bold;
            }

            #modal-body{
                border-top : 1ps solid #ccc;
                margin : 5px 0;
                border-bottom : 1ps solid #ccc;
            }

            footer{
                display : flex;
                flex-direction: row-reverse;
                justify-content : space-between;
            }
                
            :host([opened]) #backdrop{
                display : block;
            }

            :host([opened]) #modal{
                display : flex;
                flex-direction : column;
                justify-content : space-between;
                padding : 15px;
            }

            button{
                cursor : pointer;
                background: #fff;
                border: 1px solid #0b3f85;
                border-radius: 8px;
                color: #0b3f85;
                padding: 8px 16px;
            }

            button:hover{
                background: #0b3f85;
                color: #fff;
            }

            :host([hide-cancel-button]) #cancel-btn{
                display: none;
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="modal-header"></slot>
            </header>
            <section id="modal-body">
                <slot></slot>
            </section>
            <footer>
                <button id="confirm-btn">${this._confirmButtonLabel}</button>
                <button id="cancel-btn">${this._cancelButtonLabel}</button>
            </footer>
        </div>
    `;

    this._confirmButton = null;
    this._cancelButton = null;
    this._backDrop = null;
  }

  connectedCallback() {
    this._confirmButton = this.shadowRoot.getElementById("confirm-btn");
    this._cancelButton = this.shadowRoot.getElementById("cancel-btn");
    this._backDrop = this.shadowRoot.getElementById("backdrop");

    this._confirmButton.textContent = this._confirmButtonLabel;
    this._cancelButton.textContent = this._cancelButtonLabel;

    this._confirmButton?.addEventListener("click", this._confirm.bind(this));
    this._cancelButton?.addEventListener("click", this._cancel.bind(this));
    this._backDrop?.addEventListener("click", this._cancel.bind(this));
  }

  disconnectedCallback() {
    this._confirmButton?.removeEventListener("click", this._confirm.bind(this));
    this._cancelButton?.removeEventListener("click", this._cancel.bind(this));
    this._backDrop?.removeEventListener("click", this._cancel.bind(this));
  }

  static get observedAttributes() {
    return ["confirm-button-label", "cancel-button-label"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "confirm-button-label":
        this._confirmButtonLabel = newValue || "Confirm";
        if (this._confirmButton) {
          this._confirmButton.textContent = this._confirmButtonLabel;
        }
        break;
      case "cancel-button-label":
        this._cancelButtonLabel = newValue || "Cancel";
        if (this._cancelButton) {
          this._cancelButton.textContent = this._cancelButtonLabel;
        }
        break;
      default:
        break;
    }
  }

  open() {
    this.setAttribute("opened", "");
    this.isModalOpen = true;
  }

  close() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
      this.isModalOpen = false;
    }
  }

  _confirm() {
    this.close();
    this.dispatchEvent(new Event("confirm"));
  }

  _cancel() {
    this.close();
    this.dispatchEvent(new Event("cancel"));
  }
}

customElements.define("uc-modal", Modal);
