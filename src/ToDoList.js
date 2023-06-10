import TodoItems from './todoItems.js';
import reLoad from './Icons/reload.svg';
import introIcon from './Icons/EnterIcon.svg';
import Trash from './Icons/TrashBasket.svg';

export default class TodoList {
  constructor() {
    this.todoList = document.getElementById('todo_list');
    this.todoDescription = document.getElementById('description');
    this.clearAllButton = document.getElementById('clear_all_button');
    this.reloadButton = document.getElementById('reload');
    this.todos = JSON.parse(localStorage.getItem('todo')) || [];
    this.todoDescription.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        this.addItem(event);
      }
    });
    if (localStorage) {
      this.displayItems();
    }
    this.removeAll();
    this.reload();
  }

    addItem = () => {
      const description = this.todoDescription.value;
      const index = this.todos.length + 1;
      const completed = false;

      const todo = new TodoItems(description, index, completed);

      this.todos = [...this.todos, todo];

      localStorage.setItem('todo', JSON.stringify(this.todos));

      this.displayItems();
      this.todoDescription.value = '';
    }

    displayItems = () => {
      this.clearList();
      for (let i = 0; i < this.todos.length; i += 1) {
        const todo = this.todos[i];
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo_item');

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.id = this.todos[i].index;
        check.classList.add('checkbox');
        if (todo.completed === true) {
          check.checked = true;
        }
        todoItem.appendChild(check);

        const todoItemDescription = document.createElement('span');
        todoItemDescription.classList.add('description');
        if (todo.completed === true) {
          todoItemDescription.classList.add('completed');
        }
        todoItemDescription.textContent = `${todo.description}`;
        todoItem.appendChild(todoItemDescription);

        const trashIcon = document.createElement('img');
        trashIcon.src = Trash;
        trashIcon.classList.add('trash');
        todoItem.appendChild(trashIcon);
        trashIcon.id = this.todos[i].index;

        this.todoList.appendChild(todoItem);

        const editDescription = document.createElement('input');
        todoItemDescription.addEventListener('click', () => {
          editDescription.type = 'text';
          editDescription.value = todoItemDescription.textContent;
          editDescription.classList.add('description');
          todoItemDescription.replaceWith(editDescription);
        });

        editDescription.addEventListener('focusout', () => {
          if (editDescription.value === '') {
            this.displayItems();
          } else {
            const editedDescription = editDescription.value;
            this.todos[i].description = editedDescription;
            localStorage.setItem('todo', JSON.stringify(this.todos));
            this.displayItems();
          }
        });
      }
      this.removeSelectItem();
      const intro = document.querySelector('.enter_icon');
      intro.src = introIcon;
      const reload = document.querySelector('.reload');
      reload.src = reLoad;
      this.completeToDo();
    }

    clearList = () => {
      this.todoList.innerHTML = '';
    }

    removeSelectItem = () => {
      const removeItems = document.querySelectorAll('.trash');
      removeItems.forEach((trash) => {
        trash.addEventListener('click', this.removeItem);
      });
    }

    removeItem = (event) => {
      const itemPosition = Number(event.target.id);
      const toRemoveItem = this.todos.filter((task) => task.index !== itemPosition);
      this.todos = [...toRemoveItem];
      for (let i = 0; i < this.todos.length; i += 1) {
        this.todos[i].index = i + 1;
      }
      localStorage.setItem('todo', JSON.stringify(this.todos));
      this.displayItems();
    }

    reload = () => {
      this.reloadButton.addEventListener('click', () => {
        this.clearList();
        this.displayItems();
      });
    }

    removeAll = () => {
      this.clearAllButton.addEventListener('click', () => {
        const arrFiltered = this.todos.filter((e) => e.completed !== true);
        this.todos = [...arrFiltered];
        localStorage.setItem('todo', JSON.stringify(this.todos));
        this.displayItems();
      });
    }

    completeToDo = () => {
      const checked = document.querySelectorAll('.checkbox');
      checked.forEach((item) => {
        item.addEventListener('change', (event) => {
          const checkedID = Number(event.target.id);
          const parentLi = event.target.parentElement;
          const descSpan = parentLi.querySelector('.description');
          descSpan.classList.toggle('completed');
          this.todos[checkedID - 1].completed = event.target.checked;
          localStorage.setItem('todo', JSON.stringify(this.todos));
        });
      });
    };
}