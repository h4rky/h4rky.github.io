let done_count = 1;

let body = document.getElementById("container");

let array = Array(done_count).fill(true);
let array_not_done = Array(100 - done_count).fill(false);
array = array.concat(array_not_done);

array.forEach(element => {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    if (element) {checkbox.setAttribute("checked", "true");}
    checkbox.setAttribute("disabled", "true");
    body.appendChild(checkbox);
    console.log(element);
});