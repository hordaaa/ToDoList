let taskContent = document.getElementById("input-task")
let addTaskButton = document.getElementById("add-task")
let listOfTasks = document.getElementById("list-tasks")
let noTasks = document.getElementById("no-tasks")
let elemetsOfTaskList = document.getElementsByClassName("task")
let clearButton = document.getElementById("clear-button")
let themeChangeButton = document.getElementById("theme-change-button")

let moonImage = 'url("./images/moon.png")'
let sunImage = 'url("./images/sun.png")'


if (!localStorage.getItem("tasks"))
    localStorage.setItem("tasks", "[]")


let arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))


// Наполняем список задач если в HTML есть задачи по умолчанию, в localStorage сохраняем их
for (let i of elemetsOfTaskList) { 
    arrayOfTasks.push({ 
        done: i.childNodes[3].childNodes[1].dataset.doneIndex, // Статус выполнения задачи
        text: String(i.childNodes[1].textContent), // Контент задачи
    })   
}

localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))

function update() { 
    // Отображение списка задач
    listOfTasks.innerHTML = ''
    for (let i = 0; i < arrayOfTasks.length; i++){
        listOfTasks.insertAdjacentHTML('beforeend',
            `<div class="task" data-index="${i}">
            <p class="task-name ${arrayOfTasks[i].done === "1" ? "done-task-text": ''}">${arrayOfTasks[i].text}</p>
            <div class="buttons">
                <button class="btn done-button ${arrayOfTasks[i].done === "1" ? "done-task-button": ''}">✔</button>
                <button class="btn delete-button">❌</button>
                <button class="btn edit-button">✏️</button>
            </div>
        </div>`)
    }
    
    // Если нет задач, отображаем блок "нет задач"
    if (!arrayOfTasks.length){ 
        noTasks.style.display = "block"
        
    } else {
        noTasks.style.display = "none"
    }  
}

update()

function addTask () {
    // Если пользовательский ввод не пуст, добавляем задачу в localStorage и отображаем список
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

addTaskButton.addEventListener("click", addTask)

listOfTasks.addEventListener("click", event => {

    let index = event.target.closest(".task").dataset.index // Получаем индекс задачи

    // Если нажата кнопка "задача выполнена", то меняем ее флаг и сохраняем в localStorage 
    if (event.target.className.includes("done-button")){ 
        arrayOfTasks[index].done = arrayOfTasks[index].done === "1" ? "0": "1"
    
    // Если нажата кнопка "удалить задачу", то удаляем ее из списка
    } else if (event.target.className.includes("delete-button")){ 
        arrayOfTasks.splice(index, 1)

    // Если нажата кнопка "изменить задачу", то отображаем prompt и заменяем им ее контент
    } else if (event.target.className.includes("edit-button")){ 
        let userInput = prompt("Edit your task", arrayOfTasks[index].text)
        arrayOfTasks[index].text = userInput || arrayOfTasks[index].text
    }

    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))

    update()
})

// Если Enter, то добавляем задачу
document.addEventListener("keydown",  event => { 
    if (event.code === "Enter") {
        addTask()
    }
})

// Очищаем список задач по нажатию кнопки
clearButton.addEventListener("click", () => { 
    arrayOfTasks = []
    localStorage.setItem("tasks", "[]")
    update()
})

themeChangeButton.style.backgroundImage = sunImage

themeChangeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-theme")

    // Меняем картинки по очереди
    if (themeChangeButton.style.backgroundImage === sunImage){
        themeChangeButton.style.backgroundImage = moonImage

    } else {
        themeChangeButton.style.backgroundImage = sunImage
    }
})


