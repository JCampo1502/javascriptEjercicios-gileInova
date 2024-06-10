export class AppHeaderComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
    }

    static get #cssTemplateStyles(){
        return /* css */`                       
        
            :host{                           
                display:block;                   
                position:sticky;
                top:0;
                z-index:var(--zindex-sticky);
            }

            .header{
                display:flex;
                align-items:center;
                box-shadow: var(--box-shadow-sm);
                padding-inline:var(--padding-inline);
                padding-block:var(--padding-block);
                background:red;
                height: 4rem;
                width:calc(85vw - 2rem);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .header__menu{
                width:30px;
                height:30px;
                background:var(--background);
                border:none;   
                padding:0;       
                order: 1;      
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
                background:var(--background);  
                height: calc(100vh - 5rem);
                width:85vw;                
                position:absolute;
                top:5rem;
                left:0;                
            }

            .header__nav::before{
                content:"";
                position:absolute;
                top: -5rem;
                left: 0;
                height:100vh;
                width:100vw;
                background:#000000ab;
                z-index:-1;
            }

            .header__nav > *{
                background:red;
            }
            
        `;
    }

    get #htmlTemplate(){
        return /* html */`
        <style>${AppHeaderComponent.#cssTemplateStyles}</style>
        <header class="header">
            <button class="header__menu">
                <img src="app/assets/menu.svg" alt="menu" class="header__icon">        
            </button>
            <img src="images/AgileInovaLogo.png" alt="logo" class="header__logo">
            <nav class="header__nav">
                <h4 class="nav__title">Javascript</h4>
                <ul class="nav__list">
                    <li class="nav__item">
                        <a href="#" class="nav__link nav__link--sublist">
                            Conceptos Basicos
                        </a>
                        <ul class="nav__list nav__list--sblist">
                            <li class="list__item">
                                <a href="#" class="list__link">Ejercicio 01</a>
                            </li>
                            <li class="list__item">
                                <a href="#" class="list__link">Ejercicio 02</a>
                            </li>
                            <li class="list__item">
                                <a href="#" class="list__link">Ejercicio 03</a>
                            </li>
                            <li class="list__item">
                                <a href="#" class="list__link">Ejercicio 04</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>`;
    }
}

customElements.define("app-header",AppHeaderComponent );

