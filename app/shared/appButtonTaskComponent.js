export class AppButtonTaskComponent extends HTMLElement{
    #state;

    static get observedAttributes() {
        return ['page', 'selected', 'type'];
    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){        
        this.render();        
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector("#task").removeEventListener("click",this.#changePage.bind(this));
    }

    render(){        
        this.shadowRoot.innerHTML = this.#htmlTemplae;
        const TaskElement = this.shadowRoot.querySelector("#task");        

        TaskElement.classList.remove(...TaskElement.classList);

        TaskElement.addEventListener("click",this.#changePage.bind(this));        
        if(this.#state.selected)TaskElement.classList.add("selected");        

        switch (this.#state.type) {
            case 1:
                TaskElement.classList.add("task-btn");
                break;
            default:
                TaskElement.classList.add("navbar-btn");
                break;
        }
    }
    
    attributeChangedCallback(name, oldVal, newVal) { 
        
        if(oldVal == newVal)return;                
        
        if(!newVal && name!="selected")return;
        
        if(name == 'page' || name == 'type') 
            newVal = parseInt(newVal);        

        if(name == 'selected')newVal =(newVal =="")? true: false;
        let obj = new Object();
        obj[name] = newVal;        
        
        this.#updateState(obj);
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    #changePage(e){
        
        const Type = this.#state.type;

        const event = new CustomEvent(
            (Type == 1)
            ?'task:changeTask'
            :'task:changeSection'
            ,{
            detail: {page: this.#state.page},
            bubbles:true,
            composed:true
        })        

        if(screen.width < 992 && Type != 1){
            const CloseAsideEvent = new CustomEvent(
                "aside:toggle",
                {
                    detail:{state:"close"},
                    bubbles:true,
                    composed:true
                }
            );
    
            this.dispatchEvent(CloseAsideEvent);
        }

        

        this.dispatchEvent(event);
    }

    static get #cssTemplateStyles(){
        return /* css */`
            :host{
                display:block;                
                
            }
            
            /* font-size:calc(1rem + 1vw); */

            .navbar-btn{
                font-family:'Now',var(--font-family);
                font-weight:600;
                width:100%;
                font-size: calc(.86rem + 1vw);
                padding-block:var(--space-block-sm);
                padding-inline:var(--space-inline-sm);
                text-align:start;
                border:none;                
                background:var(--background);
                color: var(--font-color);
                transition: background .1s ease-in-out;
            }

            .navbar-btn.selected{
                background:var(--background-secondary);
                border-radius:var(--border-radius);
                color:var(--font-color-link);
            }

            .navbar-btn:hover{
                background:var(--background-secondary);
            }

            .task-btn{
                font-family:'Now',var(--font-family);
                font-weight:600;
                font-size:var(--font-size-sm);
                background:var(--blue);
                color:var(--white);
                padding-block:var(--space-block-sm);
                padding-inline:var(--space-inline-sm);
                margin-block:var(--space-block-sm);
                border:none;
                border-radius:var(--border-radius);
                transition: background .1s ease-in-out;
            }

            .task-btn:hover{
                background:var(--blue-strong);
            }

            .task-btn.selected{
                background:var(--strong);
            }

            @media (min-width: 992px){
                .navbar-btn{
                    font-size: 1rem                    
                }
            }
        `;
    }

    get #htmlTemplae(){
        return /* html */`
            <style>${AppButtonTaskComponent.#cssTemplateStyles}</style>
            <button id="task"> <slot name="content"></slot> </button>
        `;
    }
}

customElements.define("app-btn-task",AppButtonTaskComponent)