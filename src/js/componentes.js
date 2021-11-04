import { todoList } from "..";
import { Todo, TodoList } from "../classes";

//Referencias HTML
const listaTodoHtml = document.querySelector('.todo-list');
const txtImput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const listaFiltros = document.querySelector('.filters')
const ancordFiltro = document.querySelectorAll('.filtro')
const contNumPendientes = document.querySelector('.todo-count'); 

export const crearTodoHtml = (todo) =>{
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Rule the web">
	</li>`;

    listaTodoHtml.innerHTML += htmlTodo;

    return htmlTodo;
}
//metodo que inserta el numero de pendientes en el span
export const numPendientes = () => {
    contNumPendientes.innerHTML = `<strong>${todoList.numPendientes()}</strong> pendiente(s)`;
}

//EVENTOS
//inserta un nuevo todo en la "BD" y lo muestra en el html al presionar "enter" 
txtImput.addEventListener("keyup", (e) => {
    if(e.keyCode === 13 && txtImput.value.length !== ''){
        const todo = new Todo(txtImput.value);
        todoList.nuevoTodo(todo);
        crearTodoHtml(todo);
        txtImput.value='';
        numPendientes();
    }
    e.preventDefault();
    
});

//Cambia los valores a completado o pendiente en la "BD" y en el html
listaTodoHtml.addEventListener("click",(e) =>{
    //log para saber en que elemento se hace click
    // console.log(e.target.localName);
    const elemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(elemento === 'input'){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')
    } else if(elemento === 'button'){
        todoList.eliminarTodo(todoId);
        listaTodoHtml.removeChild(todoElemento);
    }
    numPendientes();
});

//Borra todos los completados 
btnBorrar.addEventListener("click", () => {
    const completados = document.querySelectorAll('.completed');
    todoList.eliminarCompletados();
    for (const todo of completados) {
        todo.remove();
    }
});

//Aplica filtros para ver las tareas pendientes o completadas en el HTML
listaFiltros.addEventListener("click", (e) =>{
    console.log(e.target.text);
    const filtro = e.target.text;
    if(!filtro){ return; }

    ancordFiltro.forEach( elem => elem.classList.remove('selected'))
    e.target.classList.add('selected');

    for( const elemento of listaTodoHtml.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        
            default:
                break;
        }
    }
})