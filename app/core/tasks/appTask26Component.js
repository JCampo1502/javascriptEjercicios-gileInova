export class AppTask26Component extends HTMLElement{
    #state = {
        userName:'Unknown',
        userPassword:'123456'
    }

    constructor(){
        super();

        /* Add Events */
        document.addEventListener(
            'form-event-dispatcher:user',
            this.#updateTable.bind(this)
        );
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

        /* Remove Events */
        document.removeEventListener(
            'form-event-dispatcher:user',
            this.#updateTable.bind(this)
        );
    }

    render(){
        const Table = document.createElement('app-table');
        const Control = document.createElement('app-form-event-dispatcher');

        /* Set Atributtes and Classes */
        Table.classList.add('section__table');
        Control.classList.add('section__control');
        Control.setAttribute('event-name','user');

        /* Add Content */
        Table.heads = ['Usuario', 'Contraseña']
        Table.rows = this.#tableContent;
        Control.formInputs = [
            {
                name: 'userName', 
                description: 'Nombre de Usuario', 
                value:this.#getUser()?.name ?? 'Unknown', 
                type:'string'
            },
            {
                name: 'userPassword', 
                description: 'Contraseña', 
                value:this.#getUser()?.password ?? '123456', 
                type:'string'
            }
        ]

        /* Add in template  */
        this.innerHTML = this.#htmlTemplate;
        this.querySelector('.section__article').append(Control, Table);
    }

    #getUser(){
        const userInfo = localStorage.getItem('task-26-user');
        if(userInfo == null)return;
        return JSON.parse(userInfo);
    }

    #setUser(){
        const User = {
            name: this.#state.userName,
            password: this.#state.userPassword
        };

        console.log(JSON.stringify(User));
        localStorage.setItem('task-26-user',JSON.stringify(User));
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

        /* Update Table */
        
        this.#setUser();
        Table.rows = this.#tableContent;
        Table.render();
    }

    #updateState(newState){
        this.#state = {...this.#state, ...newState}
    }

    get #tableContent(){
        return [[
            this.#getUser()?.name ?? 'Unknown',
            this.#getUser()?.password ?? '123456'
        ]];
    }

    get #htmlTemplate(){
        return /* html */`
        <section class='section'>
            <article class='section__article'>
                <h2 class='section__title'>
                    Tarea #1 - User
                </h2>
                <p class='section__description'>
                    Capturar usuario y contraseña desde cajas de texto y almacenar la información en el localstorage en variables separadas.
                </p>
            </article>
        </section>
        `;
    }

}
customElements.define('app-task-26',AppTask26Component)