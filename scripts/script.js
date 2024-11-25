const url = "http://localhost:8080/task/user";

function hideLoader() {
    document.getElementById("loading").style.display = "none"
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

