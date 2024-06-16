export class AppTask19Component extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = this.#htmlTemplate;        
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
            <h2 class='section__title'>
                Tarea #3 - Calculadora
            </h2>
            <p class='section__description'>
                Realizar una calculadora que cuente con las operaciones básicas: suma, resta, multiplicación y división. Tener en cuenta adicionar un botón para limpiar las cajas de texto. Implementar los eventos necesarios para resolver el ejercicio.
            </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-19',AppTask19Component)