// JavaScript Document

$(function() {
	var numbers = 2;
	var color_dif = 100;
	var div_str = '.div' + numbers;
	var default_color = null;
	var different_color = null;
	var color_arr = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f'];
	var color_str_1;
	var color_str_2;
	var score = 0;
	var time = null;
	var time_over = null;
	
	function color_general() {
		var color1 = Math.round(Math.random()*256);
		var color2 = Math.round(Math.random()*256);
		var color3 = Math.round(Math.random()*256);
		color_str_1 = 'rgb('+color1+','+color2+','+color3+')';
		
		var color4 = color1+Math.round(Math.random()*100)-Math.round(Math.random()*100);
		var color5 = color2+Math.round(Math.random()*100)-Math.round(Math.random()*100);
		var color6 = color3+Math.round(Math.random()*100)-Math.round(Math.random()*100);
		if(color4 < 0){ color4 = 0 }else if(color4 > 255){ color4 = 255 };
		if(color5 < 0){ color5 = 0 }else if(color5 > 255){ color5 = 255 };
		if(color6 < 0){ color6 = 0 }else if(color6 > 255){ color6 = 255 };
		color_str_2 = 'rgb('+color4+','+color5+','+color6+')';
		
		if(color_str_1 == color_str_2) {
			alert("wtf!这都能碰上!!!");
			score += 100000;
			$("#score").text(score);
		}
		//return color_str;
	}
	
	function create_blocks(bc)	 {
		var all_blocks = bc*bc;
		color_general();
		//alert(color_str_1);
		//alert(color);
		//$(div_str).css("background",'yellow');
		var str = '<div class="divs div'+all_blocks+'" style="background:'+color_str_1+';"></div>';
		var diff_str = '<div class="divs div'+all_blocks+' different" style="background:'+color_str_2+';"></div>';;
		//alert(str);
		var x = Math.floor(Math.random()*numbers);
		var y = Math.floor(Math.random()*numbers);
		
		var pos = bc*x + y;
		
		for(var i=0; i<all_blocks; i++) {
			if(i == pos) {
				$("#outter").append(diff_str);
			}else{
				$("#outter").append(str);	
			}
			
		}
		
		
		//alert(pos);
		//$("#wrap").append(str);
	}
	
	create_blocks(numbers);
	
	function clear_blocks() {
		$("#outter").html("");
	}
	
	$("div").delegate(".different","click",function() {
		if(numbers < 7){
			numbers ++;
		}else{
			numbers = 7;	
		}
		time_step();
		score+=10*numbers;
		$("#score").text(score);
		clear_blocks();
		create_blocks(numbers);
		
		//alert("1");
	})
	
	function time_step() {
		//clearInterval(time);
		//$("#time_show").text(3.00);
		$("#time_show:animated").stop();
		$("#time_show").css("width",'100%');
		/*time = setInterval(function(){
			//var s = parseFloat($("#time_show").text()).toFixed(2);
			var d = parseFloat($("#time_show").text());
			var s = d.toFixed(2) - 0.01;
			$("#time_show").text(s.toFixed(2));
		},10);*/
		
		//var p_str = percent + '%';
		
		$("#time_show").animate({width:0},3000);
		
		clearTimeout(time_over);
		time_over = setTimeout(function() {
			confirm('time over,是否再来一局');
			clearInterval(time);
			score = 0;
			numbers = 2;
			//$("#score").text(score);
			clear_blocks();
			create_blocks(2);
		},3000)
		
		/*time = setTimeout(function() {
			var d = parseFloat($("#time_show").text());
			var s = d.toFixed(2) - 0.01;
			$("#time_show").text(s);
		},10)*/
	}
	
	
	$("div").delegate(":not('.different')","click",function() {
		//alert('2');
		if(numbers>2){
			numbers --;
		}else {
			numbers = 2;	
		}
		time_step();
		score-=30*numbers;
		$("#score").text(score);
		clear_blocks();
		create_blocks(numbers);
	})
	
	
	
})