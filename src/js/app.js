window.spyder = {
    allFuns: []
}

let imports = [
    "./components/alerts",
    "./components/ripple",
    "./components/panel",
    "./components/anm-line",
    "./components/models",
    "./components/dropdown",
    "./components/collapse",
    "./components/nav",
    "./components/selectbox",
    "./components/tabs",
    "./components/tags"
]

imports.forEach(function(it) {
    let tmp = require("" + it);
    tmp.forEach(function(inr) {
       window.spyder.allFuns.push(inr); 
    });
})

window.spyder.rerun = function() {
    window.spyder.allFuns.forEach(function(it) {
        it();
    });
}

//window.addAlert = function() {
//    let alt = document.createElement("div");
//    alt.classList.add("alert");
//    alt.classList.add("alert-prime");
//    alt.innerHTML = '<div class="alert-close"></div><div class="alert-body">Warning</div>';
//    document.body.appendChild(alt);
//}

//import "./components/tags";

window.rerun = window.spyder.rerun;
window.rerun();