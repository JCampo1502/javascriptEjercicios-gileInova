export class AppTask09Component extends HTMLElement{
    #state = {
        hours:0
    }

    constructor(){
        super();
        /* Add Events */

        document.addEventListener(
            'form-event-dispatcher:monthly-salary',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */

        document.removeEventListener(
            'form-event-dispatcher:monthly-salary',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');
        /* Set Atributtes and Classes */

        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','monthly-salary');
        /* Add Content */

        Table.heads = ["horas trabajadas", "horas extras", "sueldo"]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "hours", 
                description: "ingresa las horas trabajadas", 
                value:this.#state.hours, 
                type:"number"
            }
        ]
        /* Add in template  */

        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Control, Table);
    }

    #updateTable(e){
        const Table = this.querySelector('.section__table');
        let value = e.detail.value;
        
        /* Validations */
        if(
            !Table || 
            !value || 
            this.#state.hours == value ||
            isNaN(value) ||
            value < 0
        )return;

        /* Update State */
        value = parseFloat(value);
        this.#updateState({hours:value});
        /* Update Table */

        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        const Hours = this.#state.hours;
        const Extra = Math.ceil(Hours) - 40;
        return [[
            Hours,
            (Extra > 0)?Extra:0,
            `$${(Extra > 0)?Extra * 20 + 640: Hours * 16}`
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #2 - Salario Mensual
            </h2>
            <p class='section__description'>
                Un obrero necesita calcular su salario semanal, el cual se obtiene de la siguiente manera:            
            </p>
            <ul class="section__list">
                <li class="section__item">
                    Si trabaja 40 horas o menos se le paga $16 por hora
                </li>
                <li class="section__item">
                    Si trabaja más de 40 horas se le paga $16 por cada una de las primeras 40 horas y $20 por cada hora extra.
                </li>
            </ul>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-09',AppTask09Component)