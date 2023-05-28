$(document).ready(function() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("plecari").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET", "http://localhost:3000/Lab_11/P1/plecari.php", true);
    xmlhttp.send("");
})

$(document).ready(function() {
    $("#plecari").on("click", function() {
        let nume = $("#plecari option:selected").val()
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            document.getElementById("sosiri").innerHTML = this.responseText;
        }
        xmlhttp.open("GET", "http://localhost:3000/Lab_11/P1/drumuri.php?nume=" + nume, true);
        xmlhttp.send("");
    })
})

