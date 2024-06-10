export class AppEmployeeSalaryCalculator extends HTMLElement{
    #state;

    static get observedAttributes() {
        return ['name', 'price', 'hours'];
    }

    static get title(){
        return "Tarea #3 - Calcular sueldo empleado"
    }

    static get description(){
        return "Hacer un algoritmo que calcule el sueldo de un empleado dados como datos de entrada: el nombre, horas trabajadas y el valor de la hora.";
    }
    
    constructor(){
        super();
        this.attachShadow({mode:"open"});

        let price = this.getAttribute("price");
        let hours = this.getAttribute("hours");
        if(!price)price = 0;
        if(!hours)hours = 0;

        this.#state = {
            name: this.getAttribute("name") ?? "prueba01",
            price: parseFloat(price) ?? 0,
            hours: Math.ceil(parseFloat(hours)) ?? 0
        };        
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal == newVal)return;
        if(!newVal)return;

        let obj = new Object();
        
        if(name == "name")obj[name] = newVal;
        else if(newVal > 0)return;

        obj[name] = parseFloat(newVal) ?? 0;
        this.#updateState(obj);
    }
    
    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;  
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    get #htmlTemplate(){
        return /* html */`     
        <article>
            <slot name="salaryControls"></slot>       
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Valor Hora</th>
                        <th>Horas Trabajadas</th>
                        <th>Sueldo</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>${this.#state.name}</td>
                        <td>${this.#state.price}</td>
                        <td>${this.#state.hours}</td>
                        <td>${(this.#state.hours * this.#state.price).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </article>    
        `;
    }
    
}

customElements.define("app-employee-salary-calculator",AppEmployeeSalaryCalculator);