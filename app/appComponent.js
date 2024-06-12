export class AppComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();

        this.addEventListener("aside:toggle",this.#asideToggle.bind(this));
    }

    disconnectedCallback(){
        this.removeEventListener("aside:toggle",this.#asideToggle.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTempllate;
    }

    #asideToggle(e){
        const State = e.detail.state == "open"?true:false;
        const Aside = this.shadowRoot.querySelector(".app__aside");
        (State) 
        ? Aside.style.display = "block"
        : Aside.style.display = "none";
    }

    static get #cssTemplateStyle(){
        return /* css */`
            :host{                
                background:var(--background);
                max-width: 100vw;
                min-height: 100vh;
                display:flex;
                flex-direction:column;
                
            }            
            
            .app__aside::-webkit-scrollbar,
            .app__main::-webkit-scrollbar{
                width:8px;                   
            }

            .app__aside::-webkit-scrollbar-thumb,
            .app__main::-webkit-scrollbar-thumb{
                background:#ccc;
                border-radius: var(--border-radius)
            }

            @media (min-width: 992px){
                *{
                    box-sizing:border-box;
                }
                :host{
                    display:grid;
                    grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows:auto 1fr 1fr 1fr;
                    grid-auto-columns:1fr;
                    grid-auto-rows:auto;
                    max-width: 100%;
                }

                .app__header{                                     
                    grid-column-start:1;
                    grid-column-end:-1;
                }

                .app__aside{
                    grid-column-start:1;
                    grid-column-end:3;
                    grid-row-start:2;
                    grid-row-end:-1
                }

                .app__main{                    
                    grid-column-start:3;
                    grid-column-end:-1;
                    grid-row-start:2;
                    grid-row-end:-1;
                }
            }
        `;
    }
    get #htmlTempllate(){
        return /* html */`
            <style>${AppComponent.#cssTemplateStyle}</style>
            <app-header class="app__header"></app-header>
            <app-aside class="app__aside"></app-aside>
            <app-main class="app__main"></app-main>
            
        `;
    }
}

customElements.define("app-component",AppComponent);