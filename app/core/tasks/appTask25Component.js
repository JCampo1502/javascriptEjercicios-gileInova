export class AppTask25Component extends HTMLElement{
    #state = {        
        getWords(){
            let data = localStorage.getItem("app-task-25");
            if(!data) return [];

            data = JSON.parse(data);
            return this.filterWords(data.words);
                
        },

        addWords(words = ''){
            const Obj = new Object();
            let newWords = this.filterWords(words.split(','));
            Obj['words'] = newWords;
            localStorage.setItem("app-task-25",JSON.stringify(Obj));
        },

        filterWords(words = []){
            return words
            .filter(x => typeof(x)=='string' && x != '')
            .map(x => {
                x = x.toLowerCase().trim();
                let firstLetter = x.slice(0,1);
                return firstLetter.toUpperCase() + x.slice(1,x.length);
            })
        }
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:json-exercise',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:json-exercise',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','json-exercise');

        /* Add Content */
        Table.heads = ['#', 'Elementos']
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: 'words', 
                description: 'Ingresa el contenido del array separado por ","', 
                value:this.#state.getWords().join(', '), 
                type:"string"
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
        if(!Table)return;
        /* Update State */        
        this.#state.addWords(value);

        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    get #tableContent(){
        return this.#state.getWords().map((x,i)=>[i+1,x]);
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #3 - JSON
                </h2>
                <p class='section__description'>
                    Hacer un arreglo de objetos JSON y almacenarlo en el localstorage.
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-25',AppTask25Component)