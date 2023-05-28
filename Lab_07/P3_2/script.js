var matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [1, 2, 3, 4],
    [5, 6, 7, 8]
]

var finished = 8;
var choices  = []
var tableContent = ""
var table = document.getElementById("tableId");

for(i = 0; i < matrix.length; i++) {
    tableContent += "<tr>"
    for(j = 0; j < matrix[i].length; j++) {
        let x = i;
        let y = j;
        tableContent += `<td onclick="changeCell(${x}, ${y})"><img src="gray.jpg"></td>`
    } 
    tableContent += "</tr>"
}
table.innerHTML = tableContent;

function changeCell(x, y) {

    let cell = table.rows[x].cells[y];
    cell.innerHTML = `<img src="${matrix[x][y]}.jpg">`
    cell.onclick = null;
    if (choices.length == 0) {
        choices.push([x, y]);
    } else if (choices.length != 0 && (choices[choices.length-1][0] != x || choices[choices.length-1][1] != y)) {
        choices.push([x, y]);
    }
    
    if (choices.length == 2) {
        let length = choices.length;
        let x1 = choices[length-2][0];
        let y1 = choices[length-2][1];

        let x2 = choices[length-1][0];
        let y2 = choices[length-1][1];
        console.log(`${x1}, ${y1}, ${x2}, ${y2}`);
        checkCells(x1, y1, x2, y2);
        choices = []
    }
}


function checkCells(x1, y1, x2, y2) {
    let cell1 = table.rows[x1].cells[y1]; 
    let cell2 = table.rows[x2].cells[y2];
    let value1 = cell1.innerHTML;
    let value2 = cell2.innerHTML;
    if (value1 != value2) {
        setTimeout(function() {
            cell1.innerHTML = `<img src="gray.jpg">`
            cell2.innerHTML = `<img src="gray.jpg">`
            cell1.onclick = function(){changeCell(x1, y1);}
            cell2.onclick = function(){changeCell(x2, y2);}
        }, 2000);
    } else {
        finished--;
        if (finished == 0) {
            alert("You won!");
            location.reload();
        }
    }
}
