export class AppTask27Component extends HTMLElement{
    #state = {}

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:pets',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:pets',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','pets');

        /* Add Content */
        Table.heads = [/* Add Table Th */]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            /*{
            name: id, 
            description: label, 
            value:default value or value, 
            type:input type
            }*/
        ]

        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Control, Table);
    }

    #updateTable(e){
        const Obj = new Object();
        const Table = this.querySelector('.section__table');
        let value = e.detail.value;
        let name = e.detail.name;

        /* Validations */
        if(
            !Table || 
            !Object.hasOwn(this.#state, name) || 
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = value;
        this.#updateState(Obj);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        return [[/* Row */]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #2 - Mascotas
                </h2>
                <p class='section__description'>
                    Crear dos objetos, uno de mascotas y el otro de electrodomésticos. Almacenarlos en el local storage.
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-27',AppTask27Component)