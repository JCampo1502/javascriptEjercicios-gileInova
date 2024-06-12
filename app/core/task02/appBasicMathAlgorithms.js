export class AppBasicMathAlgorithms extends HTMLElement{
    #state;
    
    static get observedAttributes() {
        return ['num1',"num2"];
    }

    static get title(){
        return "Tarea 2 - Algoritmo para las operaciones: +, -, *, /"
    }

    static get description(){
        return "Realizar un algoritmo en JavaScript que permita calcular la suma, resta, multiplicación y división de dos números, donde num1 = 5 y num2 = 7. Mostrar los resultados por consola.";
    }

    
    constructor(){
        super();
        this.attachShadow({mode:"open"});

        /* get properties */
        let num1 = this.getAttribute("num1");
        let num2 = this.getAttribute("num2");
        if(!num1)num1 = 5;
        if(!num2)num2 = 7;

        /* set state */
        this.#state = {
            num1: parseInt(num1) ?? 0,
            num2: parseInt(num2) ?? 0
        }
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal == newVal)return;
        if(!newVal)newVal=0;
        
        if(name == "num1" || name == "num2"){ 
            let obj = new Object();
            obj[name]=parseFloat(newVal);
            this.#updateState(obj);
        }
    }
    
    render(){        
        this.shadowRoot.innerHTML = this.#htmlTemplate;    
        console.clear();  
        console.table({
            "+":{
                operation:"suma",
                result:this.#state.num1 + this.#state.num2
            },
            "-":{
                operation:"resta",
                result:this.#state.num1 - this.#state.num2
            },
            "*":{
                operation:"multiplicación",
                result:this.#state.num1 * this.#state.num2
            },
            "/":{
                operation:"divición",
                result:(this.#state.num2 != 0)
                    ?(this.#state.num1 / this.#state.num2).toFixed(2)
                    :"no es posible realizar la operacion"
            }
        });              
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState };        
        this.render();
    }

    get #htmlTemplate(){           
        return /* html */`
        <article>
            <slot name="controls"></slot>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Operación</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>+</td>
                        <td>Suma</td>
                        <td>${this.#state.num1 + this.#state.num2}</td>
                    </tr>
                    <tr>
                        <td>-</td>
                        <td>Resta</td>
                        <td>${this.#state.num1 - this.#state.num2}</td>
                    </tr>
                    <tr>
                        <td>*</td>
                        <td>Multiplicación</td>
                        <td>${this.#state.num1 * this.#state.num2}</td>
                    </tr>
                    <tr>
                        <td>/</td>
                        <td>Divición</td>
                        <td>${
                            (this.#state.num2 != 0)
                            ? (this.#state.num1 / this.#state.num2).toFixed(2)
                            : "No es pocible realizar la divición"
                        }</td>
                    </tr>
                </tbody>
            </table>
        </article>
        `;
    }
}

customElements.define("app-basic-math-algorithms",AppBasicMathAlgorithms);