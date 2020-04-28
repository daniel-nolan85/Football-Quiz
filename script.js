// init score
let score = 0;

// check if user guess matches the correct answer
$(".container").on("click", ".guess", function(e) {
    let container = $(e.target).closest(".container");
    let userGuess = $(container).find(".attempt").val();
    let userFinalGuess = userGuess.toLowerCase();
    let correctGuess = $(container).find("div.correct-answer").text();
    if (userFinalGuess === correctGuess) {
        $(container).find('.hide-2').removeClass('hide-2');
        $(container).find('.image, .button, .box, .clues').remove();
        $(container).find('.intro').html('<h2 style="color: green; margin-top: -10px; margin-bottom: 10px; font-size: 2rem;">Correct!</h2>');
        score+=5;
    // calculate score based on number of guesses
    } if (cluesUsed === 3) {
        score -= 4;
        cluesUsed -=3;
    } else if (cluesUsed === 2) {
        score -= 3;
        cluesUsed -=2;
    } else if (cluesUsed === 1) {
        score -= 2;
        cluesUsed -= 1;
    } else if (cluesUsed === 0) {
        score += 0;
    }
    // if incorrect
    // show user they are close
    if (lev(userFinalGuess, correctGuess) < 5) {
        $(container).find('.guess').html('Close').addClass('nearly');
        setTimeout(function() {
            $(container).find('.guess').html('Guess').removeClass('nearly');
            }, 1000);
    // clear attempt if very wrong
    } else if ((lev(userFinalGuess, correctGuess) >= 5)) {
        $(container).find('.attempt').val('');
        $(container).find('.guess').html('Try again').addClass('wrong');
        setTimeout(function() {
            $(container).find('.guess').html('Guess').removeClass('wrong');
        }, 1000);
    }
});

// calculate the Levenshtein distance for incorrect guesses
function lev(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];

    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i-1) == a.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1,
                                Math.min(matrix[i][j-1] + 1,
                                    matrix[i-1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
} 

let buttonCount = 0;
let cluesUsed = 0;
// reveal clues on click
$(".container").on("click", ".help", function(e) {
    let container = $(e.target).closest(".container");
    $(container).find(".hide-1:first").removeClass("hide-1");
    cluesUsed++;
    if (0 === $(container).find(".hide-1:first").length) {
        $(container).find('.help').text('Give up?');
        buttonCount++;
        // reveal answer if user gives up
        } if (buttonCount === 2) {
            $(container).find('.hide-2').removeClass('hide-2');
            $(container).find('.image, .button, .box, .clues, .intro').remove();
            // reset counters
            buttonCount -=2;
            cluesUsed -=4;
        }     
});


let scoreBtn = document.querySelector('#results');
scoreBtn.addEventListener('click', scoreCard);

function scoreCard() {
    scoreBtn.remove();
    document.getElementById('results-intro').remove();
    document.getElementById('final').style.display = "inline";
    document.getElementById('result').style.display = "inline";
    document.getElementById('retake').style.display = "inline";

    let finalScore = document.createElement('p');
    finalScore.innerHTML = 'You got ' + score + ' out of 50 right!';
    document.getElementById('final').appendChild(finalScore);
    // show results
    if (score < 13) {
        let badScore = document.createElement('p');
        badScore.innerHTML = 'Get in the rubbish chin!' + '<br>' + '<img src="images/badscore.gif" width=450 style="margin-top: 15px;">';
        document.getElementById('result').appendChild(badScore);
    } else if ((score >= 13) && (score <= 25)) {
        let avgScore = document.createElement('p');
        avgScore.innerHTML = 'You\'re looking like a bit of a has chin these days!' + '<br>' + '<img src="images/avgscore.gif" width=450 style="margin-top: 15px;">';
        document.getElementById('result').appendChild(avgScore);
    } else if ((score > 25) && (score < 37)) {
        let goodScore = document.createElement('p');
        goodScore.innerHTML = 'Clearly you have chin around the block a few times!' + '<br>' + '<img src="images/goodscore.gif" width=450 style="margin-top: 15px;">';
        document.getElementById('result').appendChild(goodScore);
    } else if ((score >= 37) && (score < 50)) {
        let greatScore = document.createElement('p');
        greatScore.innerHTML = 'Right in the top chins!' + '<br>' + '<img src="images/greatscore.gif" width=450 style="margin-top: 15px;">';
        document.getElementById('result').appendChild(greatScore);
    } else {
        let perfectScore = document.createElement('p');
        perfectScore.innerHTML = 'All you do is chin chin chin no matter what!' + '<br>' + '<img src="images/perfectscore.gif" width=450 style="margin-top: 15px;"">';
        document.getElementById('result').appendChild(perfectScore);
    }    
}