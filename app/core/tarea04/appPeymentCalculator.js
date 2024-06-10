export class AppPeymentCalculator extends HTMLElement{
    #state;

    static get observedAttributes() {
        return ['peyment', 'hours'];
    }

    static get title(){
        return "Tarea #4 - Estacionamiento"
    }

    static get description(){
        return "Un estacionamiento requiere determinar el cobro que debe aplicar a las personas que lo utilizan. Considere que el cobro es con base en las horas que lo disponen y que las fracciones de hora se toman como completas. Realizar el algoritmo que permita determinar el cobro.";
    }

    constructor(){
        super();
        this.attachShadow({mode:"open"});
        this.#state = {
            payment: parseFloat(this.getAttribute("payment"))??0,
            hours: Math.ceil(this.getAttribute("hours"))??0
        };
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(oldVal == newVal)return;
        if(!newVal) return;        
        let obj = new Object();
        obj[name] = parseFloat(newVal) ?? 0;
        this.#updateState(obj);
    }    
        
    render(){
        this.shadowRoot.innerHTML = this.#htmlTemplate;  
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    get #htmlTemplate(){
        return /* html */`
        <article>
            <slot name="peymentCalculatorControls"></slot>
            <table>
                <thead>
                    <tr>
                        <th>Valor Hora</th>
                        <th>Horas de uso</th>
                        <th>Cobro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${this.#state.payment}</td>
                        <td>${this.#state.hours}</td>
                        <td>${
                            this.#state.hours * this.#state.payment }
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>
        `;
    }
}

customElements.define("app-payment-calculator",AppPeymentCalculator);