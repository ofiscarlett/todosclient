//const list = document.getElementById('todolist') as HTMLUListElement;
//const input = document.getElementById('newtodo') as HTMLInputElement;
const BACKED_ROOT_URL = 'http://localhost:3001';
import { Todos } from "./class/Todos.js";
const todos = new Todos(BACKED_ROOT_URL);
const list = document.querySelector('#todolist');
const input = document.querySelector('#newtodo');
//const list=<HTMLUListElement>document.querySelector('#todolist');
input.disabled = true;
//at todos file, it is getTask, not getTasks
todos.getTasks().then((tasks) => {
    tasks.forEach((task) => {
        renderTask(task);
    });
    input.disabled = false;
}).catch(error => {
    alert(error);
});
/* fetch(BACKED_ROOT_URL)
.then(response => response.json())
.then((response) => {
  response.forEach(node=> {
    renderTask(node.description)
  });
  input.disabled = false;
},(error) =>{
  alert(error)
}) */
/* input.addEventListener('keypress', event=>{
    if(event.key === "Enter") {
        event.preventDefault()
        const text = input.value.trim()
        if(text !="") {
            const list_item = document.createElement('li');
            list_item.setAttribute("class", "list-group-item");
            list_item.innerHTML = text;
            list.append("list_item");
            input.value = "";

        }

    }
}) */
input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const text = input.value.trim();
        if (text !== '') {
            todos.addTask(text).then((task) => {
                input.value = '';
                input.focus();
                renderTask(task);
                //const json= JSON.stringify({description: text})
                //fetch(BACKED_ROOT_URL + '/new', {
                //method: 'POST',
                //headers: {
                //'Content-Type': 'application/json'
                //},
                //body: json
            });
            /* .then(response=>response.json())
            .then((response)=>{ */
            // renderTask(text)
            // input.value = ''
        }
        //const list_item = document.createElement('li');
        //list_item.setAttribute('class', 'list-group-item');
        //list_item.innerHTML = text;
        //list.append(list_item);
        //input.value = '';
        event.preventDefault();
    }
});
const renderTask = (task) => {
    const list_item = document.createElement('li');
    list_item.setAttribute('class', 'list-group-item');
    list_item.setAttribute('data-key', task.id.toString());
    //list_item.innerHTML = task.text
    renderSpan(list_item, task.text);
    renderLink(list_item, task.id);
    list.append(list_item);
};
const renderSpan = (list_item, text) => {
    const span = list_item.appendChild(document.createElement('span'));
    span.innerHTML = text;
};
const renderLink = (list_item, id) => {
    const link = list_item.appendChild(document.createElement('a'));
    link.innerHTML = '<i class = "bi bi-trash"> </i>';
    link.setAttribute('style', 'float:right');
    link.addEventListener('click', event => {
        todos.removeTask(id).then((id) => {
            const elementToRemove = document.querySelector(`[data-key="${id}"]`);
            if (elementToRemove) {
                list.removeChild(elementToRemove);
            }
        }).catch(error => {
            alert(error);
        });
    });
};
