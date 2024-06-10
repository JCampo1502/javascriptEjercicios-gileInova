export class AppPracticalExercises extends HTMLElement{
    #state;

    static get observedAttributes() {
        return ['degrees', "user-number"];
    }

    static get title(){
        return "Tarea #1 - Ejercicios Para Practicar";
    }

    static get description(){
        return "En este ejercicio, se evaluarán expresiones lógicas e imprimirán los resultados. Luego, se creará un programa para convertir 30 grados centígrados a Fahrenheit, mostrando el resultado en una alerta. Además, se pedirá un número al usuario, se le sumarán 10 y se imprimirá el resultado en la consola. Finalmente, se hará la conversión de grados centígrados a Fahrenheit con un valor ingresado por el usuario y se mostrará en una alerta.";
    }

    constructor(){        
        super();
        this.attachShadow({mode:"open"});

        /* Get State Properties */
        let degrees = this.getAttribute("degrees");
        let userNumber = this.getAttribute("user-number");        
        if(!degrees)degrees = 0;
        if(!userNumber)userNumber = 0;

        /* Set State */
        this.#state = {
            degrees: parseFloat(degrees) ?? 0,
            userNumber: Math.ceil(userNumber)??0
        }
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) { 
        
        if(oldVal == newVal)return;        
        if(!newVal)newVal=0;
        if(name == "degrees")this.#updateState({
            degrees:parseFloat(newVal)?? 0
        });
        if(name == "user-number")this.#updateState({
            userNumber:Math.ceil(newVal)??0
        });
    }
 
    render(){
        // add template        
        this.shadowRoot.innerHTML = this.#htmlTemplate;  
    }
    
    #evaluator(exp){
        return exp?"verdadera":"falso";
    }

    #degreesConverter(c){        
        return (c*1.8) + 32;
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    get #htmlTemplate(){        
        return /* html */ `        
        <article>
            <h3>Ejercicio #1 - Operadores Lógicos</h3>
            <p>
                Indicar si cada una de las expresiones es verdadera o falsa
            </p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Expresión</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>a</td>
                        <td>A > 3</td>
                        <td>${this.#evaluator('A' > 3)}</td>
                    </tr>
                    <tr>
                        <td>b</td>
                        <td>A > C</td>
                        <td>${this.#evaluator('A' > 'C')}</td>
                    </tr>
                    <tr>
                        <td>c</td>
                        <td>A < C</td>
                        <td>${this.#evaluator('A' < 'C')}</td>
                    </tr>
                    <tr>
                        <td>d</td>
                        <td>B < C</td>
                        <td>${this.#evaluator('B' < 'C')}</td>
                    </tr>
                    <tr>
                        <td>e</td>
                        <td>B != C</td>
                        <td>${this.#evaluator('B' != 'C')}</td>
                    </tr>
                    <tr>
                        <td>f</td>
                        <td>A == 3</td>
                        <td>${this.#evaluator('A' == 3)}</td>
                    </tr>
                    <tr>
                        <td>g</td>
                        <td>A * B == -10</td>
                        <td>${this.#evaluator('A' * 'B' == -10)}</td>
                    </tr>
                    <tr>
                        <td>h</td>
                        <td>A * B == -30</td>
                        <td>${this.#evaluator('A' * 'B' == -30)}</td>
                    </tr>
                    <tr>
                        <td>i</td>
                        <td>C / B < A</td>
                        <td>${this.#evaluator('C' / 'B' < 'A')}</td>
                    </tr>
                    <tr>
                        <td>j</td>
                        <td>C / B == -10</td>
                        <td>${this.#evaluator('C' / 'B' == -10)}</td>
                    </tr>
                    <tr>
                        <td>k</td>
                        <td>C / B == -4</td>
                        <td>${this.#evaluator('C' / 'B' == -4)}</td>
                    </tr>
                    <tr>
                        <td>l</td>
                        <td>A + B + C == 5</td>
                        <td>${this.#evaluator('A' + 'B' + 'C' == 5)}</td>
                    </tr>
                    <tr>
                        <td>m</td>
                        <td>(A+B == 8) && (A-B == 2)</td>
                        <td>${this.#evaluator(('A'+'B' == 8) && ('A'-'B' == 2))}</td>
                    </tr>
                    <tr>
                        <td>n</td>
                        <td>(A+B == 8) || (A-B == 6)</td>
                        <td>${this.#evaluator('A'+'B' == 8) || ('A'-'B' == 6)}</td>
                    </tr>
                    <tr>
                        <td>o</td>
                        <td>(A > 3) && (B > 3) && (C < 3)</td>
                        <td>${this.#evaluator(('A' > 3) && ('B' > 3) && ('C' < 3))}</td>
                    </tr>
                    <tr>
                        <td>p</td>
                        <td>(A > 3) && (B >= 3) && (C < -3)</td>
                        <td>${this.#evaluator(('A' > 3) && ('B' >= 3) && ('C' < -3))}</td>
                    </tr>
                </tbody>
            </table>
        </article>
        <article>
            <h3>
            Ejercicio #2 - Convertir 30 grados centígrados a grados Fahrenheit
            </h3>

            <p>
                Hacer un programa que convierta los grados centígrados (30 grados) a grados Fahrenheit, la fórmula es la siguiente: (C*1.8) +32. Imprimir los resultados en una alerta.
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Centígrados</th>
                        <th>Fahrenheit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>30°C</td>
                        <td>${this.#degreesConverter(30)}°F</td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article>
            <h3>Ejercicio #3 - Incrementar en 10 </h3>
            <p>
                Pedir un número al usuario y escribirlo/imprimirlo sumándole 10. Imprimir los resultados por consola
            </p>
            <slot name="userControls"></slot>
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${this.#state.userNumber}</td>
                        <td>${this.#state.userNumber + 10}</td>
                    </tr>
                </tbody>
            </table>
        </article>

        <article>
            <h3>Ejercicio #4 - Conversor de grados centígrados a Fahrenheit</h3>
            <p>
                Realizar el mismo programa del Ejercicio #2, pero ahora se debe pedir el dato inicial (grados centígrados) al usuario (teclear el dato).
            </p>
            <slot name="degreesControls"></slot>
            <table>
                <thead>
                    <tr>
                        <th>Centígrados</th>
                        <th>Fahrenheit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${this.#state.degrees.toFixed(2)}°C</td>
                        <td>${
                            this.#degreesConverter(
                                this.#state.degrees
                            ).toFixed(2)
                        }°F</td>
                    </tr>
                </tbody>
            </table>
        </article>
        `;
    }
}

customElements.define("app-practical-exercoses", AppPracticalExercises );