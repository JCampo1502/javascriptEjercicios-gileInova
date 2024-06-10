

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = /* html */`
    <app-header></app-header>

    <app-conceptos-basicos></app-conceptos-basicos>
`

export class AppComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const HTML = TEMPLATE.content.cloneNode(true);
        this.shadowRoot.append(HTML);
    }
}

customElements.define("app-component",AppComponent);