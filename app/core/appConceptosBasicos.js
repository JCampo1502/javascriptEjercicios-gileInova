export class AppConceptosBasicos extends HTMLElement{
    #state;

    static get observedAttributes() {
        return ['page'];
    }

    constructor(){
        super();

        let state = this.getAttribute("page");
        if(!state)state = 0;
        this.#state = {
            page: 0
        }
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal == newVal) return;
        if(name != "page")return;
        let page = parseInt(newVal);
        if(!page || page >= 4 || page < 0) page = 0;
        this.#updateState({page});
    }

    render(){
        this.innerHTML = this.#htmlTemplate;
    }

    get #htmlTemplate(){
        let html = /* html */`
            <h1>👨‍💻 Conceptos Basicos</h1>
        `;

        switch (this.#state.page) {            
            case 1:
                html+=/* html */`<app-tarea02></app-tarea02>`;
                break;
            case 2:
                html+=/* html */`<app-tarea03></app-tarea03>`;
                break;
            case 3:
                html+=/* html */`<app-tarea04></app-tarea04>`;
                break;
            default:
                html+=/* html */`<app-tarea01></app-tarea01>`;
                break;
        }

        return html;
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};
        this.render();
    }
}


customElements.define("app-conceptos-basicos", AppConceptosBasicos);