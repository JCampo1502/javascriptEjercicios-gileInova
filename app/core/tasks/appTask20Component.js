export class AppTask20Component extends HTMLElement{
    #state = {
        numbers:[-1,-2,-3,0,1,2,3]
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:print-numbers',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:print-numbers',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','print-numbers');

        /* Add Content */
        Table.heads = ["Positivos", "Negativos", "Neutros"]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "numbers", 
                description: "ingrese los numeros separados por ,", 
                value:this.#state.numbers.join(","), 
                type:"string"
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
            this.#state.numbers == value
        )return;

        /* Update State */  
        value = value.split(',').filter(x => !isNaN(x)).map(x => parseInt(x));
        this.#updateState({numbers:value});

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        const Numbers = this.#state.numbers;
        return [[
            Numbers.filter(x => x < 0).length,
            Numbers.filter(x => x > 0).length,
            Numbers.filter(x => x == 0).length,
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #1 - Imprimir números positivos negativos y neutros
            </h2>
            <p class='section__description'>
                Leer 20 números e imprimir cuantos son positivos, negativos y neutros, realizar el ejercicio con funciones.
            </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-20',AppTask20Component)