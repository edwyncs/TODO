import './styles.css';

import { Todo, TodoList } from './classes';
// import { TodoList } from './classes/todo-list.class';
// import { Todo } from './classes/todo.class';
import { crearTodoHtml, numPendientes } from './js/componentes';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender JS');
// const tarea2 = new Todo('Comaprar unicornio');

// todoList.nuevoTodo( tarea );
// todoList.nuevoTodo( tarea2 );

// tarea.completado = true;

// console.log(todoList);

// crearTodoHtml(tarea);
// crearTodoHtml(tarea2);

// for (const todo of todoList.todos) {
//     crearTodoHtml(todo)
// }

todoList.todos.forEach(crearTodoHtml);
numPendientes();