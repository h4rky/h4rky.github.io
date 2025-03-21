const DONE_COUNT = 12;

let container_checkbox = document.getElementById("checkbox-container");
let container_log = document.getElementById("log-container");
let log_nav_prev = document.getElementById("log-nav-prev");
let log_nav_next = document.getElementById("log-nav-next");
let log_nav_first = document.getElementById("log-nav-first");
let log_nav_latest = document.getElementById("log-nav-latest");

const FIRST_LOG = 1;

const SLUG_START = "./do-100-logs/";
const SLUG_END = ".html";

const BOX_CHECKMARK = `<svg class="checkmark"><polyline points="3,9 7,13 14,4" fill="none" stroke-width="2"></polyline></svg>`;

let array = [...Array(DONE_COUNT+1).keys()].slice(1);
let array_not_done = Array(100 - DONE_COUNT).fill(false);
array = array.concat(array_not_done);

function set_nav_display() {
    if (curr_log == 1) {
        log_nav_prev.classList.add("disabled");
        log_nav_next.classList.remove("disabled");
        log_nav_first.classList.add("disabled");
        log_nav_latest.classList.remove("disabled");
    } else if (curr_log == DONE_COUNT){
        log_nav_prev.classList.remove("disabled");
        log_nav_next.classList.add("disabled");
        log_nav_first.classList.remove("disabled");
        log_nav_latest.classList.add("disabled");
    } else if (curr_log > 1 && curr_log < DONE_COUNT) {
        log_nav_prev.classList.remove("disabled");
        log_nav_next.classList.remove("disabled");
        log_nav_first.classList.remove("disabled");
        log_nav_latest.classList.remove("disabled");
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
    if (!(target_log < FIRST_LOG) && !(target_log > DONE_COUNT)){
        set_checkbox_focus(target_log);
    
        curr_log = target_log;
        load_log(generate_slug(curr_log));
        set_nav_display();}
}

function load_first_log(){
    navigate_to_log(FIRST_LOG);
}

function load_latest_log(){
    navigate_to_log(DONE_COUNT);
}

function load_next_log(){
    target_log = curr_log + 1;
    navigate_to_log(target_log);
}

function load_prev_log(){
    target_log = curr_log - 1;
    navigate_to_log(target_log);
}

function set_checkbox_focus(target_log){
    origin_checkbox = document.getElementById("checkbox_" + curr_log.toString());
    origin_checkbox.classList.remove("selected");

    target_checkbox = document.getElementById("checkbox_" + target_log.toString());
    target_checkbox.classList.add("selected");
}

array.forEach(element => {
    let checkbox = document.createElement("div");
    checkbox.setAttribute("id", "checkbox_" + element.toString());
    
    if (element) {
        // Generate checkbox which will load corresponding log when clicked
        checkbox.innerHTML = BOX_CHECKMARK;
        checkbox.setAttribute("onclick", "navigate_to_log(" + element + ")");
        checkbox.setAttribute("class", "checkbox checked clickable");      
    } else {
        // Load empty checkbox
        checkbox.setAttribute("class", "checkbox unchecked"); 
    }

    container_checkbox.appendChild(checkbox);
});

// Load the first log by default
curr_log = FIRST_LOG;
navigate_to_log(curr_log);