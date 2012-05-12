function timelineInfographic(){
	
	//playCenterAnimation = false;
	//playTimelineAnimation = true;
	timelineAnimate();
	
	console.log(rawParticleArray[0]);
	
	var whereShouldIPutIt = (canvasWidth - 50);
	
	for(x=0;x<rawParticleArray.length;x++){
		var mySplit = rawParticleArray[x].otherData.created_at.split("+");
		var readySplit = mySplit[0].toString();
		var secondSplit = readySplit.split(" ");
		var fillText = secondSplit[0] + " " + secondSplit[1] + " " + secondSplit[2];
		rawParticleArray[x].seanDate = fillText;
	}
	
	var evenOrOdd = true;
	
	function timelineAnimate(){
		
		
		
		ctx.clearRect(0,0,canvasWidth, canvasHeight);
		
		//console.log(whereShouldIPutIt);		
	
		for(i=0;i<rawParticleArray.length;i++){
		
		var timeBall = rawParticleArray[i];
		
		ctx.fillStyle = "rgba(" + timeBall.r + ", " + timeBall.g + ", " + timeBall.b + ", " + timeBall.a + ")";
		ctx.strokeStyle = "rgba(" + timeBall.r + ", " + timeBall.g + ", " + timeBall.b + ", .5)";
		
		if(i==0){
			timeBall.x = whereShouldIPutIt;
			evenOrOdd = true;
		} else{
			timeBall.x = rawParticleArray[i-1].x-40;
			if(timeBall.seanDate != rawParticleArray[i-1].seanDate){
				if(evenOrOdd == true){
					evenOrOdd = false;
					ctx.font = "10pt Helvetica";
					ctx.fillStyle = "rgba(255,255,255,.5)";
					
					var dateDim = ctx.measureText(timeBall.seanDate);
					var dateDimWidth = Math.round(dateDim.width);
					
					ctx.fillText(timeBall.seanDate, timeBall.x - dateDimWidth/2, timeBall.y+65);
					ctx.strokeStyle = "rgba(255,255,255,.5)";
					ctx.beginPath();
					ctx.moveTo(timeBall.x, timeBall.y+35);
					ctx.lineTo(timeBall.x, timeBall.y+53);
					ctx.closePath();
					ctx.stroke();
				} else {
					evenOrOdd = true;
					ctx.font = "10pt Helvetica";
					ctx.fillStyle = "rgba(255,255,255,.5)";
					
					var dateDim = ctx.measureText(timeBall.seanDate);
					var dateDimWidth = Math.round(dateDim.width);
					
					ctx.fillStyle = "rgba(255,255,255,.5)";
					ctx.fillText(timeBall.seanDate, timeBall.x - dateDimWidth/2, timeBall.y+80);
					ctx.strokeStyle = "rgba(255,255,255,.5)";
					ctx.beginPath();
					ctx.moveTo(timeBall.x, timeBall.y+35);
					ctx.lineTo(timeBall.x, timeBall.y+68);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
		
		ctx.fillStyle = "rgba(" + timeBall.r + ", " + timeBall.g + ", " + timeBall.b + ", " + timeBall.a + ")";
		ctx.strokeStyle = "rgba(" + timeBall.r + ", " + timeBall.g + ", " + timeBall.b + ", .5)";
		
		timeBall.y = canvasHeight/2; 
		
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(timeBall.x, timeBall.y);
		ctx.lineTo(timeBall.x, timeBall.y+35);
		ctx.closePath();
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc(timeBall.x, timeBall.y, timeBall.radius, 0, Math.PI*2, false);
		ctx.closePath;
		ctx.fill();
		
		var thisDate;
		
		var timeText = timeBall.seanDate;
		
		//var fillText = mySplit[0];
		
		var dim = ctx.measureText(timeText);
		var dimWidth = Math.round(dim.width);
		//console.log(timeText);
		
		if(timeBall.x == canvasX && timeBall.y == canvasY || timeBall.x < (canvasX+timeBall.radius) && timeBall.x > (canvasX-timeBall.radius) && timeBall.y < (canvasY+timeBall.radius) && timeBall.y > (canvasY-timeBall.radius)){
			ctx.strokeStyle = "rgba(255,255,255,1)";
			
			if(timeBall.radius <= timeBall.initRadius && timeBall.radius <= 20){
				timeBall.radius = 15;
			}
			
			
			if(timeBall.toWhom == null){
				//do Nothing
			} else {
				var atBall = new Particle(timeBall.x, timeBall.y, timeBall.radius, timeBall.angle, timeBall.r, timeBall.g, timeBall.b, timeBall.a, timeBall.thisTweet);
								
				//atBall.x = canvasWidth/2 + ((theRadiusForThis+50)*Math.cos(timeBall.angle*(Math.PI/180)));
				//atBall.y = canvasHeight/2 + ((theRadiusForThis+50)*Math.sin(timeBall.angle*(Math.PI/180)));
					
				atBall.y = timeBall.y - 50;
									
				//console.log(sessionStorage.getItem(timeBall.toWhom));
									
				//This is the spoke to the @person
				ctx.beginPath(); 
				ctx.lineWidth = 1;
				ctx.strokeStyle = "rgba(163,0,0,1)";
				ctx.moveTo(timeBall.x, timeBall.y);  
				ctx.lineTo(atBall.x, atBall.y);    
				ctx.stroke();
									
					//This is the border circle
				ctx.beginPath();
				ctx.arc(atBall.x, atBall.y, 22, 0, Math.PI*2, false);
				ctx.closePath;
				ctx.fill();
									
				var atImage = new Image();   // Create new img element  
				atImage.src = sessionStorage.getItem(timeBall.toWhom); // Set source path
										
				//Turn the image into a circle... CIRCLES ARE THE FUTURE; THE NEW BLACK; EVERYTHING MUST BE CIRCULAR!!!
				ctx.save();
				ctx.beginPath();
				ctx.arc(atBall.x, atBall.y, 20, 0, Math.PI*2, false);
				ctx.closePath();
				ctx.clip();
				ctx.drawImage(atImage, atBall.x-20, atBall.y-20, 40, 40);
				// draw the image
				ctx.restore(); 

				
			}
			if(mouseDown){
				$('#tweetCard').show();
				$('#tweetCard').mouseout(function(){
					mouseDown = false;
				});
				if(timeBall.toWhom != null){
					$('#tweetCard').hide();
					$('.cardLeft img').attr('src', sessionStorage.getItem(timeBall.toWhom));
					
					$('#backButton').fadeIn();
					
					playTimelineAnimation = false;
					window.addEventListener("mouseup", replyClicked(timeBall, "timelineInfographic"), false);
					break;
					//replyClicked(timeBall);
					
				} else {
					$('.cardLeft img').attr('src', twitterUserProfilePicture);
				}
				$('#twitterUserName').text("@" + twitterUser);
				$('#tweetContent').text(timeBall.thisTweet);
				
				console.log(timeBall.x + ", " + timeBall.y);
				//canvasX = 0;
				//canvasY = 0;
			}
			
			//Show the text for the tweet being hovered over
			console.log(timeBall.seanDate);
			
			ctx.font = "8pt Helvetica";
			
			ctx.fillStyle = "rgba(255,255,255,1)";
			ctx.fillText(timeText, timeBall.x-(dimWidth/2), timeBall.y+50);
		
		} else {
			timeBall.radius = timeBall.initRadius;
		}
		
		ctx.beginPath();
		ctx.arc(timeBall.x, timeBall.y, timeBall.radius+2, 0, Math.PI*2, false);
		ctx.closePath;
		ctx.stroke();
		
		}//Ends for
		
		var theMouseMoveth = 0;
		
		//console.log(theMouseMoveth);
		
		if(canvasX > 0 && canvasX < 100){
			theMouseMoveth = 20;
		}
		
		if(canvasX > canvasWidth -100 && canvasX < canvasWidth){
			theMouseMoveth = -20;
		}
		
		if(rawParticleArray[0].x <= canvasWidth - 50){
			whereShouldIPutIt = canvasWidth - 50;
		}
		
		if(rawParticleArray[rawParticleArray.length-1].x >= 50 && rawParticleArray[rawParticleArray.length-1].x < 70){
			
			theMouseMoveth = +1;
			theMouseMoveth = -1;
			
			//rawParticleArray[0].x = canvasWidth - 50 + 3500;
			
		}
		
		//console.log(theMouseMoveth);
		
		whereShouldIPutIt += theMouseMoveth;
		
		ctx.strokeStyle = "rgba(255,255,255,.5)";
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(rawParticleArray[0].x+25, rawParticleArray[0].y+35);  
		ctx.lineTo(rawParticleArray[rawParticleArray.length-1].x-25, rawParticleArray[rawParticleArray.length-1].y+35);
		ctx.lineTo(rawParticleArray[rawParticleArray.length-1].x-25, rawParticleArray[rawParticleArray.length-1].y-35);
		ctx.moveTo(rawParticleArray[0].x+25, rawParticleArray[0].y+35);
		ctx.lineTo(rawParticleArray[0].x+25, rawParticleArray[0].y-35);
		ctx.stroke();
		
		ctx.lineWidth = 1;
		
		var profileImage = new Image();   // Create new img element  
		profileImage.src = twitterUserProfilePicture; // Set source path
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.beginPath();
		ctx.arc(canvasWidth/2, timeBall.y/2, 37, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
		
		//Turn the image into a circle... CIRCLES ARE THE FUTURE; THE NEW BLACK; EVERYTHING MUST BE CIRCULAR!!!
		ctx.save();
		ctx.beginPath();
		ctx.arc(canvasWidth/2, timeBall.y/2, 35, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(profileImage, ((canvasWidth/2)-(profileImage.width/2)), ((timeBall.y/2)-(profileImage.height/2)), 73, 73);
		// draw the image
		ctx.restore(); 
		
		if(playTimelineAnimation){
			setTimeout(timelineAnimate, 33);
		}
	}
	
}