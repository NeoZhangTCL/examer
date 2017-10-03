var qNum;
var list = [];
var visit = []

$("#description").val(examdatabase.description);

$("body").keydown(function(e) {
	if(e.keyCode == 37) { getQPrev(); }
	else if(e.keyCode == 39) { getQNext(); }
	else if(e.keyCode == 40) { getQRandom(); }
	else if(e.keyCode == 13) { getA(); }
	else if(e.keyCode == 77) { mark(); }
	else if(e.keyCode == 71) { go(); }
});

$("#getQPrev").click(function(){getQPrev()});

$("#getQRandom").click(function(){getQRandom()});

$("#getQNext").click(function(){getQNext()});

$("#getA").click(function(){getA()});

$("#mark").click(function(){mark()});

$("#go").click(function(){go()});

function go(){
	qNum = parseInt($("#qNO").val());
	$("#question").val(examdatabase.questions[qNum].question);
	$("#answer").val("");
	showMark();
}

function getQPrev(){
	if (qNum != null && qNum != 0){
		qNum--;
	}
	else{
		qNum = 172;
	}
	$("#question").val(examdatabase.questions[qNum].question);
	$("#answer").val("");
	$("#qNO").val(qNum);
	showMark();
}

function getQRandom(){
	if (visit.length == 173){
		alert("You have finished all 173 questions randomly!");
		visit = [];
	}
	do{
		qNum = getRandomInt(0, examdatabase.questions.length-1);
	}while(visit.indexOf(qNum)!=-1);
	visit.push(qNum);
	console.log(visit);
	$("#question").val(examdatabase.questions[qNum].question);
	$("#answer").val(" ");
	$("#qNO").val(qNum);
	showMark();
}

function getQNext(){
	if (qNum != null && qNum != 173){
		qNum++;
	}
	else{
		qNum = 0;
	}
	$("#question").val(examdatabase.questions[qNum].question);
	$("#answer").val("");
	$("#qNO").val(qNum);
	showMark();
}

function getA(){
	var ans = examdatabase.questions[qNum].answer;
	var answer = "";
	if (Array.isArray(ans)){
		for (var answ in ans){
			answer = answer + ans[answ] + "\n\n";
		}
	}
	else{
		answer = ans;
	}
	$("#answer").val(answer);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mark(){
	var index = list.indexOf(qNum);
	// console.log(index);
	if (index == -1){
		list.push(qNum);
	}
	else{
		list.splice(index,1);
	}
	// console.log(list);
	showMark();
	list.sort((a, b) => a - b);
	$("#markedList").html(list.join(", "));
}

function showMark(){
	var index = list.indexOf(qNum);
	if (index == -1){
		$("#mark").html("Mark(m)");
	}
	else{
		$("#mark").html("Unmark(m)");
	}
}
