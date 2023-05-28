$(document).ready(function(){
    $("#tableId tr th").each(function(){
        $(this).on("click", function() {
            sortTable($(this).index())
        })
    })
})


function sortTable(index) {
    console.log(`Sort by col index ${index}`)
    let dataTable = getDataFromHtmlTable()
    sortTableArray(dataTable, index);
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


function sortTableArray(array, colIndex) {
    for (let i = 1; i < array.length-1; i++) {
        for (let j = i+1; j < array.length; j++) {
            if (array[i][colIndex] > array[j][colIndex]) {
                swapRows(array, i, j);
            }
        }
    }
}


function swapRows(array, row1, row2) {
    for (let j = 0; j < array[0].length; j++) {
        let x = array[row1][j];
        array[row1][j] = array[row2][j];
        array[row2][j] = x;
    }
}