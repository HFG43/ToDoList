    const completeToDo = () => {
      const checked = document.querySelector.querySelectorAll('.checkbox');
      checked.forEach((item)) => {
      console.log('hola');
      item.addEventListener('change', this.markCompleted);
    });
  }

    const markCompleted = (event) => {
      const checkedID = event.target.id;
     if(event.target.checked === true){
        this.todoItemDescription.classList.add('completed');
        
      }
 
    }