import _ from 'lodash';
import TodoItems from './todoItems.js';
import reLoad from './reload.svg';
import introIcon from './EnterIcon.svg';
import Trash from './TrashBasket.svg';
import './style.css';

class TodoList {
    constructor(){
       this.todoList = document.getElementById('todo_list');
       this.todoDescription = document.getElementById('description');
       this.clearAllButton = document.getElementById('clear_all');
       this.todos = JSON.parse(localStorage.getItem('todo')) || [];
       this.todoDescription.addEventListener('keydown',(event) => {
        if(event.code === "Enter" || event.code === "NumpadEnter") {
          this.addItem(event)    
        }
        });
        if(localStorage){
          this.displayItems();
          }
         this.displayItems();
     }

    addItem = (event) => {
      const description = this.todoDescription.value;
      let index = this.todos.length + 1;
      let completed = false;

      const todo = new TodoItems(description, index, completed);
     
      this.todos = [...this.todos, todo];
    
      localStorage.setItem('todo', JSON.stringify(this.todos));
      
      this.displayItems();
      this.todoDescription.value = '';
    }

    displayItems = () => {
        this.clearList();
          for(let i = 0; i < this.todos.length; i++){
          const todo = this.todos[i];
          const todoItem = document.createElement('li');
          todoItem.classList.add('todo_item');

          const check = document.createElement('input');
          check.type = 'checkbox';
          check.classList.add('checkbox');
          todoItem.appendChild(check);
                
          const todoItemDescription = document.createElement('span');
          todoItemDescription.classList.add('description');
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
            editDescription.type = "text";
            editDescription.classList.add('description');
            todoItemDescription.replaceWith(editDescription);
          });

          let timeout;

          editDescription.addEventListener('focusout', () => {
            // clearTimeout(timeout)
            // timeout = setTimeout(() => {
              const editedDescription = editDescription.value;
              this.todos[i].description = editedDescription;
              localStorage.setItem('todo', JSON.stringify(this.todos));

            // clearTimeout(timeout)
        //   },6000)
          this.displayItems();
        });
      }
      this.removeSelectItem();
      const intro = document.querySelector('.enter_icon');
      intro.src = introIcon;
      const reload = document.querySelector('.reload');
      reload.src = reLoad;
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
        for(let i = 0; i < this.todos.length; i++){
            this.todos[i].index = i + 1;
        }
        localStorage.setItem('todo', JSON.stringify(this.todos));
        this.displayItems();
      }
    

}
const todoList = new TodoList();
