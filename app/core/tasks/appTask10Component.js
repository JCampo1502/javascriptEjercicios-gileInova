export class AppTask10Component extends HTMLElement{
    #state = {
        time:0
    }

    constructor(){
        super();
        /* Add Events */

        document.addEventListener(
            'form-event-dispatcher:calories',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */

        document.removeEventListener(
            'form-event-dispatcher:calories',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');
        /* Set Atributtes and Classes */

        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','calories');
        /* Add Content */

        Table.heads = ["Dormido", "Sentado en reposo"]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "time", 
                description: "Ingrese los minutos", 
                value:this.#state.time, 
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
            this.#state.time == value ||
            isNaN(value) ||
            value < 0
        )return;

        /* Update State */
        value = parseFloat(value);
        this.#updateState({time:value});
        /* Update Table */

        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        const time = this.#state.time;

        return [[
            `${(time * 1.08).toFixed(2)}Cal`,
            `${(time * 1.66).toFixed(2)}Cal`
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #3 - Calorias
            </h2>
            <p class='section__description'>
                Una persona enferma, que pesa 70kg, se encuentra en reposo y desea saber cuántas calorías consume su cuerpo durante todo el tiempo que realice una misma actividad. Las actividades que tiene permitido realizar son únicamente dormir y estar sentado en reposo. Los datos que tiene son que estando dormido consume 1.08 calorías por minuto y estando sentado en reposo consume 1.66 calorías por minuto.
            </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-10',AppTask10Component)