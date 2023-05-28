var array = [

]

var discovered = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

var play = true;

var first = false, second = false

var firstX, firstY, secondX, secondY

var firstDiv;
var secondDiv;

function initializeArray() {
    let aux = []
    for (let i = 1; i <= 8; i++) {
        aux.push(i);
        aux.push(i);
    }
    shuffle(aux);
    for (let i = 0; i < 4; i++) {
        array.push([]);
        for (let j = 0; j < 4; j++) {
            array[i].push(aux.pop());
        }
    }
    console.log(array);
}

$(document).ready(function() {

    initializeArray();

    let matrix = $("#matrix");
    for (let i = 0; i < array.length; i++) {
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        matrix.append(newRow);
        for (let j = 0; j < array[i].length; j++) {
            let newItem = document.createElement("div");
            newItem.classList.add("item");
            newRow.appendChild(newItem);
        }
    }

   $(".item").on("click", function() {
        let row = $(this).parent().index()
        let col = $(this).index()
        
        if (play == true && discovered[row][col] == 0) {
            if (first == false) {
                first = true;
                firstX = row;
                firstY = col;
                firstDiv = $("#matrix").children().eq(row).children().eq(col);
                firstDiv.css("background-image", `url("${array[row][col]}.jpg")`);
            } else if (second == false && (firstX != row || firstY != col)) {
                second = true;
                secondX = row;
                secondY = col;
                secondDiv = $("#matrix").children().eq(row).children().eq(col);
                secondDiv.css("background-image", `url("${array[row][col]}.jpg")`);
                if (array[firstX][firstY] == array[secondX][secondY]) {
                    discovered[firstX][firstY] = 1;
                    discovered[secondX][secondY] = 1;
                    first = false;
                    second = false;
                } else {
                    play = false;
                    setTimeout(restart, 1000);
                }
            }
        }

   })

})

function restart() {
    firstDiv.css("background-image", `url("gray.jpg")`);
    secondDiv.css("background-image", `url("gray.jpg")`);
    firstDiv = null;
    secondDiv = null;
    play = true;
    first = false;
    second = false;
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }