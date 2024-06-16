export class AppConfirmModalComponent extends HTMLElement{
    #state = {
        open:false,
        message:"Soy un modal"
    }

    static get observedAttributes() {
        return ['open', 'message'];
    }

    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector(".modal__close")
            .removeEventListener("click",this.#modalClose.bind(this));
    }

    attributeChangedCallback(name, oldVal, newVal) { 
        const Obj = new Object();
        if(oldVal == newVal || !name || (!newVal && name!="open"))return;  
        if(newVal == '')newVal = true;
        Obj[name] = newVal;
        this.#updateState(Obj);
    }

    render(){        
        this.shadowRoot.innerHTML = this.#htmlTemplate;
        this.shadowRoot.querySelector(".modal__close")
            .addEventListener("click",this.#modalClose.bind(this));
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
        this.#show(this.#state.message, this.#state.open);
    }

    #modalClose(){
        const Event = new CustomEvent(
            'modal:close',
            {
                detail:{confirm:true},
                bubbles:true,
                composed:true
            }
        )
        /* Dispatch */
        this.dispatchEvent(Event);
    }

    #show(message, open = false){
        const Modal = this.shadowRoot.querySelector('.modal');
        const ModalEvent = this.shadowRoot.querySelector(".modal__description");

        if(open){
            Modal.classList.add('modal--open');
            ModalEvent.textContent = message;
        }else{            
            Modal.classList.remove('modal--open');
        }
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
                font-family:"Now", var(--font-family)
            }
            
            .modal{
                display:none;
            }

            .modal--open{
                position:fixed;
                background:var(--backdrop);
                height:100vh;
                width:100vw;
                top:0;
                left:0;
                z-index:var(--zindex-modal-backdrop);
                display:flex;
                align-items:center;
                justify-content:center;
            }            

            .modal__content{
                background:var(--white);
                height:10.5rem;
                width:20rem;
                border-radius:var(--border-radius);
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                align-items:center;
                padding-block:var(--space-block-md);
            }

            .modal__message{
                font-size:calc(var(--font-size-lg) * 1.2);
                color:var(--em);
                border-bottom:2px solid var(--em);
            }

            .modal__close{
                background:var(--strong);
                padding:.65rem;
                border-radius:var(--border-radius-x2);
                color:var(--white);
                cursor:pointer;
                transition: background  .2s ease-in-out;
            }

            .modal__close:hover{
                background:var(--black);
                text-decoration: underline;
            }

            @media (min-width: 992px){
                .modal__message{
                    font-size:var(--font-size-lg)
                    
                }
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>
                ${AppConfirmModalComponent.#cssTemplateStyles}
            </style>
            <div class="modal modal--close">
                <p class="modal__content">
                    <strong class="modal__message">
                        !Importante
                    </strong>
                    <em class="modal__description"></em>
                    <span class="modal__close">Aceptar</span> 
                </p>
            </div>
        `;
    }

}
customElements.define('app-confirm-modal',AppConfirmModalComponent)