$(document).ready(function(){
    $("#tableId tr th").each(function(row){
        $(this).on("click", function() {
            sortTable(row)
        })
    })
})


function sortTable(index) {
    console.log(`Sort by row index ${index}`)
    let dataTable = getDataFromHtmlTable()
    sortTableArray(dataTable, index)
        $("#tableId tr").each(function(row, tr) {
        $(tr).children().each(function(col, x) {
            $(x).html("" + dataTable[row][col]);
        })
    })
}


function getDataFromHtmlTable() {
    let dataTable = []
    $("#tableId tr").each(function(row, tr) {
        let rowTable = []
        $(tr).children().each(function(col, x) {
            rowTable.push(x.innerHTML)
        });
        dataTable.push(rowTable);
    })
    return dataTable;
}

function swapColumns(table, col1, col2) {
    for (let i = 0; i < table.length; i++) {
        let x = table[i][col1];
        table[i][col1] = table[i][col2];
        table[i][col2] = x;
    }
}

function sortTableArray(array, rowIndex) {
    for (let i = 1; i < array[rowIndex].length-1; i++) {
        for (let j = i+1; j < array[rowIndex].length; j++) {
            if (array[rowIndex][i] > array[rowIndex][j]) {
                swapColumns(array, i, j);
            }
        }
    }

}