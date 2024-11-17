class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isModalOpen = false;
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
                border: 1px solid #2f80ed;
                border-radius: 8px;
                color: #2f80ed;
                padding: 8px 16px;
            }

            button:hover{
                background: #2f80ed;
                color: #fff;
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
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Confirm</button>
            </footer>
        </div>
    `;

    this._confirmBtn = null;
    this._cancelBtn = null;
    this._backDrop = null;
  }

  connectedCallback() {
    this._confirmBtn = this.shadowRoot.getElementById("confirm-btn");
    this._cancelBtn = this.shadowRoot.getElementById("cancel-btn");
    this._backDrop = this.shadowRoot.getElementById("backdrop");

    this._confirmBtn?.addEventListener("click", this._confirm.bind(this));
    this._cancelBtn?.addEventListener("click", this._cancel.bind(this));
    this._backDrop?.addEventListener("click", this._cancel.bind(this));
  }

  disconnectedCallback() {
    this._confirmBtn?.removeEventListener("click", this._confirm.bind(this));
    this._cancelBtn?.removeEventListener("click", this._cancel.bind(this));
    this._backDrop?.removeEventListener("click", this._cancel.bind(this));
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
