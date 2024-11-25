const url = "http://localhost:8080/task/user";

function hideLoader() {
    document.getElementById("loading").style.display = "none"
}

function createTask() {
    var myModal = new bootstrap.Modal(document.getElementById('taskModal'));
    myModal.show();

    document.getElementById('taskForm').onsubmit = function(event) {
        event.preventDefault();

        const description = document.getElementById('taskDescription').value;

        let key = "Authorization";
        fetch("http://localhost:8080/task", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                Authorization: localStorage.getItem(key)
            }),
            body: JSON.stringify({
                description: description
            })
        })
        .then(response => {
            if (response.status === 201) {
                console.log('Task successfully created.');
                myModal.hide();
                getTasks()
                return; 
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

function showName(name) {
    document.getElementById("name").textContent = name;
}

function show(tasks) {

    let tab = 
        `<thead>
            <th scope = "col">#</th>       
            <th scope = "col">Description</th>                    
        </thead>`;

    for (let task of tasks) {
        tab +=`
            <tr>
                <td scope="row">${task.id}</td>
                <td>${task.description}</td>
            </tr>
        `
    }

    document.getElementById("tasks").innerHTML = tab;

}

async function getName() {
    let key = "Authorization";
    const response = await fetch("http://localhost:8080/user/name", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    console.log(data);
    if (response) hideLoader();
    showName(data.username);
}


async function getTasks(){
    let key = "Authorization";
    const response = await fetch("http://localhost:8080/task/user", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    var data = await response.json();
    console.log(data);
    if (response) hideLoader();
    show(data);
}

getName()
getTasks()

document.addEventListener("DOMContentLoaded", function (event) {
    if (!localStorage.getItem("Authorization"))
        window.location = "login.html";
});

