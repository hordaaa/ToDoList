let taskContent = document.getElementById("input-task")
let addTaskButton = document.getElementById("add-task")
let listOfTasks = document.getElementById("list-tasks")
let noTasks = document.getElementById("no-tasks")
let elemetsOfTaskList = document.getElementsByClassName("task")
let clearButton = document.getElementById("clear-button")

if (!localStorage.getItem("tasks")) // Инициализируем список задач в localStorage
    localStorage.setItem("tasks", "[]")

let arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))

for (let i of elemetsOfTaskList) { // Наполняем список задач если в HTML есть задачи по умолчанию, в localStorage сохраняем их
    arrayOfTasks.push({ 
        done: i.childNodes[3].childNodes[1].dataset.doneIndex, // Статус выполнения задачи
        text: String(i.childNodes[1].textContent), // Контент задачи
    })   
}

localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))  // Сохраняем список задач в localStorage

function update() { 
    // Отображение списка задач
    listOfTasks.innerHTML = ''
    for (let i = 0; i < arrayOfTasks.length; i++){
        listOfTasks.insertAdjacentHTML('beforeend',
            `<div class="task" data-index="${i}">
            <p class="task-name ${arrayOfTasks[i].done === "1" ? "done-task-text": ''}">${arrayOfTasks[i].text}</p>
            <div class="buttons">
                <button class="done-button ${arrayOfTasks[i].done === "1" ? "done-task-button": ''}">✔</button>
                <button class="delete-button">❌</button>
                <button class="edit-button">✏️</button>
            </div>
        </div>`)
    }
    
    if (!arrayOfTasks.length){ // Если нет задач, отображаем блок "нет задач"
        noTasks.style.display = "block"
        
    } else { // Скрываем блок
        noTasks.style.display = "none"
    }  
}

update()

function add_task () {
    // Если ввод не пуст, добавляем задачу в localStorage и отображаем список
    if (taskContent.value) { 
        
        arrayOfTasks.push({
            done: "0",
            text: String(taskContent.value),
        })

        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
        taskContent.value = ''
        
        update()
    }
}

addTaskButton.onclick = add_task

listOfTasks.onclick = function (event) {

    let index = event.target.closest(".task").dataset.index // Получаем индекс задачи

    if (event.target.className.includes("done-button")){ // Если нажата кнопка "задача выполнена", то меняем ее флаг и сохраняем в localStorage 
        arrayOfTasks[index].done = arrayOfTasks[index].done === "1" ? "0": "1"
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))

    } else if (event.target.className.includes("delete-button")){ // Если нажата кнопка "удалить задачу", то удаляем ее из списка
        arrayOfTasks.splice(index, 1)

    } else if (event.target.className.includes("edit-button")){ // Если нажата кнопка "изменить задачу", то отображаем prompt и заменяем им контент
        let userInput = prompt("Edit your task", arrayOfTasks[index].text)
        arrayOfTasks[index].text = userInput || arrayOfTasks[index].text
        localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
    }
    update()
}

document.onkeydown = function (event) { // Если Enter, то добавляем задачу
    if (event.code === "Enter") {
        add_task()
    }
}

clearButton.onclick = function () { // Очищаем список задач по нажатию кнопки
    arrayOfTasks = []
    localStorage.setItem("tasks", "[]")
    update()
}
