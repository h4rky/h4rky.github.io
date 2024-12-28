let done_count = 1;

const box_not_done = `<svg width="17" height="17"><rect width="17" height="17" rx="2" ry="2" fill="#c8c2ae"/></svg>`
const box_done = `<svg width="17" height="17"><rect width="17" height="17" rx="2" ry="2" fill="#57a773"/></svg>`
let checkbox_container = document.getElementById("checkbox-container");

let array = Array(done_count).fill(true);
let array_not_done = Array(100 - done_count).fill(false);
array = array.concat(array_not_done);

array.forEach(element => {
    let checkbox = document.createElement("div");
    checkbox.setAttribute("class", "checkbox");
    
    if (element) {
        checkbox.innerHTML = box_done;
    } else {
        checkbox.innerHTML = box_not_done;
    }

    checkbox_container.appendChild(checkbox);
});