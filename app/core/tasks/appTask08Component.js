export class AppTask08Component extends HTMLElement{
    #statePeyment = {
        amount:0,
        price:0
    }

    #stateFactory = {

    }

    constructor(){
        super();
        
        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:peyment-calculator',
            this.#updateTablePeyment.bind(this)
        );
        /* document.addEventListener(
            'form-event-dispatcher:factory-calculator',
            this.#updateTable.bind(this)
        ); */
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        
        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:peyment-calculator',
            this.#updateTablePeyment.bind(this)
        );
        /* document.removeEventListener(
            'form-event-dispatcher:factory-calculator',
            this.#updateTable.bind(this)
        ); */
    }

    render(){
        const PeymentTable = document.createElement('app-table');
        const PeymentControl = document.createElement('app-form-event-dispatcher');

        const FactoryTable = document.createElement('app-table');
        const FactoryControl = document.createElement('app-form-event-dispatcher');
        
        /* Set Atributtes and Classes */
        PeymentTable.classList.add('section__table','section__table--exercise01');
        PeymentControl.classList.add('section__control');
        PeymentControl.setAttribute('event-name','peyment-calculator');

        FactoryTable.classList.add('section__table','section__table--exercise02');
        FactoryControl.classList.add('section__control');
        FactoryControl.setAttribute('event-name','peyment-calculator');
        
        /* Add Content */
        PeymentTable.heads = ["Cantidad", "Precio", "Descuento a aplicar", "Valor", "Valor con descuento"]
        PeymentTable.rows = this.#tableContent;
        PeymentControl.formInputs = [
            {
                name: "amount", 
                description: "Ingresa la cantidad de camisetas",
                value:this.#statePeyment.amount, 
                type:"number"
            },
            {
                name: "Price", 
                description: "Precio por camiseta",
                value:this.#statePeyment.price,
                type:"number"
            }
        ],

        PeymentTable.heads = [
            "Cantidad", 
            "Precio", 
            "Descuento", 
            "Total",
            "Total con descuento"
        ]
        PeymentTable.rows = this.#tableContent;
        PeymentControl.formInputs = [
            {
                name: "amount",
                description: "Ingrese la cantidad de camisas", 
                value:this.#statePeyment.amount, 
                type:"number"
            },
            {
                name: "price",
                description: "Precio por camisa", 
                value:this.#statePeyment.price, 
                type:"number"
            }
        ]
    
        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article--exercise01').append(
            PeymentControl, 
            PeymentTable
        );
    }

    #updateTablePeyment(e){
        const Obj = new Object();
        const Table = this.querySelector('.section__table--exercise01');
        let value = e.detail.value;
        let name = e.detail.name;
        
        /* Validations */
        if(
            !Table ||             
            isNaN(value) ||
            value < 0 ||
            !Object.hasOwn(this.#statePeyment, name) || 
            !value || this.#statePeyment[name] == value
        )return;
        
        /* Update State */
        Obj[name] = parseFloat(value);
        this.#updateStatePeyment(Obj);
        
        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateStatePeyment(newState){
        this.#statePeyment = {...this.#statePeyment, ...newState}
    }

    get #tableContent(){
        let {amount = parseInt(amount), price}= this.#statePeyment;        
        let discount = (amount >= 3 )?0.2 :0.1;
        let total = amount * price;
        return [[
            amount, 
            price, 
            `${discount*100}%`, 
            total,
            total - (total * discount)
        ]];
    }

    get #htmlTemplate(){
        return  /* html */`
        <section class='section'>            
            <article class="section__article section__article--exercise01">
                <h2 clase="section__title">
                    Ejercicio #1 - Calcular total a pagar
                </h2>
                <p clase="section__description">
                    Hacer un algoritmo que calcule el total a pagar por la compra de camisas. Si se compran tres camisas o más se aplica un descuento del 20% sobre el total de la compra, si son menos de tres camisas un descuento del 10%
                </p>
            </article>
            <article class="section__article section__article--exercise02">
                <h2 class="section__title">
                    Ejercicio #2 - 
                </h2>
                <p clase="section__description">
                    Una empresa quiere hacer una compra de varias piezas de la misma clase a una fábrica de refacciones. La empresa, dependiendo del monto de la compra, decidirá que hacer para pagar al fabricante. Si el monto total de la compra excede de $500.000 la empresa tendrá la capacidad de invertir de su propio dinero el 55% del monto de la compra, pedir prestado al banco un 30% y el resto lo pagará solicitando un crédito al fabricante. Si el monto total de la compra no excede de $500.000 la empresa tendrá capacidad de invertir de su propio dinero un 70% y el restante 30% lo pagará solicitando crédito al fabricante El fabricante cobra por concepto de intereses un 20% sobre la cantidad que se le pague a crédito. Es necesario mostrar por pantalla, según el valor de la compra, cómo se pago, cuánto se saco de la empresa, cuánto prestó el fabricante y si es el caso cuánto prestó al banco.

                    monto Compra
                </p>
            </article>                
        </section>
        `;
    }

}
customElements.define('app-task-08',AppTask08Component)