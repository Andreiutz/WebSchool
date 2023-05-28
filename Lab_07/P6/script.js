matrix = [
    [3, 8, 9, 5],
    [7, 13, 6, 15],
    [10, -1, 14, 4],
    [2, 11, 1, 12]
]

var tableContent = ""
var table = document.getElementById("tableId");
var emptyX = 2;
var emptyY = 1;

for(i = 0; i < matrix.length; i++) {
    tableContent += "<tr>"
    for(j = 0; j < matrix[i].length; j++) {
        let x = i;
        let y = j;
        if (matrix[x][y] != -1) {
            tableContent += `<td>${matrix[x][y]}</td>`
        }
        else {
            tableContent += `<td></td>`
        }
    } 
    tableContent += "</tr>"
}
table.innerHTML = tableContent;

document.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;
    //alert(`Key pressed: ${name} \r\nKey code: ${code}`);
    switch(name) {
        case "ArrowDown": downKeyPressed(); break;
        case "ArrowUp" : upKeyPressed(); break;
        case "ArrowLeft": leftKeyPressed(); break;
        case "ArrowRight": rightKeyPressed(); break;
    }
})

function changeValue(newX, newY) {
    table.rows[emptyX].cells[emptyY].innerHTML = matrix[newX][newY];
    table.rows[newX].cells[newY].innerHTML = "";

    matrix[emptyX][emptyY] = matrix[newX][newY];
    matrix[newX][newY] = -1;

    console.log(`Old position: (${emptyX}, ${emptyY})\nNew position: (${newX}, ${newY})`);

    emptyX = newX;
    emptyY = newY;
    
}

function downKeyPressed() {
    if (emptyX != 0) {
        let newX = emptyX-1;
        let newY = emptyY;
        changeValue(newX, newY);
    }
}

function leftKeyPressed() {
    if (emptyY != matrix[0].length-1) {
        let newX = emptyX;
        let newY = emptyY+1;
        changeValue(newX, newY);
    }
}

function rightKeyPressed() {
    if (emptyY != 0) {
        let newX = emptyX;
        let newY = emptyY-1;
        changeValue(newX, newY);
    }
}

function upKeyPressed() {
    if (emptyX != matrix.length-1) {
        let newX = emptyX+1;
        let newY = emptyY;
        changeValue(newX, newY);
    }
}