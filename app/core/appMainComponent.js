const Sections = [
    {
      name:  "Inicio"
    },
    {
        name:"🚀 Conceptos Basicos",            
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
        const H5 = document.createElement("h5");
        const Nav = document.createElement("nav");        
        const List = document.createElement("ul");


        H5.innerText = "Tareas";
        Nav.appendChild(H5);
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
        
        H5.classList.add("main__task_title")
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
        const CurrentSection = AppMainComponent.#CurrentSection;
        const CurrentTask = AppMainComponent.#CurrentTask;


        this.shadowRoot.querySelector(".main__content")?.remove();
        this.shadowRoot.querySelector(".main__list app-btn-task[selected]").removeAttribute("selected");
        this.shadowRoot.querySelector(`.main__list app-btn-task[page='${CurrentTask}']`).setAttribute("selected","");

        const Template = document.createDocumentFragment();                
        const Task = document.createElement(
            Sections[CurrentSection].tasks[CurrentTask].taq
        );
        Template.append(Task);

        Task.classList.add("main__content");
        
        this.shadowRoot.querySelector(".main").append(Template.cloneNode(true));
    }


    /* String Templates */
    static get #cssTemplateStyles(){
        return /* css */`   
        
            *{
                box-sizing:border-box;
            }

            .main{                
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-inline-sm);
                
            }

            .main__title{
                font-size:var(--font-size-h1);

            }

            

            @media (min-width: 992px){
                :host{
                    max-height:calc(100vh - 3rem);
                    overflow-y:auto;
                    overflow-x:hidden;
                }
                
                .main{
                    max-width:80%;
                    position:relative;
                }

                .main__nav{
                    position:fixed;
                    right:5%;
                    top:5rem;
                    display:flex;
                    width:120px;
                    flex-direction:column;
                    align-items:center;
                    background:var(--black);
                    color:var(--white);
                    font-family:"Now", var(--font-family);
                    padding-block:var(--space-block-sm);
                    border-radius:var(--border-radius-x2);
                }

                .main__task_title{
                    font-size:calc(1rem + .5vw);
                    margin-inline:var(--space-inline-sm);
                    margin-block:var(--space-block-sm);
                }

                .main__list{                    
                    padding:0;
                    margin-block:var(--space-block-sm);
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