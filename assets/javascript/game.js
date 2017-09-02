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

