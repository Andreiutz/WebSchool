var table = document.getElementById("tableId");

for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    row.cells[0].onclick = function(){sortTable(i);}
}


function sort(header) {
    console.log(header.innerHTML);
}

function swapColumns(table, col1, col2) {
    for (let i = 0; i < table.length; i++) {
        let x = table[i][col1];
        table[i][col1] = table[i][col2];
        table[i][col2] = x;
    }
}

function sortTable(rowIndex) {
    let array = []
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i].cells;
        array.push([]);
        for (let j = 0; j < row.length; j++) {
            array[i].push(row[j].innerHTML)
        }
    }
    for (let i = 1; i < array[rowIndex].length-1; i++) {
        for (let j = i+1; j < array[rowIndex].length; j++) {
            if (array[rowIndex][i] > array[rowIndex][j]) {
                swapColumns(array, i, j);
            }
        }
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array[i].length; j++) {
            table.rows[i].cells[j].innerHTML = array[i][j];
        }
    }
}