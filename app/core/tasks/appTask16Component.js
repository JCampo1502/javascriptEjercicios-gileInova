export class AppTask16Component extends HTMLElement{
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
                    Tarea #1 - Empresa de Peliculas
                </h2>
                <p class='section__description'>
                    Usted ha sido contratado por una importante empresa de pelicula sy requiere que usted diselñe una sección donde se mostrarán las 10 películas más recientes. Para poder cumplir con la entrega es necesario que se cumplan los siguientes requerimeintos:
                </p>
                <ul class="section__list">
                    <li class="section__item">
                        El administrador debe poder agregar las 10 imagenes a traves del propmt.
                    </li>
                    <li class="section__item">
                        Se debe pedir el nombre de la película y el poster(imagen) de la misma.</li>
                    <li class="section__item">
                        Todas las imagenes deben tener el mismo tamaño y se debe mostrar de la siguiente forma 
                        <img src="app/assets/movies_preview.png" alt="imagen grid">
                    </li>
                    <li class="section__item">
                        El nombre de la pelicula se mostrará debajo del poster.
                    
                    </li>
                    <li class="section__item">
                        Se debe usar el ciclo FOR.
                    </li>
                    <li class="section__item">
                        El contenido se insertará al DOM haciendo uso del método <code>appendChild();</code>
                    </li>
                </ul>
            </article>
            <app-movies></app-movies>
        </section>
        `;
    }

}
customElements.define('app-task-16',AppTask16Component)