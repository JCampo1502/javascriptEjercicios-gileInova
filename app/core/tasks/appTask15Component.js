function* clockTime(){    
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m++) {
            for (let s = 0; s < 60; s++) {
                yield [`${h}:${m}:${s}`];
            }
            
        }
        
    }
}

export class AppTask15Component extends HTMLElement{
    constructor(){
        super();      
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const Table = document.createElement('app-table');        
        
        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        
        /* Add Content */
        Table.heads = ["time"]
        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Table);
        Table.rows =[...clockTime()];
        Table.render();
    }        

    

    get #htmlTemplate(){
        return      /* html */`
        <section class='section'>            
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #4 - Reloj
            </h2>
            <p class='section__description'>
                Simular el comportamiento de un reloj digital, imprimiendo la hora, minutos y segundos de un día desde las 0:00:00 horas hasta las 23:59:59 horas.
            </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-15',AppTask15Component)