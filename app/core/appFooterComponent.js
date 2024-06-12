export class AppFooterComponent extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.render()                
    }

    disconnectedCallback(){

    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
    }

    #changeSection(){

    }

    static get #cssTemplateStyles(){
        return /* css */`
            :host{
                display:block;
                background:var(--blue-dark);
                color:var(--white);
                font-family:'Now', var(--font-family);
                font-size:calc(.5rem + .2vw);
                z-index: var(--zindex-fixed);   
                position:relative
            }

            .footer__section{
                display:flex;
                flex-wrap:wrap;
                justify-content:center;
                
            }
            .footer__copyright{
                order:1;
                width:100%;
                text-align:center;
            }            

            .footer__icon{
                filter:invert(100%) sepia(0%) saturate(0%) hue-rotate(345deg) brightness(102%) contrast(103%);
                width:13.5px;
                height:12.5px;
            }

            .footer__list{
                list-style:none;
                padding:0;
            }

            

            @media (min-width: 992px){


                .footer__section{
                    padding-block:var(--space-block-md);
                    padding-inline:var(--space-inline-md);                    
                    padding-left:3rem;
                    padding-top:1rem;                              
                }
                
                .footer__section{
                    display:grid;
                    grid-template-columns:1fr 1fr 1fr;
                    grid-template-rows:1fr auto;                    
                }

                .footer__copyright{
                    grid-column:1 / -1;
                    grid-row:2 / -1;
                    font-size:var(--font-size-sm);
                    margin:1.15rem;
                }

                .footer__category{
                    font-size:var(--font-size-md);
                    padding-left:0;
                    margin:0;
                    text-align:start;
                    padding-block:var(--space-block-md);
                    padding-inline:var(--space-inline-md);
                }

                .footer__list{
                    padding-block:0;
                    margin:0;
                    padding-inline:var(--space-block-sm);
                }

                .footer__item{
                    margin-top:.4rem;
                }
                
                .footer__link{
                    text-decoration:none;
                    font-size:var(--font-size-sm);
                    color:var(--white);
                    padding-block:var(--space-block-md);
                    padding-inline:var(--space-inline-md);                    
                    transition: background .2s ease-in;                    
                }

                .footer__link:hover{
                    background:var(--font-color-link);
                    text-decoration: underline;
                }

                .footer__em{
                    color:var(--font-color-link);
                    font-style: normal;
                    
                }
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>${AppFooterComponent.#cssTemplateStyles}</style>
            <section class="footer__section">
                <h5 class="footer__copyright">
                    Copyright © 2024 <em class="footer__em">Campus Virtual Academy Pruebas.</em> Realizado por <em class="footer__em">JCampo1502</em>.
                </h5>
                <article class="footer__article">
                    <h6 class="footer__category">
                        Docs
                    </h6>
                    <ul class="footer__list">
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Explorer Course
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Prework
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Javascript
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                HTML - CSS
                            </a>
                        </li>
                    </ul>
                </article>
                <article class="footer__article">
                    <h6 class="footer__category">
                        Community
                    </h6>
                    <ul class="footer__list">
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Facebook 
                                <img src="app/assets/share.svg" alt="shared icon" class="footer__icon">
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Instagram
                                <img src="app/assets/share.svg" alt="shared icon" class="footer__icon">
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Twitter
                                <img src="app/assets/share.svg" alt="shared icon" class="footer__icon">
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Linkedin
                                <img src="app/assets/share.svg" alt="shared icon" class="footer__icon">
                            </a>
                        </li>
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                Youtube
                                <img src="app/assets/share.svg" alt="shared icon" class="footer__icon">
                            </a>
                        </li>
                    </ul>
                </article>
                <article class="footer__article">
                    <h6 class="footer__category">More</h6>
                    <ul class="footer__list">
                        <li class="footer__item">
                            <a href="#" class="footer__link">
                                GitHub
                                <img src="app/assets/share.svg" alt="shared icon" class="footer__icon">
                            </a>
                        </li>
                    </ul>
                </article>
            </section>
            
        `;
    }

}

customElements.define("app-footer",AppFooterComponent);