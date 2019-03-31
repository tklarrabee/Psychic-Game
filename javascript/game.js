//Object containing each word puzzle, the number of guesses, and the possible
var guessWords = [
    { word: "meatball", chances: 11, contains: ["m", "e", "a", "t", "b", "l"] },
    { word: "pork butt", chances: 10, contains: ["p", "o", "r", "k", "b", "u", "t"] },
    { word: "flavor town", chances: 13, contains: ["t", "o", "w", "n", "f", "l", "a", "v", "r"] },
    { word: "frosted tips", chances: 9, contains: ["f", "r", "o", "s", "t", "e", "d", "i", "p"] }
];
// guesses remaining. function passes value based on word selected
// Start/Restart game

var levelIndex = 0;
var wins = 0;
var currentWord = getGuessWord(guessWords);
var remaining;
var contain;
var letterList = [];
var letterProgress = "";
for (var i = 0; i < currentWord.length; i++) {
    var ltr = currentWord.substr(i, 1);
    letterList.push(ltr);
}
// Array of entered guesses
var correctGuess = [];
var wrongGuess = [];

//  =============================== FUNCTIONS ===============================

// Select the next word from the list and remove it from the list of words playable. 

function getGuessWord() {

    // var currentObj = guessWords.shift();
    console.log("level Index: " + levelIndex);
    var currentObj = guessWords[levelIndex];
    current = currentObj.word;
    remaining = currentObj.chances;
    contain = currentObj.contains;

    // delete list[guessIndex];
    // console.log(list);
    console.log(contain);
    levelIndex++;
    console.log("GET GUESS WORD LEVEL INDEX" + levelIndex);
    
    //Set the number of chances at the beginning of the level
    lifeBoard();
    

    return current;




}

// Life HUD update function
function lifeBoard(currentLife) {
    var lifeNode = document.getElementById("remaining");
    var score = document.createElement("span");
    score.innerHTML = remaining;
    lifeNode.innerHTML = "";
    lifeNode.appendChild(score);
}
// Win counter HUD updater
function scoreBoard(currentWins) {
    var winNode = document.getElementById("score");
    var score = document.createElement("span");
    winNode.innerHTML = "";
    score.innerHTML = wins;
    winNode.appendChild(score);
}

//console.log('Word: ' + current + ' Remains: ' + remaining + ' Contains: ' + contain);

// Event handler for the entire game.
// All values are converted to lower case
document.onkeyup = function (event) {
    // Record the letter entered by the User
    var letter = event.key.toLowerCase();
    // If the key entered is in the current word or phrase, the letter has not been guessed, the && letter != " "  
    if (letterList.indexOf(letter) != -1 && correctGuess.indexOf(letter) === -1 && correctGuess.length != contain.length) {
        correctGuess.push(letter);
        console.log("correct guess: " + correctGuess);
        var showLtr = "letter" + letter;
        replaceArray = document.getElementsByClassName(showLtr);
        console.log(replaceArray);
        for (var i = 0; i < replaceArray.length; i++) {
            replaceArray[i].innerText = letter;
        }
        // Registers a wrong guess for incorrect letters that you have not yet guessed.
        // Unfortunately this condition for wrong answers not completely prevent junk answer entry, not sure is the right regex pattern or an actual library is the answer here. 
    } if (letterList.indexOf(letter) === -1 && wrongGuess.indexOf(letter) === -1 && remaining > 0 && letter.match(/[abcdefghijklmnopqrstuvwxyz]/) && letter != "f1" && letter != "f2" && letter != "f3" && letter != "f4" && letter != "f5" && letter != "f6" && letter != "f7" && letter != "f8" && letter != "f9" && letter != "f10" && letter != "f11" && letter != "f12" && letter != "alt" && letter != "printscreen") {
        wrongGuess.push(letter);
        //mark of shame variable 
        var markOfShame = document.createElement("span");
        markOfShame.innerHTML= letter;
        document.getElementById("wrongLetter").appendChild(markOfShame);
        remaining--;
        lifeBoard(remaining);
        console.log(remaining);
        console.log("wrong guess: " + wrongGuess);
        // This checks win condition. It's pretty darn nifty.
    } if (correctGuess.length === contain.length && levelIndex <= guessWords.length) {
        alert("You're on the road to flavor town!");
        wins++;
        scoreBoard(wins);
        clearLevel();
        console.log("Current Word Event ======>" + currentWord);
        console.log("wins:" + wins);

    } if (remaining === 0) {
        alert("you suck!");
    } if (wins === guessWords.length) {
        alert("you win!");
        var guy = document.getElementById("fieri");
        guy.setAttribute("src", "http://thenewportblast.com/wp-content/uploads/2015/11/guy-fieri-eating.jpg");
    }
}

//For each letter in the string 
// .slice on the string, add to new array  use .forEach 
// Add as blanks set class as letter

// When a user enters a letter in letterList the value diplayed changes from a _ to the letter for all instances within the word or phrase. 
function blankController() {
    // clear the values in the correct guess array
    
    console.log("correct guess: " + correctGuess);
    // loop through ever letter and space in letter list. If it is a space, it is not a dash. Letters Become
    for (var i = 0; i < currentWord.length; i++) {
        if (letterList[i] === " ") {
            var newBlank = document.createElement('span');
            newBlank.className = "blank";
            newBlank.innerHTML = "  ";

            document.getElementById("blanks").appendChild(newBlank);
        } else {
            var newBlank = document.createElement('span');
            newBlank.innerHTML = " _ ";
            newBlank.className = "letter" + letterList[i] +" blank";
            document.getElementById("blanks").appendChild(newBlank);
        }
    }
}

// This class is supposed to refresh all of the variables
function clearLevel() {
    // contain = [];

    // if wins is less than guess words length
    if (wins === guessWords.length) {
        return;
    } else {
        var myNode = document.getElementById("blanks");
        letterList = [];
        correctGuess = [];
        wrongGuess = [];
        console.log("IN CLEARLEVEL" + myNode + "letterList " + letterList);

        var myNode = document.getElementById("blanks");
        var shameNode = document.getElementById("wrongLetter");
        shameNode.innerHTML = "";
        letterList = [];
        console.log("IN CLEARLEVEL" + myNode + "letterList " + letterList);
        //if (wins < guessWords.length) {
        myNode.innerHTML = "";
        currentWord = getGuessWord();
        for (var i = 0; i < currentWord.length; i++) {
            var ltr = currentWord.substr(i, 1);
            letterList.push(ltr);
        }
    }
    var guy = document.getElementById("fieri");
    guy.setAttribute("src", "https://images.firstwefeast.com/complex/image/upload/f_auto,fl_lossy,q_auto,w_1200/wozgldlurkwvshzkwc5f")
    blankController();
}

blankController();

