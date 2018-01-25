/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, twoSix;

init();

//function annonymus

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//1. random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var secondDice = Math.floor(Math.random() * 6) + 1;
		
		//2. Display the result
		var diceDom = document.querySelector('.dice');
		var secondDiceDom = document.querySelector('.secondDice');
		diceDom.style.display = 'block';
		secondDiceDom.style.display = 'block';
		diceDom.src = 'dice-' + dice + '.png';
		secondDiceDom.src = 'dice-' + secondDice + '.png';
		//3. Update the roundScores if not a number 1
		if (dice === 6 && twoSix === 6) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			nextPlayer();
		} else if (dice !== 1 && secondDice !== 1) {
			//add scoreive
			roundScore += dice + secondDice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			} else {
			//next player
			nextPlayer();
			}	
		twoSix = dice;
		console.log(twoSix);
	}
		
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//Add CURRENT score to Global Score
		scores[activePlayer] += roundScore;

		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.writeValue').value;
		console.log(input);
		var winingScore;
		if (input) {
			winingScore = input;
		} else {
			winingScore = 100;
		}
		//Check if player won the game
		if (scores[activePlayer] >= winingScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.btn-roll').style.disabled;
			gamePlaying = false;
		} else {
			//Next player
		nextPlayer();
		}
	}		
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
		
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.secondDice').style.display = 'none';
		
//		document.querySelector('.player-0-panel').classList.remove('active');
//		document.querySelector('.player-1-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';
document.querySelector('.secondDice').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');
	gamePlaying = true;
}



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);

//function callback
//function htn() {
//	//do something
//}
//
//document.querySelector('.btn-roll').addEventListener('click', btn);