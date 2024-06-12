export class AppFooterComponent extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render()                
    }

    disconnectedCallback(){

    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
    }

    #changeSection(){

    }

    static get #cssTemplateStyles(){
        return /* css */`
            
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>${AppFooterComponent.#cssTemplateStyles}</style>
            <h1>Footer</h1>
        `;
    }

}

customElements.define("app-footer",AppFooterComponent);