let ops = {
    unique: false,
    minLength: 1,
    maxLength: 0,
    trim: false,
    tagTheme: 'white',
    tags: [],
    suggestion: []
}

class Tag {
    constructor(el, op = ops) {
        if (el.nodeName !== "INPUT") {
            console.error("Provided Element is Not an Input Tag");
        }

        this.parent = el.parentNode;
        this.el = el;
        
        this.addProps({
            ...ops,
            ...op
        });
        this.start();
    }
    
    addProps(props) {
        let allowed = ['unique','minLength','maxLength', 'trim', 'tagTheme', 'suggestion', 'tags'];
        Object.keys(props).forEach(function(ob) {
            if(allowed.includes(ob)) {
                this[ob] = props[ob];
            }
        }.bind(this));
    }

    start() {
        this.buildUi();
    }

    buildUi() {
        this.tagContainer = createEl("DIV", ['tag-container']);
        this.tagInputs = createEl("DIV", ['tag-inputs']);
        this.tagInputBack = createEl("INPUT", ['input', 'tag-input-back', 'tag-input']);
        this.tagInputFront = createEl("INPUT", ['input', 'tag-input-front', 'tag-input']);
        this.tagItems = createEl("DIV", ['tag-items']);
        this.el.style.display = "none";
        this.tagInputs.appendChild(this.tagInputBack);
        this.tagInputs.appendChild(this.tagInputFront);
        this.tagContainer.appendChild(this.tagInputs);
        this.tagContainer.appendChild(this.tagItems);
        this.parent.appendChild(this.tagContainer);
        this.rerender();
        this.events();
    }

    rerender() {
        this.tagItems.innerHTML = "";
        this.tags.forEach(function (it) {
            if (!it.deleted) {
                this.createTag(it);
            }
        }.bind(this));
        this.output();
    }

    events() {
        let iFront = this.tagInputFront;
        iFront.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                let text = iFront.value;
                let index = this.tags.length;
                this.addTag(text, index);
            }
        }.bind(this));

        iFront.addEventListener("keydown", function (e) {
            let iBack = this.tagInputBack;
            let iFront = this.tagInputFront;
            if (e.keyCode === 9) {
                let text = iBack.value;
                if(!text.length) {
                    if(iFront.value.length) {
                        text = iFront.value;
                    }
                }
                if (text.length) {
                    let index = this.tags.length;
                    this.addTag(text, index);
                    iBack.value = "";
                }
                e.preventDefault();
            }
        }.bind(this));

        iFront.addEventListener("input", function (e) {
            let text = iFront.value;
            let index = this.tags.length;
            this.showSuggestion(text, index);
        }.bind(this));

    }

    showSuggestion(text, index) {
        if (this.suggestion && this.suggestion.length) {
            text = text.trim();
            let list = this.suggestion;
            let find = false;
            list.forEach(function (it, i) {
                if (!find) {
                    it = it.trim();
                    if (it.length) {
                        if (it.substring(0, text.length) === text) {
                            find = true;
                            this.tagInputBack.value = it;
                        } else {
                            this.tagInputBack.value = "";
                        }
                    }
                }
            }.bind(this));
        }
    }

    output() {
        let tmpTags = [];
        this.tags.map(function (ob) {
            if (!ob.deleted) {
                tmpTags.push(ob.text);
            }
        });
        this.el.value = "";
        let val = "";
        tmpTags.forEach(function (it, i) {
            if (!it.deleted) {
                if (i === tmpTags.length - 1) {
                    val = val + `'${it}'`;
                } else {
                    val = val + `'${it}'` + ", ";
                }
            }
        }.bind(this));
        this.el.value = val;
    }
    
    checkDuplicate(text) {
        let isDuplicate = false;
        this.tags.forEach(function(it) {
            if(it.text === text) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    }

    addTag(text, index) {
        let iFront = this.tagInputFront;

        if (this.trim) {
            text = text.trim();
        }

        if (text.length < this.minLength) {
            console.log("Text Length Should be greater then " + this.minLength - 1);
            return false;
        }

        if (text.length > this.maxLength) {
            if (this.maxLength !== 0) {
                console.log("Text Length Should be Less then " + this.maxLength + 1);
                return false;
            }
        }

        if (this.unique && this.checkDuplicate(text)) {
            iFront.value = "";
            return false;
        }


        this.tags.push({
            text,
            deleted: false
        });
        this.createTag(this.tags[index]);
        iFront.value = "";
        this.rerender();
    }

    createTag(op) {
        let it = createEl("DIV", ['tag-item', 'badge']);
        if(this.tagTheme) {
            it.classList.add("theme-" + this.tagTheme);
        }
        let itText = createEl("DIV", ['badge-text']);
        itText.textContent = op.text;

        let itClose = createEl("SPAN", ['tag-item-close']);
        itClose.textContent = "X";
        itClose.addEventListener("click", function (e) {
            op.deleted = true;
            this.rerender();
        }.bind(this));

        it.appendChild(itText);
        it.appendChild(itClose);
        this.tagItems.appendChild(it);
    }
}

function createEl(type, clss) {
    let it = document.createElement(type);
    clss.forEach(function (cl) {
        it.classList.add(cl);
    });
    return it;
}

module.exports = [
    function () {
        window.Tag = Tag;
    }
]
