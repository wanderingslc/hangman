
// JavaScript Document
var words = ["BOO", "DOG", "APPLE", "MONKEY", "TROUT", "COWPIE"];
var currentWord = null;
var initGame = function() {
    //if it is null we are in the first game, or we have played 
    //through all of the words and so we should loop back to 0
    if ((currentWord == null) || (currentWord == words.length - 1)) {
        currentWord = 0;
    } else {
        currentWord++;
    }
    
    var wordToGuess = words[currentWord];
    var lettersToGuess = wordToGuess.split("");
    var correctGuesses = [];
    var wrongGuesses = [];
    
    var $bodyParts = $(".HangingMan > div").hide();
    var maxWrongGuesses = $bodyParts.length;
    var $guessedLetters = $(".GuessedLetters").empty();
    var $wrongLetters = $(".WrongLetters").empty().hide();
    var $letterInput = $(".LetterInput").blur();
    
    var blankLetters = lettersToGuess.map(function(){
        var blank = $("<span />").html("_")
        $guessedLetters.append(blank);
        return blank;
    });
    
    $letterInput.off("keyup").on("keyup", function(){
        //"this" refers to the input element
        var $el = $(this);
        var guess = $el.val().toUpperCase();
        var matches = [];
        lettersToGuess.forEach(function(letter, i) {
            //not only do we want to make sure the letter matches
            //but we need to ensure they have not already guessed it previously
            if (letter == guess && correctGuesses.indexOf(guess) == -1) {
                matches.push(guess);
                blankLetters[i].text(guess);
            }
        });
        if (matches.length) {
            //we need to make sure that correctGuesses contains
            //all of the matched letters even if they are duplicates
            matches.forEach(function(match) { 
                correctGuesses.push(guess);
            });
            //they matched a letter, so let us reward them
            if(correctGuesses.length == lettersToGuess.length) {
                //they beat the game, so let us alert them
                if(confirm("Yay jerry! play again?")) {
                    initGame();
                }
            }
        } else if((correctGuesses.indexOf(guess) > -1) || (wrongGuesses.indexOf(guess) > -1)) {
            //technically they were not wrong, just not attentive
            
        } else {
            //they guessed wrong, so record it and do stuff
            wrongGuesses.push(guess);
            $wrongLetters.append($("<span />").text(guess)).show();
            
            //update the hanging man display
            $($bodyParts[wrongGuesses.length - 1]).show();
            
            if (wrongGuesses.length  == maxWrongGuesses) {
                //they have made the maximum amount of wrong guesses
                //so lets show them the game over-ness
                if(confirm("Game over: play again?")) {
                    initGame()
                }
            }
        }
        $el.val("");
    });
};

initGame();