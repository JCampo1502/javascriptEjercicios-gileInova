export class AppCalculatorComponent extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode:'open'});
        
        this.shadowRoot.querySelectorAll('.calculator__btn')?.forEach(element => {
            element.removeEventListener('click', this.#addOperation.bind(this));
        })
    }

    connectedCallback(){
        this.render();
        
        this.shadowRoot.querySelectorAll('.calculator__btn')?.forEach(element => {
            element.addEventListener('click', this.#addOperation.bind(this,element.dataset.value));
        })
    }

    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;
    }

    #addOperation(value){
        const Screen = this.shadowRoot.querySelector('.calculator__screen');
        let text = Screen.textContent;
        if(value == 'remove'){
            text = text.slice(0, text.length-1);
        }else if(value == 'clean'){
            text = '';
        }else if(value == 'equal'){
            text = eval(text);
        }else{
            text+=value;
        }


        Screen.textContent=text;
    }

    static get #cssTemplateStyles(){
        return /* css */`
            *{
                box-sizing:border-box;
                font-size:var(--font-size-lg);
                font-weight:bold;
                font-family:'Now', var(--font-family);
                color:var(--white);
                
            }

            :host{
                display:block;                
            }

            .calculator{                
                display:flex;
                flex-direction:column;
                width:100%;
                background:var(--black);
                border-radius:var(--border-radius);
                max-width:280px;
                margin-inline:auto;
            }

            .calculator__controls{
                width:100%;
                display:grid;
                grid-template-columns:1fr 1fr 1fr;
                grid-template-rows:1fr 1fr 1fr 1fr;
                padding:0;
                margin:0;
                list-style:none;       
                grid-gap:10px;
                padding-inline:var(--space-inline-sm);
                margin-block:calc(var(--space-block-md) * 2);
            }
            .calculator__controls--operations{
                grid-template-columns:1fr 1fr 1fr;
                grid-template-rows:1fr 1fr;
            }

            .calculator__controls--operations .calculator__btn{
                border:.2rem solid var(--blue);
                background: #0096be18;

            }

            .calculator__controls--operations .calculator__btn:hover{
                border:.2rem solid var(--white);
            }

            .calculator__controls--operations .calculator__btn:hover .calculator__action{                
                text-decoration:none;
            }

            .calculator__btn{
                display:flex;
                align-items:center;
                justify-content:center;
                height:5rem;
                width:5rem;
                border:.2rem solid var(--white);
                background: #ffffff18;
                transition: background .2s ease-in-out
            }

            .calculator__btn:hover{
                background: #ffffffef;
                
            }

            .calculator__btn:hover .calculator__action{
                color: #000;
                text-decoration:underline;
            }

            .calculator__btn--last{
                grid-column-start:1;
                grid-column-end:-2;
                width:auto;
            }

            .calculator__action{
                text-decoration:none;
            }

            

            .calculator__screen{
                height:5rem;
                background:#ffffff;
                margin-inline:var(--space-inline-md);
                color:var(--black);
                max-width:280px;
                padding:.5rem;
                overflow-y:auto;
                overflow-wrap: break-word;
            }

            .calculator__screen::-webkit-scrollbar{
                width:6px;                
            }

            .calculator__screen::-webkit-scrollbar-thumb{
                background:#ccc;
                border-radius: var(--border-radius)
            }

            @media (min-width: 600px){
                
                .calculator{
                    display:flex;
                    flex-direction:row-reverse;
                    width:100%;
                    background:var(--black);
                    border-radius:var(--border-radius);
                    max-width:590px;
                    align-items:start;
                }
            }
        `;
    }

    get #htmlTemplate(){
        return /* html */`
            <style>
                ${AppCalculatorComponent.#cssTemplateStyles}
            </style>
            <div class="calculator">
                <div class="">
                    <h3 class="calculator__screen"></h3>
                    <ul class="calculator__controls calculator__controls--operations">
                        <li class="calculator__btn" data-value="+">
                            <a href="#" class="calculator__action calculator__action--operation">
                                +
                            </a>
                        </li>
                        <li class="calculator__btn" data-value="-">
                            <a href="#" class="calculator__action calculator__action--operation">
                                -
                            </a>
                        </li>
                        <li class="calculator__btn" data-value="*">
                            <a href="#" class="calculator__action calculator__action--operation">
                                *
                            </a>
                        </li>
                        <li class="calculator__btn" data-value="/">
                            <a href="#" class="calculator__action calculator__action--operation">
                                /
                            </a>
                        </li>
                        <li class="calculator__btn" data-value="remove">
                            <a href="#" class="calculator__action calculator__action--operation">
                                ⌫
                            </a>
                        </li>                   
                        <li class="calculator__btn" data-value="clean">
                            <a href="#" class="calculator__action calculator__action--operation">
                                ❌
                            </a>
                        </li>
                    </ul>
                </div>
                <ul class="calculator__controls">
                    <li class="calculator__btn" data-value="1">
                        <a href="#" class="calculator__action">
                            1
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="2">
                        <a href="#" class="calculator__action">
                            2
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="3">
                        <a href="#" class="calculator__action">
                            3
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="4">
                        <a href="#" class="calculator__action">
                            4
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="5">
                        <a href="#" class="calculator__action">
                            5
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="6">
                        <a href="#" class="calculator__action">
                            6
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="7">
                        <a href="#" class="calculator__action">
                            7
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="8">
                        <a href="#" class="calculator__action">
                            8
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="9">
                        <a href="#" class="calculator__action">
                            9
                        </a>
                    </li>
                    <li class="calculator__btn calculator__btn--last" data-value="0">
                        <a href="#" class="calculator__action ">
                            0
                        </a>
                    </li>
                    <li class="calculator__btn" data-value="equal" >
                        <a href="#" class="calculator__action calculator__action--operation">
                            =
                        </a>
                    </li>                     
                </ul>
                
            </div>
        `;
    }

}
customElements.define('app-calculator',AppCalculatorComponent)