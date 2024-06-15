export class AppTask11Component extends HTMLElement{
    #state = {
        name:"Unkown",
        price:0,
        key:0
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:discount',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:discount',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','discount');

        /* Add Content */
        Table.heads = [
            "Artículo", 
            "Clave", 
            "Precio", 
            "Precio con descuento"
        ]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: "name", 
                description: "Artículo", 
                value:this.#state.name, 
                type:"string"
            },
            {
                name: "price", 
                description: "Precio", 
                value:this.#state.price, 
                type:"number"
            },
            {
                name: "key", 
                description: "Ingrese la clave", 
                value:this.#state.key, 
                type:"number"
            }
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
        if(name == "name" && value == "")value = "Unkown";

        if(
            !Table || 
            (name != "name" && isNaN(value)) ||
            !Object.hasOwn(this.#state, name) || 
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = (name=="name")? value : parseFloat(value);
        this.#updateState(Obj);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){        
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        let {name,price,key} = this.#state;
        key = parseInt(key);
        let discount = 0;

        if(key == 2 || key == 1){
            key = `0${key}`;
            discount = (key == 2)?price*0.2:price*0.1;
        }else key = "no aplica";

        return [[
            name,
            key,
            `$${price.toFixed(2)}`,
            `$${(price - discount).toFixed(2)}`,
            
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #4 - Descuento
            </h2>
            <p class='section__description'>
                Hacer un algoritmo que imprima el nombre de un artículo, clave, precio original y su precio con descuento. El descuento lo hace en base a la clave. Si la clave es 01 el descuento es del 10% y si la clave es 02 el descuento es del 20% (solo existen dos claves).
            </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-11',AppTask11Component)