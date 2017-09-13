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
var words = ['Obiwan Kenobi', 'Anakin Skywalker', 'Luke Skywalker', 'Wat Tambor', 'Jango Fett', 'Padme Amidala', 'Sebulba', 'Admiral Motti', 'Uncle Owen', 'Admiral Firmus Piett', 'Count Dooku', 'Admiral Ackbar', 'Ponda Baba', 'Jar Jar Binks', 'Darth Vader', 'Darth Maul', 'Emperor Palpatine', 'Mace Windu', 'Yoda', 'Boba Fett', 'General Grievous', 'Nute Gunray', 'Greedo', 'Han Solo', 'Chewbacca', 'R Two DTwo', 'C Three PO', 'Jabba the Hutt', 'Qui Gon Jinn', 'Princess Leia', 'Leia Skywalker', 'Leia Organa', 'Darth Sidious', 'Palpatine', 'Shmi Skywalker', 'Supreme Leader Snoke', 'Quinlan Vos' ];
//Array that holds all unique letters in chosen word
var uniqueLetters = [];
//Array that holds the letters and order of the selected Word
var selectedWordArray = [];
var playing = false;
//Number of correct and incorrect guesses remaining.
var correctGuesses;
var incorrectGuesses;
//Percentage variables for lightsaber increases
var obiwanPercentage = 0;
var obiwanPercentageIncrease = 0;
var vaderPercentage = 0;
var vaderPercentageIncrease = 0;
//Wins, Losses, and Games Played variables
var wins = 0;
var losses = 0;
var gamesplayed = 0;
//Variable that stores the users guess
var userGuess;
//Array that holds all guessed letters so they can't be guessed twice.
var guessedLetters = [];

//Audio file variables
var starwarsthemeSFX = document.createElement('audio');
	starwarsthemeSFX.setAttribute("src", "assets/sounds/Star_Wars_552.mp3");
var hansoloSFX = document.createElement('audio');
	hansoloSFX.setAttribute("src", "assets/sounds/hansolo_badfeeling.wav");


//Game Functions
//*********************************************

//This function runs when the user clicks start game or play again
function beginGame(){
	//Resets game variables
	uniqueLetters = [];
	selectedWordArray = [];
	incorrectGuesses = 8;
	guessedLetters = [];
	vaderPercentage = 0;
	obiwanPercentage = 0;
	//Start Playing  the theme music
	starwarsthemeSFX.play();
	//The user begins playing the game.
	playing = true;
	//Select a random word from the words array
	var selectedWord = words[Math.floor(Math.random() * words.length)];
	//Convert all the letters to Uppercase
	selectedWord = selectedWord.toUpperCase();
	//Store selected word into an array
	selectedWordArray = selectedWord.split("");
	//Empty Current Word conatiner if any.
	document.getElementById('letter-display-text').innerHTML = "";
	//Reset Lightsaber graphics
	$('.lightsaber-left .plasma-inner').css('display', 'none');
	$('.lightsaber-left .plasma-inner').css('height', '0%');

	$('.lightsaber-right .plasma-inner').css('display', 'none');
	$('.lightsaber-right .plasma-inner').css('height', '0%');

	//Reset Guesses
	$('.alphabet h1 span').css('opacity', '0.2');
	//Set Button Text to play again.
	$('button').text('PLAY AGAIN');
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
	//Set the Lightsaber Percentage Variables
	obiwanPercentageIncrease = 100 / correctGuesses;
	vaderPercentageIncrease = 100 / incorrectGuesses;

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
	console.log("newguess: " + newguess);
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
		console.log(uniqueLetters.indexOf(letter));
		console.log(letter + " is correct.");
		displayCorrectLetter();
		displayGuesses(letter);
		increaseObiwan();
		console.log("after correct");
		if (correctGuesses == 0){
			playing = false;
			console.log("congrats you won the game.");
			wins++;
			updateStats();
			playing = false;
			warpSpeed();
			$('#game-display').fadeOut(1000);
			$('header').fadeOut(1000);
			setTimeout(function(){
				warpSpeed()
				$('#game-display').fadeIn(2000);
				$('header').fadeIn(2000);
			}, 5000);
		}
	} else {
		incorrectGuesses -= 1;
		console.log(uniqueLetters.indexOf(letter));
		console.log(letter + " is NOT correct.");
		displayGuesses(letter);
		increaseVader();
		if (incorrectGuesses == 0){
			console.log("sorry you lost the game.");
			//Display the Play Again Display
			losses++;
			updateStats();
			playing = false;
			warpSpeed();
			$('#game-display').fadeOut(1000);
			$('header').fadeOut(1000);
			setTimeout(function(){
				warpSpeed()
				$('#game-display').fadeIn(2000);
				$('header').fadeIn(2000);
			}, 5000);
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

function increaseObiwan(){
	obiwanPercentage = obiwanPercentage + obiwanPercentageIncrease;
	$('.lightsaber-left .plasma-inner').css('display', 'block');
	$('.lightsaber-left .plasma-inner').css('height', obiwanPercentage + '%');
	
	var lightsaberSFX1 = document.createElement('audio');
	lightsaberSFX1.setAttribute("src", "assets/sounds/lightsaber_01.mp3");
	lightsaberSFX1.play();
}

function increaseVader() {
	vaderPercentage = vaderPercentage + vaderPercentageIncrease;
	$('.lightsaber-right .plasma-inner').css('display', 'block');
	$('.lightsaber-right .plasma-inner').css('height', vaderPercentage + '%');
	var lightsaberSFX2 = document.createElement('audio');
	lightsaberSFX2.setAttribute("src", "assets/sounds/lightsaber_02.wav");
	lightsaberSFX2.play();
}

function endGame(){

}

//



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

//User  clicks on Millenium Falcon
//Show instructions and play Han Solo Sound
$('header img').hover( function(){
	$('.positioned-alert').css('opacity', 1);
	hansoloSFX.play();
}, function(){
	$('.positioned-alert').css('opacity', 0);
})



//Star Background js from @nodws on codepen
//based on an Example by @curran
window.requestAnimFrame = (function(){   return  window.requestAnimationFrame})();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");

var numStars = 1900;
var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
var focalLength = canvas.width *2;
var warp = 0;
var centerX, centerY;

var stars = [], star;
var i;

var animate = true;

initializeStars();

function executeFrame(){
  
  if(animate)
    requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars(){
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  
  stars = [];
  for(i = 0; i < numStars; i++){
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: '0.'+Math.floor(Math.random() * 99) + 1
    };
    stars.push(star);
  }
}

function moveStars(){
  for(i = 0; i < numStars; i++){
    star = stars[i];
    star.z--;
    
    if(star.z <= 0){
      star.z = canvas.width;
    }
  }
}

function drawStars(){
  var pixelX, pixelY, pixelRadius;
  
  // Resize to the screen
  if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }
  if(warp==0)
  {c.fillStyle = "rgba(0,10,20,1)";
  c.fillRect(0,0, canvas.width, canvas.height);}
  c.fillStyle = "rgba(209, 255, 255, "+radius+")";
  for(i = 0; i < numStars; i++){
    star = stars[i];
    
    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength / star.z);
    
    c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
    //c.fill();
  }
}

function warpSpeed() {
window.warp = window.warp==1 ? 0 : 1;
window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
executeFrame();
}

executeFrame();










