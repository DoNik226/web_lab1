"use strict";

let x, y, r;


document.getElementById("checkButton").onclick = function () {
    if (validateX() && validateY() && validateR()) {
        drawPoint(document.querySelector("input[name=X-input]").value.replace(",", "."), document.querySelector("input[name=Y-input]").value.replace(",", "."), document.getElementById('Rad').value)
        fetch("answer.php", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r) +
                "&timezone=" + encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).then(response => response.text()).then(function (serverAnswer) {
            document.getElementById("tablebody").innerHTML = document.getElementById("tablebody").innerHTML + serverAnswer;
        }).catch(err => alert("Ошибка HTTP. Повторите попытку позже. " + err));
    }
};


function validateX() {
    x = document.querySelector("input[name=X-input]").value.replace(",", ".");
    if (x === undefined) {
        alert("x не введён");
        return false;
    } else if (!isNumeric(x)) {
        alert("x не число");
        return false;
    } else if (!((x >= -5) && (x <= 5))) {
        alert("x не входит в область допустимых значений");
        return false;
    } else return true;
}

function validateY() {
    y = document.querySelector("input[name=Y-input]").value.replace(",", ".");
    if (y === undefined) {
        alert("y не введён");
        return false;
    } else if (!isNumeric(y)) {
        alert("y не число");
        return false;
    } else if (!((y >= -3) && (y <= 5))) {
        alert("y не входит в область допустимых значений");
        return false;
    } else return true;
}

function validateR() {
    r = document.getElementById('Rad').value;
    if (r === "") {
        alert("Значение R не выбрано");
        return false;}
    else return true;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}