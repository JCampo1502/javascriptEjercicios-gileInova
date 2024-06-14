export class AppTask05Component extends HTMLElement{
    #state = {
        men:0,
        women:0
    }
    constructor(){
        super();
        document.addEventListener(
            "form-event-dispatcher:percentage-calculator",
            this.#updateTable.bind(this)
        );
    }
    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        document.removeEventListener(
            "form-event-dispatcher:percentage-calculator",
            this.#updateTable.bind(this)
        );
    }

    render(){
        /* Define Table and form */
        const Table = document.createElement('app-table');
        const Form = document.createElement('app-form-event-dispatcher');

        /* Set attributes and classes */
        Table.classList.add('article__table')
        Form.classList.add('article__control')
        Form.setAttribute('event-name','percentage-calculator');

        /* Set content */
        Table.heads = ["Total","Mujeres","Hombres"];
        Table.rows = this.#tableRows;
        Form.formInputs = [
            {
                name:"men", 
                description:"Número de hombres", 
                value:this.#state.men, 
                type:"number"
            },
            {
                name:"women", 
                description:"Número de mujeres", 
                value:this.#state.women, 
                type:"number"
            }
        ];
        
        /* Append in Template */        
        this.innerHTML = this.#htmlTemplate;
        this.querySelector(".article").append(Form, Table);
    }
    
    #updateTable(e){
        const Obj = new Object();
        const Table = this.querySelector(".article__table");
        let value = e.detail.value;
        let name = e.detail.name;

        /* Validate value */        
        if(!name || (name!="men" && name!="women"))return;
        if(!value || !Table || value < 0 || Number.isNaN(value))return;
        
        /* Update State */
        Obj[name]=parseInt(value);
        this.#updateState(Obj);

        /* Update Table */
        
        Table.rows = this.#tableRows;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableRows(){
        const Men = this.#state.men;
        const Women = this.#state.women;
        const Total = this.#state.women + this.#state.men;

        return [[
            Total,
            ((
                (Men == Women)
                ?.5
                :Women/Total
            )*100).toFixed(2) + "%",

            ((
                (Men == Women)
                ? .5
                :Men/Total
            )*100).toFixed(2) + "%"
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class="section">
            <h2 class="section__title">
                Tarea #1 - Calcular porcentaje de estudiantes
            </h2>
            <p class="section__description">
                Un maestro desea saber que porcentaje de hombres y el porcentaje de mujeres que hay en un grupo de estudiantes.
            </p>
            <article class="article"></article>
        </section>
        `;
    }
}
customElements.define("app-task-05",AppTask05Component)