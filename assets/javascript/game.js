/*
0. Pre Game
	- Pull in array of potential words.
1. Begin Game
	- Randomly select an index from the array.
	- Store word in an array
	- Store unique letters in an array
		- Store number of unique letters in a variable
	- Set number of incorrectGuesses as a variable 
	- Populate Visual Cues based on the number of letters in the word.
2. User Guesses
	- User presses a key to enter a guess.
		- Check the guessed letters array
			- If the letter IS NOT in the guessed letters array
				- Add the letter to guessed letters array
				- Run the correctGuess function
			-If the letter IS in the guessed letters array
				- Display message that this letter has been guessed
	- Check the word array for the guess (correctGuess)
		- If the letter IS found in the array
			- Display the letter as a correct Guess
			- Decrease unique letters variable by 1
		- If the letter IS NOT found in the array
			- Display next animation or visual cue for incorrect guess
			- Decrease incorrectGuesses variable by 1
3. End Game
	- If unique letters variable = 0 then display user won
	- If incorrectGuesses variable = 0 then display user lost
	- Prompt user to play again -> Jump to Begin Game function.
*/

//Global Variables
//*********************************************
//Array of available words
var words = ['Obiwan Kenobi', 'Anakin Skywalker', 'Luke Skywalker'];
//Array that holds all unique letters in chosen word
var uniqueLetters = [];
//Array that holds the letters and order of the selected Word
var selectedWordArray = [];
var playing = false;
//Number of correct and incorrect guesses remaining.
var correctGuesses;
var incorrectGuesses = 5;
//Wins, Losses, and Games Played variables
var wins = 0;
var losses = 0;
var gamesplayed = 0;
//Variable that stores the users guess
var userGuess;
//Array that holds all guessed letters so they can't be guessed twice.
var guessedLetters = [];



//Game Functions
//*********************************************

//This function runs when the user clicks start game or play again
function beginGame(){
	//Resets game variables
	uniqueLetters = [];
	selectedWordArray = [];
	incorrectGuesses = 10;
	guessedLetters = [];
	//The user begins playing the game.
	playing = true;
	//Select a random word from the words array
	var selectedWord = words[Math.floor(Math.random() * words.length)];
	//Convert all the letters to Uppercase
	selectedWord = selectedWord.toUpperCase();
	//Store selected word into an array
	selectedWordArray = selectedWord.split("");
	//Store Unique Letters in array
	for ( var i = 0; i < selectedWordArray.length; i++ ) {
		//Populate the letter-display div
		var parentH1 = document.getElementById('letter-display-text');
		var childSpan = document.createElement('span');
		childSpan.innerHTML = '&nbsp;';
		parentH1.appendChild(childSpan);
		//Add a spacing class in the letter has no value.
		if(selectedWordArray[i] == " "){
			childSpan = parentH1.lastChild;
			childSpan.className = "space";
		}

		//Build an array of guessable letters
		if ( uniqueLetters.indexOf(selectedWordArray[i]) == -1 && selectedWord[i] !== " " ) {
			uniqueLetters[uniqueLetters.length] = selectedWordArray[i];
			//console.log(uniqueLetters);
		}
	}
	//Set number of correctGuesses  for winning purposes
	correctGuesses = uniqueLetters.length;

	//POPULATE VISUAL CUES BASED ON selectedWordArray.length
}

//This funtion is displays the correct letters guessed.
function displayCorrectLetter() {
	var parentH1 = document.getElementById('letter-display-text');
	//Remove all child spans of parentH1
	while (parentH1.firstChild) {
    	parentH1.removeChild(parentH1.firstChild);
	}
	for ( var i = 0; i < selectedWordArray.length; i++ ) {
		var childSpan = document.createElement('span');
		for(var j=0; j< guessedLetters.length; j++){
			//Populate the letter-display div if letters match.
			if(selectedWordArray[i] == guessedLetters[j]) {
				childSpan.innerHTML = guessedLetters[j];
			}
		}
		//Populate the letter-display div with a space if letters don't match.
		if(childSpan.innerHTML == ""){
			childSpan.innerHTML = '&nbsp;';
		}
		parentH1.appendChild(childSpan);
		//Add a spacing class in the letter has no value.
		if(selectedWordArray[i] == " "){
			childSpan = parentH1.lastChild;
			childSpan.className = "space";
		}
	}
}

//Change the opacity of guessed letters in the alphabet display.
function displayGuesses(letter) {
	var newguess = document.getElementById(letter.toLowerCase());
	newguess.style.opacity = 1;
}

//Updates the wins, losses, and games played display
function updateStats() {
	document.getElementById('wins').innerHTML = wins;
	document.getElementById('losses').innerHTML = losses;
	document.getElementById('gamesplayed').innerHTML = wins + losses;
}

//This function takes a unique guessed letter and determines if it is a correct or incorrect guess.
function correctOrIncorrect(letter){
	if ( uniqueLetters.indexOf(letter) !== -1 ) {
		correctGuesses -= 1;
		console.log(letter + " is correct.");
		displayCorrectLetter();
		displayGuesses(letter);
		console.log("after correct");
		if (correctGuesses == 0){
			playing = false;
			console.log("congrats you won the game.");
			wins++;
			updateStats();
		}
	} else {
		incorrectGuesses -= 1;
		console.log(letter + " is NOT correct.");
		displayGuesses(letter);
		if (incorrectGuesses == 0){
			console.log("sorry you lost the game.");
			losses++;
			updateStats();

			playing = false;
		}
	}
	console.log('guesses remaining: ' + incorrectGuesses + '  letters remaining: ' + correctGuesses);
}

//This function runs when the user presses a key
function userGuessLogic(letter){
	//Check to see if the user already guessed this letter in the guessedLetters array.
	if ( guessedLetters.indexOf(letter) == -1 ) {
		guessedLetters[guessedLetters.length] = letter;
		correctOrIncorrect(letter);
	} else {
	//Display a message if the letter was found in guessedLetters
		console.log("You already guessed that letter.")
	}
}

function endGame(){

}

//

beginGame();


document.onkeyup = function(event) {
	//If user is playing and key press is a valid letter then store letter and run urserGuessLogic()
	if (playing === true && event.keyCode >= 65 && event.keyCode <= 90) {
		userGuess = event.key.toUpperCase();
		userGuessLogic(userGuess);
	}
	else {
		//Displays message that the user already guessed this letter.
		console.log("That's not a letter dummy.")
	}
       
};





