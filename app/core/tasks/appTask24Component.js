export class AppTask24Component extends HTMLElement{
    #state = {
        animals:['Dinosaurio','Dragón'],
        keyWord:'',        

        getAnimal(){            
            return this.filterAnimals(this.animals);
        },

        addAnimals(newAnimals = []){            
            this.animals = [];
            newAnimals = this.filterAnimals(newAnimals);
            newAnimals.forEach(x => this.animals.push(x));
        },

        removeAnimal(animal){            
            if(animal == '')return;
            let index = this.animals
            .map(x => x.toLowerCase().trim())
            .indexOf(animal.trim().toLowerCase())
            console.log(index);
            if(index == -1)return;
            this.animals.splice(index,1);            
        },

        filterAnimals(animals){            
            return animals
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
                name: "animalSelected", 
                description:"Ingresa el animal a eliminar", 
                value: "Unknown", 
                type:'string'
            },
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
            (!Object.hasOwn(this.#state, name) && name!='animalSelected') || 
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

    #updateState(newState = {}){  
        console.log(newState);        
        if(newState.hasOwnProperty('animals')){
            this.#state.addAnimals(newState.animals)
        }else if(newState.hasOwnProperty('animalSelected')) {                
            this.#state.removeAnimal(newState.animalSelected);
        }else{
            this.#state.keyWord = newState.keyWord.trim().toLowerCase()
        }
    }

    get #tableContent(){
        return this.#state.getAnimal().map((x,i)=> [i+1,x]);
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #2 - Arreglo Parte #02
            </h2>
            <p class='section__description'>
                Tomar el ejercicio de la Tarea-01 adicionar elementos a la última posición con push, eliminar elementos de una posición que se le indique con splice.
            </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-24',AppTask24Component)

