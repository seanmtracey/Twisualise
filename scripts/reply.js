function replyClicked(tmpBall, fromWhere){
	var tweetToBeHandled = tmpBall;
	var itCameFrom = fromWhere;
	var replyFailed = false;
	
	$('#animationTitles').fadeIn();
	$('#animationTitles h2').text('@Reply');
	
	switch(itCameFrom){
		case "centerInfographAnimate":
			//alert(itCameFrom);
			$('#backButton').unbind();
			$('#backButton').bind('click', function(){
				playDateAnimation = false;
				playTalkativeAnimation = false;
				playReplyAnimation = false;
				playTimelineAnimation = false;
				//Set this one to play...
				playCenterAnimation = true;
				$('#animationTitles h2').text('Tweets Overview');
				$('#backButton').fadeOut();
				//And then play it...
				centerInfographAnimate();
			});
			
			break;
		case "dateInfographAnimate":
			$('#backButton').unbind();
			$('#backButton').bind('click', function(){
				playDateAnimation = true;
				playTalkativeAnimation = false;
				playReplyAnimation = false;
				playTimelineAnimation = false;
				//Set this one to play...
				playCenterAnimation = false;
				$('#animationTitles h2').text('Most Recent Tweets');
				$('#backButton').fadeOut();
				//And then play it...
				dateInfographAnimate();
			});
			break;
		case "timelineInfographic":
			$('#backButton').unbind();
			$('#backButton').bind('click', function(){
				playDateAnimation = false;
				playTalkativeAnimation = false;
				playReplyAnimation = false;
				playTimelineAnimation = true;
				//Set this one to play...
				playCenterAnimation = false;
				$('#animationTitles h2').text('Timeline');
				$('#backButton').fadeOut();
				//And then play it...
				timelineInfographic();
			});
			break;
			
		case "talkativePersonInfo":
			$('#backButton').unbind();
			$('#backButton').bind('click', function(){
				playDateAnimation = false;
				playTalkativeAnimation = true;
				playReplyAnimation = false;
				playTimelineAnimation = false;
				//Set this one to play...
				playCenterAnimation = false;
				$('#animationTitles h2').text('Most Replies');
				$('#backButton').fadeOut();
				//And then play it...
				talkativePersonInfo();
			});
			break;
		
	default:
		//alert('Nope');
	}
	var convo = [];
	var foundTweet = [];

	convo.push(tweetToBeHandled);
	
	searchThatString(tweetToBeHandled)
	
	//console.log("BANJO");
	//console.log(replyParticleArray)
	
	function searchThatString(replyString){
	
		for(y=0;y<replyParticleArray.length;y++){
			//console.log(tweetToBeHandled.otherData.in_reply_to_status_id_str + " Sought");
			//console.log(replyParticleArray[y].otherData.in_reply_to_status_id_str + " Sifted");
			if(replyParticleArray[y].otherData.in_reply_to_status_id_str == tweetToBeHandled.otherData.in_reply_to_status_id_str){
				//console.log(y);
				convo.push(replyParticleArray[y]);
				//searchThatString(convo[(convo.length)-1].in_reply_to_status_id_str);
				foundTweet.push(replyParticleArray[y]);
				//console.log("It found it...  ----   1");
				//console.log(replyParticleArray[y])
				//searchThatString(replyParticleArray[y]);
				next();
				break;
			}
		}
		//console.log(foundTweet.otherData.id_str);
		
		function next(){
		//"197076247090700288"
		//https://api.twitter.com/1/statuses/show.json?id=197076247090700288&include_entities=true
		
		convo.shift();
		
		var whichTweetWouldYouLike = foundTweet[0].otherData.in_reply_to_status_id_str;
		var serveTheTweet = "https://api.twitter.com/1/statuses/show.json?id=" + whichTweetWouldYouLike + "&include_entities=true&callback=?";
		
		if(foundTweet[0].otherData.in_reply_to_status_id_str == null){
			//do nothing
		} else {
			$.ajax({type: 'GET', dataType: 'json', url: serveTheTweet, timeout: 5000, success: winning, error: noReply});
		}
		function winning(data){
			//console.log("Winning");
			//console.log(data);
			
			convo.push(new Particle(canvasWidth/2, canvasHeight/3, convo[0].radius, null, convo[0].r, convo[0].g, convo[0].b, convo[0].a, data.text, "reply", data.in_reply_to_screen_name, data));
			
			for(z=0;z<replyParticleArray.length;z++){
				//console.log(convo[convo.length-1].otherData.in_reply_to_status_id_str + " Sought");
				//console.log(replyParticleArray[z].otherData.id_str + " Sifted");
				if(convo[convo.length-1].otherData.in_reply_to_status_id_str == rawParticleArray[z].otherData.id_str){
					convo.push(replyParticleArray[z]);
				}
			}
			
			//console.log("Say wha...");
			//console.log(convo);
		
		}
		
		function noReply(){
			convo[0].x = canvasWidth/2;
			replyFailed = true;
			console.log("noReply called");
		}
		
		}//ends next()
		
		//console.log(foundTweet);
		//console.log(convo);
	}//Ends function
	
	//console.log(convo);
	//console.log('replyClicked called');
	
	var userX = canvasWidth/2;
	var userY = canvasHeight/2;
	var replyX = canvasWidth/2;
	var replyY = canvasHeight/2;
	
	//We need to get the initial coordinates so we can do a little math and animate a straight line...
	var initX = tmpBall.x;
	var initY = tmpBall.y;
	
	//console.log((canvasWidth/2 - initX) / 33);
	
	var xAnimationSteps = Math.round((canvasWidth/2 - initX) / 33);
	var yAnimationSteps = Math.round((canvasHeight/2 - initY) / 33);
	
	//console.log("Y Speed " + yAnimationSteps + " | X Speed " + xAnimationSteps);

	//console.log(tweetToBeHandled.otherData.in_reply_to_status_id_str);
	
	// We have to build the conversation...
	
	//var theConversation = constructTheConversation(tweetToBeHandled.otherData.in_reply_to_status_id_str);
	
	//console.log(theConversation);
	
	var animationSteps = 5;
	
	var profileImage = new Image();   // Create new img element  
	profileImage.src = twitterUserProfilePicture; // Set source path
	
	var replyImage = new Image();
	replyImage.src = "https://api.twitter.com/1/users/profile_image?screen_name=" + tweetToBeHandled.toWhom + "&size=bigger";
	
	playCenterAnimation = false;
	playDateAnimation = false;
	playReplyAnimation = true;
	
	firstAnimation = true;
	
	animateReply();
	
	function animateReply(){
		
		//First let's draw the user being spoken to...
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.beginPath();
		ctx.arc(replyX, replyY, 37, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();

		ctx.save();
		ctx.beginPath();
		ctx.arc(replyX, replyY, 35, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(replyImage, ((replyX)-(replyImage.width/2)), ((replyY)-(replyImage.height/2)), 73, 73);
		ctx.restore(); 
		
		if(replyX >= canvasWidth/2 && replyX < canvasWidth/2 + 200){
			replyX += animationSteps;
		}
		
		//and now, let's draw the user, this way they appear on top of the other guy...
		
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.beginPath();
		ctx.arc(userX, userY, 37, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.fill();
		
		ctx.save();
		ctx.beginPath();
		ctx.arc(userX, userY, 35, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(profileImage, ((userX)-(profileImage.width/2)), ((userY)-(profileImage.height/2)), 73, 73);
		ctx.restore(); 
		
		if(userX <= canvasWidth/2 && userX > canvasWidth/2 - 200){
			userX -= animationSteps;
		}
		
		//Now we've dealt with that in a rather swish manner, we have to deal with animating the particle. Bet you forgot about that!
		//Let's draw it first...
		//Reset to initRadius...
		tweetToBeHandled.radius = tweetToBeHandled.initRadius;
		ctx.fillStyle = "rgba(168,0,0,1)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(tweetToBeHandled.x, tweetToBeHandled.y, tweetToBeHandled.radius, 0, Math.PI*2, false);
		ctx.closePath;
		ctx.fill();
		
		/*if(tweetToBeHandled.x == canvasX && tweetToBeHandled.y == canvasY || tweetToBeHandled.x < (canvasX+tweetToBeHandled.radius) && tweetToBeHandled.x > (canvasX-tweetToBeHandled.radius) && tweetToBeHandled.y < (canvasY+tweetToBeHandled.radius) && tweetToBeHandled.y > (canvasY-tweetToBeHandled.radius)){
			ctx.strokeStyle = "rgba(255,255,255,1)";
			
			if(mouseDown && tweetToBeHandled.x == canvasWidth/2 && tweetToBeHandled.y == canvasHeight/2){
				console.log('Particle is at expected place.');
			}
			
		} else {
			ctx.strokeStyle = "rgba(168,0,0,1)";
		}*/
		
		ctx.beginPath();
		ctx.arc(tweetToBeHandled.x, tweetToBeHandled.y, tweetToBeHandled.radius+2, 0, Math.PI*2, false);
		ctx.closePath;
		ctx.stroke();
		
		//tweetToBeHandled.x += animationSteps;
		
		if(tweetToBeHandled.x == canvasWidth/2 && tweetToBeHandled.y == canvasHeight/2){
			firstAnimation = false;
		}
		
		if(firstAnimation){
			if(tweetToBeHandled.x > canvasWidth/2 || tweetToBeHandled.x < canvasWidth/2){
				tweetToBeHandled.x += xAnimationSteps;
			}
			
			if(tweetToBeHandled.y > canvasHeight/2 || tweetToBeHandled.y < canvasHeight/2){
				tweetToBeHandled.y += yAnimationSteps;
			}
			
			if(tweetToBeHandled.x < (canvasWidth/2)+10 && tweetToBeHandled.x > (canvasWidth/2)-10){
				tweetToBeHandled.x = canvasWidth/2;
			}
			
			if(tweetToBeHandled.y < (canvasHeight/2)+10 && tweetToBeHandled.y > (canvasHeight/2)-10){
				tweetToBeHandled.y = canvasHeight/2;
			}
		} else {
			ctx.clearRect(canvasWidth/2-40, canvasHeight/2-40, 80, 80);
			var convoLength = convo.length;
			
			if(replyFailed){
				ctx.strokeStyle = "rgba(162,0,0,1)";
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.moveTo(tweetToBeHandled.x + 140, tweetToBeHandled.y - 15);
				ctx.lineTo(tweetToBeHandled.x + 170, tweetToBeHandled.y + 15);
				ctx.moveTo(tweetToBeHandled.x + 170, tweetToBeHandled.y - 15);
				ctx.lineTo(tweetToBeHandled.x + 140, tweetToBeHandled.y + 15);				
				ctx.closePath();
				ctx.stroke();
				
				var noReplyText = "The person didn't reply :'(";
				var noReplyTextDim = ctx.measureText(noReplyText);
				var noReplyTextDimWidth = Math.round(noReplyTextDim.width);
				
				
				ctx.font = "14pt Helvetica";
				ctx.fillText(noReplyText, canvasWidth/2 - noReplyTextDimWidth/2, canvasHeight/2 + 100);
			}
			
			if(convoLength >= 3){
				convo.pop();
			}
			
			var distance = 125;
			var difference = replyX - userX;
			//console.log(difference);
			var distanceStep = (difference / convoLength)-50;
			
			ctx.strokeStyle = "rgba(168,0,0,.5)";
			ctx.lineWidth = 1;
			ctx.beginPath();  
			ctx.moveTo(userX+37, userY);  
			ctx.lineTo(replyX-37, replyY);    
			ctx.stroke();
			
			ctx.beginPath();
			ctx.moveTo(canvasWidth/2, (canvasHeight/2)-5);
			ctx.lineTo((canvasWidth/2)+10, canvasHeight/2);
			ctx.lineTo((canvasWidth/2), (canvasHeight/2)+5);
			ctx.lineTo(canvasWidth/2, (canvasHeight/2)-5);
			ctx.fill();
			ctx.closePath();
			
			ctx.strokeStyle = "rgba(168,0,0,1)";
			
			for(b=0;b<convo.length;b++){
				var tempTest = convo[b];
				
				tempTest.x = userX + distance;
				tempTest.y = canvasHeight/2;
				
				if(tempTest.x == canvasX && tempTest.y == canvasY || tempTest.x < (canvasX+tempTest.radius) && tempTest.x > (canvasX-tempTest.radius) && tempTest.y < (canvasY+tempTest.radius) && tempTest.y > (canvasY-tempTest.radius)){
					ctx.strokeStyle = "rgba(255,255,255,1)";
					
					if(tempTest.radius <= tempTest.initRadius && tempTest.radius <= 20){
						tempTest.radius = 15;
					}
					
					if(mouseDown){
						mouseDown = false;
						$('#tweetCard').show();
						$('#tweetCard').mouseout(function(){
							//mouseDown = false;
						});
						
						console.log(tempTest);
						
						//console.log(tempTest.otherData.in_reply_to_screen_name);
						//console.log(tempTest.otherData.user.screen_name);
						$('#twitterUserName').text("@" + twitterUser);
						$('#tweetContent').text(tempTest.thisTweet);
						if(tempTest.toWhom != null){
							//$('#tweetCard').hide();
							$('.cardLeft img').attr('src', twitterUserProfilePicture);
							
							if(tempTest.otherData.in_reply_to_screen_name == twitterUser){
								//$('.cardLeft img').attr('src', replyImage);
								$('.cardLeft img').attr('src', "https://api.twitter.com/1/users/profile_image?screen_name=" + tweetToBeHandled.toWhom + "&size=bigger");
								$('#twitterUserName').text("@" + tempTest.otherData.user.screen_name);
								
								console.log(twitterUser + ": Found this...");
							} else {
								$('.cardLeft img').attr('src', twitterUserProfilePicture);
								$('#twitterUserName').text("@" + twitterUser);
								console.log(tempTest.otherData.user.screen_name + ": Found this...");
							}
							//$('.cardLeft img').attr('src', sessionStorage.getItem(tempTest.toWhom));							
						}
						
						
						//console.log(tempTest.x + ", " + tempTest.y);
						//canvasX = 0;
						//canvasY = 0;
					}
					
				} else{
					ctx.strokeStyle = "rgba(168,0,0,1)";
					tempTest.radius = tempTest.initRadius;
				}
				
				
				ctx.beginPath();
				ctx.arc(tempTest.x, tempTest.y, tempTest.radius, 0, Math.PI*2, false);
				ctx.closePath;
				ctx.fill();
				
				ctx.beginPath();
				ctx.arc(tempTest.x, tempTest.y, tempTest.radius+2, 0, Math.PI*2, false);
				ctx.closePath;
				ctx.stroke();
				
				distance+=distanceStep;
			}
			
		}
		
		/*for(b=0;b<convo.length;b++){
			var tempTest = convo[b];
			
			ctx.beginPath();
			ctx.arc(tempTest.x, tempTest.y, tempTest.radius+2, 0, Math.PI*2, false);
			ctx.closePath;
			ctx.stroke();
		}
		*/
		
		//console.log(convo);
			
		if(playReplyAnimation){
			setTimeout(animateReply,33);
		}
	}
}