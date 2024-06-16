export class AppTask17Component extends HTMLElement{
    #state = {
        num1:10,
        num2:20,
        num3:30,
        numbers(){
            return [this.num1, this.num2, this.num3]
        },
        equalsNumbers(){
            const Numbers = this.numbers();
            let repeatedNumbers = [];
            Numbers.forEach((num, i)=>{
                if(Numbers.indexOf(num) == i)return;            
                if(repeatedNumbers.includes(num))return;
                repeatedNumbers.push(num);
            });
    
            return repeatedNumbers;  
        }
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:compare-numbers',
            this.#compareNumbers.bind(this)
        );
        document.addEventListener('modal:close',this.#modalClose.bind(this))
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:compare-numbers',
            this.#compareNumbers.bind(this)
        );

        document.removeEventListener('modal:close',this.#modalClose.bind(this))

    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','compare-numbers');

        /* Add Content */
        Table.heads = [
            "Número 1", 
            "Número 2", 
            "Número 3", 
            "Mas grande", 
            "Mas pequeño"
        ];
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "num1", 
                description: "Ingrese el primer número", 
                value:this.#state.num1, 
                type:"number"
            },
            {
                name: "num2", 
                description: "Ingrese el segundo número", 
                value:this.#state.num2, 
                type:"number"
            },
            {
                name: "num3", 
                description: "Ingrese el tercer número", 
                value:this.#state.num3, 
                type:"number"
            }
        ]

        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Control, Table);
    }

    #compareNumbers(e){
        const Table = this.querySelector('.section__table');
        if(!Table)return;
        /* Update numbers */
        this.#updateState(e);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();

        if(this.#state.equalsNumbers().length > 0){
            this.#modalOpen();
        }
    }

    #modalClose(){
        this.querySelector('.modal')?.removeAttribute("open");
    }

    #modalOpen(){
        const Modal = this.querySelector('.modal');
        Modal.setAttribute("open","");
        Modal.setAttribute(
            "message",
            (this.#state.equalsNumbers().length > 1)
            ? `Se repiten los números ${this.#state.equalsNumbers()}`
            :`Se repite el número ${this.#state.equalsNumbers().join(",")}`
        );
    }

    #updateState(e){
        const Obj = new Object();
        
        let value = e.detail.value;
        let name = e.detail.name;

        /* Validations */
        if(        
            isNaN(value) ||
            !Object.hasOwn(this.#state, name) || 
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = parseInt(value);

        this.#state = {...this.#state, ...Obj};
        this.#state.repeatedNumbers = this.#state.equalsNumbers();
    }

    get #tableContent(){        
        const Numbers = this.#state.numbers();
        let higher = Numbers.reduce((prev,next)=>prev>next?prev:next);
        let smaller = Numbers.reduce((prev,next)=>prev<next?prev:next);
        return [[
            ...Numbers, higher, smaller
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #1 - Comparar Números
            </h2>
            <p class='section__description'>
                Capturar tres números por medio de cajas de texto, compararlos e indicar cual número es mayor y cual menor, adicionar una validación en caso de que sean iguales. Hacer uso del evento DOMContentLoaded y click.
            </p>
            </article>
        </section>
        <app-confirm-modal class="modal"></app-confirm-modal>
        `;
    }

}
customElements.define('app-task-17',AppTask17Component)