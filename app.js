let taskContent = document.getElementById("input-task")
let addTaskButton = document.getElementById("add-task")
let listOfTasks = document.getElementById("list-tasks")
let noTasks = document.getElementById("no-tasks")
let elemetsOfTaskList = document.getElementsByClassName("task")
let clearbutton = document.getElementById("clear-button")

if (!localStorage.getItem("tasks"))
    localStorage.setItem("tasks", "[]")


let arrayOftasks = JSON.parse(localStorage.getItem("tasks"))

console.log(typeof arrayOftasks, arrayOftasks)



for (let i of elemetsOfTaskList) {
    arrayOftasks.push({
        done: i.childNodes[3].childNodes[1].dataset.doneIndex,
        text: String(i.childNodes[1].textContent),
    })

    localStorage.setItem("tasks", JSON.stringify(arrayOftasks))   
}

function update() {
    listOfTasks.innerHTML = ''
    for (let i = 0; i < arrayOftasks.length; i++){
        listOfTasks.insertAdjacentHTML('beforeend',
            `<div class="task" data-index="${i}">
            <p class="task-name ${arrayOftasks[i].done === "1" ? "done-task-text": ''}">${arrayOftasks[i].text}</p>
            <div class="buttons">
                <button class="done-button ${arrayOftasks[i].done === "1" ? "done-task-button": ''}">✔</button>
                <button class="delete-button">❌</button>
                <button class="edit-button">✏️</button>
            </div>
        </div>`)
    }
    
    if (!arrayOftasks.length){
        noTasks.style.display = "block"
    } else {
        noTasks.style.display = "none"
    }  
}

update()

function add_task () {
    if (taskContent.value) {
        
        arrayOftasks.push({
            done: "0",
            text: String(taskContent.value),
        })

        localStorage.setItem("tasks", JSON.stringify(arrayOftasks))
        taskContent.value = ''
        update()
    }
}

addTaskButton.onclick = add_task

listOfTasks.onclick = function (event) {

    let index = event.target.closest(".task").dataset.index

    if (event.target.className.includes("done-button")){
        arrayOftasks[index].done =  arrayOftasks[index].done === "1" ? "0": "1"
        localStorage.setItem("tasks", JSON.stringify(arrayOftasks))

    } else if (event.target.className.includes("delete-button")){
        arrayOftasks.splice(index, 1)

    } else if (event.target.className.includes("edit-button")){
        let userInput = prompt()
        arrayOftasks[index].text = userInput
        localStorage.setItem("tasks", JSON.stringify(arrayOftasks))
    }
    update()
}

document.onkeydown = function (event) {
    if (event.code === "Enter") {
        add_task()
    }
}

clearbutton.onclick = function () {
    arrayOftasks = []
    localStorage.setItem("tasks", "[]")
    update()
}