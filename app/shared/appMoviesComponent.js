export class AppMoviesComponent extends HTMLElement{
    #state = {}

    static get observedAttributes() {
        return [/* Attributes */];
    }

    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('.movies__form')
            .removeEventListener('submit', this.#addMovie.bind(this));
        this.shadowRoot.querySelector('#poster')
            .removeEventListener('change', this.#previewImage.bind(this));
    }

    attributeChangedCallback(name, oldVal, newVal) { 
        const Obj = new Object();
        if(oldVal == newVal || !name || !value)return;
        Obj[name] = newVal;
        this.#updateState(Obj);
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
        this.shadowRoot.querySelector('.movies__form')
        .addEventListener('submit', this.#addMovie.bind(this));
        this.shadowRoot.querySelector('#poster')
        .addEventListener('change', this.#previewImage.bind(this));
    }
    
    #previewImage(e){
        const Img = this.shadowRoot.querySelector('.movies__img--preview');
        const File = e.target.files[0];
        if(!File){
            Img.classList.add('movies__img--icon');
            Img.setAttribute('src', 'app/assets/add-image.svg');
            return;
        }
        this.#renderImage(File, (e)=>{            
            const Url = e.target.result;
            Img.classList.remove('movies__img--icon');
            Img.setAttribute('src',Url);
        });
    }

    #addMovie(e){
        e.preventDefault();
        const Img = this.shadowRoot.querySelector('.movies__img--preview');
        const Form = this.shadowRoot.querySelector('.movies__form');
        const Collection = this.shadowRoot.querySelector('.movies__collection');
        const File = Form?.poster.files[0];
        let title = Form?.title.value;
        if(!Form || !title || !File)return;

        /* Uppercase */
        title = title.toLowerCase();
        title = title.split(' ')
            .filter(w => w!='')
            .map(w => {
                w = w.toLowerCase().trim();
                let firstLetter = w[0];
                return firstLetter.toUpperCase() + w.slice(1,w.length);
            })            
            .join(' ');

        /* Add Poster */
        let Movie = this.#createMovie({File,Title:title})
        Collection.appendChild(Movie);

        /* Clean Form */
        Img.classList.add('movies__img--icon');
        Img.setAttribute('src', 'app/assets/add-image.svg');
        Form.reset();
    } 

    #createMovie({
        File = null, 
        Title = 'Intensamente 2'
    }){
        /* Define */        
        const P = document.createElement('p');
        const Img = document.createElement('img');
        const Strong = document.createElement('strong');        
        P.appendChild(Img);
        P.appendChild(Strong);        

        /* set classes and attributes */
        P.classList.add('movies__poster');
        Img.classList.add('movies__img', 'movies__img--poster');
        Img.setAttribute('alt','movie poster');
        Strong.classList.add('movies__description');        
        
        /* Add Content */        
        Strong.innerText = Title;
        this.#renderImage(File, (e)=>{
            const Image_URL = e.target.result;
            Img.setAttribute('src', Image_URL);
        });

        /* Append */
                
        return P;
    }

    #renderImage(File, fn){
        const Render = new FileReader();
        if(
            !File || 
            (
                File.type != 'image/png' &&
                File.type != 'image/jpg' &&
                File.type != 'image/jpeg'
            ) 
        )return;

        Render.onload = fn
        Render.readAsDataURL(File);
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
                font-size:var(--font-size-md);
                font-family:'Now', var(--font-family);
            }

            :host{
                display:block;
                padding-block:var(--space-block-md);
                display:flex;
                flex-direction:column;
            }                    

            /* Section 1 */
            
            .movies__creator{
                display:flex;
                flex-direction:column;
                align-items:center;
                position:relative;
                padding-block:calc(var(--space-block-md) * 2);
                z-index:100;
                
            }

            .movies__creator::after{
                content:"";
                height:50%;                
                width:100%;
                position:absolute;
                bottom:-5%;
                border-radius:1rem 1rem 0 0;
                z-index:-1;
                background:var(--black);
            }

            .movies__creator::before{
                content:"";
                height:100%;
                width:100%;
                position:absolute;
                top:0%;
                border-radius:1rem 1rem 0 0 ;
                z-index:-1;
                background:var(--blue);
            }

            .movies__preview{
                display:flex;
                height:min(45vh, 275px);
                width:min(70vw, 250px);
                display:flex;
                justify-content:center;
                align-items:center;
                border-radius:var(--border-radius-x2);
                border:.5rem dashed var(--strong);     
                margin-block: var(--space-block-md);
                background:var(--white);
                position:relative;                
            }
            
            .movies__img--preview{
                width:100%;
                height:100%;
            }

            .movies__img--icon{
                height:min(calc(3rem + 5vh), 5rem);                
            }


            .movies__input{
                border-radius:  1rem 0  0 1rem  ;                
                padding:.5rem;
                padding-left:1rem;
                width:100%;
                border-color:var(--white);
            }

            .movies__form{
                display:flex;
                justify-content:center;                
            }

            .movies__btn--submit{
                border-radius: 0 1rem 1rem 0;
                width:15%;
                border-left:none;
                background:var(--strong);
                border-color:var(--strong);
                color:var(--white);
            }

            .movies__label--description{
                width:75%;
            }

            .movies__label--file{
                height:min(50vh, 440px);
                width:min(70vw, 250px);
                top: calc(var(--space-block-md) * 2);
                position:absolute;
                cursor:pointer;
            }

            .movies__input--file{
                display:none;
            }
            /* Section 2 */
            .movies__list{
                background: var(--black);
                padding-inline:var(--space-inline-sm);
                padding-block:var(--space-block-sm);
                padding-bottom:1.7rem;
            }

            .movies__collection{
                display:grid;         
                grid-template-columns:1fr 1fr;       
                grid-auto-columns:1fr;
                grid-auto-rows:auto;
                border: .5rem dotted var(--yellow);
                padding: var(--space-block-md);
                grid-gap:.8rem;
                max-height:285px;
                overflow-y:auto;
            }

            .movies__collection::-webkit-scrollbar{
                width:6px;                
            }

            .movies__collection::-webkit-scrollbar-thumb{
                background:var(--strong);
                border-radius: var(--border-radius)
            }

            .movies__form{
                padding-top:var(--space-block-md);
            }

            .movies__poster{
                display:flex;
                align-items:center;
                flex-direction:column;
                position:relative;
                border:solid .2rem #b51058b0;
                border-radius:.2rem;
                margin:0;                
            }

            .movies__description{
                position:absolute;
                bottom:0;
                font-size:var(--font-size-sm);
                color:var(--white);                              
                width:100%;
                text-align:center;
                color:var(--white);
                z-index:200;
                background:#242526ab;
                padding-block:var(--space-block-md);
                padding-inline:.15rem;
            }

            .movies__img--poster{                
                width:100%;
                height:100%;
                min-height:198px;
                position:relative;                
            }

            .movies__poster::before{
                content:"";
                position:absolute;
                height:100%;
                width:100%;
                z-index:100;
                background:  radial-gradient(circle, rgba(255,254,254,0) 30%, rgba(40,42,54,1) 96%);;
            }
            .movies__title{
                margin-top: 1rem;
                background:var(--black);
                color:var(--white);
                text-align:center;
                margin-bottom:0;
                padding:.5rem;
                padding-block:calc(var(--space-block-md) * 3);
                border-top:4px solid var(--white);
                font-size:var(--font-size-lg);
            }

            @media (min-width: 430px){
                .movies__collection{                    
                    grid-template-columns:1fr 1fr 1fr;
                    grid-auto-columns:1fr;                    
                }
                .movies__title{
                    font-size:var(--font-size-xl);

                }
            }

            @media (min-width: 658px){
                :host{
                    display:block;
                    padding-block:var(--space-block-md);
                    display:flex;
                    flex-direction:row;
                    align-items:center;
                    justify-content:space-around;
                    background:var(--black);
                    border-radius:1rem 1rem 0 0;
                    padding-bottom:2rem;
                    padding-top:1rem;
                }

                .movies__list{
                    max-width:50%;
                }

                .movies__title{
                    font-size:var(--font-size-lg);
                }

                .movies__collection{
                    grid-template-columns:1fr 1fr;
                    grid-auto-columns:1fr;
                }
            }
        `;

    }

    get #htmlTemplate(){
        return /* html */`
            <style>
                ${AppMoviesComponent.#cssTemplateStyles}
            </style>            
            <article class="movies__creator">
                <picture class="movies__preview">
                    <img src="app/assets/add-image.svg" alt="image preview" class="movies__img movies__img--preview movies__img--icon">
                </picture>
                <form class="movies__form">
                    <label for="poster" class="movies__label movies__label--file">
                        <input type="file" name="poster" id="poster" class="movies__input movies__input--file">
                    </label>
                    <label class="movies__label movies__label--description" for="title">
                        <input type="text" name="title" id="title" class="movies__input" placeholder="Titulo">
                    </label>
                    <button type="submit" class="movies__btn movies__btn--submit">✔</button>
                </form>
            </article>

            <article class="movies__list">
                <h3 class="movies__title">🍿🍿 Peliculas 🍿🍿📽️</h3>
                <div class="movies__collection">
                    <p class="movies__poster">
                        <img src="app/assets/movie_preview.jpg" alt="movie poster" class="movies__img movies__img--poster">
                        <strong class="movies__description">
                            Intensamente 2
                        </strong>
                    </p>
                </div>
            </article>
        `;
    }

}
customElements.define('app-movies',AppMoviesComponent)