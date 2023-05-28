var valid = true;
var selectedId;

$(document).ready(function(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("selectIds").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET", "http://localhost:3000/Lab_11/P3/home.php/ids", true);
    xmlhttp.send("");
})

$('#selectIds').on('change', function() {
    var value = $(this).val();
    if (valid) {
        selectedId = value;
        loadEntity(value);
    } else {
        alert("Save changes!");
        $(this).val(selectedId);
    }
  });

$('#formId input').on('change', function() {
    valid = false;
})

$('#saveBtn').on('click', function() {
    if (!valid) {
        updateEntity();
        valid = true;
    } else {
        alert("No changes made!");
    }
})

function updateEntity() {
    let id = selectedId;
    let lastName = document.getElementById("lastNameInput").value;
    let firstName = document.getElementById("firstNameInput").value;
    let phone = document.getElementById("phoneInput").value;
    let email = document.getElementById("emailInput").value;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Updated!");
            location.reload();
        }
    }
    xmlhttp.open("GET", `http://localhost:3000/Lab_11/P3/home.php?id=${id}&lastname=${lastName}&firstname=${firstName}&phone=${phone}&email=${email}`, true);
    xmlhttp.send("");
}

function loadEntity(index) {
    console.log(index);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let entityString = this.responseText;
            console.log(entityString);
            let values = entityString.split(",");
            document.getElementById("lastNameInput").value = values[0];
            document.getElementById("firstNameInput").value = values[1];
            document.getElementById("phoneInput").value = values[2];
            document.getElementById("emailInput").value = values[3];
        } 
    }
    xmlhttp.open("POST", "http://localhost:3000/Lab_11/P3/home.php?id=" + index, true);
    xmlhttp.send("");
}