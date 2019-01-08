const {STYLE, isOld} = require("./../core");

function functionForNavs() {
    
    document.querySelectorAll(".nav-opener").forEach(function(it) {
        if(isOld(it, 'nav-opener')) return false;
        it.addEventListener("click", function() {
            it.parentElement.classList[
                it.parentElement.classList.contains("nav-show") ? "remove" : "add"
            ]("nav-show");
        })
        it.isDone = true;
    });
}

function functionForHamburgers() {
    document.querySelectorAll(".hamburger").forEach(function(it) {
       if(isOld(it, 'hamburger')) return false;
       let hb = document.createElement("DIV");
        hb.classList.add("hamburger-bar");
        hb.addEventListener("click", function() {
            it.classList[
                it.classList.contains("hamburger-close") ? "remove" : "add"
            ]("hamburger-close");
        });
        
        it.appendChild(hb);
        it.isDone = true;
    });
}

module.exports = [
    functionForNavs,
    functionForHamburgers
]