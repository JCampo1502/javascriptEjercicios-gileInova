export class AppEventTextInputBoxComponent extends HTMLElement{
    #state = {}

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        document.addEventListener('modal:close',this.#modalClose.bind(this))
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        this.shadowRoot.querySelector('.event__input--focus')
            .removeEventListener("focus",this.#onFocusEvent.bind(this))
        this.shadowRoot.querySelector('.event__input--blur')
            .removeEventListener("blur",this.#onBlurEvent.bind(this))
        this.shadowRoot.querySelector('.event__input--Keypress')
            .removeEventListener("keypress",this.#onKeyPressEvent.bind(this))
        this.shadowRoot.querySelector('.event__input--keyUp')
            .removeEventListener("keyup",this.#onKeyUpEvent.bind(this))
        document.removeEventListener('modal:close',this.#modalClose.bind(this))
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        /* Add Events */
        this.shadowRoot.querySelector('.event__input--focus')
            .addEventListener("focus",this.#onFocusEvent.bind(this));
        this.shadowRoot.querySelector('.event__input--blur')
            .addEventListener("blur",this.#onBlurEvent.bind(this));
        this.shadowRoot.querySelector('.event__input--Keypress')
            .addEventListener("keypress",this.#onKeyPressEvent.bind(this));
        this.shadowRoot.querySelector('.event__input--keyUp')
            .addEventListener("keyup",this.#onKeyUpEvent.bind(this));
    }


    #onFocusEvent(e){        
        this.#modalOpen("On Focus")        
    }

    #onBlurEvent(e){
        this.#modalOpen("On Blur")
    }

    #onKeyPressEvent(e){
        this.#modalOpen("On KeyPress")
    }

    #onKeyUpEvent(e){
        this.#modalOpen("On KeyUp")
    }

    #modalClose(){
        this.shadowRoot.querySelector('.modal')
            .removeAttribute('open');
    }

    #modalOpen(event){
        const Modal = this.shadowRoot.querySelector('.modal');
        Modal.setAttribute("open","");
        Modal.setAttribute("message",event);
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
                font-family:"Now", var(--font-family)
            }

            :host{
                display:block;
            }            

            .event{
                display:flex;
                flex-direction:column;
            }

            .event__label{
                margin-inline:var(--space-inline-sm);
                padding-block:var(--space-block-md);
            }

            .event__message{
                display:block;
                color:var(--em)
            }

            .event__input{
                width:100%;
                height:2rem;
                border-radius:var(--border-radius);
                border:none;
                border-bottom:2px solid #000;
                box-shadow:var(--box-shadow-container-md)
            }
                      

            @media (min-width: 542px){
                .event__label{
                    margin-inline:var(--space-inline-sm)
                }

                .event{                    
                    flex-direction:row;
                    flex-wrap:wrap;
                    justify-content:space-evenly;
                }

                .event__label{
                    max-width:80%;
                    min-width:45%;
                    flex-grow:1;
                }
                
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
        <style>
            ${AppEventTextInputBoxComponent.#cssTemplateStyles}
        </style>
        <article class="article">
            <form class="event">
                <label for="focus" class="event__label event__label--focus">
                    <span class="event__message">On Focus</span>
                    <input autocomplete="off" type="text" id="focus" class="event__input event__input--focus">
                </label>
                <label for="blur" class="event__label event__label--blur">
                    <span class="event__message">On blur</span>
                    <input autocomplete="off" type="text" id="blur" class="event__input event__input--blur">
                </label>
                <label for="Keypress" class="event__label event__label--Keypress">
                    <span class="event__message">On Keypress</span>
                    <input autocomplete="off" type="text" id="Keypress" class="event__input event__input--Keypress">
                </label>
                <label for="keyUp" class="event__label event__label--keyUp">
                    <span class="event__message">On keyUp</span>
                    <input autocomplete="off" type="text" id="keyUp" class="event__input event__input--keyUp">
                </label>
            </form>
            <app-confirm-modal class="modal"></app-confirm-modal>
        </article>
        `;
    }

}
customElements.define('app-event-input-box',AppEventTextInputBoxComponent)