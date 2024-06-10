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
        this.querySelector("#task").removeEventListener("click",this.#changePage.bind(this));
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
            ?'task:changePage'
            :'task:changeSection'
            ,{
            detail: {page: this.#state.page},
            bubbles:true,
            composed:true
        })

        this.dispatchEvent(event);
    }

    static get #cssTemplateStyles(){
        return /* css */`
            :host{
                display:block;                
            }
            

            .navbar-btn{
                width:100%;
                font-family:'Now',var(--font-family);
                font-weight:bold;
                font-size:var(--font-size-md);
                padding-block:var(--space-block-sm);
                padding-inline:var(--space-inline-sm);
                text-align:start;
                border:none;                
                background:var(--background);
            }

            .navbar-btn.selected{
                background:var(--background-secondary);
                border-radius:var(--border-radius);
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