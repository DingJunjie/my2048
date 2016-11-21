var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0, starty = 0, endx = 0, endy = 0;

$(document).ready(function() {
	prepareForMobile();
	newgame();

	$("body").click(function() {
		$("#bg").toggleClass('onSwitch');
	})
})

function prepareForMobile() {
	if(documentWidth >500) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}

	$("#grid-container").css({
		'width': gridContainerWidth - 2*cellSpace,
		'height': gridContainerWidth - 2*cellSpace,
		'padding': cellSpace,
		'border-radius': 0.02*gridContainerWidth
	});
	$(".grid-cell").css({
		'width': cellSideLength,
		'height': cellSideLength,
		'border-radius': 0.02*cellSideLength
	});
}

//初始化——生成两个（生成函数）——输入操作（获取输入，响应输入（判断是否能移动，移动（纯移动或相加）））

function newgame() {
	//初始化棋盘
	init();
	score = 0;
	updateScore(score);
	//随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css({'top': getPosTop(i, j), 'left': getPosLeft(i, j)});
		}
	}

	for(var i=0; i<4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j=0; j<4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();
}

function updateBoardView() {
	$(".number-cell").remove();
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'""></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if(board[i][j] == 0 ) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css({'top':getPosTop(i,j)+cellSideLength/2, 'left':getPosLeft(i,j)+cellSideLength/2});
			}else {
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css({'top':getPosTop(i,j), 'left':getPosLeft(i,j), 'background-color':getNumberBackgroundColor(board[i][j]), 'color':getNumberColor(board[i][j])});
				theNumberCell.text(board[i][j]);

			}
			hasConflicted[i][j] = false;
		}
		$('.number-cell').css('line-height', cellSideLength+'px');
		$('.number-cell').css('font-size', 0.6*cellSideLength+'px');
		$('.number-cell').css('border-radius', 0.02*cellSideLength + 'px');
	}
}

function generateOneNumber() {
	if(nospace( board )) {
		return false;
	}

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	while(true) {
		if(board[randx][randy] == 0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
	}
	//随机一个数字
	var randNum = Math.random() < 0.5 ? 2 : 4;

	//显示数字
	board[randx][randy] = randNum;
	showNumberWithAnimation(randx, randy, randNum);
	return true;
}

$(document).keydown(function(event) {
	event.preventDefault();
	switch(event.keyCode) {
		case 37: //left
			if(moveLeft()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
				
			}
			break;
		case 38: //up
			if(moveUp()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
			};
			break;
		case 39: //right
			if(moveRight()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
			};
			break;
		case 40: //down
			if(moveDown()) {
				setTimeout(function() {
					generateOneNumber();
					
				},200);
			};
			break;
		default:
			break;
	}
})

document.addEventListener('touchstart', function(event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageX;
})

document.addEventListener('touchmove', function(event) {
	event.preventDefault();
})

document.addEventListener('touchend', function(event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1 * documentWidth) {
		console.log('no moving');
		return;
	}

	if(Math.abs(deltax) >= Math.abs(deltay)) {
		if(deltax > 0) {
			//right
			if(moveRight()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
			};
		}else {
			//left
			if(moveLeft()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
				
			}
		}
	}else {
		if(deltay > 0) {
			//down
			if(moveDown()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
			};
		}else {
			//up
			if(moveUp()) {
				setTimeout(function() {
					generateOneNumber();
					isgameover();
				},200);
			};
		}
	}
})

function isgameover() {
	//var flag = false;
	if(canMoveLeft(board) == false && canMoveRight(board) == false && canMoveUp(board) == false && canMoveDown(board) == false) {
		if(confirm('游戏结束，再来一发吗?')) {
			init();
			score = 0;
			updateScore(score);
			generateOneNumber();
			generateOneNumber();
		}
	}
}

function moveLeft() {
	if( !canMoveLeft(board)) {
		console.log('can\'t move left');
		return false;
	}
	for(var i=0; i<4; i++) {
		for(var j=1; j<4; j++) {
			if(board[i][j] != 0) {
				for(var k=0; k<j; k++) {
					if( board[i][k] == 0 && noBlockHorizontal( i, k, j, board, 'l')) {
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board, 'l') && hasConflicted[i][k] == false) {						
						//move
						console.log('left added');
						showMoveAnimation(i, j, i, k);
						//plus
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] == true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
		//console.log(board);
	},200);
	return true;
}

function moveRight() {
	if( !canMoveRight(board)) {
		console.log('can\'t move right')
		return false;
	}
	for(var i=0; i<4; i++) {
		for(var j=2; j>=0; j--) {
			if(board[i][j] != 0) {
				for(var k=3; k>j; k--) {
					if( board[i][k] == 0 && noBlockHorizontal( i, k, j, board, 'r')) {
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board, 'r') && hasConflicted[i][k] == false) {						
						//move
						console.log('added');
						showMoveAnimation(i, j, i, k);
						//plus
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
		//console.log(board);
	},200)
	return true;
}

function moveUp() {
	if( !canMoveUp(board)) {
		console.log('can\'t move up');
		return false;
	}
	for(var j=0; j<4; j++) {
		for(var i=1; i<4; i++) {
			if(board[i][j] != 0) {
				for(var k=0; k<i; k++) {
					if( board[k][j] == 0 && noBlockVertical( j, k, i, board, 'u')) {
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board, 'u') && hasConflicted[k][j] == false) {						
						//move
						console.log('up added');
						showMoveAnimation(i, j, k, j);
						//plus
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
		//console.log(board);
	},200);
	return true;
}

function moveDown() {
	if( !canMoveDown(board)) {
		console.log('can\'t move down');
		return false;
	}
	for(var j=0; j<4; j++) {
		for(var i=2; i>=0; i--) {
			if(board[i][j] != 0) {
				for(var k=3; k>i; k--) {
					if( board[k][j] == 0 && noBlockVertical( j, k, i, board, 'd')) {
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board, 'd') && hasConflicted[k][j] == false) {						
						//move
						console.log('up added');
						showMoveAnimation(i, j, k, j);
						//plus
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(function() {
		updateBoardView();
		//console.log(board);
	},200);
	return true;
}



