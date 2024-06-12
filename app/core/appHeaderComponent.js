export class AppHeaderComponent extends HTMLElement{   

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
        document.addEventListener("aside:toggle",this.#removeOpenMenuStyles.bind(this));
    }

    disconnectedCallback(){
        /* Remove Events */
        this.shadowRoot.querySelector("#openMenu").removeEventListener("click",this.#openMenu.bind(this));

        this.shadowRoot.querySelector("#closeMenu").removeEventListener("click",this.#CloseMenu.bind(this));

        this.shadowRoot.querySelector(".header__backdrop").removeEventListener("click",this.#CloseMenu.bind(this));

        document.removeEventListener("aside:toggle",this.this.#removeOpenMenuStyles.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        this.shadowRoot.querySelector("#openMenu").addEventListener("click",this.#openMenu.bind(this));

        this.shadowRoot.querySelector("#closeMenu").addEventListener("click",this.#CloseMenu.bind(this));

        this.shadowRoot.querySelector(".header__backdrop").addEventListener("click",this.#CloseMenu.bind(this));
    }

    #openMenu(){        
        const Event = new CustomEvent(
            "aside:toggle",
            {
                detail:{state:"open"},
                bubbles:true,
                composed:true
            }
        );

        this.dispatchEvent(Event);

        this.#ChangeButtons();
        this.shadowRoot.querySelector(".header__nav").classList.add("header__nav--open");
        this.shadowRoot.querySelector(".header").classList.add("header--open")
        
    }

    #CloseMenu(){
        
        const Event = new CustomEvent(
            "aside:toggle",
            {
                detail:{state:"close"},
                bubbles:true,
                composed:true
            }
        );

        this.dispatchEvent(Event);
    }

    #removeOpenMenuStyles(e = null){
        if(e!=null && e.detail.state != "close")return;
        this.#ChangeButtons();
        this.shadowRoot.querySelector(".header__nav").classList.remove("header__nav--open");
        this.shadowRoot.querySelector(".header").classList.remove("header--open")
    }

    #ChangeButtons(){
        const BtnOpen = this.shadowRoot.querySelector(".header__btn--open");
        const BtnClose = this.shadowRoot.querySelector(".header__btn--close");
        BtnOpen.classList.remove("header__btn--open");
        BtnOpen.classList.add("header__btn--close");        

        BtnClose.classList.remove("header__btn--close");
        BtnClose.classList.add("header__btn--open");
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
            }

            :host{
                display:block;                
                position:sticky;                
                top:0;
                z-index:var(--zindex-modal);                
                
            }

            .header{
                background:var(--background);                
                box-shadow: var(--box-shadow-sm);
                padding-inline:var(--space-inline-md);
                padding-block:var(--space-block-md);
                height: 3rem;
                width:100%;
                display: flex;
                align-items: center;
                justify-content: start;                
            }

            .header--open{                
                justify-content: space-between;
                width:80vw;
            }

            .header__logo{
                width:calc(58px + 2vw);
                height:calc(30px + 1.5vw);
                max-width: 92px;
                max-height:50px;
            }

            .header__btns{
                display:flex;
                align-items:center;
            }

            .header--open .header__btns{
                order:1;                
            }

            .header__btn{
                background:var(--background);
                border:none;   
                padding:0;
                margin-inline:.5rem;                
            }

            .header__btn--open{
                display:inline;
            }
            .header__btn--close{
                display:none;
                
            }

            .header__icon{
                width:30px;
                height:30px;
            }

            .header__icon--open{
                filter: invert(16%) sepia(57%) saturate(6976%) hue-rotate(325deg) brightness(91%) contrast(95%);
            }

            .header__nav{
                display:none;
                background:var(--background);  
                height: calc(100vh - 3.9rem);
                width:80vw;
                position:absolute;
                top:3.9rem;
                left:0;
                border-top:2px solid #6067705d;
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                color:var(--font-color-link);
                font-family:'Now',var(--font-family);
                
            }

            .header__list{
                display:none;
            }

            .header__nav--open ~ .header__backdrop{
                content:"";
                position:absolute;
                top: 0;
                left: 0;
                height:100vh;
                width:100vw;
                background:#000000ab;
                z-index:-1;
            }  

            @media (min-width: 992px){
                :host{
                    width:100vw;
                }                

                .header__btn{                
                    display:none;
                }

                .header__btns{
                    display:none;
                }
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
        <style>${AppHeaderComponent.#cssTemplateStyles}</style>
        <header class="header">
            <div class="header__btns">
                <button id="openMenu" class="header__btn header__btn--open">
                    <img src="app/assets/menu.svg" alt="menu" class="header__icon">        
                </button>
                <button id="closeMenu" class="header__btn header__btn--close">
                    <img src="app/assets/close.svg" alt="menu" class="header__icon header__icon--open">
                </button>
            </div>
            <img src="images/AgileInovaLogo.png" alt="logo" class="header__logo">
            <nav class="header__nav ">
                <ul class="header__list">
                    <li class="header__item">
                        <a href="#" class="header__link">
                            GitHub
                            <img src="app/assets/share.svg" alt="shared icon" class="header__icon">
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="header__backdrop"></div>
        </header>`;
    }
}

customElements.define("app-header",AppHeaderComponent );

