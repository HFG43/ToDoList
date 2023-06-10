import reLoad from './reload.svg';
import introIcon from './EnterIcon.svg';
import Trash from './TrashBasket.svg';
import data from './data.js';
import './style.css';

class TodoList {
  constructor() {
    this.todoList = document.getElementById('todo_list');
    this.todoDescription = document.getElementById('description');
    this.clearAllButton = document.getElementById('clear_all');
    this.todos = [...data];
  }

    displayItems = () => {
      for (let i = 0; i < this.todos.length; i += 1) {
        this.todos[i].index = i + 1;
        const todo = this.todos[i];
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo_item');

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.classList.add('checkbox');
        check.id = this.todos[i].index;
        todoItem.appendChild(check);

        const todoItemDescription = document.createElement('span');
        todoItemDescription.classList.add('description');
        todoItemDescription.textContent = `${todo.description}`;
        todoItem.appendChild(todoItemDescription);

        const trashIcon = document.createElement('img');
        trashIcon.src = Trash;
        trashIcon.classList.add('trash');
        trashIcon.id = this.todos[i].index;
        todoItem.appendChild(trashIcon);

        this.todoList.appendChild(todoItem);
      }
      const intro = document.querySelector('.enter_icon');
      intro.src = introIcon;
      const reload = document.querySelector('.reload');
      reload.src = reLoad;
    }

    clearList = () => {
      this.todoList.innerHTML = '';
    }
}
const todoList = new TodoList();
todoList.displayItems();