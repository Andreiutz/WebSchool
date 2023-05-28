var indexPage = 1;
var lastIndexPage = -1;
var dimensionPage = 3;

$(document).ready(function(){
    initializeLastIndex();
    loadTable(indexPage, dimensionPage);
})

$(".active").on("click", function() {
    console.log($(this).attr("id"));
    if ($(this).attr("id") == "prev" && indexPage > 1) {
        indexPage -= 1;
        loadTable(indexPage, dimensionPage);
    } else if ($(this).attr("id") == "next" && indexPage < lastIndexPage) {
        indexPage += 1;
        loadTable(indexPage, dimensionPage);
    }
})

function initializeLastIndex() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let number = this.responseText;
            if (number % dimensionPage != 0) {
                lastIndexPage = (number - (number % dimensionPage)) / dimensionPage + 1;
            } else {
                lastIndexPage = number / dimensionPage;
            }
        }
    }
    xmlhttp.open("GET", `http://localhost:3000/Lab_11/P2/oameni.php`, true);
    xmlhttp.send("");
}

function loadTable(index, dimension) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tabelOameni").innerHTML = this.responseText;
        }
        document.getElementById("pageIndexText").innerText = `Page #${index}`;
    }
    xmlhttp.open("GET", `http://localhost:3000/Lab_11/P2/oameni.php?page=${index}&dim=${dimension}`, true);
    xmlhttp.send("");
    let prevBtn = document.getElementById("prev");
    let nextBtn = document.getElementById("next");
    if (index == 1) {
        prevBtn.classList.remove("active");
        prevBtn.classList.add("inactive");
    } else {
        prevBtn.classList.remove("inactive");
        prevBtn.classList.add("active");
    }

    if (index == lastIndexPage) {
        nextBtn.classList.remove("active");
        nextBtn.classList.add("inactive");
    } else {
        nextBtn.classList.remove("inactive");
        nextBtn.classList.add("active");
    }
}