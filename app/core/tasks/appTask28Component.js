export class AppTask28Component extends HTMLElement{
    #state = {
        name: 'Unknown', 
        lastname:'Unknown', 
        phone:'+57 000-000-0000',
        address:'Unknown',
        gender:'Unknown',
        userName:'Unknown',
        password:'123456',
        getObj(){
            return {
                name: this.toCapitalize(this.name),
                lastname: this.toCapitalize(this.lastname),
                phone: this.phone,
                address: this.address,
                gender: this.toCapitalize(this.gender),
                userName: this.userName,
                password: this.password
            }
        },

        toCapitalize(item = ''){
            item = item.split(' ').filter(x => x != '').map(x => {
                x.toLowerCase();
                let firstLetter = x[0];
                return firstLetter.toUpperCase() + x.slice(1,x.length);
            });
            return item.join(' ')
        }
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:login',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:login',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','login');

        /* Add Content */
        Table.heads = ['-','Info']
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name:'name',
                description:'Nombres',
                value:this.#storedObjects.name,
                type:'string'
            },
            {
                name:'lastname',
                description:'Apellidos',
                value:this.#storedObjects.lastname,
                type:'string'
            },
            {
                name:'phone',
                description:'Teléfono',
                value:this.#storedObjects.phone,
                type:'string'
            },
            {
                name:'address',
                description:'Dirección',
                value:this.#storedObjects.address,
                type:'string'
            },
            {
                name:'gender',
                description:'Genero',
                value:this.#storedObjects.gender,
                type:'string'
            },
            {
                name:'userName',
                description:'Usuario',
                value:this.#storedObjects.userName,
                type:'string'
            },
            {
                name:'password',
                description:'Contraseña',
                value:this.#storedObjects.password,
                type:'string'
            }
            
        ]

        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Control, Table);
    }

    #updateTable(e){
        const Obj = new Object();
        const Table = this.querySelector('.section__table');
        let value = e.detail.value;
        let name = e.detail.name;

        /* Validations */
        if(
            !Table || 
            !Object.hasOwn(this.#state, name) || 
            !value || this.#state[name] == value
        )return;

        /* Update State */
        Obj[name] = value;
        this.#updateState(Obj);
        this.#storedObjects = this.#state.getObj();
        /* Update Table */
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #storedObjects(){
        if(!localStorage.getItem('app-task-28'))this.#storedObjects = this.#state.getObj();
        const Data = localStorage.getItem('app-task-28');        
        return JSON.parse(Data);
    }

    set #storedObjects(Obj){
        localStorage.setItem('app-task-28',JSON.stringify(Obj));
    }

    get #tableContent(){
        const User = this.#storedObjects;
        return [[
            'Nombres',User.name],
            ['Apellidos',User.lastname],
            ['Teléfono',User.phone],
            ['Dirección',User.address],
            ['Genero',User.gender],
            ['Usuario',User.userName],
            ['Contraseña',User.passwor]
        ];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #3 - User Registro
                </h2>
                <p class='section__description'>
                    Realizar un formulario de registro que capture los siguientes datos del usuarios: Nombres Apellidos Teléfono Dirección Género Nombre de usuario Contraseña Usar funciones, objetos, almacenar en el local storage (setItem) y obtener la información del localstorage y mostrarla en una alerta o por consola (setItem).
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-28',AppTask28Component)