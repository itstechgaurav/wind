const {
    STYLE,
    isOld
} = require("./../core");

function functionForDropDowns() {
    document.querySelectorAll(".dropdown").forEach(function (it) {
        if (isOld(it, 'dropdown')) return false;
        it.addEventListener("click", function () {
            if (it.classList.contains("dropdown-open")) {
                closeAllDropdowns();
            } else {
                closeAllDropdowns();
                it.classList.add("dropdown-open");
                STYLE(it.children[1], {
                    "height": it.children[1].scrollHeight + "px"
                })
            }
        });
        it.isDone = true;
    });
    windowEvents();
}

function closeAllDropdowns() {
    document.querySelectorAll(".dropdown").forEach(function (it) {
        if (it.classList.contains("dropdown-open")) {
            it.classList.remove("dropdown-open");
            STYLE(it.children[1], {
                "height": 0
            })
        }
    })
}

function windowEvents() {
    window.addEventListener("click", function (e) {
        if (e.target == document || e.target == document.querySelector("html") || e.target == document.head || e.target == document.body) {
            return false;
        }
        if (e.target.classList || e.target.classList.contains('dropdown-open') ||
            e.target.parentElement.classList.contains('dropdown-open') ||
            e.target.parentElement.parentElement.classList.contains('dropdown-open')) {} else {
            closeAllDropdowns();
        }

    });
}
module.exports = [functionForDropDowns];
