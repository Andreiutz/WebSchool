var array = []
var size = 14;
var emptyX;
var emptyY;

function initializeArray() {
    let aux = []
    for (let i = 0; i < size*size; i++) {
        aux.push(i);
    }
    shuffle(aux);
    for (let i = 0; i < size; i++) {
        array.push([]);
        for (let j = 0; j < size; j++) {
            array[i].push(aux.pop());
        }
    }
    console.log(array);
}

$(document).ready(function() {
    initializeArray();

    let box = $("#box");
    for (let i = 0; i < array.length; i++) {
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        box.append(newRow);
        for (let j = 0; j < array[i].length; j++) {
            let newItem = document.createElement("div");
            newItem.classList.add("item");
            if (array[i][j] == 0) {
                newItem.style.backgroundColor = "#77037B";
                emptyX = i;
                emptyY = j;
            } else {
                newItem.innerHTML = `${array[i][j]}`
            }
            newRow.appendChild(newItem);
        }
    }

    $(document).keypress(function(event) {
        console.log(event.code)
        switch(event.code) {
            case "KeyA": leftKeyPressed(); break;
            case "KeyS": downKeyPressed(); break;
            case "KeyD": rightKeyPressed(); break;
            case "KeyW": upKeyPressed(); break;
        }
    })

})

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


function changeValue(newX, newY) {

    console.log(`[${emptyX}][${emptyY}] --> [${newX}][${newY}]`);

    let emptyBox = $("#box").children().eq(emptyX).children().eq(emptyY);
    let nextBox = $("#box").children().eq(newX).children().eq(newY);

    emptyBox.css("background-color", "#F9E2AF");
    emptyBox.html(`${array[newX][newY]}`);

    nextBox.css("background-color", "#77037B");
    nextBox.html("");

    array[emptyX][emptyY] = array[newX][newY];
    array[newX][newY] = 0;
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
    if (emptyY != array[0].length-1) {
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
    if (emptyX != array.length-1) {
        let newX = emptyX+1;
        let newY = emptyY;
        changeValue(newX, newY);
    }
}