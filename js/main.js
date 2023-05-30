setInterval(() => {
    console.log("Czyszczenie listy done");
    doneItems = []
    sendDoneData(doneItems);
    showDoneList();
},30000);

let todoItems = [];
let doneItems = [];
var todoItemId = 0;
var doneItemId = 0;

window.addEventListener("load", () => {
    getTodoData();
    getDoneData();
    getSugestions();
});


function showTodoList(){
    todoItemId = 0;
    clearTodoList();
    for (var i = 0; i<todoItems.length; i++) {
        showTodoItem(todoItems[i]);
        todoItemId++;
    }
}

function showTodoItem(item){
        let element = document.createElement('div');
        let deleteButton = document.createElement('button')
        let doneButton = document.createElement('button')
        let task = document.createElement('p')
        let x = todoItemId
        
        element.className = "taskTodo"

        deleteButton.textContent = "Usuń";
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(x);
        })

        doneButton.textContent = "->";
        doneButton.addEventListener('click', () => {
            sendItemToDone(x);
        })

        task.textContent = item

        element.appendChild(deleteButton);
        element.appendChild(doneButton);
        element.appendChild(task);

        document.getElementById("todo").appendChild(element)
}

function sendItemToDone(id){
    doneItems.push(todoItems[id]);
    deleteTodoItem(id);
    showDoneList();
    showTodoList();
    sendDoneData(doneItems);
}

function clearTodoList(){
    const elements = document.getElementsByClassName("taskTodo");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addTodoItem(){
    let item = document.getElementById("inputTask").value;
    if(item == ""){
        alert("Wpisz zadanie");
    }else{
        todoItems.push(item);
        showTodoList();
        sendTodoData(todoItems);
    }
    document.getElementById("inputTask").value = "";
    removeItems();
    addSugestion(item);
}

function deleteTodoItem(id){
    temp = [];
    for(let i=0; i<todoItems.length; i++){
        if(i != id){
            temp.push(todoItems[i]);
        }
    }
    todoItems = temp;
    showTodoList();
    sendTodoData(todoItems);
}

function getTodoData(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4){
            return;
        }

        if (xhr.status === 200 || xhr.status === 400){
            todoItems=[];
            const data = xhr.responseXML;
            const xmlRoot = data.querySelector("Data");
            xmlData = [...xmlRoot.children].map(element => {
                return element.textContent;
            });
            for (let i = 0; i<xmlData.length; i++){
                todoItems.push(xmlData[i])
            }
            showTodoList();
        }
    };
        
    xhr.open("GET", "./php/todo.php", true);
    xhr.setRequestHeader("Content-Type", " application/xml");
    xhr.send();
}

function sendTodoData(items){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
    };

    const data = 
        `<?xml version='1.0'?>
            <Data>
            ${items.map(a => {
                return `<element>${a}</element>`
            })}
            </Data>`

    xhr.open("POST", "./php/todo.php");
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(data);
    
}

//DOne

function showDoneList(){
    doneItemId = 0;
    clearDoneList();
    for (var i = 0; i<doneItems.length; i++) {
        showDoneItem(doneItems[i]);
        doneItemId++;
    }
}

function clearDoneList(){
    const elements = document.getElementsByClassName("taskDone");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function showDoneItem(item){
    let element = document.createElement('div');
    let deleteButton = document.createElement('button')
    let todoButton = document.createElement('button')
    let task = document.createElement('p')
    let x = doneItemId
    
    element.className = "taskDone"

    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener('click', () => {
        deleteDoneItem(x);
    })

    todoButton.textContent = "<-";
    todoButton.addEventListener('click', () => {
        sendItemToTodo(x)
    })

    task.textContent = item

    element.appendChild(deleteButton);
    element.appendChild(todoButton);
    element.appendChild(task);

    document.getElementById("done").appendChild(element)
}

function sendItemToTodo(id){
    todoItems.push(doneItems[id]);
    deleteDoneItem(id);
    showDoneList();
    showTodoList();
    sendTodoData(todoItems);
}

function getDoneData(){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4){
            return;
        }
        if (xhr.status === 200 || xhr.status === 400){
            doneItems=[];
            const data = xhr.responseXML;
            const xmlRoot = data.querySelector("Data");
            xmlData = [...xmlRoot.children].map(element => {
                return element.textContent;
            });
            for (let i = 0; i<xmlData.length; i++){
                doneItems.push(xmlData[i])
            }
        }
        showDoneList();
    };
        
    xhr.open("GET", "./php/done.php", true);
    xhr.setRequestHeader("Content-Type", " application/xml");
    xhr.send();
}

function sendDoneData(items){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
    };

    const data = 
        `<?xml version='1.0'?>
            <Data>
            ${items.map(a => {
                return `<element>${a}</element>`
            })}
            </Data>`

    xhr.open("POST", "./php/done.php");
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(data);
    
}

function deleteDoneItem(id){
    temp = []
    for(let i=0; i<doneItems.length; i++){
        if(i != id){
            temp.push(doneItems[i]);
        }
    }
    doneItems = temp;
    showDoneList();
    sendDoneData(doneItems);
}

