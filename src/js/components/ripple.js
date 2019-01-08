const {
    STYLE,
    isOld
} = require("./../core");

function functionForRipples() {
    document.querySelectorAll(".ripple").forEach(function (it) {
        if(isOld(it, 'ripple')) return false;
        if (!it.classList.contains("tootltip")) {
            it.addEventListener("click", function (e) {
                var circle = document.createElement("DIV");

                var d = Math.max(e.target.clientWidth, e.target.clientHeight);
                var rect = it.getBoundingClientRect();

                STYLE(circle, {
                    width: d + 'px',
                    height: d + 'px',
                    left: e.clientX - rect.left - d / 2 + 'px',
                    top: e.clientY - rect.top - d / 2 + 'px',
                });

                circle.classList.add("ripple-anm");



                if (it.dataset.ripple) {
                    circle.classList.add('ripple-anm-' + it.dataset.ripple);
                }


                if (it.dataset.class) {
                    circle.classList.add(e.target.dataset.class);
                }
                it.appendChild(circle);
                setTimeout(function () {
                    it.removeChild(circle);
                }, 2000)
            });
            it.isDone = true;
        }
    })
}

function rippleAnm(e) {

}

module.exports = [functionForRipples]
