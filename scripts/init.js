function centerInfographAnimate(){
//console.log(canvasX);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	
	var particleArrayLength = particleArray.length;
	
	playPrerequestanimation = false;
	
	/*ctx.shadowColor = "black"; 
	// string Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
	ctx.shadowOffsetX = 1; // integer Horizontal distance of the shadow, in relation to the text.
	ctx.shadowOffsetY = 1; // integer Vertical distance of the shadow, in relation to the text.
	ctx.shadowBlur = 5; // integer
*/
	for (var i = 0; i < particleArrayLength; i++){
		var tmpBall = particleArray[i];
		ctx.fillStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", " + tmpBall.a + ")";
		ctx.strokeStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", .5)";
		
		var theRadiusForThis = Math.floor((ultimateCircumference/(Math.PI)/2));
		
		//The original way of working out the co-ordinates...
		//tmpBall.x = canvasWidth/2 + (theRadiusForThis*Math.cos(tmpBall.angle*(Math.PI/180)));
		//tmpBall.y = canvasHeight/2 + (theRadiusForThis*Math.sin(tmpBall.angle*(Math.PI/180)));
		
		//Now taken over by a method, One which handles both the X and the Y coordinates... Neato!
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
					
					window.addEventListener("mouseup", replyClicked(tmpBall, "centerInfographAnimate"), false);
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
		
		ctx.fillStyle = "rgba(0,0,0,.5)";
		ctx.fillRect(canvasWidth-160,18,170,84);
		
		ctx.strokeStyle = "rgba(255,255,255,.5)";
		ctx.beginPath();
		ctx.moveTo(canvasWidth, 18);
		ctx.lineTo(canvasWidth-160,18);
		ctx.lineTo(canvasWidth-160, 104);
		ctx.lineTo(canvasWidth, 104);
		ctx.closePath();
		ctx.stroke();
		
		
		ctx.font = "10pt Arial";
		ctx.fillStyle = "rgba(66,110,166,1)";
		ctx.fillRect(canvasWidth - 150, 25, 3, 10);
		ctx.fillText("Just Tweets: " + tweetNum + "%", canvasWidth - 140, 35);
		ctx.fillStyle = "rgba(163,0,0,1)";
		ctx.fillRect(canvasWidth - 150, 40, 3, 10);
		ctx.fillText("Replies: " + replyNum + "%", canvasWidth - 140, 50);
		ctx.fillStyle = "rgba(255,255,0,1)";
		ctx.fillRect(canvasWidth - 150, 55, 3, 10);
		ctx.fillText("Retweets: " + rtNum + "%", canvasWidth - 140, 65);
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillRect(canvasWidth - 150, 70, 3, 10);
		ctx.fillText("Links: " + linkNum + "%", canvasWidth - 140, 80);
		ctx.fillStyle = "rgba(255,255,255,.3)";
		ctx.fillText('Size of Tweet (Letters)', canvasWidth - 140, 95);
		
		ctx.fillStyle = "rgba(255,255,255,.3)";
		ctx.beginPath();
		ctx.arc(canvasWidth-149, 90, 6, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "rgba(255,255,255,.5)";
		ctx.arc(canvasWidth-149, 90, 2, 0, Math.PI*2, false);
		//ctx.arc(canvasWidth-130, 85, 4, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
		
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
		
	if(playCenterAnimation){
		setTimeout(centerInfographAnimate, 33);
	}
}