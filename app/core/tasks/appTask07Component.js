export class AppTask07Component extends HTMLElement{
    #state = {
        note1:0,
        note2:0,
        note3:0,
        test:0,
        project:0
    }

    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        document.addEventListener(
            "form-event-dispatcher:final-notes-calculator",
            this.#updateTable.bind(this)
        );
    }

    disconnectedCallback(){
        document.removeEventListener(
            "form-event-dispatcher:final-notes-calculator",
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
         Form.setAttribute('event-name','final-notes-calculator');
 
         /* Set content */
         Table.heads = [
            "Promedio de notas", 
            "Examen final",
            "Trabajo final",
            "Calificación Final"
        ];
         Table.rows = this.#tableRows;
         Form.formInputs = [
            {
                name:"note1",
                description:"Nota 1",
                value:this.#state.note1,
                type:"number"
            },
            {
                name:"note2",
                description:"Nota 2",
                value:this.#state.note2,
                type:"number"
            },
            {
                name:"note3",
                description:"Nota 3",
                value:this.#state.note3,
                type:"number"
            },
            {
                name:"test",
                description:"Examen final",
                value:this.#state.test,
                type:"number"
            },
            {
                name:"project",
                description:"Tabajo final",
                value:this.#state.project,
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
        if(
            !name || 
            (
                name != "note1" &&
                name != "note2" &&
                name != "note3" &&
                name != "test" &&
                name != "project"
            )
        )return;
        if(!value || !Table || Number.isNaN(value))return;
        
        /* Update State */
        Obj[name]=parseFloat(value);
        this.#updateState(Obj);

        /* Update Table */
        Table.rows = this.#tableRows;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableRows(){
        const Notes = (
            this.#state.note1 + 
            this.#state.note2 +
            this.#state.note3
        ) / 3;
        const Test = this.#state.test;
        const Project = this.#state.project;
        return [[
            Notes.toFixed(2),
            Test.toFixed(2),
            Project.toFixed(2),
            (Notes * 0.55 + Test * 0.3 + Project * 0.15).toFixed(2)
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class="section">
            <h2 class="section__title">
                Tarea #3 - Calificación Final
            </h2>
            <p class="section__description">
                Un estudiante desea saber cual será su calificación final en la materia de Algoritmos. Dicha calificación se compone de los siguientes porcentajes:                
            </p>
            <ul class="section__list">
                <li class="section__item">
                    55% del promedio de sus tres calificaciones parciales.
                </li>
                <li class="section__item">
                    30% de la calificación del examen final.
                </li>
                <li class="section__item">
                    15% de la calificación de un trabajo final.
                </li>
            </ul>
            <article class="article"></article>
        </section>
        `;
    }

}
customElements.define("app-task-07",AppTask07Component)