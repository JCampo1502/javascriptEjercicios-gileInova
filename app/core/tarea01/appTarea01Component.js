import { AppPracticalExercises } from "./appPracticalExercises.js";

export class AppTarea01Component extends HTMLElement{    

    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){        
        this.render();
    }

    disconnectedCallback(){
        /* remove user number event */        
        this.shadowRoot.querySelector("#userNumber").removeEventListener('input',this.#updateUserNumberProperty.bind(this));

        /* remove degrees event */
        this.shadowRoot.querySelector("#degrees").removeEventListener('input',this.#updateDegreesProperty.bind(this));

        /* Remove Form Event */
        this.shadowRoot.querySelector("#userControls").removeEventListener('submit',this.#disableFormDefaultOnSubmit.bind(this));
        
        this.shadowRoot.querySelector("#degreesControls").removeEventListener('submit',this.#disableFormDefaultOnSubmit.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        /* Form Event */
        this.shadowRoot.querySelector("#userControls").addEventListener('input',this.#disableFormDefaultOnSubmit.bind(this));
        
        this.shadowRoot.querySelector("#degreesControls").addEventListener('input',this.#disableFormDefaultOnSubmit.bind(this));

        /* user number event */
        this.shadowRoot.querySelector("#userNumber").addEventListener('submit',this.#updateUserNumberProperty.bind(this));

        /* degrees event */
        this.shadowRoot.querySelector("#degrees").addEventListener('submit',this.#updateDegreesProperty.bind(this));        
   }

    #disableFormDefaultOnSubmit(e){
        e.preventDefault();
    }
   
    #updateUserNumberProperty(e){
        this.shadowRoot.querySelector('#app-practical-exercoses').setAttribute('user-number',e.target.value);
    }

    #updateDegreesProperty(e){
        this.shadowRoot.querySelector('#app-practical-exercoses').setAttribute('degrees',e.target.value);
    }

    get #htmlTemplate(){
        return /* html */`
            <app-exercise>      
                <h2 slot="title">${AppPracticalExercises.title}</h2>
                <p slot="description">${AppPracticalExercises.description}</p>
                <app-practical-exercoses slot="content">
                    <form id="userControls" slot="userControls">
                        <label for="userNumber">
                            <span>Escribe un número</span>
                            <input type="number" id="userNumber">
                        </label>                
                    </form>
                    <form id="degreesControls" slot="degreesControls">
                        <label for="degrees">
                            <span>Escribe los grados Centigrados</span>
                            <input type="number" id="degrees">
                        </label>                
                    </form>
                </app-practical-exercoses>        
            </app-exercise> 
        `;
    }
}



customElements.define("app-tarea01",AppTarea01Component);