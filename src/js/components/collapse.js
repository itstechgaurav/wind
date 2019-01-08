const {STYLE, isOld} = require("./../core");

function functionForCollapse() {
    document.querySelectorAll(".collapse>.collapse-head").forEach(function (it) {
        
        if(isOld(it, 'collapse-head')) return false;
        
        it.addEventListener("click", function () {
            if (it.parentNode.classList.contains("collapse-open")) {
                resetCollapse();
                it.parentNode.classList.remove("collapse-open");
                collapseHeight(it);
            } else {
                resetCollapse();
                it.parentNode.classList.add("collapse-open");
                collapseHeight(it);
            }
        });
        it.isDone = true;
    })
}

function resetCollapse() {
    document.querySelectorAll(".collapse>.collapse-head").forEach(function (it) {
        it.parentNode.classList.remove("collapse-open");
        collapseHeight(it);
    })
}

function collapseHeight(it) { if(it.parentNode.classList.contains("collapse-open")) {
        STYLE(it.nextElementSibling, {
            "max-height": it.nextElementSibling.scrollHeight + "px"
        })
    } else {
        STYLE(it.nextElementSibling, {
            "max-height": 0 + "px"
        })
    }
}

module.exports = [functionForCollapse];