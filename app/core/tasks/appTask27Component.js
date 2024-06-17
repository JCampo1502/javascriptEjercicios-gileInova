export class AppTask27Component extends HTMLElement{
    #state = {
        pets:['Perro', 'Gato'],
        electronics:['Tv', 'Nevera'],
        filterArr(arr = []){
            return arr.filter(x => typeof(x)=="string" && x != '')
                .map(x => {
                    x = x.toLowerCase().trim();
                    let firstLetter = x[0];
                    return firstLetter.toUpperCase() + x.slice(1,x.length);
                });
        },

        getObj(){
            const Obj = new Object();
            Obj['pets'] = this.filterArr(this.pets);
            Obj['electronics'] = this.filterArr(this.electronics);
            return Obj;
        }
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:pets',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:pets',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');
        const Obj = this.#state.getObj();

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','pets');

        /* Add Content */
        Table.heads = ['Category', 'Elemento']
        Table.rows = this.#tableContent;        
        Control.formInputs = [
            {
                name: 'pets', 
                description: "Ingresa las mascotas.\n Separa las por \",\"", 
                value:this.#storedObjects?.pets.join(', '),
                type:'string'
            },
            {
                name: 'electronics', 
                description: "Ingresa los electrónicos.\n Separa los por \",\"",
                value:this.#storedObjects?.electronics.join(', '),
                type:'string'
            },
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
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = value.split(',');
        this.#updateState(Obj);
        this.#storedObjects = this.#state.getObj();
        
        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #storedObjects(){
        if(!localStorage.getItem('app-task-27'))this.#storedObjects = this.#state.getObj();
        const Data = localStorage.getItem('app-task-27');        
        return JSON.parse(Data);
    }

    set #storedObjects(Obj){
        localStorage.setItem('app-task-27',JSON.stringify(Obj));
    }

    get #tableContent(){
        const Obj = this.#storedObjects;
        return [
            ...Obj.pets.map((x,i) => ['Macota ' + (i+1), x]),
            ...Obj.electronics.map((x,i) => ['Electronico ' + (i+1), x])
        ];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #2 - Mascotas
                </h2>
                <p class='section__description'>
                    Crear dos objetos, uno de mascotas y el otro de electrodomésticos. Almacenarlos en el local storage.
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-27',AppTask27Component)