export class AppTask12Component extends HTMLElement{
    #state = {
        numbers: [0,-1,2,-3],
        tableNumber:0
    }

    constructor(){
        super();
        
        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:positive-numbers',
            this.#updateTable.bind(this)
        );
        document.addEventListener(
            'form-event-dispatcher:times-table',
            this.#updateTimesTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:positive-numbers',
            this.#updateTable.bind(this)
        );
        document.addEventListener(
            'form-event-dispatcher:times-table',
            this.#updateTimesTable.bind(this)
        );
    }

    render(){
        const Table1 = document.createElement('app-table');
        const Table2 = document.createElement('app-table');
        const Control1 = document.createElement('app-form-event-dispatcher');
        const Control2= document.createElement('app-form-event-dispatcher');
        
        /* Set Atributtes and Classes */
        Table1.classList.add('section__table', 'section__table--exercise01');
        Table2.classList.add('section__table', 'section__table--exercise02');
        Control1.classList.add(
            'section__control', 
            'section__control--exercise02'
        );
        Control2.classList.add(
            'section__control', 
            'section__control--exercise02'
        );
        Control1.setAttribute('event-name','positive-numbers');
        Control2.setAttribute('event-name','times-table');
        
        /* Add Content */
        Table1.heads = ['#','Número'];
        Table2.heads = ['-', '='];
        Table1.rows = this.#table01Content;
        Table2.rows = this.#table02Content;
        Control1.formInputs = [
            {
                name: "numbers", 
                description: "ingrese los numeros separados por ,", 
                value:this.#state.numbers.join(","), 
                type:"text"
            }
        ];
        Control2.formInputs = [
            {
                name: "tableNumber", 
                description: "ingrese un numero", 
                value:this.#state.tableNumber, 
                type:"number"
            }
        ];
    
        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article--exercise01').append(Control1, Table1);
        this.querySelector('.section__article--exercise02').append(Control2, Table2);
    }

    #updateTable(e){        
        const Table = this.querySelector('.section__table--exercise01');
        let value = e.detail.value;        
        
        /* Validations */
        if(!Table || !value || value=="")return;
        
        /* Update State */
        value = value.split(",").filter(x => parseInt(x) >= 0 );        
        this.#updateState({numbers: value.map(x => parseInt(x))});
        
        /* Update Table */
        Table.rows = this.#table01Content;
        Table.render();
    }    

    #updateTimesTable(e){
        const Table = this.querySelector('.section__table--exercise02');
        let value = e.detail.value;
        
        /* Validations */
        if(!Table || !value )return;
        
        /* Update State */
        this.#updateState({tableNumber: value});
        
        /* Update Table */
        Table.rows = this.#table02Content;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #table01Content(){
        const numbers = this.#state.numbers;
        return numbers.map((x,i) => [i+1,x]);
    }
    get #table02Content(){        
        let table = [];
        for (let i = 1; i <= 10; i++) {
            table.push([
                this.#state.tableNumber + ' X ' + i,                 
                this.#state.tableNumber*i
            ]);
        }        
        return table;
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article section__article--exercise01'>
                <h2>Ejercicio 01 - Imprimir positivos</h2>
                <p class='section__description'>
                    Leer 10 números e imprimir solamente los números positivos.
                </p>                            
            </article>
            <article class="section__article section__article--exercise02">
                <h2>Ejercicio 02 - Imprimir tabla de multiplicar</h2>
                <p class="section__description">
                    Calcular e imprimir la tabla de multiplicar de un número cualquiera. Imprimir el multiplicando, el multiplicador y el producto.
                </P>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-12',AppTask12Component)