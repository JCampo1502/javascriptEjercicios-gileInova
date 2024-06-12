export class AppHeaderComponent extends HTMLElement{
    static #currentPage = 1;


    #listOfPages = [
        {
            page:1,
            name:"Conceptos Basicos"
        },{
            page:2,
            name:"Estructuras Secuenciales"
        },
        {
            page:3,
            name:"Estructuras Condicionales"
        },
        {
            page:4,
            name:"Estructuras Ciclicas"
        },
        {
            page:5,
            name:"DOM"
        },
        {
            page:6,
            name:"Eventos"
        },
        {
            page:7,
            name:"Funciones"
        },
        {
            page:8,
            name:"Arreglos"
        },
        {
            page:9,
            name:"Objetos"
        }
    ]

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        document.addEventListener("task:changeSection",this.#changeSection.bind(this));
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        document.removeEventListener("task:changeSection",this.#changeSection.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        const List =this.shadowRoot.querySelector(".nav__list");
        
        const Template = document.createDocumentFragment();
        this.#listOfPages.forEach(item => {
            const Li = document.createElement('li');
            const Btn = document.createElement('app-btn-task');
            const Span = document.createElement('span');

            Li.classList.add("nav__item");
            Btn.setAttribute("page", item.page);
            if(item.page == AppHeaderComponent.#currentPage){
                Btn.setAttribute("selected", "");
            }

            Span.innerText = item.name;
            Span.setAttribute("slot","content");
            Btn.appendChild(Span)
            Li.appendChild(Btn);
            Template.appendChild(Li);            
        })
        List.appendChild(Template.cloneNode(true));

        this.shadowRoot.querySelector("#openMenu").addEventListener("click",this.#openMenu.bind(this));

        this.shadowRoot.querySelector("#closeMenu").addEventListener("click",this.#CloseMenu.bind(this));

        this.shadowRoot.querySelector(".header__backdrop").addEventListener("click",this.#CloseMenu.bind(this));
    }

    #openMenu(){
        this.#ChangeButtons();
        this.shadowRoot.querySelector(".header__nav").classList.add("header__nav--open");
        this.shadowRoot.querySelector(".header").classList.add("header--open")
        
    }

    #CloseMenu(){
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

    #changeSection(e){
        const Page = e.detail.page;
        this.shadowRoot.querySelector("app-btn-task[selected]")?.removeAttribute("selected");

        const li = this.shadowRoot.querySelector(`app-btn-task[page='${Page}']`).setAttribute("selected","");                
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
                z-index:var(--zindex-sticky);
                }
                
            .header{                
                box-shadow: var(--box-shadow-sm);
                background:var(--background);
                padding-inline:var(--space-inline-md);
                padding-block:var(--space-block-md);
                height: 3rem;
                width:100%;
                display: flex;
                align-items: center;
                justify-content: start;
            }            

            .header__btn{
                width:30px;
                height:30px;
                background:var(--background);
                border:none;   
                padding:0;
                margin-inline:.5rem;
            }
                        
            .header__icon{
                width:100%;
                height:100%
            }

            .header__logo{
                width: 92px;
                height:50px;
            }

            .header__nav{
                display:none;
                background:var(--background);  
                height: calc(100vh - 3.9rem);
                width:85vw;
                position:absolute;
                top:3.9rem;
                left:0;
                border-top:2px solid #6067705d;
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                color:var(--font-color-link);
                font-family:'Now',var(--font-family);
                
            }            

            .nav__title{
                font-size:1rem;
                margin-block:var(--space-block-sm);
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                background: var(--background-secondary);
                border-radius: var(--border-radius);
                font-size:100%;
            }

            .nav__list{
                list-style:none;
                padding-left:var(--space-inline-md)
            }
            
            /* on open */
            .header--open{
                width:85vw;
                flex-direction: row-reverse;
                justify-content:space-between;
            }

            .header__icon--open{
                display:block;
                filter: invert(16%) sepia(57%) saturate(6976%) hue-rotate(325deg) brightness(91%) contrast(95%);
            }

            .header__btn--close{
                display:none;   
            }

            .header__menu--open{
                display:none;
            }

            .header__nav--open{
                display:block;
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
        `;
    }

    get #htmlTemplate(){
        return /* html */`
        <style>${AppHeaderComponent.#cssTemplateStyles}</style>
        <header class="header">
            <button id="openMenu" class="header__btn header__btn--open">
                <img src="app/assets/menu.svg" alt="menu" class="header__icon">        
            </button>
            <button id="closeMenu" class="header__btn header__btn--close">
                <img src="app/assets/close.svg" alt="menu" class="header__icon header__icon--open">        
            </button>       
            <img src="images/AgileInovaLogo.png" alt="logo" class="header__logo">
            <nav class="header__nav ">
                <h6 class="nav__title">
                👨‍💻 Javascript
                </h6>
                <ul class="nav__list">
                </ul>
            </nav>
            <div class="header__backdrop"></div>
        </header>`;
    }
}

customElements.define("app-header",AppHeaderComponent );

