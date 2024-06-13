export class appTask02Component extends HTMLElement{
    #state = {
        num1:0,
        num2:0
    };

    constructor(){
        super();
        document.addEventListener(
            "form-event-dispatcher:operation-numbers",
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        document.removeEventListener(
            "form-event-dispatcher:operation-numbers",
            this.#updateTable.bind(this)
        );
    }
    
    render(){                
        const Table = document.createElement("app-table");        
        const Controls = document.createElement('app-form-event-dispatcher');

        /* Set Atributes and styles*/
        Controls.setAttribute("event-name","operation-numbers");
        Controls.classList.add("article__control");
        Table.classList.add("article__table");

        /* Add Content */
        Table.heads = ['#','Operación','Resultado'];
        Table.rows = this.#tableContent;
        Controls.formInputs = [
            {name:"num1", description:"Número 01", value:0, type:"number"},
            {name:"num2", description:"Número 02", value:0, type:"number"}
        ];        

        /* Show */
        this.#showTable(0,0);
        this.innerHTML = this.#htmlTemplate;
        this.querySelector(".article").append(Controls, Table);
    }

    #updateTable(e){                
        const Obj = new Object();
        const Table = this.querySelector('.article__table');           
        let value = e.detail.value;

        if(!Table)return;

        /* Evaluete null or NaN */
        if(!value || Number.isNaN(value))value = 0;
        else value = parseInt(value);

        /* Update State */
        Obj[e.detail.name] = value;
        this.#updateState(Obj);
        
        /* Update Table */
        this.#showTable();              
        Table.rows = this.#tableContent;  
        Table.render();
    }    

    #updateState(newState){
        this.#state = {...this.#state, ...newState};                
    }

    #showTable(){        
        console.clear();
        console.table({
            "+":{
                operation:"suma",
                result:this.#state.num1 + this.#state.num2
            },
            "-":{
                operation:"resta",
                result:this.#state.num1 - this.#state.num2
            },
            "*":{
                operation:"multiplicación",
                result:this.#state.num1 * this.#state.num2
            },
            "/":{
                operation:"divición",
                result:(this.#state.num2 == 0)
                    ?"no es posible realizar la operacion"
                    :(this.#state.num1 / this.#state.num2).toFixed(2)
            }
        });
    }

    get #tableContent(){
        return [
            ["+","Suma",this.#state.num1 + this.#state.num2],
            ["-","Resta",this.#state.num1 - this.#state.num2],
            ["*","Multiplicación",this.#state.num1 * this.#state.num2],
            ["/","Divición",
                (this.#state.num2 == 0)
                    ?"No es pocible realizar la divición"
                    :(this.#state.num1 / this.#state.num2).toFixed(2)
            ]
        ];
    }
    
    get #htmlTemplate(){
        return /* html */`
            <section class="section">
                <h2 slot="section__title">
                    Tarea 2 - Algoritmo para las operaciones: +, -, *, /
                </h2>
                <p slot="section__description">
                    Realizar un algoritmo en JavaScript que permita calcular la suma, resta, multiplicación y división de dos números, donde num1 = 5 y num2 = 7. Mostrar los resultados por consola.
                </p>
                <article class="article">

                </article>    
            </section>
        `;
    }
}

customElements.define("app-task-02",appTask02Component);