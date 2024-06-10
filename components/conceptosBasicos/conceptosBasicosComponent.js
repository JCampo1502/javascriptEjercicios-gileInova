import {AppConceptosBasicosEjercicio01} from './AppConceptosBasicosEjercicio01Component.js';
import {AppConceptosBasicosEjercicio02} from './AppConceptosBasicosEjercicio02Component.js';
import {AppConceptosBasicosEjercicio03} from './AppConceptosBasicosEjercicio03Component.js';
import {AppConceptosBasicosEjercicio04} from './AppConceptosBasicosEjercicio04Component.js';

const template = document.createElement("template");
template.innerHTML = /* html */`
    <h1>👨‍💻 Conceptos Basicos</h1>
    <app-conceptos-basicos-ejercicio01></app-conceptos-basicos-ejercicio01>
    <app-conceptos-basicos-ejercicio02></app-conceptos-basicos-ejercicio02>
    <app-conceptos-basicos-ejercicio03></app-conceptos-basicos-ejercicio03>
    <app-conceptos-basicos-ejercicio04></app-conceptos-basicos-ejercicio04>
`;


class AppConceptosBasicos extends HTMLElement{
    connectedCallback(){
        const html = template.content.cloneNode(true);
        this.append(html);
    }
}


customElements.define("app-conceptos-basicos", AppConceptosBasicos);

export {AppConceptosBasicos};