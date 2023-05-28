$(document).ready(function() {
    $("#myForm").submit(function(e) {
        let err = "";
        let name = $("#nameInput");
        let date = $("#dateInput");
        let age = $("#ageInput");
        let email = $("#emailInput");
        console.log(name.val());
        console.log(date.val());
        console.log(age.val());
        console.log(email.val());
        
        if (name.val() == '') {
            err += 'Name input incompleted\n';
            name.css("border", "3px solid red");
        } else {
            name.css("border", "1px solid black");
        }
    
        if (date.val() == '') {
            err += 'Date input incompleted\n';
            date.css("border", "3px solid red");
        } else {
            date.css("border", "1px solid black");
        }
    
        if (age.val() == '') {
            err += 'Age input incompleted\n';
            age.css("border", "3px solid red");
        } else {
            age.css("border", "1px solid black");
        }
    
        if (email.val() == '') {
            err += 'Email input incompleted\n';
            email.css("border", "3px solid red");
        } else if (validateEmail(email.val()) == false){
            err += 'Email input incorrect\n';
            email.css("border", "3px solid red");
        } else {
            email.css("border", "1px solid black");
        }

        if (err != "") {
            alert(err);
            return false;
        } else {
            alert("Form submitted successfully!");
            return true;
        }
    });
})

function validateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return true;
  }
    return false;
}