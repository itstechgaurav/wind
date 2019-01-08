const {
    STYLE,
    isOld
} = require("./../core");

function functionForAlerts() {
    document.querySelectorAll(".alert-close").forEach(function (it) {
        if(isOld(it, 'alert-close')) return false;
        it.addEventListener("click", function () {
            if (it.parentNode.classList.contains("alert")) {
                let parent = it.parentNode;
                STYLE(parent, {
                    overflow: "hidden",
                    "height": parent.offsetHeight + "px",
                    transition: ".3s"
                });
                setTimeout(function () {
                    STYLE(parent, {
                        "height": "0px"
                    })
                }, 100);
                setTimeout(function () {
                    parent.parentNode.removeChild(parent);
                }, 400)
            }
        });
    });
}
module.exports = [functionForAlerts];