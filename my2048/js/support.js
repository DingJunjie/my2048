var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;


function getPosTop(i, j) {
	return cellSpace + i*(cellSpace+cellSideLength);
}

function getPosLeft(i, j) {
	return cellSpace + j*(cellSpace+cellSideLength);
}

function getNumberBackgroundColor(number) {
	switch(number) {
		case 2: return "#848"; break;
		case 4: return "#959"; break;
		case 8: return "#c31"; break;
		case 16: return "#72b"; break;
		case 32: return "#89c"; break;
		case 64: return "#336"; break;
		case 128: return "#9f2"; break;
		case 256: return "#d5a"; break;
		case 512: return "#9a9"; break;
		case 1024: return "#f37"; break;
		case 2048: return "#ede"; break;
		case 4096: return "#9ff"; break;
		case 8192: return "#fff"; break;
	}

	return 'black';
}

function getNumberColor(number) {
	switch(number) {
		case 2:
			return "#8cf"; break;
		case 4:
			return "#7be"; break;
		case 8:
			return "#6ad"; break;
		case 16:
			return "#59c"; break;
		case 32:
			return "#48b"; break;
		case 64:
			return "#37a"; break;
		case 128:
			return "#269"; break;
		case 256:
			return "#158"; break;
		case 512:
			return "#147"; break;
		case 1024:
			return "#136"; break;
		case 2048:
			return "#024"; break;
		case 4096:
			return "#012"; break;
		case 8192:
			return "#000"; break;
	}

	return white;
}

function nospace( board ) {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if( board[i][j] == 0 ) {
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft( board ) {
	//左边是否没有数字
	//左边是否和自身相同
	for(var i=0; i<4; i++) {
		for(var j=1; j<4; j++) {
			if(board[i][j] != 0) {
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight( board ) {
	for(var i=0; i<4; i++) {
		for(var j=2; j>=0; j--) {
			if(board[i][j] != 0) {
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp( board ) {
	for(var j=0; j<4; j++) {
		for(var i=1; i<4; i++) {
			if(board[i][j] != 0) {
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown( board ) {
	for(var j=0; j<4; j++) {
		for(var i=2; i>=0; i--) {
			if(board[i][j] != 0) {
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

//i k j 0 3
function noBlockHorizontal(row, col1, col2, board, direction) {
	if(direction == 'l') {
		if(col2 == col1+1) {
			return true;
		}
		for(var i = col1+1; i< col2; i++) {
			if(board[row][i] != 0 ) {
				console.log('blocked');
				return false;
			}else {
				console.log('no blocking');
				return true;
			}
		}
	}else if(direction == 'r') {
		if(col1 == col2+1) {
			return true;
		}
		for(var i = col1-1; i>= col2; i--) {
			if(board[row][i] != 0) {
				console.log('blocked');
				return false;
			}else {
				console.log('no blocking');
				return true;
			}
		}
	}
}

function noBlockVertical(j, k, i, board, direction) {
	if(direction == 'u') {
		if(k == i-1) {
			return true;
		}
		for(var m=k+1; m<i; m++) {
			if(board[m][j] != 0) {
				return false;
			}else {
				return true;
			}
		}
	}else if(direction == 'd') {
		if(k == i+1) {
			return true;
		}
		for(var n=k-1; n>i; n--) {
			if(board[n][j] != 0) {
				return false;
			}else {
				return true;
			}
		}
	}
}


// function noBlockHorizontal( row , col1 , col2 , board ){
//     for( var i = col1 + 1 ; i < col2 ; i ++ )
//         if( board[row][i] != 0 )
//             return false;
//     return true;
// }

// function noBlockVertical( col , row1 , row2 , board ){
//     for( var i = row1 + 1 ; i < row2 ; i ++ )
//         if( board[i][col] != 0 )
//             return false;
//     return true;
// }


