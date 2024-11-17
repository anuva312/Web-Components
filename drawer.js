class Drawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isDrawerOpen = false;
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop{
                position: fixed;
                top: 0;
                left: 0;
                background: rgba(0, 0, 0, 0.25);
                width: 100%;
                height: 100vh;
                display: none;
            }

            #drawer{
                position: fixed;
                background: white;
                box-shadow: 2px 2px #ccc;
                display: none; 
                z-index: 100;        
            }

            :host([opened]) #backdrop{
                display: block;
            }

           :host([opened]) #drawer{
                display: block;
                width: 100%;
                top: 0;
                left: 0;
                min-height: 50px;   
                animation: moveInFromTop 0.2s ease-in;
            }
            
          :host([opened][position=bottom]) #drawer{
                display: block;
                width: 100%;
                bottom: 0;
                left: 0;
                top : unset;
                min-height: 50px;
                animation: moveInFromBottom 0.2s ease-in;
            }

            :host([opened][position=left]) #drawer{
                display: block;
                width: unset;
                min-width: 50px;
                height: 100vh;
                animation: moveInFromLeft 0.2s ease-in;
            }

            :host([opened][position=right]) #drawer{
                display: block;
                width: unset;
                left: unset;
                right: 0;
                min-width: 50px;
                height: 100vh;
                animation: moveInFromRight 0.2s ease-in;
            }

            @keyframes moveInFromTop {
                0%{
                    opacity: 0;
                    transform: translateY(-100%);
                }

                100%{
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes moveInFromBottom {
                0%{
                    opacity: 0;
                    transform: translateY(100%);
                }

                100%{
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes moveInFromLeft {
                0%{
                    opacity: 0;
                    transform: translateX(-100%);
                }

                100%{
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes moveInFromRight {
                0%{
                    opacity: 0;
                    transform: translateX(100%);
                }

                100%{
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        </style>
        <div id="backdrop"></div>
        <div id="drawer">
            <slot name="drawer-content"></slot>
        </div>
    `;

    this._backDrop = null;
  }

  connectedCallback() {
    this._backDrop = this.shadowRoot.getElementById("backdrop");
    this._backDrop?.addEventListener("click", this.close.bind(this));
  }

  disconnectedCallback() {
    this._backDrop?.removeEventListener("click", this.close.bind(this));
  }

  open() {
    this.setAttribute("opened", "");
    this.isDrawerOpen = true;
  }

  close() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
      this.isDrawerOpen = false;
    }
  }
}
customElements.define("uc-drawer", Drawer);
