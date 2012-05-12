function talkativePersonInfo(){
//All prerequisites go here
	
	var peopleReplyArray = [];
	var topTen = [];
	
	//peopleReplyArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "reply", twitterData[i].in_reply_to_screen_name, twitterData[i]));
	
	var personsCount = people.length;
	//var angleIncrement = 360/people.length;
	var angleIncrement = 360/10;
	var angleCount = 0;
	var theRadius = Math.floor((ultimateCircumference/(Math.PI)/2));
	
	for(i=0;i<personsCount;i++){
		peopleReplyArray.push(new Particle(canvasWidth/2, canvasHeight/2, theRadius, angleCount, 163, 0, 0, 1, null, "reply", people[i], null));
		angleCount += angleIncrement;
	}
	
	//We need to set some additional properties in the particle object for this infographic
	//Here, we'll store the URL for that person in the object so we don't have to keep requesting sessionStorage for the URL
	for(q=0;q<peopleReplyArray.length;q++){
		peopleReplyArray[q].profilePicture = sessionStorage.getItem(peopleReplyArray[q].toWhom);
		
		//Here we access the Ultimate count array so we can get the number of time that person has spoken to the the user...
		for(z=0;z<ultimateCount.length;z++){
			if(ultimateCount[z].name == peopleReplyArray[q].toWhom){
				//peopleReplyArray[q].replyCount = ultimateCount[z].count;
				peopleReplyArray[q].replyCount = ultimateCount[z].count;
			}
		}
		
	}
	
	topTen.push(peopleReplyArray[0]);	
	
	for(h=0;h<peopleReplyArray.length;h++){
		console.log(h);
	//	console.log("test " + peopleReplyArray[h].replyCount);
	
	if(topTen[h] == undefined){
		console.log(topTen);
		console.log(topTen[h]);
		
		continue;
	}
		
		if(h < 10){
			if(peopleReplyArray[h].replyCount >= topTen[h].replyCount || peopleReplyArray[h].replyCount >= topTen[h-1].replyCount){
				topTen.push(peopleReplyArray[h]);
			}
		} else {
			if(peopleReplyArray[h].replyCount >= topTen[9].replyCount){
				topTen.push(peopleReplyArray[h]);
			}
			
		}
		if(topTen.length > 10){
			topTen.shift();
		}
	}
	
//	console.log(topTen);
//	console.log(topTen[4]);
	
	//console.log(peopleReplyArray);
	
	//Let's get this bitch rolling!
	if(topTen.length < 10){
		alert('Oops...\nThere seems to be a problem counting your tweets...\n I\'m really, really sorry :\'(');
		playCenterAnimation = true;
		centerInfographAnimate();
	} else {
		talkativeAnimate();
	}
	
	
	function talkativeAnimate(){
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			
		//for(i=0;i<peopleReplyArray.length;i++){
		for(i=0;i<10;i++){		
			var tmpPerson = peopleReplyArray[i];
			
			var tmpPersonCount = 0;
			
			for(z=0;z<ultimateCount.length;z++){
				if(ultimateCount[z].name == tmpPerson.toWhom){
					tmpPersonCount = ultimateCount[z].count;
				}
				//console.log(tmpPerson.toWhom + " " + tmpPersonCount);
			}
			
			//console.log(tmpPerson.toWhom + tmpPersonCount);
			
			var allThoseTweets = [];
			
			for(x=0;x<replyParticleArray.length;x++){
				if(replyParticleArray[x].toWhom == tmpPerson.toWhom){
					//console.log(replyParticleArray[x].toWhom);
					allThoseTweets.push(replyParticleArray[x]);
				}
			}
			
			var allBallAngle = 0;
			
			for(y=0;y<allThoseTweets.length;y++){
				
				//var allBall = new Particle(tmpPerson.x,tmpPerson.y, 15, allBallAngle, tmpPerson.r, tmpPerson.g, tmpPerson.b, tmpPerson.a, allThoseTweets[y].thisTweet, "reply", tmpPerson.toWhom, tmpPerson);
				
				var allBall = allThoseTweets[y];
				
				allBall.x = trigonometry("X", tmpPerson.x, 50, allBallAngle);
				allBall.y = trigonometry("Y", tmpPerson.y, 50, allBallAngle);
				
				allBallAngle += 360/allThoseTweets.length;
				
				ctx.strokeStyle = "rgba(" + tmpPerson.r + ", " + tmpPerson.g + ", " + tmpPerson.b + ", " + tmpPerson.a + ")";
				
				ctx.beginPath(); 
				ctx.lineWidth = 1;
				ctx.moveTo(tmpPerson.x, tmpPerson.y);  
				ctx.lineTo(allBall.x, allBall.y);    
				ctx.stroke();
				
				ctx.fillStyle = "rgba(" + tmpPerson.r + ", " + tmpPerson.g + ", " + tmpPerson.b + ", " + tmpPerson.a + ")";
				
				if(allBall.x == canvasX && allBall.y == canvasY || allBall.x < (canvasX+allBall.radius) && allBall.x > (canvasX-allBall.radius) && allBall.y < (canvasY+allBall.radius) && allBall.y > (canvasY-allBall.radius)){
					console.log('You\'re touching my balls!');
					ctx.strokeStyle = "rgba(255,255,255,1)";
					
					if(mouseDown){
						$('#tweetCard').show();
						$('#tweetCard').mouseout(function(){
							mouseDown = false;
						});
						playTalkativeAnimation = false;
							
						if(allBall.toWhom != null){
							$('#tweetCard').hide();
							$('.cardLeft img').attr('src', sessionStorage.getItem(allBall.toWhom));
							
							$('#backButton').fadeIn();
							
							window.addEventListener("mouseup", replyClicked(allBall, "talkativePersonInfo"), false);
							break;
							//replyClicked(allBall);
							
						} else {
							$('.cardLeft img').attr('src', twitterUserProfilePicture);
						}
						$('#twitterUserName').text("@" + twitterUser);
						$('#tweetContent').text(allBall.thisTweet);
						
						console.log(allBall.x + ", " + allBall.y);
						//canvasX = 0;
						//canvasY = 0;
					}	
					
				}
						
				
				ctx.beginPath();
				ctx.arc(allBall.x, allBall.y, allBall.radius+2, 0, Math.PI*2, false);
				ctx.closePath;
				ctx.stroke();
				
				ctx.beginPath();
				ctx.arc(allBall.x, allBall.y, allBall.radius, 0, Math.PI*2, false);
				ctx.closePath;
				ctx.fill();
				
			}
			
			
			ctx.fillStyle = "rgba(" + tmpPerson.r + ", " + tmpPerson.g + ", " + tmpPerson.b + ", " + tmpPerson.a + ")";
			ctx.strokeStyle = "rgba(" + tmpPerson.r + ", " + tmpPerson.g + ", " + tmpPerson.b + ", .5)";
			
			tmpPerson.radius = 400;
			
			tmpPerson.x = trigonometry("X", canvasWidth/2, tmpPerson.radius, tmpPerson.angle);
			tmpPerson.y = trigonometry("Y", canvasHeight/2, tmpPerson.radius, tmpPerson.angle);
			
			ctx.beginPath(); 
			ctx.lineWidth = 2;
			ctx.moveTo(canvasWidth/2, canvasHeight/2);  
			ctx.lineTo(tmpPerson.x, tmpPerson.y);    
			ctx.stroke();
							
			//This is the border circle
			ctx.beginPath();
			ctx.arc(tmpPerson.x, tmpPerson.y, 22, 0, Math.PI*2, false);
			ctx.closePath;
			ctx.fill();
			
							
			var personImage = new Image();   // Create new img element  
			personImage.src = tmpPerson.profilePicture; // Set source path
			
			//console.log(personImage.src);
			
							
			//Turn the image into a circle... CIRCLES ARE THE FUTURE; THE NEW BLACK; EVERYTHING MUST BE CIRCULAR!!!
			ctx.save();
			ctx.beginPath();
			ctx.arc(tmpPerson.x, tmpPerson.y, 20, 0, Math.PI*2, false);
			ctx.closePath();
			ctx.clip();
			ctx.drawImage(personImage, tmpPerson.x-20, tmpPerson.y-20, 40, 40);
			// draw the image
			ctx.restore(); 
			
			
			//draw the tweets here - add spoofmouseevents here too...
			//What's a "spoof mouseevent"? you ask...
			//Well its that thing I do that tests where the mouse is and what its doing at certain times to simulate a mouseevent
			//This is because you can't assign mouse events to objects on a canvas...
			//something that would have made this whole thing fuckloads easier... :(
			//but oh well...
			
			

			var numberRadius = tmpPerson.radius/2;
			
			
			ctx.shadowColor = "black"; 
			// string Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
			ctx.shadowOffsetX = 2; // integer Horizontal distance of the shadow, in relation to the text.
			ctx.shadowOffsetY = 2; // integer Vertical distance of the shadow, in relation to the text.
			ctx.shadowBlur = 5; // integer
			
			var countBall = new Particle(canvasWidth/2, canvasHeight/2, 25, tmpPerson.angle, tmpPerson.r, tmpPerson.g, tmpPerson.b, tmpPerson.a, tmpPerson.thisTweet);
					
			//countBall.x = canvasWidth/2 + ((theRadiusForThis+50)*Math.cos(tmpPerson.angle*(Math.PI/180)));
			//countBall.y = canvasHeight/2 + ((theRadiusForThis+50)*Math.sin(tmpPerson.angle*(Math.PI/180)));
			
			countBall.x = trigonometry("X", canvasWidth/2, numberRadius, tmpPerson.angle);
			countBall.y = trigonometry("Y", canvasHeight/2, numberRadius, tmpPerson.angle);
			
			ctx.beginPath();
			ctx.arc(countBall.x, countBall.y, 20, 0, Math.PI*2, false);
			ctx.closePath;
			ctx.fill();
			
			ctx.fillStyle = "rgba(0,0,0,.2)";
			ctx.beginPath();
			ctx.arc(countBall.x, countBall.y, 18, 0, Math.PI*2, false);
			ctx.closePath;
			ctx.fill();
			
			//var fillText = String(tmpPersonCount);
			var fillText = allThoseTweets.length;
			
			var dim = ctx.measureText(fillText);
			var dimWidth = Math.round(dim.width);
			ctx.font = "18pt Helvetica";
			
			ctx.fillStyle = "rgba(255,255,255,1)";
			ctx.fillText(fillText, countBall.x-(dimWidth/2), countBall.y+7);
			
			ctx.shadowColor = "rgba(0,0,0,0)"; 
			
			tmpPerson.angle += .05;
			
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
			
			
		}
		
		//return true;
		
		if(playTalkativeAnimation){
			setTimeout(talkativeAnimate, 33);
		}
	}//ends talkativeAnimate()


}//ends talkativePerson(_