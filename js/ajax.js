// JavaScript Document
var button = document.getElementById("saver");
button.onclick = function () {
    var label = document.getElementById("label");
    label.style.display = "block";
    button.style.display = "none";
    var canvas = document.getElementById("tree-canvas");
    var ajax = new Ajax();

}
function Ajax() {
    var can = document.getElementById("tree-canvas");
    var data = can.toDataURL();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            window.open(response, '_blank', 'location=0,menubar=0');
        }
    }
    /*since get has size limits*/
    request.open('POST', 'save.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send('img=' + data);
}

