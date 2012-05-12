function dateInfographAnimate(){
//console.log(canvasX);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	
	var rawParticleArrayLength = rawParticleArray.length;
	
	
	var theStartLine = function (angle){
		//this.angle = (rawParticleArray[0].angle);
		this.angle = angle + rawParticleArray[0].angle;
		this.x = canvasWidth/2 + ((Math.floor((ultimateCircumference/(Math.PI)/2))+50)*Math.cos(this.angle*(Math.PI/180)));
		this.y = canvasHeight/2 + ((Math.floor((ultimateCircumference/(Math.PI)/2))+50)*Math.sin(this.angle*(Math.PI/180)));
		//console.log(this.angle);
	}//ends theStartLine;
	
	//Wasteful solution number 1
	/*
	for(q=0;q<360;q++){
		
		var startLine = new theStartLine(q);
		//ctx.strokeStyle = "#bada55";
		ctx.strokeStyle = "rgba(155,80,159," + (0.5 - (0.00138*q) ) + ")";
		ctx.lineWidth = 1;
		ctx.beginPath();  
		ctx.moveTo(canvasWidth/2, canvasHeight/2);  
		ctx.lineTo(startLine.x, startLine.y);    
		ctx.stroke();
		
	}*/
	
	var startAngle = 0;
	//var endAngle = 180;
	for(q=0;q<360;q+=1){
	
	startAngle = q + rawParticleArray[0].angle;
	
	ctx.fillStyle = "rgba(255, 255, 255, 0)";
	//ctx.strokeStyle = "rgba(100, 165, 220, .5)";
	ctx.strokeStyle = "rgba(255,255,255," + (1 - (q*0.00277)) +")"; 
	ctx.lineWidth = 20;
	ctx.beginPath();
	//ctx.arc(x,y,radius,startAngle,endAngle, anticlockwise);
	//ctx.arc(150, 150, 110, 0, Math.PI*2, true); 
	//ctx.arc(canvasWidth/2, canvasHeight/2, 130, 0, Math.PI*2, true);
	ctx.arc(canvasWidth/2, canvasHeight/2, Math.floor((ultimateCircumference/(Math.PI)/2)) + 50 , startAngle * (Math.PI/180) , (startAngle + 1) * (Math.PI/180), false);
	
	// colour the path
	ctx.stroke();
	
	ctx.closePath();
	ctx.fill();
	}
	
	for (var i = 0; i < rawParticleArrayLength; i++){
		
		var tmpBall = rawParticleArray[i];
		ctx.fillStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", " + tmpBall.a + ")";
		ctx.strokeStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", .5)";
		
		var theRadiusForThis = Math.floor((ultimateCircumference/(Math.PI)/2));
		
		//tmpBall.x = canvasWidth/2 + (theRadiusForThis*Math.cos(tmpBall.angle*(Math.PI/180)));
		//tmpBall.y = canvasHeight/2 + (theRadiusForThis*Math.sin(tmpBall.angle*(Math.PI/180)));
		
		tmpBall.x = trigonometry("X", canvasWidth/2, theRadiusForThis, tmpBall.angle);
		tmpBall.y = trigonometry("Y", canvasHeight/2, theRadiusForThis, tmpBall.angle);
		
		if(tmpBall.x == canvasX && tmpBall.y == canvasY || tmpBall.x < (canvasX+tmpBall.radius) && tmpBall.x > (canvasX-tmpBall.radius) && tmpBall.y < (canvasY+tmpBall.radius) && tmpBall.y > (canvasY-tmpBall.radius)){
			
			if(tmpBall.radius <= tmpBall.initRadius && tmpBall.radius <= 20){
				tmpBall.radius = 15;
			}
			
			//let's show the person you've spoken to when you hover over an @reply...
			if(tmpBall.identifier == "reply"){
				//console.log(tmpBall.toWhom);
							
				if(tmpBall.toWhom == null){
					//Sorting hasn't properly accounted for certain retweets... Do nothing atm...
				} else {
									
					var atBall = new Particle(tmpBall.x, tmpBall.y, tmpBall.radius, tmpBall.angle, tmpBall.r, tmpBall.g, tmpBall.b, tmpBall.a, tmpBall.thisTweet);
							
					//atBall.x = canvasWidth/2 + ((theRadiusForThis+50)*Math.cos(tmpBall.angle*(Math.PI/180)));
					//atBall.y = canvasHeight/2 + ((theRadiusForThis+50)*Math.sin(tmpBall.angle*(Math.PI/180)));
					
					atBall.x = trigonometry("X", canvasWidth/2, theRadiusForThis+50, tmpBall.angle);
					atBall.y = trigonometry("Y", canvasHeight/2, theRadiusForThis+50, tmpBall.angle);
									
					//console.log(sessionStorage.getItem(tmpBall.toWhom));
									
					//This is the spoke to the @person
					ctx.beginPath(); 
					ctx.lineWidth = 2;
					ctx.moveTo(tmpBall.x, tmpBall.y);  
					ctx.lineTo(atBall.x, atBall.y);    
					ctx.stroke();
									
					//This is the border circle
					ctx.beginPath();
					ctx.arc(atBall.x, atBall.y, 22, 0, Math.PI*2, false);
					ctx.closePath;
					ctx.fill();
									
					var atImage = new Image();   // Create new img element  
					atImage.src = sessionStorage.getItem(tmpBall.toWhom); // Set source path
									
					//Turn the image into a circle... CIRCLES ARE THE FUTURE; THE NEW BLACK; EVERYTHING MUST BE CIRCULAR!!!
					ctx.save();
					ctx.beginPath();
					ctx.arc(atBall.x, atBall.y, 20, 0, Math.PI*2, false);
					ctx.closePath();
					ctx.clip();
					ctx.drawImage(atImage, atBall.x-20, atBall.y-20, 40, 40);
					// draw the image
					ctx.restore(); 
									
			
					}//ends else
				}//ends if
			
			if(mouseDown){
				$('#tweetCard').show();
				$('#tweetCard').mouseout(function(){
					mouseDown = false;
				});
				if(tmpBall.toWhom != null){
					$('#tweetCard').hide();
					$('.cardLeft img').attr('src', sessionStorage.getItem(tmpBall.toWhom));
					
					$('#backButton').fadeIn();
					
					window.addEventListener("mouseup", replyClicked(tmpBall, "dateInfographAnimate"), false);
					break;
					//replyClicked(tmpBall);
					
				} else {
					$('.cardLeft img').attr('src', twitterUserProfilePicture);
				}
				$('#twitterUserName').text("@" + twitterUser);
				$('#tweetContent').text(tmpBall.thisTweet);
				
				console.log(tmpBall.x + ", " + tmpBall.y);
				//canvasX = 0;
				//canvasY = 0;
			} else if (!mouseDown){
				
			}//ends elseIf
		} else {
			tmpBall.radius = tmpBall.initRadius;
		}
		
		tmpBall.angle += .05;
		
		ctx.lineWidth = 1;
		ctx.beginPath();  
		ctx.moveTo(canvasWidth/2, canvasHeight/2);  
		ctx.lineTo(tmpBall.x, tmpBall.y);    
		ctx.stroke();  
					
		ctx.beginPath();
		ctx.arc(tmpBall.x, tmpBall.y, tmpBall.radius, 0, Math.PI*2, false);
		ctx.closePath;
		ctx.fill();
		
		if(tmpBall.x == canvasX && tmpBall.y == canvasY || tmpBall.x < (canvasX+tmpBall.radius) && tmpBall.x > (canvasX-tmpBall.radius) && tmpBall.y < (canvasY+tmpBall.radius) && tmpBall.y > (canvasY-tmpBall.radius)){
			ctx.strokeStyle = "rgba(255,255,255,1)";
		}
		
		ctx.beginPath();
		ctx.arc(tmpBall.x, tmpBall.y, tmpBall.radius+2, 0, Math.PI*2, false);
		ctx.closePath;
		ctx.stroke();
		
	}//ends for
		
		var fillText = "Most Recent";
		
		var dim = ctx.measureText(fillText);
		var dimWidth = Math.round(dim.width);
		
		var textX = trigonometry("X", canvasWidth/2, Math.floor((ultimateCircumference/(Math.PI)/2))+70, rawParticleArray[0].angle);;
		var textY = trigonometry("Y", canvasHeight/2, Math.floor((ultimateCircumference/(Math.PI)/2))+70, rawParticleArray[0].angle);
		
		ctx.font = "8pt Helvetica";
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillText(fillText,textX, textY);
	
		
		//startLine.angle += .05;
		
		//console.log(startLine.x);
		
		ctx.font = "10pt Arial";
		ctx.fillStyle = "rgba(66,110,166,1)";
		ctx.fillRect(canvasWidth - 130, 25, 3, 10);
		ctx.fillText("Just Tweets: " + tweetNum + "%", canvasWidth - 120, 35);
		ctx.fillStyle = "rgba(163,0,0,1)";
		ctx.fillRect(canvasWidth - 130, 40, 3, 10);
		ctx.fillText("Replies: " + replyNum + "%", canvasWidth - 120, 50);
		ctx.fillStyle = "rgba(255,255,0,1)";
		ctx.fillRect(canvasWidth - 130, 55, 3, 10);
		ctx.fillText("Retweets: " + rtNum + "%", canvasWidth - 120, 65);
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillRect(canvasWidth - 130, 70, 3, 10);
		ctx.fillText("Links: " + linkNum + "%", canvasWidth - 120, 80);
	
		var profileImage = new Image();   // Create new img element  
		profileImage.src = twitterUserProfilePicture; // Set source path
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.beginPath();
		ctx.arc(canvasWidth/2, canvasHeight/2, 37, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
		
		//Turn the image into a circle... CIRCLES ARE THE FUTURE; THE NEW BLACK; EVERYTHING MUST BE CIRCULAR!!!
		ctx.save();
		ctx.beginPath();
		ctx.arc(canvasWidth/2, canvasHeight/2, 35, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(profileImage, ((canvasWidth/2)-(profileImage.width/2)), ((canvasHeight/2)-(profileImage.height/2)), 73, 73);
		// draw the image
		ctx.restore(); 
		
	if(playDateAnimation){
		setTimeout(dateInfographAnimate, 33);
	}
}