export class AppHeaderComponent extends HTMLElement{
    get #htmlTemplate(){
        return /* html */`<header class="header">
        <img src="images/AgileInovaLogo.png" alt="logo" class="header__logo">
        <nav class="nav">
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
}

customElements.define("app-header",AppHeaderComponent );