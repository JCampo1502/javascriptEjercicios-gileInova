
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
            Btn.classList.add("main__btn")
            Span.setAttribute("slot", "content");
            if(i == 0) Btn.setAttribute("selected","");

            Span.innerText = task.name;
            Btn.appendChild(Span);
            List.appendChild(Btn);
        });
        
        H5.classList.add("main__title--tasks")
        Nav.classList.add("main__nav");
        List.classList.add("main__list");
        Task.classList.add("main__content");

        this.shadowRoot.querySelector(".main").append(Template.cloneNode(true));

        this.scroll(0,0);

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
                
        this.scroll(0,0);
    }


    /* String Templates */
    static get #cssTemplateStyles(){
        return /* css */`   
            
            *{
                box-sizing:border-box;
            }

            :host{
                max-height:calc(100vh - 3rem);
                overflow-y:auto;
                overflow-x:hidden;
            }

            .main{                
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-inline-sm);
                position:relative;   
            }

            .main__title{
                font-size:var(--font-size-xl);
            }

            .main__title--tasks{
                font-size:var(--font-size-md);
                margin-inline:var(--space-inline-sm);
                margin-block:var(--space-block-sm);
            }

            .main__nav{
                position:sticky;                
                top:0rem;
                display:flex;                
                align-items:center;
                background:var(--black);
                color:var(--white);
                font-family:"Now", var(--font-family);
                padding-block:var(--space-block-sm);
                border-radius:0 0 var(--border-radius-x2) var(--border-radius-x2);
                z-index:var(--zindex-sticky);              
                max-width:100%;
                
            }

            .main__list{                    
                padding:0;
                margin-block:var(--space-block-sm);                
                display:flex;
                overflow-x:auto;
                overflow-y:auto; 
                 
            }

            .main__btn{
                min-width:100px;
                max-height:40px;
                margin-bottom:var(--space-block-sm);                
                
            }

            h2{
                font-size:var(--font-size-lg);
            }

            h3{
                font-size:var(--font-size-md);
            }

            p{
                font-size:var(--font-size-sm);
            }

            @media (min-width: 768px){
                .main{
                    position:relative;
                }

                .main__title{
                    position:absolute;
                    top:3rem;
                    max-width:80%;               
                    font-size:var(--font-size-xl);

                }

                .main__title--taks{
                    position:static;
                    width:100%;
                    font-size:var(--font-size-md);
                }

                .main__content{
                    display:block;
                    max-width:80%;
                }

                .main__nav{
                    position:sticky;
                    left:85%;
                    top:3rem;                
                    width:120px;  
                    flex-direction:column;
                    max-height:200px;
                    
                }
                    
                .main__list{                    
                    padding:0;
                    margin-block:var(--space-block-sm);
                    display:block;
                    max-height:190px;          
                }

                .main__btn{                    
                    display:flex;
                    justify-content:center;
                }

                .main__list::-webkit-scrollbar{
                    width:8px;                
                }
    
                .main__list::-webkit-scrollbar-thumb{
                    background:#ccc;
                    border-radius: var(--border-radius)
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
    },
    {
        name:"🎢 Estructuras Secuenciales",
        tasks:[
            {
                name:'Tarea 01',
                taq:'app-task-05'
            },
            {
                name:'Tarea 02',
                taq:'app-task-06'
            },
            {
                name:'Tarea 03',
                taq:'app-task-07'
            }
        ]
    },
    {
        name:"🌳 Estructuras Condicionales",
        tasks:[
            {
                name:'Tarea 01',
                taq:'app-task-08'
            },
            {
                name:'Tarea 02',
                taq:'app-task-09'
            },
            {
                name:'Tarea 03',
                taq:'app-task-10'
            },
            {
                name:'Tarea 04',
                taq:'app-task-11'
            }
        ]
    },
    {
        name:"🔄 Estructuras Ciclicas",
        tasks:[
            {
                name:'Tarea 01',
                taq:'app-task-12'
            },
            {
                name:'Tarea 02',
                taq:'app-task-13'
            },
            {
                name:'Tarea 03',
                taq:'app-task-14'
            },
            {
                name:'Tarea 04',
                taq:'app-task-15'
            }
        ]
    }
]

