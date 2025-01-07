let done_count = 4;
let curr_log = 1;
let container_checkbox = document.getElementById("checkbox-container");
let container_log = document.getElementById("log-container");
let log_nav_prev = document.getElementById("log-nav-prev");
let log_nav_next = document.getElementById("log-nav-next");

const SLUG_START = "./do-100-logs/";
const SLUG_END = ".html";

const BOX_NOT_DONE = `<svg width="17" height="17"><rect width="17" height="17" rx="2" ry="2" fill="#c8c2ae"/></svg>`;
const BOX_DONE = `<svg width="17" height="17"><rect width="17" height="17" rx="2" ry="2" fill="#57a773"/><polyline points="3,9 7,13 14,4" fill="none" stroke="white" stroke-width="2"></polyline></svg>`;

let array = [...Array(done_count+1).keys()].slice(1);
let array_not_done = Array(100 - done_count).fill(false);
array = array.concat(array_not_done);



function set_nav_display() {
    if (curr_log == 1) {
        log_nav_prev.style.visibility = "hidden";
        log_nav_next.style.visibility = "visible";
    } else if (curr_log == done_count){
        log_nav_prev.style.visibility = "visible";
        log_nav_next.style.visibility = "hidden";
    } else if (curr_log > 1 && curr_log < done_count) {
        log_nav_prev.style.visibility = "visible";
        log_nav_next.style.visibility = "visible";
    }
}

function generate_slug(log_i) {
    return SLUG_START + log_i.toString() + SLUG_END;
}

function load_log(slug) {
    fetch(slug)
    .then(response => response.text())
    .then(log => {
      container_log.innerHTML = log;
    })
    .catch(error => console.error('Error loading HTML:', error));
}

function navigate_to_log(target_log){
    curr_log = target_log;
    load_log(generate_slug(curr_log));
    set_nav_display();
}

function load_first_log(){
    navigate_to_log(1);
}

function load_latest_log(){
    navigate_to_log(done_count);
}

function load_next_log(){
    navigate_to_log(curr_log += 1);
}

function load_prev_log(){
    navigate_to_log(curr_log -= 1);
}

array.forEach(element => {
    let checkbox = document.createElement("div");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("id", "checkbox_" + element.toString());
    
    if (element) {
        // Generate checkbox which will load corresponding log when clicked
        checkbox.innerHTML = BOX_DONE;
        //checkbox.setAttribute("onclick", "navigate_to_log(\"" + generate_slug(element) + "\")");
        checkbox.setAttribute("onclick", "navigate_to_log(" + element + ")");
        checkbox.setAttribute("class", "checkbox clickable");      
    } else {
        // Load empty checkbox
        checkbox.innerHTML = BOX_NOT_DONE;
    }

    container_checkbox.appendChild(checkbox);
});

// Load the first log by default
load_log(generate_slug(curr_log));
set_nav_display();