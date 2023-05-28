
var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function validate() {
    let name = document.getElementById("nameInput");
    let date = document.getElementById("dateInput");
    let age = document.getElementById("ageInput");
    let email = document.getElementById("emailInput");

    let err = "";
    if (name.value == '') {
        err += 'Name input incompleted\n';
        name.style.border = "1px solid red";
    } else {
        name.style.border = "1px solid black";
    }

    if (date.value == '') {
        err += 'Date input incompleted\n';
        date.style.border = "1px solid red";
    } else {
        date.style.border = "1px solid black";
    }

    if (age.value == '') {
        err += 'Age input incompleted\n';
        age.style.border = "1px solid red";
    } else {
        age.style.border = "1px solid black";
    }

    if (email.value == '') {
        err += 'Email input incompleted\n';
        email.style.border = "1px solid red";
    } else {
        email.style.border = "1px solid black";
    }

    if (err != "") {
        alert(err);
    } else {
        alert("Form submitted successfully!")
    }

}