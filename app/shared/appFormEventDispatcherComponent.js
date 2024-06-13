export class AppFormEventDispatcherComponent extends HTMLElement{
    #state;
    #formInputs = [];

    static get observedAttributes() {
        return ['event-name'];
    }

    set formInputs(inputs){        
        this.#formInputs = inputs;
    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});        
    }    

    connectedCallback(){        
        this.render();        
    }

    disconnectedCalback(){
        this.#formInputs.forEach(input => {
            this.shadowRoot.querySelector(`#${input.name}`)
                .removeEventListener(this.#emitFormEvent.bind(this));            
        });
        this.shadowRoot.querySelector(".form")
            .removeEventListener("submit", this.#formSubmitEvent.bind(this));
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal == newVal)return;
        if(!newVal || newVal == "")return;
        const Obj = new Object();
        Obj[name] = newVal;        
        this.#updateState(Obj);
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;                
        this.#insertInputs();        
    }
        
    #insertInputs(){
        const Template = document.createDocumentFragment();
        const Form = this.shadowRoot.querySelector(".form");

        this.#formInputs.forEach(input =>{            
            const Label = document.createElement('label');
            const Input = document.createElement('input');
            const Span = document.createElement('span');

            /* Set Atributes And Classes */
            Label.classList.add("form__label");
            Span.classList.add("form__message");            
            Input.classList.add("form__input");
            Input.setAttribute("type",input.type);
            Input.setAttribute("value",input.value);
            Input.setAttribute("id",input.name);
            Label.setAttribute("for", input.name);
            Input.setAttribute("name",input.name);            

            /* Append */
            Span.innerText = input.description;
            Label.append(Span, Input);
            Template.appendChild(Label);
        });        

        Form.append(Template.cloneNode(true));

        /* Add Events */
        this.#formInputs.forEach(input => {            
            this.shadowRoot.querySelector(`#${input.name}`)
                .addEventListener("input",this.#emitFormEvent.bind(this));
        });
        Form.addEventListener("submit", this.#formSubmitEvent.bind(this));
    }

    #formSubmitEvent(e){
        e.preventDefault();
    }

    #emitFormEvent(e){                
        const Data = {
            name:e.target.name,
            value:e.target.value
        }

        const Event = new CustomEvent(
            `form-event-dispatcher:${this.#state['event-name']}`,
            {
                detail:Data,
                bubbles:true,
                composed:true
            }
        );

        this.dispatchEvent(Event);
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};        
        this.render();
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
            }

            :host{
                display:block;
                width:100%;
            }

            .form{
                display:flex;
                font-size:var(--font-size-sm);
                font-family:'Now', var(--font-family);
                width:100%;
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);   
                margin-bottom:var(--space-block-sm);
                display:flex;
                flex-direction:column;
            }

            

            .form__message{                
                margin-block:var(--space-block-sm);
            }

            .form__input{
                font-size:var(--font-size-md);                
                height:2rem;
                padding-inline:var(--space-inline-sm);
                border-radius:var(--border-radius);
            }

            .form__input:focus{
                outline:none;
                box-shadow: 0px 0px 0px 5px var(--blue);
                border:none;
            }

            .form__label{
                display:flex;
                flex-direction:column;
                margin-block:var(--space-block-md);
            }

            @media (min-width: 768px){
                :host{
                    margin-inline:var(--space-inline-sm);
                    margin-block:var(--space-block-md);
                }

                .form{                    
                    font-size:1.2rem;
                    padding-inline:var(--space-inline-md);
                    padding-block:var(--space-block-md);                        
                    margin-inline:var(--space-inline-sm);
                    margin-bottom:var(--space-block-sm);
                }                

                .form__label{
                    width:60%;
                }
                
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>
                ${AppFormEventDispatcherComponent.#cssTemplateStyles}
            </style>
            <form class="form" autocomplete="off">

            </form>
        `;
    }
}

customElements.define('app-form-event-dispatcher', AppFormEventDispatcherComponent);

