function boringData(){
	
	var blueHeightTotal = (tweetNum * 2);
	var redHeightTotal = (replyNum * 2);
	var yellowHeightTotal = (rtNum * 2);
	var whiteHeightTotal = (linkNum * 2);
	
	var blueHeight = 0;
	var redHeight = 0;
	var yellowHeight = 0;
	var whiteHeight = 0;
	
	var blueCount = 0;
	var redCount = 0;
	var yellowCount = 0;
	var whiteCount = 0;
	
	var blueAnimationSteps = blueHeightTotal/50;
	var redAnimationSteps = redHeightTotal/50;
	var yellowAnimationSteps = yellowHeightTotal/50;
	var whiteAnimationSteps = whiteHeightTotal/50;
	
	var startingPoint = canvasHeight/2 + 100;
	
	animateBoringData();
	
	function animateBoringData(){
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.shadowColor = "black"; 
		// string Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
		ctx.shadowOffsetX = 2; // integer Horizontal distance of the shadow, in relation to the text.
		ctx.shadowOffsetY = 2; // integer Vertical distance of the shadow, in relation to the text.
		ctx.shadowBlur = 5; // integer
		
		//Blue
		ctx.fillStyle = "rgba(66,110,166,1)";
		//ctx.fillRect(100, 100, blueHeight,200);
		ctx.fillRect(200, startingPoint - blueHeight, 100, blueHeight);
		ctx.fillStyle = "rgba(66,110,166,.5)";
		ctx.beginPath();
		ctx.arc(250, startingPoint-blueHeight-50, 25, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.strokeStyle = "rgba(66,110,166,.7)";
		
		ctx.beginPath();
		ctx.moveTo(250, startingPoint-blueHeight-(50-27), 0, Math.PI*2, false);
		ctx.lineTo(250, startingPoint-blueHeight, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath;
		
		ctx.beginPath();
		ctx.arc(250, startingPoint-blueHeight-50, 27, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
		
		var blueCountText = blueCount + "%";
		
		var blueCountTextDim = ctx.measureText(blueCountText);
		var blueCountTextDimWidth = Math.round(blueCountTextDim.width);
		ctx.font = "15pt Times New Roman";
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillText(blueCountText, 250-blueCountTextDimWidth+6, startingPoint-blueHeight-43);
		
		if(blueCount < tweetNum){
			blueCount++;
		}
		
		if(blueHeight < blueHeightTotal){
			blueHeight += blueAnimationSteps;
		}
		
		//Red
		ctx.fillStyle = "rgba(163,0,0,1)";
		//ctx.fillRect(200,200,100,100);
		ctx.fillRect(300, startingPoint - redHeight, 100, redHeight);
		ctx.fillStyle = "rgba(163,0,0,.7)";
		ctx.beginPath();
		ctx.arc(350, startingPoint-redHeight-50, 25, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.strokeStyle = "rgba(163,0,0,.5)";
		
		ctx.beginPath();
		ctx.moveTo(350, startingPoint-redHeight-(50-27), 0, Math.PI*2, false);
		ctx.lineTo(350, startingPoint-redHeight, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath;
		
		ctx.beginPath();
		ctx.arc(350, startingPoint-redHeight-50, 27, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
		
		var redCountText = redCount + "%";
		
		var redCountTextDim = ctx.measureText(redCountText);
		var redCountTextDimWidth = Math.round(redCountTextDim.width);
		ctx.font = "15pt Times New Roman";
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillText(redCountText, 350-(redCountTextDimWidth/2), startingPoint-redHeight-43);
		
		if(redCount < replyNum){
			redCount++;
		}
		
		if(redHeight < redHeightTotal){
			//redCount++;
			redHeight += redAnimationSteps;
		}
		
		//Yellow
		ctx.fillStyle = "rgba(255,255,0,1)";
		//ctx.fillRect(300,250,100,50);
		ctx.fillRect(400, startingPoint - yellowHeight, 100, yellowHeight);
		ctx.fillStyle = "rgba(255,255,0,.7)";
		ctx.beginPath();
		ctx.arc(450, startingPoint-yellowHeight-50, 25, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.strokeStyle = "rgba(255,255,0,.5)";
		
		ctx.beginPath();
		ctx.moveTo(450, startingPoint-yellowHeight-(50-27), 0, Math.PI*2, false);
		ctx.lineTo(450, startingPoint-yellowHeight, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath;
		
		ctx.beginPath();
		ctx.arc(450, startingPoint-yellowHeight-50, 27, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
		
		var yellowCountText = yellowCount + "%";
		
		var yellowCountTextDim = ctx.measureText(yellowCountText);
		var yellowCountTextDimWidth = Math.round(yellowCountTextDim.width);
		ctx.font = "15pt Times New Roman";
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillText(yellowCountText, 450-(yellowCountTextDimWidth/2), startingPoint-yellowHeight-43);
		
		if(yellowCount < rtNum){
			yellowCount++;
		}
		
		if(yellowHeight < yellowHeightTotal){
			//yellowCount++;
			yellowHeight += yellowAnimationSteps;
		}
		
		//White
		ctx.fillStyle = "rgba(255,255,255,1)";
		//ctx.fillRect(400,280,100,20);
		ctx.fillRect(500, startingPoint - whiteHeight, 100, whiteHeight);
		ctx.fillStyle = "rgba(255,255,255,.7)";
		ctx.beginPath();
		ctx.arc(550, startingPoint-whiteHeight-50, 25, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.strokeStyle = "rgba(255,255,255,.5)";
		
		ctx.beginPath();
		ctx.moveTo(550, startingPoint-whiteHeight-(50-27), 0, Math.PI*2, false);
		ctx.lineTo(550, startingPoint-whiteHeight, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath;
		
		ctx.beginPath();
		ctx.arc(550, startingPoint-whiteHeight-50, 27, 0, Math.PI*2, false);
		ctx.stroke();
		ctx.closePath();
		
		var whiteCountText = whiteCount + "%";
		
		var whiteCountTextDim = ctx.measureText(whiteCountText);
		var whiteCountTextDimWidth = Math.round(whiteCountTextDim.width);
		ctx.font = "15pt Times New Roman";
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillText(whiteCountText, 550-(whiteCountTextDimWidth/2), startingPoint-whiteHeight-43);
		
		if(whiteCount < linkNum){
			whiteCount++;
		}
		
		if(whiteHeight < whiteHeightTotal){
			//whiteCount++;
			whiteHeight += whiteAnimationSteps;
		}
		
		ctx.shadowColor = "rgba(0,0,0,0)"; 
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		//Blue Bar Label...
		ctx.font = "10pt Arial";
		var blue = "Just Tweets";
		var blueDim = ctx.measureText(blue);
		var blueDimWidth = Math.round(blueDim.width);
		ctx.fillText(blue, 250 - blueDimWidth/2, startingPoint+20);
		
		//Red Bar Label...
		ctx.font = "10pt Arial";
		var red = "Replies";
		var redDim = ctx.measureText(red);
		var redDimWidth = Math.round(redDim.width);
		ctx.fillText(red, 350 - redDimWidth/2, startingPoint+20);
		
		//Yellow Bar Label...
		ctx.font = "10pt Arial";
		var yellow = "Retweets";
		var yellowDim = ctx.measureText(yellow);
		var yellowDimWidth = Math.round(yellowDim.width);
		ctx.fillText(yellow, 450 - yellowDimWidth/2, startingPoint+20);
		
		//White Bar Label...
		ctx.font = "10pt Arial";
		var white = "Links";
		var whiteDim = ctx.measureText(white);
		var whiteDimWidth = Math.round(whiteDim.width);
		ctx.fillText(white, 550 - whiteDimWidth/2, startingPoint+20);
		
		//Draw the bar chart border...
		ctx.strokeStyle = "rgba(255,255,255,1)";
		
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(200, startingPoint - 200);
		ctx.lineTo(200, startingPoint);
		ctx.lineTo(600, startingPoint);
		ctx.moveTo(300, startingPoint);
		ctx.lineTo(300, startingPoint+15);
		ctx.moveTo(400, startingPoint);
		ctx.lineTo(400, startingPoint+15);
		ctx.moveTo(500, startingPoint);
		ctx.lineTo(500, startingPoint+15);
		ctx.closePath();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(200, startingPoint-200);
		ctx.lineTo(190, startingPoint-200);
		ctx.moveTo(200, startingPoint-100);
		ctx.lineTo(190, startingPoint-100);
		ctx.moveTo(200, startingPoint);
		ctx.lineTo(190, startingPoint);
		ctx.closePath();
		ctx.stroke();
		
		ctx.font = "10pt Arial";
		ctx.fillText("100%", 160, startingPoint-195);
		ctx.fillText("50%", 165, startingPoint-95);
		ctx.fillText("0%", 165, startingPoint+5);
		
		//Then remove a tiny amount of space between the bars...
		ctx.clearRect(300, startingPoint-200, 2, 199);
		ctx.clearRect(400, startingPoint-200, 2, 199);
		ctx.clearRect(500, startingPoint-200, 2, 199);
				
		
		var profileImage = new Image();   // Create new img element  
		profileImage.src = twitterUserProfilePicture; // Set source path
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.beginPath();
		ctx.arc(canvasWidth/2, canvasHeight/4, 37, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
		
		//Turn the image into a circle... CIRCLES ARE THE FUTURE; THE NEW BLACK; EVERYTHING MUST BE CIRCULAR!!!
		ctx.save();
		ctx.beginPath();
		ctx.arc(canvasWidth/2, canvasHeight/4, 35, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(profileImage, ((canvasWidth/2)-(profileImage.width/2)), ((canvasHeight/4)-(profileImage.height/2)), 73, 73);
		// draw the image
		ctx.restore(); 
		
		if(blueCount == tweetNum){
			if(blueCount > 20){
				var blueAnalysis = "Normal tweets account for " + blueCount + "% of your Tweets." + "<br> That's above average.";
			} else if(blueCount <= 10){
				var blueAnalysis = "Normal tweets account for " + blueCount + "% of your Tweets." + "<br> That's slightly below average.";
			}
			$('#blueAnalysis').html(blueAnalysis);
			
		}
		
		if(redCount == replyNum){
			if(redCount>50){
				var redAnalysis = "Reply tweets account for " + redCount + "% of your Tweets.<br>That's about average";
			} else if(redCount <= 50){
				var redAnalysis = "Reply tweets account for " + redCount + "% of your Tweets.<br>That's just below average.";
			} else if(redCount <= 20){
				var redAnalysis = "Reply tweets account for " + redCount + "% of your Tweets.<br>That's really below average.";
			}
			$('#redAnalysis').html(redAnalysis);
		}
		
		if(yellowCount == rtNum){
			if(yellowCount > 10){
				var yellowAnalysis = "Retweets account for " + yellowCount + "% of your Tweets.<br>That's above average.";
			} else if (yellowCount < 10){
				var yellowAnalysis = "Retweets account for " + yellowCount + "% of your Tweets.<br>That's about right.";
			}
			$('#yellowAnalysis').html(yellowAnalysis);
		}
		
		if(whiteCount == linkNum){
			if(whiteCount > 20){
				var whiteAnalysis = "Links to other pages account for " + whiteCount + "% of your Tweets.<br>That's about right.";
			} else if (whiteCount <=20){
				var whiteAnalysis = "Links to other pages account for " + whiteCount + "% of your Tweets.<br>That's below average.";
			}
			$('#whiteAnalysis').html(whiteAnalysis);
		}
		
		
		
		if(playBoringDataAnimation){
			setTimeout(animateBoringData,33);
		}
	}
}