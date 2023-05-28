var count = 0;
var end = false;


$(".free").on("click", function() {
    if (!end) {
        count++;
        console.log(count);
        $(this).removeClass("free");
        $(this).attr("onclick", "").unbind("click");
        if (count % 2 == 0) {
            $(this).css("background-image", "url(o.png)");
            $(this).addClass("o");
        } else {
            $(this).css("background-image", "url(x.png)");
            $(this).addClass("x");
        }
        handleGame();
        setTimeout(robotChoice, 500);
    }
})

function robotChoice() {
    if (!end) {
        count++;
        let elems = collectInput();
        let stringElems = elems.join(",");
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let index = this.responseText;
                let row = (index - (index % 3)) / 3;
                let col = index % 3;
                $("#border").children().eq(row).children().eq(col).removeClass("free");
                $("#border").children().eq(row).children().eq(col).attr("onclick", "").unbind("click");
    
                console.log(count);
                if (count % 2 == 0) {
                    $("#border").children().eq(row).children().eq(col).css("background-image", "url(o.png)");
                    $("#border").children().eq(row).children().eq(col).addClass("o");
                } else {
                    $("#border").children().eq(row).children().eq(col).css("background-image", "url(x.png)");
                    $("#border").children().eq(row).children().eq(col).addClass("x");
                }
                handleGame();
            }
        }
        xmlhttp.open("GET", `http://localhost:3000/Lab_11/P4/robot.php?status=${stringElems},`, true);
        xmlhttp.send("");
    }
}

function handleGame() {
    let elems = collectInput();
    let stringElems = elems.join(",");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if(this.responseText != "C") {
                end = true;
                if (this.responseText == "E") {
                    alert("Draw!");
                } else {
                    alert(`${this.responseText} won the game!`);
                }
            }
        }
    }
    xmlhttp.open("GET", `http://localhost:3000/Lab_11/P4/check.php?status=${stringElems},`, true);
    xmlhttp.send("");
}

function collectInput() {
    let elems = ["%20", "%20", "%20", "%20", "%20", "%20", "%20", "%20", "%20"];
    let index = 0;
    $("#border").children().each(function(){
        $(this).children().each(function(){
            if ($(this).hasClass("x")) {
                elems[index] = "x";
            } else if ($(this).hasClass("o")) {
                elems[index] = "o";
            } else {
                elems[index] = " ";
            }
            index += 1;
        })
    })
    return elems;
}