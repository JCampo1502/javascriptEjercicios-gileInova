const Sections = [
    {
      name:  "Inicio"
    },
    {
        name:"🚀 Conceptos Basicoss",            
        tasks:[
            {
                name:'Tarea 01',
                taq:'app-task-01'
            },
            {
                name:'Tarea 02',
                taq:'app-task-02'
            },
            {
                name:'Tarea 03',
                taq:'app-task-03'
            },
            {
                name:'Tarea 04',
                taq:'app-task-04'
            },
        ]
    }
]


export class AppMainComponent extends HTMLElement{
    static #CurrentSection = 1;
    static #CurrentTask = 1;

    constructor(){
        super();        
        this.attachShadow({mode:"open"});

        /* Add Events */
        document.addEventListener("task:changeSection",this.#changeCurrentSection.bind(this));

        document.addEventListener("task:changeTask",this.#changeCurrentTask.bind(this));
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        /* Remove Events */
        document.removeEventListener("task:changeSection",this.#changeCurrentSection.bind(this));

        document.addEventListener("task:changeTask",this.#changeCurrentTask.bind(this));
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
        this.#changeSection();    
    }

    /* Change Section */
    #changeCurrentSection(e){        
        (
            !e.detail ||
            e.detail.page >= Sections.length || 
            e.detail.page < 0
        ) 
        ? AppMainComponent.#CurrentSection = 0
        : AppMainComponent.#CurrentSection = e.detail.page;
        AppMainComponent.#CurrentTask = 0;

        this.#changeSection();    
    }

    #changeSection(){        
        const Section = Sections[AppMainComponent.#CurrentSection];

        /* Change Content */
        const Title = this.shadowRoot.querySelector(".main__title");
        Title.textContent = Section.name;

        /* Change Tasks */
        this.shadowRoot.querySelector(".main__content")?.remove();
        this.shadowRoot.querySelector(".main__nav")?.remove();        

        if(!Section.tasks)return;
        const Template = document.createDocumentFragment();        
        const Task = document.createElement(Section.tasks[0].taq);
        const Nav = document.createElement("nav");        
        const List = document.createElement("ul");

        Nav.appendChild(List);
        Template.append(Nav,Task)

        Section.tasks.forEach((task, i) => {
            const Btn = document.createElement("app-btn-task");
            const Span = document.createElement("span");

            Btn.setAttribute("type",1);
            Btn.setAttribute("page",i)
            Span.setAttribute("slot", "content");
            if(i == 0) Btn.setAttribute("selected","");

            Span.innerText = task.name;
            Btn.appendChild(Span);
            List.appendChild(Btn);
        });

        Nav.classList.add("main__nav");
        List.classList.add("main__list");
        Task.classList.add("main__content");

        this.shadowRoot.querySelector(".main").append(Template.cloneNode(true));
    }

    /* Change Task */
    #changeCurrentTask(e){
        let newCurrentTask = e.detail.page;
        const Tasks = Sections[AppMainComponent.#CurrentSection];
        if(
            !newCurrentTask ||
            newCurrentTask >= Tasks.length ||
            newCurrentTask < 0 
        ) newCurrentTask = 0;

        AppMainComponent.#CurrentTask = newCurrentTask;
        this.#changeTask();
    }

    #changeTask(){
        this.shadowRoot.querySelector(".main__content")?.remove();

        const Template = document.createDocumentFragment();                
        const Task = document.createElement(
            Sections[AppMainComponent.#CurrentSection]
            .tasks[AppMainComponent.#CurrentTask].taq
        );
        Template.append(Task);

        Task.classList.add("main__content");
        
        this.shadowRoot.querySelector(".main").append(Template.cloneNode(true));
    }


    /* String Templates */
    static get #cssTemplateStyles(){
        return /* css */`            

            .main{
                min-height:100%;
            }

            @media (min-width: 992px){
                :host{
                    max-height:calc(100vh - 4rem);                
                    overflow-y:auto;
                    overflow-x:hidden;
                }
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>${AppMainComponent.#cssTemplateStyles}</style>
            <main class="main">
                <h1 class="main__title">Hola Mundo</h1>                
            </main>
            <app-footer class="footer"></app-footer>
        `;
    }
}

customElements.define("app-main",AppMainComponent);