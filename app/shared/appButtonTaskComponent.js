export class AppButtonTaskComponent extends HTMLElement{
    #state;

    static get observedAttributes() {
        return ['page', 'selected', 'type'];
    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.attributeChangedCallback("page", 0, this.getAttribute("page"));
        this.attributeChangedCallback("type", 0, this.getAttribute("type"));
        this.attributeChangedCallback("selected", false, this.getAttribute("selected"));
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        this.querySelector("#task").removeEventListener("click",this.#changePage.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplae;
        const TaskElement = this.querySelector("#task");
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
        if(!newVal)return;
        if(name == 'page' || name == 'type') 
            newVal = parseInt(newVal);        

        if(name == 'selected')newVal = (!newVal)? false:true;

        let obj = new Object();
        obj[name] = newVal;

        this.#updateState(obj);
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    #changePage(e){
        const event = new CustomEvent('task:changePage',{
            detail: {page: this.#state.page},
            bubbles:true,
            composed:true
        })

        this.dispatchEvent(event);
    }

    get #htmlTemplae(){
        return /* html */`
            <button id="task"> <slot class="link"></slot> </button>
        `;
    }
}

customElements.define("app-btn-task",AppButtonTaskComponent)