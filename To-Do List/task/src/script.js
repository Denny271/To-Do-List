let taskInput = document.getElementById('input-task');
let addInput = document.getElementById('add-task-button');
let todoWrapper = document.getElementById("task-list");

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemsElem = [];

function Task(description){
    this.description = description;
    this.completed = false;
}

addInput.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateFill();
    taskInput.value = "";
})

const addNewLine = (task, index) => {
    return`
         <li class="todo-item ${task.completed ? 'checked' : "" }">
            <input onclick="completeTask(${index})" type="checkbox" >
            <span class="task">${task.description}</span>
            <button onclick="deleteTask(${index})" class="delete-btn"></button>
         </li>`;
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateFill();
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemsElem[index].classList.add('checked');
    }else{
        todoItemsElem[index].classList.remove('checked');
    }
    updateFill();
}

const updateFill = () => {
    //update local
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //fill html
    todoWrapper.innerHTML = "";
    if(tasks.length>0){
        tasks.forEach((item, index) =>{
            todoWrapper.innerHTML += addNewLine(item, index);
        });
    }
    todoItemsElem = document.querySelectorAll('.todo-item');
}

updateFill();
//-------------------------------------------------------------------------------------------------------------------------------------------------
/*
function delete_element(valor){
    valor.parentNode.parentNode.removeChild(valor.parentNode);
}

function addNewTask() {
    let text = taskInput.value;
    let addCompleteLine = `<li><input type="checkbox" onclick="checking(this)"><span class="task">${text}</span><button onclick='delete_element(this)' class="delete-btn"></button></li>`
    document.querySelector("ul").insertAdjacentHTML('beforeend', addCompleteLine);
    text = document.getElementById('input-task').value = "";
}

function checking(that){
    if(that.checked){
        console.log("checked");
        that.parentNode.classList.toggle('checked');
    } else{
        that.parentNode.classList.toggle('checked');
        console.log("unchecked");
    }
}*/
