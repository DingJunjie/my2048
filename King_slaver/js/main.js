// JavaScript Document

var game = {
	
	init : function() {
		this.bindRole();
		this.roleChoose();	
		this.setRole();
		this.role = 1;
		this.aiRole = 1;
		this.armyArr = [1,1,1,1,1];
		this.enemyArr = [1,1,1,1,1];
	},
	
	//绑定角色,0为已被消灭，1为平民，2为国王，3为奴隶，绑定在对应的卡上
	bindRole : function() {
		var roleNum;
		var eRoleNum;
		for(var i=0; i<5; i++) {
			roleNum = $("#armyOutter .card:eq('"+i+"')").data("role");
			eRoleNum = $("#enemyOutter .card:eq('"+i+"')").data("role");
			switch(roleNum) {
				case 0:
				$("#armyOutter .card:eq('"+i+"')").css("opacity",0);
				//.children(".armyState1")
				break;
				case 1:
				$('#armyOutter .card:eq("'+i+'")').css('opacity', 1);
				$("#armyOutter .card:eq('"+i+"')").children(".armyState1").text("平民");
				break;
				case 2:
				$('#armyOutter .card:eq("'+i+'")').css('opacity', 1);
				$("#armyOutter .card:eq('"+i+"')").children(".armyState1").text("国王");
				break;
				case 3:
				$('#armyOutter .card:eq("'+i+'")').css('opacity', 1);
				$("#armyOutter .card:eq('"+i+"')").children(".armyState1").text("奴隶");
				break;
			}
			switch(eRoleNum) {
				case 0:
				$("#enemyOutter .card:eq('"+i+"')").css("opacity",0);
				//.children(".armyState1")
				break;
				case 1:
				$('#enemyOutter .card:eq("'+i+'")').css('opacity', 1);
				$("#enemyOutter .card:eq('"+i+"')").children(".enemyState1").text("平民");
				break;
				case 2:
				$('#enemyOutter .card:eq("'+i+'")').css('opacity', 1);
				$("#enemyOutter .card:eq('"+i+"')").children(".enemyState1").text("国王");
				break;
				case 3:
				$('#enemyOutter .card:eq("'+i+'")').css('opacity', 1);
				$("#enemyOutter .card:eq('"+i+"')").children(".enemyState1").text("奴隶");
				break;	
			}
		}
	},
	
	//选择角色，初始化，将点击的卡片设置为对应角色
	roleChoose : function() {
		var that = this;
		$(".choose").click(function() {
			if($(this).text() == 'KING') {
				that.role = 2;	
			}else {
				that.role = 3;	
			}
			$("#roleChoose").slideUp(500);
			that.ai();
		})
		
	},
	
	//
	setRole : function() {
		var rolePos;
		var that = this;
		$("#armyOutter .card").bind("mouseover",function() {
			rolePos = $(this).index();
			$(this).data("role",that.role);
			
			console.log(rolePos);
			
			for(var i=0; i<5; i++) {
				if(i == rolePos) {
					console.log(i);
				}else {
					$("#armyOutter .card:eq('"+i+"')").data('role',1);
				}
			}
			that.bindRole();
		})
		
		$("#armyOutter .card").bind("click", function() {
			rolePos = $(this).index();
			$(this).data("role",that.role);
			that.armyArr[rolePos] = that.role;
			//-->start
			$("#armyOutter .card").unbind("mouseover").unbind("click");
			that.gameStart();
		})
	},

	enemyCardChose: function(cardPos) {
		$("#enemyOutter .card:eq('"+(cardPos)+"')").css('opacity', 0);
		this.bindRole();
	},
	
	//开始游戏，初始化
	gameStart: function() {
		var that = this;
		$("#armyOutter .card").bind("click", function() {
			var r = $(this).data('role');
			var cardSerial = $(this).index();
			//消失
			$("#armyOutter .card:eq('"+cardSerial+"')").unbind('click');
			$(this).data('role',0);
			that.chooseCard(0, cardSerial, r);
			that.aiChooseCard();
			that.bindRole();
			that.judge();
		})
	},
	
	//选择卡片,战斗
	chooseCard: function(roleType, cardSerial, r) {
		if(roleType == 0) {
			var setL = $('.cardSet:first').offset().left;
			var setT = $('.cardSet:first').offset().top;
			
			var cardW = $("#armyOutter .card:eq('"+(cardSerial)+"')").width();
			var cardH = $("#armyOutter .card:eq('"+(cardSerial)+"')").height();
			var cardL = $("#armyOutter .card:eq('"+(cardSerial)+"')").offset().left;
			var cardT = $("#armyOutter .card:eq('"+(cardSerial)+"')").offset().top;
			
			$('.cardSet:first').data('role', r);
			$(".cardSet:first").css({
				'width':cardW,
				'height':cardH,
				'left':cardL,
				'top':cardT,
				'opacity':1
			})
			
			$('.cardSet:first').animate({
				'left':setL,
				'top':setT
			},500);
			
		}else if(roleType == 1) {
			var setL = $('.cardSet:last').offset().left;
			var setT = $('.cardSet:last').offset().top;
			
			var cardW = $("#enemyOutter .card:eq('"+(cardSerial)+"')").width();
			var cardH = $("#enemyOutter .card:eq('"+(cardSerial)+"')").height();
			var cardL = $("#enemyOutter .card:eq('"+(cardSerial)+"')").offset().left;
			var cardT = $("#enemyOutter .card:eq('"+(cardSerial)+"')").offset().top;
			
			this.enemyCardChose(cardSerial);

			$('.cardSet:last').data('role', r);
			$(".cardSet:last").css({
				'width':cardW,
				'height':cardH,
				'left':cardL,
				'top':cardT,
				'opacity':1
			})
			
			$('.cardSet:last').animate({
				'left':setL,
				'top':setT
			}, 500);
		}
	},
	
	//判断胜利者
	judge: function() {
		var army = $('.cardSet:first').data('role');
		var enemy = $('.cardSet:last').data('role');
		//都是平民
		if(army == 1 && enemy == 1) {
			//alert('己方'+army+' 敌方'+enemy);
			//go on
			setTimeout(function() {
				$('.cardSet').css("opacity",0);
			},1000)
			//this.bindRole();
		}else if(army == 2 && enemy == 1 || army == 1 && enemy == 3) {
			//己方国王VS平民或者平民VS奴隶，己方胜+20
			//++20
			var myS = parseInt($('#myPoint').text()) + 20;
			//alert('己方'+army+' 敌方'+enemy);
			if(myS == 100) {
				alert('you win');
			}
			$("#myPoint").text(myS);
			this.nextGame();
		}else if(army == 3 && enemy == 1 || enemy == 2 && army == 1) {
			//己方奴隶VS平民或者己方平民VS国王，对方+20
			//e++20
			//alert('己方'+army+' 敌方'+enemy);
			var myS = parseInt($('#enemyPoint').text())+20;
			if(myS == 100) {
				alert('you lose');
			}
			$("#myPoint").text(myS);
			this.nextGame();
		}else if(army == 2 && enemy == 3) {
			//己方国王VS地方奴隶
			//e++100
			//alert('己方'+army+' 敌方'+enemy);
			alert('you lose');
		}else if(army == 3 && enemy == 2) {
			//++100	
			//alert('己方'+army+' 敌方'+enemy);
			alert('you win');
		}
	},
	
	//
	ai: function() {
		if(this.role == 2) {
			this.aiRole = 3;
		}else if(this.role == 3) {
			this.aiRole = 2;	
		}
		
		this.aiRandomCardArr(this.aiRole);
		
	},
	
	aiRandomCardArr: function(roleType) {
		var randomPos = Math.floor(Math.random()*5);
		for(var i=0; i<5; i++) {
			if(i == randomPos) {
				this.enemyArr[i] = roleType;
				$('#enemyOutter .card:eq("'+randomPos+'")').data("role", roleType);
				console.log('abcdefg' + $('#enemyOutter .card:eq("'+randomPos+'")').data("role"));
				//console.log(randomPos + ' ' + this.enemyArr);
			}else {
				this.enemyArr[i] = 1;
			}
		}
		this.bindRole();

	},
	

	aiChooseCard: function() {
		var randomNum = Math.floor(Math.random()*5);
		while(this.enemyArr[randomNum] == 0) {
			randomNum = Math.floor(Math.random()*5);
		}
		var r = $("#enemyOutter .card:eq('"+randomNum+"')").data('role');
		this.enemyCardChose(randomNum);
		this.chooseCard(1, randomNum, r);
		//$("#enemyOutter .card:eq('"+randomNum+"')").data('role', 0);
		this.enemyArr[randomNum] = 0;

		console.log(this.enemyArr);
	},
	
	nextGame: function() {
		$('.card').unbind("click");
		for(var i=0;i<5;i++) {
			$('#armyOutter .card:eq('+i+')').data('role',1);
			$('#enemyOutter .card:eq('+i+')').data('role',1);
			//$('#armyOutter .card:eq('+i+')');
		}
		$('.cardSet').css("opacity",0);
		this.ai();
		this.bindRole();
		//this.roleChoose();	
		this.setRole();

	}
	
}



$(function() {
	var winW = document.body.clientWidth;
	var winH = document.body.clientHeight;
	
	var battleAreaHeight = winH - 400;
	
	$("#battleHolder").css("height", battleAreaHeight);	
	
	
	
	function resetWin() {
		winW = document.body.clientWidth;
		winH = document.body.clientHeight;
		
		battleAreaHeight = winH - 400;
		$("#battleHolder").css("height", battleAreaHeight);
		
		setBattleCardPosition();
		setPointPosition
	}
	
	function setBattleCardPosition() {
		var cardW = $('.card').width();
		var cardH = $('.card').height();
		var armyCardLeft1 = parseInt($("#enemyOutter .card:eq(1)").offset().left);
		var armyCardLeft2 = parseInt($("#enemyOutter .card:eq(3)").offset().left);
		var cardTop = (battleAreaHeight - cardH)/2 + 200;
		$('.cardSet:first').css({
			'width':cardW,
			'height':cardH,
			'left':armyCardLeft1,
			'top':cardTop
		})
		$('.cardSet:last').css({
			'width':cardW,
			'height':cardH,
			'left':armyCardLeft2,
			'top':cardTop
		})
	}
	
	function setPointPosition() {
		var cardW = $('.card').width();
		var cardH = $('.card').height();
		
		var scoreT = (battleAreaHeight - cardH)/2;
		var left1 = parseInt($("#enemyOutter .card:eq(0)").offset().left);
		var left2 = parseInt($("#enemyOutter .card:eq(4)").offset().left);
		var vsLeft = parseInt($("#enemyOutter .card:eq(2)").offset().left);
		
		$('.point:first').css({
			'width':cardW,
			'height':cardH,
			'left':left1,
			'top':scoreT+200,
			'line-height':cardH+'px'
		});
		
		$('.point:last').css({
			'width':cardW,
			'height':cardH,
			'left':left2,
			'top':scoreT+200,
			'line-height':cardH+'px'
		})
		
		$('#vs').css({
			'width':cardW,
			'height':cardH,
			'left':vsLeft,
			'top':scoreT+200,
			'line-height':cardH+'px'
		})
	}

	setBattleCardPosition();
	setPointPosition();

	$(window).resize(function() {
		resetWin();
	});


	game.init();
})



























