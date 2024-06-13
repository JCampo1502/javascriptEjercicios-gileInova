export class AppTask01Component extends HTMLElement{    
    constructor(){        
        super();
        /* Add Events */
        document.addEventListener("form-event-dispatcher:userNumber", this.#updateUserNumber.bind(this));
        document.addEventListener("form-event-dispatcher:degrees", this.#updateDegrees.bind(this));        
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){
        document.removeEventListener("form-event-dispatcher:userNumber", this.#updateUserNumber.bind(this));
        document.removeEventListener("form-event-dispatcher:degrees", this.#updateDegrees.bind(this));
    }
 
    render(){
        // add template        
        this.innerHTML = this.#htmlTemplate;  

        /* Tables */
        const TableExercise01 = document.createElement("app-table");        
        const TableExercise02 = document.createElement("app-table");        
        const TableExercise03 = document.createElement("app-table");
        const TableExercise04 = document.createElement("app-table");

        /* Controls */
        const ControlsExercise03 = document.createElement('app-form-event-dispatcher');
        const ControlsExercise04 = document.createElement('app-form-event-dispatcher');
        
        /* Set Atributes */
        ControlsExercise03.setAttribute("event-name","userNumber");
        ControlsExercise04.setAttribute("event-name","degrees");

        /* Set classes */
        TableExercise01.classList.add('article__table', 'article__table--exercise01');
        TableExercise02.classList.add('article__table', 'article__table--exercise02');
        TableExercise03.classList.add('article__table', 'article__table--exercise03');
        TableExercise04.classList.add('article__table', 'article__table--exercise04');
        ControlsExercise03.classList.add('aritcle__control', 'article__control--user');
        ControlsExercise03.classList.add('aritcle__control', 'article__control--degrees');

        /* Add Content */
        TableExercise01.heads = ['#','Expresión', 'Resultados'];
        TableExercise01.rows = [
            ['a)','A > 3', this.#evaluator('A' > 3)],
            ['b)','A > C',this.#evaluator('A' > 'C')],            
            ['c)','A < C',this.#evaluator('A' < 'C')],
            ['d)','B < C',this.#evaluator('B' < 'C')],
            ['e)','B != C',this.#evaluator('B' != 'C')],
            ['f)','A == 3',this.#evaluator('A' == 3)],
            ['g)','A * B == -10',this.#evaluator('A' * 'B' == -10)],
            ['h)','A * B == -30',this.#evaluator('A' * 'B' == -30)],
            ['i)','C / B < A',this.#evaluator('C' / 'B' < 'A')],
            ['j)','C / B == -10',this.#evaluator('C' / 'B' == -10)],                       
            ['k)','C / B == -4',this.#evaluator('C' / 'B' == -4)],
            ['l)','A + B + C == 5',this.#evaluator('A' + 'B' + 'C' == 5)],
            ['m)','(A+B == 8) && (A-B == 2)',this.#evaluator(('A'+'B' == 8) && ('A'-'B' == 2))],
            ['n)','(A+B == 8) || (A-B == 6)',this.#evaluator('A'+'B' == 8) || ('A'-'B' == 6)],
            ['o)','(A > 3) && (B > 3) && (C < 3)',this.#evaluator(('A' > 3) && ('B' > 3) && ('C' < 3))],
            ['p)','(A > 3) && (B >= 3) && (C < -3)',this.#evaluator(('A' > 3) && ('B' >= 3) && ('C' < -3))]
        ];   

        TableExercise02.heads =['Centígrados','Fahrenheit'];
        TableExercise02.rows = [['30°C',`${this.#degreesConverter(30)}°F`]];

        TableExercise03.heads =['Número', 'Resultado'];
        TableExercise03.rows = [[0, 10]];

        TableExercise04.heads =['Centígrados','Fahrenheit'];
        TableExercise04.rows = [[`0°C`,`${this.#degreesConverter(0).toFixed(2)}°F`]];

        /* Add Inputs */
        ControlsExercise03.formInputs = [
            {name:"userNumber", description:"Escribe un número", value:0, type:"number"}
        ];

        ControlsExercise04.formInputs = [
            {name:"degrees", description:"Centígrados", value:0, type:"text"}
        ];                

        /* Show Elements */
        this.querySelector('.article--exercise01').append(TableExercise01);
        this.querySelector('.article--exercise02').appendChild(TableExercise02);
        this.querySelector('.article--exercise03').append(ControlsExercise03,TableExercise03);
        this.querySelector('.article--exercise04').append(ControlsExercise04,TableExercise04);

    }
    
    #updateUserNumber(e){        
        const Element = this.querySelector('.article__table--exercise03');        

        let value = e.detail.value;
        if(value < 0 || !value || Number.isNaN(value))value = 0;
        value = parseFloat(value);

        Element.rows = [[value,value + 10]];        
        Element.render();
    }

    #updateDegrees(e){        
        const Element = this.querySelector('.article__table--exercise04');        
        
        let value = e.detail.value;
        if(value < 0 || !value || Number.isNaN(value))value = 0;
        value = parseFloat(value);

        Element.rows = [[
            `${Math.ceil(value).toFixed(2)}C°`,
            `${this.#degreesConverter(Math.ceil(value)).toFixed(2)}F°`
        ]];
        Element.render();
    }

    #evaluator(exp){
        return exp?"verdadera":"falso";
    }

    #degreesConverter(c){        
        return (c*1.8) + 32;
    }

    get #htmlTemplate(){        
        return /* html */ `
        <section class="section">
            <h2 slot="section__title">
                Tarea #1 - Ejercicios Para Practicar
            </h2>
            <p slot="section__description">
                En este ejercicio, se evaluarán expresiones lógicas e imprimirán los resultados. Luego, se creará un programa para convertir 30 grados centígrados a Fahrenheit, mostrando el resultado en una alerta. Además, se pedirá un número al usuario, se le sumarán 10 y se imprimirá el resultado en la consola. Finalmente, se hará la conversión de grados centígrados a Fahrenheit con un valor ingresado por el usuario y se mostrará en una alerta.
            </p>

            <article class="article article--exercise01">
                <h3 class="article__h3">Ejercicio #1 - Operadores Lógicos</h3>
                <p class="article__p">
                    Indicar si cada una de las expresiones es verdadera o falsa
                </p>
            </article>

            <article class="article article--exercise02">
                <h3 class="article__h3">
                    Ejercicio #2 - Convertir 30 grados centígrados a grados Fahrenheit
                </h3>
                <p class="article__p">
                    Hacer un programa que convierta los grados centígrados (30 grados) a grados Fahrenheit, la fórmula es la siguiente: (C*1.8) +32. Imprimir los resultados en una alerta.
                </p>
            </article>

            <article class="article article--exercise03">
                <h3 class="article__h3">Ejercicio #3 - Incrementar en 10 </h3>
                <p class="article__p">
                    Pedir un número al usuario y escribirlo/imprimirlo sumándole 10. Imprimir los resultados por consola
                </p>
                <app-form-event-dispatcher eventName="userControls"></app-form-event-dispatcher>
            </article>

            <article class="article article--exercise04">
                <h3 class="article__h3">
                    Ejercicio #4 - Conversor de grados centígrados a Fahrenheit
                </h3>
                <p class="article__p">
                    Realizar el mismo programa del Ejercicio #2, pero ahora se debe pedir el dato inicial (grados centígrados) al usuario (teclear el dato).
                </p>            
            </article>
        </section>
        `;
    }
}
customElements.define("app-task-01",AppTask01Component);