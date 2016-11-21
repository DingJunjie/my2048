function showNumberWithAnimation(i, j, randNum) {
	var numberCell = $('#number-cell-'+i+'-'+j);
	numberCell.css({'background-color': getNumberBackgroundColor(randNum), 'color': getNumberColor(randNum)});
	numberCell.text(randNum);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i, j),
		left:getPosLeft(i, j)
	}, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy) {
	//$('*:animated').stop(true);
	var numberCell = $('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox, toy),
		left:getPosLeft(tox, toy)
	}, 200);
}

function updateScore(score) {
	$("#score").text(score);
}