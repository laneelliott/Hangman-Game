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

//Array of available words
var words = ['Sarah', 'Lane', 'Drew', 'Chicago'];
var uniqueLetters = [];
var selectedWordArray = [];
var playing = true;
//Number of correct and incorrect guesses remaining.
var userGuess;
var correctGuesses;
var incorrectGuesses = 10;

//This function runs when the user clicks start game or play again
var beginGame = function(){
	//The user begins playing the game.
	playing = true;
	//Select a random word from the words array
	var selectedWord = words[Math.floor(Math.random() * words.length)];
	//Convert all the letters to Uppercase
	selectedWord = selectedWord.toUpperCase();
	//Store selected word into an array
	var selectedWordArray = selectedWord.split("");
	//Store Unique Letters in array
	for ( var i = 0; i < selectedWordArray.length; i++ ) {
		if ( uniqueLetters.indexOf(selectedWordArray[i]) == -1 ) {
			uniqueLetters[uniqueLetters.length] = selectedWordArray[i];
		}
	}
	//Set number of correctGuesses  for winning purposes
	correctGuesses = uniqueLetters.length;

	//POPULATE VISUAL CUES BASED ON selectedWordArray.length
}

//This function runs when the user presses a key
var userGuessLogic = function(letter){
	console.log('userGuessLogic: ' + letter);
}

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





