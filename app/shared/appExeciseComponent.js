export class AppExeciseComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;        
    }

    get #htmlTemplate(){
        return /* html */`        
        <section class="execise">
            <slot name="title">Ejercicio #</slot>
            <slot name="description">Hola Mundo</slot>            
            <slot name="content">Desde Web Components</slot>
        </section>`;
    }
}

customElements.define('app-exercise',AppExeciseComponent);