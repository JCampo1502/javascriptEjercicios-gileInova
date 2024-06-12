import { AppPeymentCalculator } from "./AppPeymentCalculator.js";

export class AppTask04Component extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */
        this.shadowRoot.querySelector("#peymentCalculatorControls").removeEventListener("submit",this.#disableFormDefaultOnSubmit.bind(this));

        this.shadowRoot.querySelector("#peyment").removeEventListener("input",this.#updatePeymentProperty.bind(this));

        this.shadowRoot.querySelector("#hours").removeEventListener("input",this.#updateHoursProperty.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        /* Add Events */
        this.shadowRoot.querySelector("#peymentCalculatorControls").addEventListener("submit",this.#disableFormDefaultOnSubmit.bind(this));

        this.shadowRoot.querySelector("#peyment").addEventListener("input",this.#updatePeymentProperty.bind(this));

        this.shadowRoot.querySelector("#hours").addEventListener("input",this.#updateHoursProperty.bind(this));
    }

    #disableFormDefaultOnSubmit(e){
        e.preventDefault();
    }

    #updatePeymentProperty(e){
        this.shadowRoot.querySelector('app-payment-calculator').setAttribute("peyment",e.target.value);
    }

    #updateHoursProperty(e){
        this.shadowRoot.querySelector('app-payment-calculator').setAttribute("hours",e.target.value);
    }
    
    get #htmlTemplate(){
        return /* html */`
        <app-exercise>
            <h2 slot="title">${AppPeymentCalculator.title}</h2>
            <p slot="description">${AppPeymentCalculator.description}</p>
            <app-payment-calculator slot="content">
                <form id="peymentCalculatorControls" slot="peymentCalculatorControls">
                    <label for="peyment">
                        <span>Valor Hora</span>
                        <input type="number" id="peyment">
                    </label>

                    <label for="hours">
                        <span>Horas</span>
                        <input type="number" id="hours">
                    </label>
                </form>
            </app-payment-calculator>
        </app-exercise>
        `;
    }
}

customElements.define("app-task-04",AppTask04Component);