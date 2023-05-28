var table = document.getElementById("tableId");

for (let i = 0; i < table.rows[0].cells.length; i++) {
    table.rows[0].cells[i].onclick = function(){sortTable(i);}
}


function swapRows(array, row1, row2) {
    console.log(`${row1}, ${row2}`)
    for (let j = 0; j < array[0].length; j++) {
        let x = array[row1][j];
        array[row1][j] = array[row2][j];
        array[row2][j] = x;
    }
}

function sortTable(colIndex) {
    let array = []
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i].cells;
        array.push([]);
        for (let j = 0; j < row.length; j++) {
            array[i].push(row[j].innerHTML)
        }
    }
    for (let i = 1; i < array.length-1; i++) {
        for (let j = i+1; j < array.length; j++) {
            if (array[i][colIndex] > array[j][colIndex]) {
                swapRows(array, i, j);
            }
        }
    }
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            table.rows[i].cells[j].innerHTML = array[i][j];
        }
    }
}