$(document).ready(function(){
	// Common functions for timer
	function pad(number, length) {
	    var str = '' + number;
	    while (str.length < length) {str = '0' + str;}
	    return str;
	}
	function formatTime(time) {
	    var min = parseInt(time / 6000),
	        sec = parseInt(time / 100) - (min * 60),
	        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
	    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
	}

	//Change event on the dropdown input triggers this block of code
	$("#blocks").change(function(){
		//Getting the value in the drop down input on change event.
		var blocks = $(this).val();
		var no_of_blocks = blocks*blocks;
		var no_of_unique_blocks = no_of_blocks/2;

		//This will load overlay element dynamically
		$("#container").html('<div id="overlay"></div>');

		//Loading the sqaure blocks dynamically
		for(i=0; i<no_of_blocks; i = i+1){
			$("#container").append("<div class='block color' id='block_"+i+"'></div>");
		}

		//Adding blocks dynamically to the #container element.
		$("#container").append('<div class="clear"></div>');

		$("#overlay").css({"width":50*blocks+(6*blocks), "height":($("#container").height()*blocks)});

		//Addiong start button dynamically into overlay element.
		$("#overlay").html('<button id="start">Start</button>');

		$("#container").width(blocks*60);
		$('.block').css("width","50px");

		//Variables to store unique numbers
		block_number_1 = new Array();
		block_number_2 = new Array();
		i=0;
		j=0;
		while(i<no_of_unique_blocks || j<no_of_unique_blocks){
			temp = Math.floor((Math.random() * no_of_unique_blocks) + 1);
			if($.inArray( temp, block_number_1 ) === -1){
				block_number_1.push(temp);
			}
			//alert(i);
			temp = Math.floor((Math.random() * no_of_unique_blocks) + 1);
			if($.inArray( temp, block_number_2 ) === -1){
				block_number_2.push(temp);
			}
			i=block_number_1.length;
			j=block_number_2.length;
		}
		//console.log(block_number_1);
		//console.log(block_number_2);

		i=0;
		while(i<no_of_unique_blocks){
			if($("#block_"+i).html() === ''){
				$("#block_"+i).html(block_number_1[i]);
			}
			i=i+1;
		}

		j=0
		while(j+no_of_unique_blocks<no_of_blocks){
			id = j+no_of_unique_blocks;
			if($("#block_"+id).html() === ''){
				$("#block_"+id).html(block_number_2[j]);
			}
			j=j+1;
		}		
	});

	

	//Removing the overlay and starting the clock.
	$("#container").on("click", "#start", function(){
		$(this).parent().remove();
		$("#blocks").attr("disabled",'disabled');
		//Timer
		var stopwatch = new (function() {
		    var $stopwatch, // Stopwatch element on the page
		        incrementTime = 70, // Timer speed in milliseconds
		        currentTime = 0, // Current time in hundredths of a second
		        updateTimer = function() {
		            $stopwatch.html(formatTime(currentTime));
		            currentTime += incrementTime / 10;
		        },
		        init = function() {
		            $stopwatch = $('#stopwatch');
		            $stopwatch.show();
		            stopwatch.Timer = $.timer(updateTimer, incrementTime, true);
		        };
		    this.resetStopwatch = function() {
		        currentTime = 0;
		        this.Timer.stop().once();
		    };
		    $(init);
		});
	});

	click = 0;
	$("#container").on("click", ".block", function(){
		if(click<2){
			$(this).css("background","#fff");
			$(this).attr("select",'block_'+click);
			click = click + 1;

			block_0 = $( "div[select = 'block_0']").html();
			block_1 = $( "div[select = 'block_1']").html();
			if(block_0 === block_1){
				$( "div[select = 'block_0']").removeClass('color');
				$( "div[select = 'block_1']").removeClass('color');
			}
			if ($(".color")[0]){
			} else {
			    alert($("#stopwatch").html());
			    $("#stopwatch").hide();
			    $("#blocks").removeAttr("disabled");
			}
		}else{
			$( "div[select = 'block_0']").removeAttr('select');
			$( "div[select = 'block_1']").removeAttr('select');
			$(".color").each(function(){
				$(this).css("background","#000");
			});	
			$(this).css("background","#fff");
			click = 1;
			$(this).attr("select",'block_0');
		}		
	});
});