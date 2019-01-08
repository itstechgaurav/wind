const STYLE = function (node, styles) {
    Object.keys(styles).forEach(function (it) {
        node.style[it] = styles[it];
    });
}

function isOld(it, inc) {
    if (it.isDone && it.isDone.includes(inc)) {
        return true;
    } else {
        if (it.isDone) {
            it.isDone.push(inc);
        } else {
            it.isDone = [inc];
        }
        return false;
    }
}

module.exports = {
    STYLE,
    isOld
}
