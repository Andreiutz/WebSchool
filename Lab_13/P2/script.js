var indexPage = 1;
var lastIndexPage = -1;
var dimensionPage = 1;
var numberOfEntries = -1;

$(document).ready(function(){
    initializeLastIndex();
    loadTable(indexPage, dimensionPage);
})

$("#dimSelector").on("change", function() {
    dimensionPage = parseInt($("#dimSelector option:selected").text());
    if (numberOfEntries % dimensionPage != 0) {
        lastIndexPage = (numberOfEntries - (numberOfEntries % dimensionPage)) / dimensionPage + 1;
    } else {
        lastIndexPage = numberOfEntries / dimensionPage;
    }
    loadTable(1, dimensionPage);
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
            numberOfEntries = this.responseText;
            if (numberOfEntries % dimensionPage != 0) {
                lastIndexPage = (numberOfEntries - (numberOfEntries % dimensionPage)) / dimensionPage + 1;
            } else {
                lastIndexPage = numberOfEntries / dimensionPage;
            }
            let select = ''
            for (i = 1; i <= lastIndexPage; i++) {
                select += '<option val =' + i + '>' + i + '</option>';
            }
            $("#dimSelector").html(select);
            console.log(select)
        }
    }
    xmlhttp.open("GET", `http://localhost:3000/Lab_13/P2/home.php`, true);
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
    xmlhttp.open("GET", `http://localhost:3000/Lab_13/P2/home.php?page=${index}&dim=${dimension}`, true);
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