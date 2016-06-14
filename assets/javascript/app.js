var triviaNum = 0
var test;
var question;
var choice;
var choices;
var chA;
var chB;
var chC;
var chD; 
var correct = 0;
var time = 30;
var counter;
var questions = [
	["In what cartoon short did Daffy Duck first appear?", "Rabbit Fire", "Rabbit Seasoning", "Porky\'s Duck Hunt", "Daffy Duck in Hollywood", "C"],
	["What was Elmer Fudd's original name?", "Egghead", "Baldy", "Cueball", "Shorty", "A"],
	["When was the first Bugs Bunny cartoon made?", "1945", "1952", "1939", "1923", "C"],
	["Who provided the voice for Pepe Le Pew?", "Mel Blanc", "Tex Avery", "Charles Jones", "Maurice LaMarche", "A"],
	["Wile E. Coyote buys his traps and gadgets from what company?", "Acme", "Amazon", "TrapsRUs", "Cordant", "A"]
];

function run(){
	counter = setInterval(decrement, 1000);
}

function decrement(){
	time--;
	$('#timer').html('<h2>' + "Time Remaining: " + time + '</h2>');
	if (time === 0) {
		stop();
		$('#submit').empty();
		$('#choice1').empty().append('<br>' + "Time is up!" + '<br>' + '<img src="assets/images/daffyPorky.gif" />');	
		$('#choice2').empty();
		$('#choice3').empty();
		$('#choice4').empty();
		$('#question').empty();
		setTimeout(renderQuestion, 3 *1000);
		triviaNum++;
		stop();
		reset();
	}
}

function stop(){
	clearInterval(counter);
}

function reset(){
	time = 30;
	run();
}

function _(x){
	return document.getElementById(x);
}
function renderQuestion(){
	test = _("test");
	$('#test').empty();
	if(triviaNum >= questions.length){
		test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
		triviaNum = 0;
		correct = 0;
		$('#choice1').empty();	
		$('#choice2').empty();
		$('#choice3').empty();
		$('#choice4').empty();
		$('#question').empty();
		$('#submit').empty();
		stop();
		$('#test').append("<button onclick='renderQuestion()'>Play Again</button>")
		return false;
		stop();
	}
	question = questions[triviaNum][0];
	chA = questions[triviaNum][1];
	chB = questions[triviaNum][2];
	chC = questions[triviaNum][3];
	chD = questions[triviaNum][4];
	$('#question').html(question);
	$('#choice1').html("<input type='radio' name='choices' value='A'> "+chA+"<br>");
	$('#choice2').html("<input type='radio' name='choices' value='B'> "+chB+"<br>");
	$('#choice3').html("<input type='radio' name='choices' value='C'> "+chC+"<br>");
	$('#choice4').html("<input type='radio' name='choices' value='D'> "+chD+"<br>");
	$('#submit').empty().append("<button onclick='checkAnswer()'>Submit Answer</button>");
}

function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
	}
	if(choice == questions[triviaNum][5]){
		correct++;
		$('#submit').on('click', function() {
			$('#submit').empty();
			$('#choice1').empty().append('<br>' + "Correct!" + '<br>' + '<img src="assets/images/bugsHorse.gif" />');	
			$('#choice2').empty();
			$('#choice3').empty();
			$('#choice4').empty();
			$('#question').empty();
			setTimeout(renderQuestion, 3 *1000);
		});
	} else if (choice !== questions[triviaNum][5]){
		$('#submit').on('click', function() {
			$('#submit').empty();
			$('#choice1').empty().append('<br>' + "Wrong. The Correct answer was " + questions[triviaNum-1][5] + '<br>' + '<img src="assets/images/daffyPorky.gif" />');	
			$('#choice2').empty();
			$('#choice3').empty();
			$('#choice4').empty();
			$('#question').empty();
			setTimeout(renderQuestion, 3 *1000);
		});
	}
	triviaNum++;
	renderQuestion();
	stop();
	reset();
}

$('#startButton').on('click', function() {
	$(this).remove();
	renderQuestion();
	run();
});