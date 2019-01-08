const {isOld} = require('./../core');

function functionForModel() {
   document.querySelectorAll(".model").forEach(function (it) {
       if(isOld(it, 'model')) return false;
        it.addEventListener("click", function (e) {
            if (e.target == it) {
                it.classList.remove("model-open");
            }
        });
    });
}

function functionForModelDataTarget() {
    document.querySelectorAll("[data-target]").forEach(function (it) {
        if(isOld(it, 'data-target')) return false;
        it.addEventListener("click", function (e) {
            OpenCloseModel(e, "target");
        });
    });
}

function functionForModelDataToggle() {
    document.querySelectorAll("[data-toggle]").forEach(function (it) {
        if(isOld(it, 'data-toggle')) return false;
        it.addEventListener("click", function (e) {
            OpenCloseModel(e, "toggle");
        });
    })
}

function functionForModelDataClose() {
    document.querySelectorAll("[data-close]").forEach(function (it) {
        if(isOld(it, 'data-close')) return false;
        it.addEventListener("click", function (e) {
            OpenCloseModel(e, "close");
        });
    });
}

function OpenCloseModel(e, which) {
    let tar = document.getElementById(e.target.dataset[which]);
    if (tar.hasAttribute("data-open")) {
        tar.classList.add(tar.getAttribute("data-open"));
    } else {
        if (which == "target") {
            tar.classList.add("model-open");
        } else if (which == "toggle") {
            tar.classList[
                tar.classList.contains("model-open") ? "remove" : "add"
                ]
        } else if (which == "close") {
            tar.classList.remove("model-open");
        }

    }
}

module.exports = [
    functionForModel,
    functionForModelDataTarget,
    functionForModelDataToggle,
    functionForModelDataClose
]
