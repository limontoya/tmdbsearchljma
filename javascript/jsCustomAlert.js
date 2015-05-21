
function CustomAlert() {
    this.render = function(dialog) {
        var winW = window.innerWidth;
        var winH = document.documentElement.scrollHeight;//window.innerHeight; 
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (450 * .5) + "px";
        dialogbox.style.top = "120px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Movie";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function() {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        document.getElementById('dialogboxbody').innerHTML = "";
    }
}
var Alert = new CustomAlert();
