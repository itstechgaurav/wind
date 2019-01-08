const {
    STYLE,
    isOld
} = require("./../core");

function functionForTabs() {
    document.querySelectorAll(".tabs-container").forEach(function (it, i) {
        
        if(isOld(it, "tabs-container")) return false;
        
        let container = it;
        let tabsHead = null;
        let tabsBody = null;
        let heads = [];
        let bodies = [];

        it.childNodes.forEach(function (i1) {
            if (i1.nodeType !== 3) {
                if (i1.classList.contains("tabs-head")) {
                    tabsHead = i1;
                } else if (i1.classList.contains("tabs-body")) {
                    tabsBody = i1;
                }
            }
        });

        if (tabsHead) {
            tabsHead.childNodes.forEach(function (ih) {
                if (ih.nodeType !== 3) {
                    if (ih.classList.contains("tab-head")) {
                        heads.push(ih);
                    }
                }
            });
        }

        if (tabsBody) {
            tabsBody.childNodes.forEach(function (ib) {
                if (ib.nodeType !== 3) {
                    if (ib.classList.contains("tab-body")) {
                        bodies.push(ib);
                    }
                }
            });
        }

        if (heads.length === bodies.length) {
            heads[0].classList.add("tab-active");
            heads.forEach(function (ihh, i) {
                ihh.addEventListener("click", function() {
                   heads.forEach(function(iih) {
                       iih.classList.remove("tab-active");
                   })
                   bodies.forEach(function(ibb) {
                       ibb.style.display = "none";
                   });
                   ihh.classList.add("tab-active");
                   bodies[i].style.display = "block";
                });
                if(ihh.classList.contains("tab-active")) {
                    bodies[i].style.display = "block";
                }
            })
        } else {
            console.log(false, heads, bodies);
            console.error("no of heads in tab are not equal to no of bodies")
            alert("no of heads in tab are not equal to no of bodies");
        }
        
        

    });
}

module.exports = [functionForTabs];
