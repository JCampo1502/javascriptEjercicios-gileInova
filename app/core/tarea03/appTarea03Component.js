import { AppEmployeeSalaryCalculator } from "./AppEmployeeSalaryCalculator.js";

export class AppTarea03Component extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCalback(){
        /* Remove Events */
        this.shadowRoot.querySelector("#salaryControls").removeEventListener("submit",this.#disableFormDefaultOnSubmit.bind(this));

        this.shadowRoot.querySelector("#name").removeEventListener("input",this.#updateNameProperty.bind(this));

        this.shadowRoot.querySelector("#price").removeEventListener("input",this.#updatePriceProperty.bind(this));

        this.shadowRoot.querySelector("#hours").removeEventListener("input",this.#updateHoursProperty.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        /* Add Events */
        this.shadowRoot.querySelector("#salaryControls").addEventListener("submit",this.#disableFormDefaultOnSubmit.bind(this));

        this.shadowRoot.querySelector("#name").addEventListener("input",this.#updateNameProperty.bind(this));

        this.shadowRoot.querySelector("#price").addEventListener("input",this.#updatePriceProperty.bind(this));

        this.shadowRoot.querySelector("#hours").addEventListener("input",this.#updateHoursProperty.bind(this));

    }

    #updateNameProperty(e){
        this.shadowRoot.querySelector("app-employee-salary-calculator").setAttribute("name",e.target.value);
    }

    #updatePriceProperty(e){
        this.shadowRoot.querySelector("app-employee-salary-calculator").setAttribute("price",e.target.value);
    }

    #updateHoursProperty(e){
        this.shadowRoot.querySelector("app-employee-salary-calculator").setAttribute("hours",e.target.value);
    }

    #disableFormDefaultOnSubmit(e){
        e.preventDefault();
    }

    get #htmlTemplate(){
        return /* html */`
        <app-exercise>
            <h1 slot="title">${AppEmployeeSalaryCalculator.title}</h1>
            <p slot="description">
                ${AppEmployeeSalaryCalculator.description}
            </p>
            <app-employee-salary-calculator slot="content">
                <form slot="salaryControls" id="salaryControls">
                    <label for="name">
                        <span>Nombre</span>
                        <input type="text" id="name">
                    </label>
                    <label for="number">
                        <span>Valor de la hora</span>
                        <input type="number" id="price">
                    </label>
                    <label for="hours">
                        <span>Horas Trabajadas</span>
                        <input type="number" id="hours">
                    </label>
                </form>
            </app-employee-salary-calculator>
        </app-exercise>
        `;
    }
}

customElements.define("app-tarea03",AppTarea03Component);