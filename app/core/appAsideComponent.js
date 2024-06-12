export class AppAsideComponent extends HTMLElement{
    static #currentPage = 1;

    #listOfPages = [
        {
            page:1,
            name:"Conceptos Basicos"
        },{
            page:2,
            name:"Estructuras Secuenciales"
        },
        {
            page:3,
            name:"Estructuras Condicionales"
        },
        {
            page:4,
            name:"Estructuras Ciclicas"
        },
        {
            page:5,
            name:"DOM"
        },
        {
            page:6,
            name:"Eventos"
        },
        {
            page:7,
            name:"Funciones"
        },
        {
            page:8,
            name:"Arreglos"
        },
        {
            page:9,
            name:"Objetos"
        }
    ]

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        document.addEventListener("task:changeSection",this.#changeSection.bind(this));
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        document.removeEventListener("task:changeSection",this.#changeSection.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;

        const List =this.shadowRoot.querySelector(".aside__list");
        
        const Template = document.createDocumentFragment();
        this.#listOfPages.forEach(item => {
            const Li = document.createElement('li');
            const Btn = document.createElement('app-btn-task');
            const Span = document.createElement('span');

            Li.classList.add("aside__item");
            Btn.setAttribute("page", item.page);
            if(item.page == AppAsideComponent.#currentPage){
                Btn.setAttribute("selected", "");
            }

            Span.innerText = item.name;
            Span.setAttribute("slot","content");
            Btn.appendChild(Span)
            Li.appendChild(Btn);
            Template.appendChild(Li);            
        })
        List.appendChild(Template.cloneNode(true));
    }  

    #changeSection(e){
        const Page = e.detail.page;
        this.shadowRoot.querySelector("app-btn-task[selected]")?.removeAttribute("selected");

        const li = this.shadowRoot.querySelector(`app-btn-task[page='${Page}']`).setAttribute("selected","");                
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
            }

            :host{                
                box-shadow: 0 0px 1px 1px #0000001b;
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                color:var(--font-color-link);
                font-family:'Now',var(--font-family);
                max-height:calc(100vh - 4rem);                
                overflow-y:auto;
                overflow-x:hidden;
            }

            

            .aside__title{                
                margin-block:var(--space-block-md);
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                background: var(--background-secondary);
                border-radius: var(--border-radius);
                margin-top:1rem;
                font-size: calc(.5rem + 1vw);                
            }

            .aside__list{
                list-style:none;
                padding-left:var(--space-inline-md);
                margin-block:var(--space-block-md);
                
            }

            @media (min-width: 992px){
                .aside__title{
                    font-size: 1.2rem                    
                }
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>${AppAsideComponent.#cssTemplateStyles}</style>
            <aside class="aside">
                <h6 class="aside__title">
                    👨‍💻 Javascript
                </h6>
                <nav class="aside__nav">                    
                    <ul class="aside__list">                    
                    </ul>
                </nav>
            </aside>
        `;
    }
}

customElements.define("app-aside", AppAsideComponent);