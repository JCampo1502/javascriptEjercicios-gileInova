export class AppTask14Component extends HTMLElement{
    #state = {
        notes:[5,5,3,1,0]
    }

    constructor(){
        super();
        
        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:school-notes',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        
        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:school-notes',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');
        
        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','school-notes');
        
        /* Add Content */
        Table.heads = ["Promedio","Calificación mas baja"]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "notes", 
                description: "ingrese las notas separadas por ,", 
                value:this.#state.notes.join(","), 
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
        if(!Table || !value)return;
        
        /* Update State */        
        value = value.split(",").filter(x => parseFloat(x) > 0);        
        this.#updateState({notes:value.map(x => parseFloat(x))});
        
        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        const Notes = this.#state.notes;
        return [[
            (Notes.reduce((total, n) =>total + n)/Notes.length).toFixed(2),
            Notes.reduce((num1, num2)=> (num1 > num2)? num2:num1)
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
        <h2 class='section__title'>
            Tarea #3 - Calificaciones de estudiantes
        </h2>
        <p class='section__description'>
            Suponga que tiene un conjunto de calificaciones de un grupo de 40 estudiantes, realizar un algoritmo para calcular la calificación promedio (media) y la calificación más baja de todo el grupo.
        </p>
        <article class='section__article'></article>
        </section>
        `;
    }

}
customElements.define('app-task-14',AppTask14Component)