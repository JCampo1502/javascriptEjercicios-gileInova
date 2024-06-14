export class AppTask06Component extends HTMLElement{
    #state = {
        meters:0
    }

    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
        document.addEventListener(
            "form-event-dispatcher:inches-calculator",
            this.#updateTable.bind(this)
        );
    }

    disconnectedCallback(){
        document.removeEventListener(
            "form-event-dispatcher:inches-calculator",
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
        Form.setAttribute('event-name','inches-calculator');

        /* Set content */
        Table.heads = ["Metros", "Pulgadas"];
        Table.rows = this.#tableRows;
        Form.formInputs = [
            {
                name:"meters",
                description:"Ingresa los metros", 
                value:this.#state.meters, 
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
        if(!name || name!="meters")return;
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
    
    #CalculateInches(meters){
        return (meters / 0.0254).toFixed(2) + "”";
    }
    
    get #tableRows(){
        const Meters = this.#state.meters;
        return [[
            Meters,
            this.#CalculateInches(Meters)
        ]];
    }    

    get #htmlTemplate(){
        return /* html */`
        <section class="section">
        <h2 class="section__title">
            Tarea #2 - Pulgadas a metros
        </h2>
        <p class="section__description">
            Una modista, para realizar sus prendas de vestir, encarga las telas al extranjero. Para cada pedido tiene que proporcionar las medidas de la tela en pulgadas, pero ella generalmente las tiene en metros. Realice un algoritmo para ayudar a resolver el problema, determinando cuántas pulgadas debe pedir con base en los metros que requiere. (1 pulgada = 0.0254 m).
        </p>
        <article class="article"></article>
        </section>
        `;
    }

}
customElements.define("app-task-06",AppTask06Component) 