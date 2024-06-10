import { AppBasicMathAlgorithms } from "./appBasicMathAlgorithms.js";

export class appTarea02Component extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})        
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */
        this.shadowRoot.querySelector("#num1").removeEventListener("input",this.#updateNum1Property.bind(this));

        this.shadowRoot.querySelector("#num2").removeEventListener("input",this.#updateNum2Property.bind(this));

        this.shadowRoot.querySelector("#controls").removeEventListener("submit",this.#disableFormDefaultOnSubmit.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        /* Add Events */
        this.shadowRoot.querySelector("#num1").addEventListener("input",this.#updateNum1Property.bind(this));

        this.shadowRoot.querySelector("#num2").addEventListener("input",this.#updateNum2Property.bind(this));

        this.shadowRoot.querySelector("#controls").addEventListener("submit",this.#disableFormDefaultOnSubmit.bind(this));
    }

    #disableFormDefaultOnSubmit(e){
        e.preventDefault();
    }

    #updateNum1Property(e){
        this.shadowRoot.querySelector("app-basic-math-algorithms").setAttribute("num1",e.target.value);
    }

    #updateNum2Property(){
        this.shadowRoot.querySelector("app-basic-math-algorithms").setAttribute("num2",e.target.value);
    }
    
    get #htmlTemplate(){
        return /* html */`
        <app-exercise>
            <h1 slot="title">${AppBasicMathAlgorithms.title}</h1>
            <p slot="description">${AppBasicMathAlgorithms.description}</p>
            <app-basic-math-algorithms slot="content">
                <form id="controls" slot="controls">
                    <label for="num1">
                        <span>Número 1</span>
                        <input type="number" id="num1" value="5">
                    </label>
                    <label for="num2">
                        <span>Número 2</span>
                        <input type="number" id="num2" value="7">
                    </label>
                </form>
            </app-basic-math-algorithms>
        </app-exercise>
        `;
    }
}

customElements.define("app-tarea02",appTarea02Component);