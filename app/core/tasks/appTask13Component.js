export class AppTask13Component extends HTMLElement{
    #state = {
        numbers:[-1,-2,-3]
    }

    constructor(){
        super();
        
        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:convert-negatives',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        
        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:convert-negatives',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');
        
        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','convert-negatives');
        
        /* Add Content */
        Table.heads = ['#','number']
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "numbers", 
                description: "Ingrese los numeros separados por ,", 
                value:this.#state.numbers.join(","), 
                type:"text"
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
        if(!Table || !value )return;
        
        /* Update State */
        value = value.split(",").filter(x => parseInt(x) <= 0 );
        this.#updateState({numbers: value.map(x => parseInt(x))});
        
        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        return this.#state.numbers.map((x,i) => [i+1,-x]);
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <h2 class='section__title'>
                Tarea #2 - Convertir negativos
            </h2>
            <p class='section__description'>
            Leer 15 números negativos y convertirlos a positivos e imprimir dichos números.
            </p>
            <article class='section__article'></article>
        </section>
        `;
    }

}
customElements.define('app-task-13',AppTask13Component)