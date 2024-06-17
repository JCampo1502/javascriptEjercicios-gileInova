export class AppTask23Component extends HTMLElement{
    #state = {
        animals:[            
            'gato',
            'perro'            
        ],
        keyWord:'',
        getAnimal(){            
            return this.animals
            .filter(x => typeof(x)=='string' && x != '')
            .filter(x => 
                this.keyWord != ''
                ? x.toLowerCase().startsWith(this.keyWord.toLowerCase())
                : true
            ).map(x =>{
                x = x.trim();
                let firstLetter = x.slice(0,1);
                return firstLetter.toUpperCase() + x.slice(1,x.length);
            })

        }
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:array-exercise',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:array-exercise',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','array-exercise');

        /* Add Content */
        Table.heads = ["#","Animal"]
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: 'animals', 
                description:"ingresa los animales separados por \",\"", 
                value:this.#state.getAnimal().join(', '), 
                type:"string"
            },
            {
                name: "keyWord", 
                description:"Ingresa el animal a buscar", 
                value: this.#state.keyWord, 
                type:'string'
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
        if(
            !Table ||             
            !Object.hasOwn(this.#state, name) || 
            (!value &&  name != 'keyWord') || this.#state[name] == value
        )return;

        /* Update State */
        if(name == "animals"){
            value = value.split(',');
        }

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
        return this.#state.getAnimal().map((x,i)=> [i+1,x]);
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #1 - Arreglo Parte #01
                </h2>
                <p class='section__description'>
                    Crear un arreglo (temática libre), el cual sea recorrido con la función map() e imprimir por consola cada uno de sus elementos.
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-23',AppTask23Component)

