const {
    STYLE,
    isOld
} = require("./../core");

function functionForSelectboxes() {
    document.querySelectorAll(".selectbox").forEach(function (it) {
        if (isOld(it, 'selectbox')) return false;
        let mySelectBox = document.createElement("DIV");

        let tmpC = (it.classList.value).trim();
        tmpC = tmpC.replace("selectbox", "");
        tmpC = tmpC.replace("d-none", "");

        mySelectBox.classList.add("selectbox");
        if (!(tmpC.length < 2)) {
            tmpC.split(" ").forEach(function (cName) {
                if (cName.length) {
                    mySelectBox.classList.add(cName);
                }
            });
        }
        it.parentElement.appendChild(mySelectBox);

        let selectedElement = document.createElement("DIV");
        selectedElement.classList.add("selectbox-head");
        selectedElement.textContent = it[0].text;
        mySelectBox.appendChild(selectedElement);

        let mySelectBoxBody = document.createElement("DIV");
        mySelectBoxBody.classList.add("selectbox-body");
        mySelectBoxBody.classList.add("mb-1");
        mySelectBox.appendChild(mySelectBoxBody);

        let i = 0;
        while (i < it.length) {
            let op = document.createElement("DIV");
            op.classList.add("selectbox-item");
            op.textContent = it[i].text;
            op.setAttribute("data-index", i);
            mySelectBoxBody.appendChild(op);

            if (it[i].hasAttribute("selected")) {
                selectedElement.textContent = it[i].text;
            }

            if (it[i].hasAttribute("disabled")) {
                op.classList.add("selectbox-item-disabled");
            }

            op.addEventListener("click", function (e) {
                if (!op.classList.contains("selectbox-item-disabled")) {
                    selectedElement.textContent = op.textContent;
                    let j = 0;
                    while (j < it.length) {
                        it[j].removeAttribute("selected");
                        j = j + 1;
                    }
                    it[op.getAttribute("data-index")].setAttribute("selected", "true");
                }
            });

            i = i + 1;
        }

        it.classList.add("d-none");

        mySelectBox.addEventListener("click", function (e) {
            if (!e.target.classList.contains("selectbox-item-disabled")) {
                if (mySelectBox.classList.contains("selectbox-open")) {
                    closeAllSelectboxes();
                    mySelectBox.classList.remove("selectbox-open");
                } else {
                    closeAllSelectboxes();
                    STYLE(mySelectBoxBody, {
                        "height": mySelectBoxBody.scrollHeight + "px"
                    })
                    mySelectBox.classList.add("selectbox-open");
                }
            }
        });
        it.isDone = true;
    });
    windowEventsForSelectboxs();
}

function closeAllSelectboxes() {
    document.querySelectorAll(".selectbox").forEach(function (it) {
        if (it.classList.contains("selectbox-open")) {
            it.classList.remove("selectbox-open");
            STYLE(it.children[1], {
                "height": 0 + "px"
            })
        };
    })
}

function windowEventsForSelectboxs() {
    window.addEventListener("click", function (e) {

        if (e.target == document || e.target == document.querySelector("html") || e.target == document.head || e.target == document.body) {
            return false;
        }
        if (e.target.classList || e.target.classList.contains('selectbox') ||
            e.target.parentElement.classList.contains('selectbox') ||
            e.target.parentElement.parentElement.classList.contains('selectbox')) {} else {
            closeAllSelectboxes();
        }
    });
}

module.exports = [functionForSelectboxes];
