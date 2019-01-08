function functionForSlider() {
    "use strict";
    
    document.querySelectorAll(".slider").forEach(function (it) {
        let track = it.children[0];
        let progress = it.children[1];
        let ball = it.children[2];
        
        ball.title = "0";
        
        let dragging = false;
        let ballOffest = 0;

        ball.addEventListener("mousedown", function (e) {
            ballOffest = e.clientX - ball.offsetLeft;
            dragging = true;
            it.classList.add("slider-show-value");
        });

        window.addEventListener("mouseup", function () {
            dragging = false;
            it.classList.remove("slider-show-value");
        });


        it.addEventListener("click", function (e) {
            dragging = true;
                rangeSlider(e);
                dragging = false;
        });


        window.addEventListener("mousemove", rangeSlider);

        function rangeSlider(e) {
            let trackWidth = track.offsetWidth;
            let trackLeft = track.offsetLeft;
            let trackRight = trackLeft + trackWidth;
            let ballWidth = ball.offsetWidth;
            let maxRight = trackWidth - ballWidth;
            if (dragging) {
                let offset = e.clientX - trackLeft - ballOffest;
                if (offset < 0) {
                    offset = 0;
                } else if (offset > maxRight) {
                    offset = maxRight
                }
                
                let ab = Math.round(offset / (maxRight / 100));
                let cc = (offset / (maxRight / 100)) + "%" + " - " + (ballWidth / 2) + "px";
                ball.style.left = "calc(" + cc + ")";
                ball.title = ab;
                progress.style.width = (offset / (maxRight / 100)) + "%";
            }
        }
    });
}


(function () {
    functionForSlider()
})();

module.exports = [functionForSlider];
