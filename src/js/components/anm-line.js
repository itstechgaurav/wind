const {
    isOld
} = require("./../core");


function functionForAnmLine() {
    document.querySelectorAll("input.anm-line").forEach(function(it) {
        
        if(isOld(it, 'anm-line')) return false;
        
        let anm = document.createElement("DIV");
        anm.classList.add("anm-line");
        
        if(it.getAttribute("data-style")) {
            let styles = "anm-line-" + it.getAttribute("data-style");
            anm.classList.add(styles);
        }
        
        if(it.getAttribute("data-pos")) {
            let position = "anm-line-" + it.getAttribute("data-pos");
            anm.classList.add(position);
        }
        
        it.classList.add("anm-line-resets");
        it.classList.remove("anm-line");
        it.parentNode.appendChild(anm);
        it.isDone = true;
    });
}

module.exports = [functionForAnmLine];