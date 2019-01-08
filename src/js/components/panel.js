const {isOld} = require('./../core');

function functionForPanels() {
    document.querySelectorAll("[data-panel]").forEach(function(it) {
        if(isOld(it, 'data-panel')) return false;
        it.addEventListener("click", function() {
            let id = it.getAttribute("data-panel");
            let pnl = document.getElementById(id);
            if(pnl.classList.contains("panel-open")) {
                pnl.classList.remove("panel-open");
            } else {
                pnl.classList.add("panel-open");
            }
        });
        it.isDone = true;
    })
}

module.exports = [functionForPanels];