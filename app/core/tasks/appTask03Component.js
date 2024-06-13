export class AppTask03Component extends HTMLElement{
    #state = {
        name:"Unknown",
        valuePerHour:0,
        hoursWorked:0        
    }

    constructor(){
        super();        
        document.addEventListener(
            "form-event-dispatcher:salary-calculator",
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCalback(){
        /* Remove Events */
        document.removeEventListener(
            "form-event-dispatcher:salary-calculator",
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement("app-table");
        const Control = document.createElement("app-form-event-dispatcher");

        /* Set Atributtes and Classes */
        Table.classList.add("article__table");
        Control.classList.add("article__control");

        Control.setAttribute("event-name","salary-calculator");

        /* Add Content */
        Table.heads = ["Nombre","Valor por hora","Horas Trabajadas", "Salario"]        
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name:"name", 
                description:"Nombre", 
                value:this.#state.name, 
                type:"text"
            },
            {
                name:"valuePerHour", 
                description:"Valor por hora", 
                value:this.#state.valuePerHour, 
                type:"number"
            },
            {
                name:"hoursWorked", 
                description:"Horas Trabajadas", 
                value:this.#state.hoursWorked, 
                type:"number"
            }
        ]
        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector(".article").append(Control, Table);   
    }

    #updateTable(e){
        const Obj = new Object();
        const Table = this.querySelector(".article__table");

        /* Validations */        

        if(this.#state[e.detail.name] == e.detail.value)return;
        if(!e.detail.value || e.detail.value == "")return;
        if(!Table)return;

        /* Update State */
        Obj[e.detail.name] = e.detail.value;
        this.#updateState(Obj);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        return [
            [
                this.#state.name,
                this.#state.valuePerHour,
                this.#state.hoursWorked,
                this.#state.valuePerHour * this.#state.hoursWorked
            ]
        ]
    }

    get #htmlTemplate(){
        return /* html */`
        <section class="section">
            <h2 class="section__title">
                Tarea #3 - Calcular sueldo empleado
            </h2>
            <p class="section__description">
                Hacer un algoritmo que calcule el sueldo de un empleado dados como datos de entrada: el nombre, horas trabajadas y el valor de la hora.
            </p>
            <article class="article"></article>
        </section>
        `;
    }
}

customElements.define("app-task-03",AppTask03Component);