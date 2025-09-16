const body = document.querySelector('body');
const introPage = document.getElementById('intro');
const introContinueBtn = document.getElementById('continue-btn');
const homePage = document.getElementById('home-container');
const beginerTitle = document.getElementById('beginer-title-div');
const taskInputDiv = document.getElementById('task-input-div');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const dayTitle = document.getElementById('day-title');
const taskContainer = document.getElementById('task-container');
const taskList = document.getElementById('task-list');
let tasks = document.querySelectorAll('.task');

document.addEventListener('DOMContentLoaded', ()=>{
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length === 0) return;
    
    introPage.classList.remove('active');
    homePage.classList.add('active');
    taskInput.focus();

    for (let task of tasks) {
        addTask(task.checked, task.text, true); 
    }   
});

body.addEventListener('keydown', (event)=>{
    if (event.key === 'Enter') {
        introPage.classList.remove('active');
        homePage.classList.add('active');
        taskInput.focus();
        body.addEventListener('keydown', (event)=>{
            if (event.key === 'Enter') {
                addTask(false, '', false);
            }
        });
    }
})

introContinueBtn.addEventListener('mousedown', ()=>{
    introPage.classList.remove('active');
    homePage.classList.add('active');
    taskInput.focus();
    body.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter') {
            addTask(false, '', false);
        }
    });
}); 

addTaskBtn.addEventListener('mousedown', addTask);
function addTask(checked, taskTxt, isSaved) {
    console.log(isSaved);
    
    beginerTitle.style.display = 'none';
    taskInputDiv.classList.remove('starter');
    taskInputDiv.style.position = 'absolute';
    dayTitle.style.display = 'flex';
          
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let checkingTask of tasks) {
        if (checkingTask.text === taskInput.value) return;
    }
    let task = document.createElement('li');
    task.className = 'task';
    
    if (taskTxt === '') {
        taskTxt = taskInput.value;   
    }
    taskInput.value = '';  
    task.innerHTML = `<div class="checkbox-div">
                        <input type="checkbox" class="task-checkbox" name="check" id="">
                        <span class="checkbox">
                            <img class="checkbox" src="./img/not-active-checkbox.png" alt="">
                        </span>                          
                    </div>
                    <div class="task-txt">${taskTxt}</div>
                    <div class="icon">
                        <img src="./img/black-trash.png" alt="" class="icon">
                    </div>`;
    if (checked) {
        selectTask(task, taskTxt);
    }                
    taskList.appendChild(task);        

    if (!isSaved) {
        tasks.push({'checked' : false, 'text' : taskTxt});
        localStorage.setItem('tasks', JSON.stringify(tasks));    
    }

    task.addEventListener('mousedown', ()=>{
        selectTask(task, taskTxt);
    });
    task.firstElementChild.firstElementChild.addEventListener('mousedown', ()=>{
        selectTask(task, taskTxt);
    });
    task.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.addEventListener('mousedown', ()=>{
        selectTask(task, taskTxt);
    });
    task.firstElementChild.nextElementSibling.firstChild.addEventListener('mousedown', ()=>{
        selectTask(task, taskTxt);
    });
    let trashIcon = task.querySelector('img.icon');
    trashIcon.addEventListener('mouseover', ()=>{
        trashIcon.classList.add('red-trash');
    });
    trashIcon.addEventListener('mouseleave', ()=>{
        trashIcon.classList.remove('red-trash');
    });
    trashIcon.addEventListener('mousedown', ()=>{
        taskList.removeChild(task);
        console.log('mamad');
        
        for (let checkingTask of tasks) {
            if (checkingTask.text === taskTxt) {
                tasks.pop(checkingTask);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
        
    });   
}

function selectTask(task, txt) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    task.classList.toggle('active');
    if (task.classList.contains('active')) {
        task.firstElementChild.firstElementChild.nextElementSibling.innerHTML = `<img class="checkbox" src="./img/active-checkbox.png" alt="">`;
        for (let checkingTask of tasks) {
            if (checkingTask.text === txt) {
                checkingTask.checked = true;
            }       
        }
    } else {
        task.firstElementChild.firstElementChild.nextElementSibling.innerHTML = `<img class="checkbox" src="./img/not-active-checkbox.png" alt="">`;
        for (let checkingTask of tasks) {
            if (checkingTask.text === txt) {
                checkingTask.checked = false;
            }       
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}