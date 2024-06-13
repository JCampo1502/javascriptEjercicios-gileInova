export class AppTask04Component extends HTMLElement{
    #state = {
        hourValue:0,
        hoursOfUse:0
    }

    constructor(){
        super();
        document.addEventListener(
            "form-event-dispatcher:peyment-calculator",
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */
        document.removeEventListener(
            "form-event-dispatcher:peyment-calculator",
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement("app-table");
        const Control = document.createElement("app-form-event-dispatcher");

        /* Set Atributtes and Classes */
        Table.classList.add("article__table");
        Control.classList.add("article__control");

        Control.setAttribute("event-name","peyment-calculator");

        /* Add Content */
        Table.heads = ["Valor de la hora","Horas de uso","Cobro"]
        Table.rows = this.#tableContent;
        Control.formInputs = [            
            {
                name:"hourValue", 
                description:"Ingrese el valor de hora", 
                value:this.#state.hourValue, 
                type:"number"
            },
            {
                name:"hoursOfUse", 
                description:"Total de horas", 
                value:this.#state.hoursOfUse,
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
        if(!e.detail.value)return;
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
                this.#state.hourValue,
                this.#state.hoursOfUse,
                this.#state.hourValue * Math.ceil(this.#state.hoursOfUse)
            ]
        ];
    }
    
    get #htmlTemplate(){
        return /* html */`
        <section class="section">
            <h2 class="section__title">
                Tarea #4 - Estacionamiento
            </h2>
            <p class="section__description">
                Un estacionamiento requiere determinar el cobro que debe aplicar a las personas que lo utilizan. Considere que el cobro es con base en las horas que lo disponen y que las fracciones de hora se toman como completas. Realizar el algoritmo que permita determinar el cobro.
            </p>
            <article class="article"></article>
        </section>
        `;
    }
}

customElements.define("app-task-04",AppTask04Component);