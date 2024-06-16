export class AppTask18Component extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){        
        const Form = document.createElement('app-event-input-box');
        this.innerHTML = this.#htmlTemplate;
        
        const Article = this.querySelector('.section');        
        Form.classList.add("section__form");
        Article.append(Form);
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #2 - Cajas de texto
                </h2>
                <p class='section__description'>
                    Implementar 5 cajas de texto, activar los siguientes eventos (un evento por cada caja de texto): focus, blur, keypress, keyup. Cada vez que se active el evento de cada caja de texto mostrar un mensaje en una alerta.
                </p>                
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-18',AppTask18Component)