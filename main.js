let done_count = 2;
let container_checkbox = document.getElementById("checkbox-container");
let container_log = document.getElementById("log-container");

const box_not_done = `<svg width="17" height="17"><rect width="17" height="17" rx="2" ry="2" fill="#c8c2ae"/></svg>`;
const box_done = `<svg width="17" height="17"><rect width="17" height="17" rx="2" ry="2" fill="#57a773"/><polyline points="3,9 7,13 14,4" fill="none" stroke="white" stroke-width="2"></polyline></svg>`;


let array = [...Array(done_count+1).keys()].slice(1);
let array_not_done = Array(100 - done_count).fill(false);
array = array.concat(array_not_done);


function load_log(slug) {
    fetch(slug)
    .then(response => response.text())
    .then(log => {
      container_log.innerHTML = log;
    })
    .catch(error => console.error('Error loading HTML:', error));
}

array.forEach(element => {
    let checkbox = document.createElement("div");
    checkbox.setAttribute("class", "checkbox");
    
    if (element) {
        checkbox.innerHTML = box_done;
        let slug = "\"./do-100-logs/" + element.toString() + ".html\""
        checkbox.setAttribute("onclick", "load_log(" + slug + ")");  
        checkbox.setAttribute("class", "checkbox clickable");      
    } else {
        checkbox.innerHTML = box_not_done;
    }

    container_checkbox.appendChild(checkbox);
});