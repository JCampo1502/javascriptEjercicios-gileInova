export class AppFooterComponent extends HTMLElement{
    get #htmlTemplate(){

    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
    }
}