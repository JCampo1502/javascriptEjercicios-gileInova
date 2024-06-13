export class AppTableComponent extends HTMLElement{
    #heads = [];
    #rows = [];

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;        
        this.#createHeads(this.#heads);
        this.#createRows(this.#rows);
    }

    set heads(heads){        
        this.#heads = heads;
    }

    set rows(rows){                
        this.#rows = rows;
    }

    get rows(){                
        return this.#rows;
    }

    #createHeads(heads){        
        const Template = document.createDocumentFragment();
        const Row = document.createElement("tr");
        Row.classList.add("table__tr");
        Template.appendChild(Row);
        heads.forEach(content =>{
            const Cell = document.createElement("th");
            Cell.innerText = content;
            Cell.classList.add("table__th");
            Row.appendChild(Cell);
        });       

        this.shadowRoot.querySelector(".table__thead")
            .append(Template.cloneNode(true));
    }    

    #createRows(rows){                
        const Template = document.createDocumentFragment();        
        rows.forEach(row=>{         
            if(!row)return;
            const Row = document.createElement('tr');
            Row.classList.add("table__tr");            
            row.forEach(cell => {               
                const Cell = document.createElement("td");
                Cell.classList.add("table__td");
                Cell.innerText = cell;
                Row.appendChild(Cell);
            });
            Template.appendChild(Row);
        });

        this.shadowRoot.querySelector(".table__tbody")
            .append(Template.cloneNode(true));
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;                
            }

            :host{
                display:block; 
                border-radius:var(--border-radius-x2);
                box-shadow:var(--box-shadow-container-md);
                padding-block:var(--space-block-sm);
                padding-inline:var(--space-inline-sm);
                padding-top:1rem;

            }

            .container{
                max-height:15rem;
                overflow-x: auto;
                overflow-y:auto;
                width:100%;                
                max-width:100%;
            }

            .container::-webkit-scrollbar{
                width:8px;                
            }

            .container::-webkit-scrollbar-thumb{
                background:#ccc;
                border-radius: var(--border-radius)
            }

            .table{
                font-size:calc(1rem + .2vw);
                font-family:'Now',var(--font-family);
                width:100%;
                border-collapse:collapse;
                
            }

            .table__thead{
                background:var(--yellow);
                box-shadow:var(--box-shadow-sm);                
                border-radius: var(--border-radius-x2)  var(--border-radius-x2) 0  0 ;
                position:sticky;                
                top:0;
                z-index:100;
            }

            .table__tbody .table__tr:hover{
                background:#0000001a;
            }

            .table__th{
                color:var(--em);
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                text-wrap:nowrap;
            }

            .table__th:first-child{                
                border-radius:  var(--border-radius-x2) 0 0 0;
            }
            
            .table__th:last-child{                
                border-radius: 0 var(--border-radius-x2) 0 0;
                

            }

            .table__td{
                text-align:center;
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                text-wrap:nowrap;
            }

            @media (min-width: 1200px){
                .table{
                    font-size:1.3rem;
                }

                :host{
                    margin-block:var(--space-block-md);
                    margin-inline:var(--space-inline-md);
                    padding-block:var(--space-block-md);
                    padding-inline:var(--space-inline-md);
                }
            }
        `;
    }
    get #htmlTemplate(){
        return /* html */`
            <style>${AppTableComponent.#cssTemplateStyles}</style>
            <div class="container">
                <table class="table">
                    <thead class="table__thead">
                    </thead>
                    <tbody class="table__tbody">
                        
                    </tbody>
                </table>
            </div>
        `;
    }

}

customElements.define("app-table",AppTableComponent);

