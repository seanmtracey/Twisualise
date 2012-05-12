var canvas = $("#twainCanvas");
var ctx = canvas.get(0).getContext("2d");

var canvasWidth = canvas.width();
var canvasHeight = canvas.height();

var canvasX;
var canvasY;
var mouseDown = false;

var twitterData = new Array();
var particleArray = new Array();
var people = new Array();
var peopleCount = new Array();
var ultimateCount = new Array();
var rtNum = 0;
var tweetNum = 0;
var replyNum = 0;
var linkNum = 0;
var hashNum = 0;
var ultimateCircumference = 0;
var numberOfTweets = 100;
var lastSliderValue;
var lookUpProfilePictures = new Array();
var lastRequestedData;
var peopleSampleData = new Array();

var rawParticleArray = new Array();

var replyParticleArray = new Array();
var tweetParticleArray = new Array();
var retweetParticleArray = new Array();
var linkParticleArray = new Array();

var playPrerequestAnimation = true;
var playCenterAnimation = false;
var playDateAnimation = false;
var playReplyAnimation = false;
var playTalkativeAnimation = false;
var playTimelineAnimation = false;
var playBoringDataAnimation = false;

var centerInfographAnimation = true;

var twitterUser;
var twitterUserProfilePicture;

var Particle = function (x, y, radius, angle, r, g, b, a, thisTweet, identifier, toWhom, otherData){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.initRadius = radius;
	this.angle = angle;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	this.thisTweet = thisTweet;
	this.identifier = identifier;
	this.toWhom = toWhom;
	this.otherData = otherData;
}//ends Particle();

//If you want to retrieve a tweet based on the status ID this is the URI.
//http://api.twitter.com/1/statuses/show/{status_id}.json
$(document).ready(function(){	
	$('#speakTo').lionbars();
	preRequest();
	//Handle the 'twitterverse' view in this function - Maybe
	//moveTheCanvas();
	
	checkURL();
	
	//document.getElementById('userInput').focus();
	//document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });
	
	$(window).resize(resizeCanvas);
	
	function resizeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		canvasWidth= canvas.width();
		canvasHeight = canvas.height();
	}
	
	resizeCanvas();
});//Ends $('document').ready();

/*
var MOVE = 0;
function moveTheCanvas(){
	ctx.translate(MOVE, 0);
	MOVE -= 0.1;
	setTimeout(moveTheCanvas, 33);
}
*/

function checkURL(){
	//This can be used to select more than one person. Not necesary to implement atm...
	//var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	var getURL = window.location.href.slice(window.location.href.indexOf('?') + 1);
	//alert(getURL);
	var splitTheURL = getURL.split('=');
	var theObtainedUser = splitTheURL[1];
	if(theObtainedUser == undefined){
		//Do nothing - be one with the seasons and let nature take its course
	} else {
		//playPrerequestanimation = false;
		playCenterAnimation = true;
		//alert(theObtainedUser);
		$('.loading').fadeIn();
		$('#userForm').hide();
		$('#twainQuote').hide();
		$('#visualisationsSelector').fadeIn();
		$('#animationTitles').fadeIn();
		$('#animationTitles h2').text('Tweets Overview');
		twitterUser = theObtainedUser;
		var twitterString = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&page=1&screen_name=" + twitterUser + "&count="+ numberOfTweets +"&callback=?";
		twitterUserProfilePicture = "https://api.twitter.com/1/users/profile_image?screen_name=" + twitterUser + "&size=bigger";
		//centerInfograph();
		makeRequest(twitterString);
		playAnimation = false;
	}
	
	
}

	//Keyboard/Mouse controls
	window.onkeyup = function(evt) {
			var key = evt.keyCode;
			if (key == 27) {
				$('#userForm').fadeIn();
				$('#closeForm').fadeIn();
			};
		};
	
	var slider = document.getElementById('tweetNumberSelector');
	slider.addEventListener("change", sliderValue ,true);
	
	function sliderValue(){
		var sliderValue = this.value;
		lastSliderValue = sliderValue;
		numberOfTweets = sliderValue;
		$('#whatsTheValue').html("("+ sliderValue +")");
		//console.log(sliderValue);
	}
	
	//Mouse Controls
	$('canvas').mousedown(function(e){
		//canvasX = e.pageX;
		//canvasY = e.pageY;
		mouseDown = true;
		//alert("Registered");
		//console.log(e.pageX +', '+ e.pageY);
	}); 
	
	$('canvas').mouseup(function(e){
		mouseDown = false;
	})
	
	$('canvas').mousemove(function(e){
		canvasX = e.pageX;
		canvasY = e.pageY;
	});
	
	/*$('canvas').bind("touchmove",function(e){
		canvasX = e.pageX;
		canvasY = e.pageY;
	})*/
	
	$('#closeCard').click(function(){
		$('#tweetCard').fadeOut();
	});
	
	$('#closeForm').click(function(){
		$('#userForm').fadeOut();
	});
	
	//Panel controls...
	$('.button').bind("click", slideOut);
	
		function slideOut(){
			//Deal with the Arrow Rotations
			$('.button img').addClass('doABarrellRoll');
			setTimeout("$('.button img').removeClass('doABarrellRoll')", 500);
			$('.button img').css("-webkit-transform","rotate(180deg)");
			$('.button img').css("-moz-transform","rotate(180deg)");
			
			//Deal with the Panel
			//$('#leftPanel').addClass('slideOut');
			//setTimeout("$('#leftPanel').removeClass('slideOut')", 1000);
			//$('#leftPanel').css('margin-left','0');
			
			$('.button').unbind("click", slideOut);
			$('.button').bind("click", slideIn);
			
		}
	
		function slideIn(){
			//Deal with the Arrow Rotations
			$('.button img').addClass('doABarrellRollReverse');
			setTimeout("$('.button img').removeClass('doABarrellRollReverse')", 500);
			$('.button img').css("-webkit-transform","rotate(00deg)");
			$('.button img').css("-moz-transform","rotate(00deg)");
			
			//Deal with the Panel
			//$('#leftPanel').addClass('slideIn');
			//setTimeout("$('#leftPanel').removeClass('slideIn')", 1000);
			//$('#leftPanel').css('margin-left','-155px');
			
			$('.button').unbind("click", slideIn);
			$('.button').bind("click", slideOut);
			
		}
		
	$('canvas').unbind('click');
	//console.log(twitterString);

	$('#usernameButton').click(function(event){
		event.preventDefault();
		$('.loading').fadeIn();
		$('#userForm').fadeOut();
		$('#twainQuote').fadeOut();
		
		playPrerequestAnimation = false;
		
		playCenterAnimation = true;
		playDateAnimation = false;
		playReplyAnimation = false;
		playTalkativeAnimation = false;
		playTimelineAnimation = false;
		playBoringDataAnimation = false;
		
		$('#visualisationsSelector').fadeIn();
		$('#tweetCard').fadeOut();
		if(numberOfTweets > 200){
			alert('You\'ve requested too many Tweets...\n200 is the limit...\nI\'ll get the 200 tweets...');
		}
		
		var initInputString = document.getElementById('userInput').value;
		var removeAt = initInputString.replace("@", "");
		//twitterUser = document.getElementById('userInput').value;
		
		twitterUser = removeAt;
		
		var twitterString = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&page=1&screen_name=" + twitterUser + "&count="+ numberOfTweets +"&callback=?";
		twitterUserProfilePicture = "https://api.twitter.com/1/users/profile_image?screen_name=" + twitterUser + "&size=bigger";
		//centerInfograph();
		makeRequest(twitterString);
		playAnimation = false;
	});
	
	function makeRequest(twitterString){
		$.ajax({type: 'GET', dataType: 'json', url: twitterString, timeout: 5000, success: dataDelegate, error: dataFailed});
		//console.log(twitterUser);
		console.log(twitterString);
	}
	
	function dataDelegate(data){
		var dataToBeDelegated = data;
		lastRequestedData = data;
		//Send to appropriate function for relavant visualisation.
		if(centerInfographAnimation){
			centerInfograph(dataToBeDelegated);
		}
	}
	
	//AJAX request fallback handler
	function dataFailed(){
		$('.loading').fadeOut();
		$('#visualisationsSelector').fadeOut();
		$('#userForm').fadeIn();
	};
	
function centerInfograph(data){
	
	$('#lazyAssPanel').hide();
	
	//playCenterAnimation = true;
	//playDateAnimation = false;
	
	var centerInfographData = data;
	dataRetrieved(centerInfographData);
	
	function dataRetrieved(data){
		console.log(data);
		twitterData.length = 0;
		
		var theAngle = 0;
		ultimateCircumference = 0;
		
				for(i=0; i < data.length; i++){
					twitterData.push(data[i]);
					//alert(data[i].text);
				}
				
				console.log(twitterData);
				
				for(t=0;t<twitterData.length;t++){
					console.log(twitterData[t].text);
				}
				
				particleArray.length = 0;
				rawParticleArray.length = 0;
				people.length = 0;
				replyParticleArray.length = 0;
				retweetParticleArray.length = 0;
				linkParticleArray.length = 0;
				tweetParticleArray.length = 0;
				tweetNum = 0;
				replyNum = 0;
				rtNum = 0;
				linkNum = 0;
				
				for (var i = 0; i < twitterData.length; i++){

					var x = canvasWidth/2;
					var y = canvasHeight/2;

					var a = 1;
					
					var thisTweet = twitterData[i].text;
					
					var radius = Math.floor(((thisTweet.length)/10)/1.3);
					
					var angle = theAngle;
					
					theAngle += 3.65;
					
					if(radius < 3){
						radius = 4;
					}
					
					ultimateCircumference+=(radius*2)+10;
					
					var atTest = thisTweet.indexOf("@");
					var rtTest = thisTweet.indexOf("RT");
					var linkTest = thisTweet.indexOf("http://");
					var hashtagTest = thisTweet.indexOf("#");
						
					if (atTest >= 0 && rtTest == -1){
						var r = 163;
						var g = 0;
						var b = 0;
						replyNum++;
						rawParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "reply", twitterData[i].in_reply_to_screen_name, twitterData[i]));

						replyParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "reply", twitterData[i].in_reply_to_screen_name, twitterData[i]));
						//This throws an unusual error but is better at getting the user data
						//replyParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "reply", twitterData[i].entities.user_mentions[0].screen_name));
						
						//Push the screen_name of the replied user to an array
						people.push(twitterData[i].in_reply_to_screen_name);
						peopleCount.push(twitterData[i].in_reply_to_screen_name);
					} else if (rtTest >= 0){
						var r = 255;
						var g = 222;
						var b = 0;
						rtNum++
						rawParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "retweet", null, twitterData[i]));
						
						retweetParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "retweet", null, twitterData[i]));
					} else if(linkTest >= 0){
						var r = 255;
						var g = 255;
						var b = 255;
						/*
						if(twitterData[i].entities.media){
							var r = 0;
							var g = 255;
							var b = 0;
						} else {
							var r = 255;
							var g = 255;
							var b = 255;
						}*/
						
						linkNum++
						rawParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "link", null, twitterData[i]));
						
						linkParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "link", null, twitterData[i]));
					} else {
						var r = 66;
						var g = 110;
						var b = 166;
						tweetNum++;
						rawParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "justTweet", null, twitterData[i]));
						
						tweetParticleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet, "justTweet", null, twitterData[i]));
					}
					//particleArray.push(new Particle(x, y, radius, angle, r, g, b, a, thisTweet));
					$('.loading').fadeOut();
				}//ends for loop
				
				var sortTheAnglesOut = 0;
				
				console.log(particleArray.length);
				
				//Now let's sort those according to their types
				for(i=0;i<replyParticleArray.length;i++){
					replyParticleArray[i].angle = sortTheAnglesOut;
					sortTheAnglesOut += (360/numberOfTweets);
					particleArray.push(replyParticleArray[i]);
					console.log('ReplyParticle');
				}
				
				for(i=0;i<retweetParticleArray.length;i++){
					retweetParticleArray[i].angle = sortTheAnglesOut;
					sortTheAnglesOut += (360/numberOfTweets);
					particleArray.push(retweetParticleArray[i]);
					console.log('RetweetParticle');
				}
				
				for(i=0;i<linkParticleArray.length;i++){
					linkParticleArray[i].angle = sortTheAnglesOut;
					sortTheAnglesOut += (360/numberOfTweets);
					particleArray.push(linkParticleArray[i]);
					console.log('LinkParticle');
				}
				
				for(i=0;i<tweetParticleArray.length;i++){
					tweetParticleArray[i].angle = sortTheAnglesOut;
					sortTheAnglesOut += (360/numberOfTweets);
					particleArray.push(tweetParticleArray[i]);
					console.log('TweetParticle');
				}
				
				//Fix the infographic if the user has less than the requested number of tweets...
				if(particleArray.length < numberOfTweets){
					var gainedNumberOfTweets = particleArray.length;
					var resortTheAngle = 0;
						for(i=0;i<particleArray.length;i++){
							particleArray[i].angle = resortTheAngle;
							resortTheAngle += (360/gainedNumberOfTweets);
						}
				}
				//do the same for the rawParticleArray.
				for(i=0;i<rawParticleArray.length;i++){
					rawParticleArray[i].angle = sortTheAnglesOut;
					sortTheAnglesOut += (360/rawParticleArray.length);
					//console.log('ReplyParticle');
				}
				
				console.log(sortTheAnglesOut);
				
				//console.log(particleArray);
				
				//Use Twitter's Lookup API to access information about all of the people whom you've @replied to...
				//Take the people array, turn it into a string - 
				var lookUp = "https://api.twitter.com/1/users/lookup.json?screen_name=" + people.toString() + "&include_entities=true&callback=?";
				//console.log(stringyPeople)
				
				$.ajax({type: 'GET', dataType: 'json', url: lookUp, timeout: 5000, success: lookUpWorked, error: function(){/*$('#leftPanel').fadeOut();*/$('#speakTo').empty();console.log('People lookup failed...')}});
				
				function lookUpWorked(thisData){
					console.log(thisData);
					peopleDataSample = thisData;
					//console.log(peopleDataSample[0]);
					$('#speakTo').empty();
					
					for(i=0;i<peopleDataSample.length;i+=1){
						var thisPersonsScreenName = peopleDataSample[i].screen_name;
						var thisPersonsImage = peopleDataSample[i].profile_image_url;
						sessionStorage.setItem(thisPersonsScreenName, thisPersonsImage);
						
						$('#speakTo').append("<img src=\"" + thisPersonsImage + "\" width=\"48\" height=\"48\" alt=\"A fellow Twitter User\"" + "data-whoIsThisPerson=\"" + peopleDataSample[i].screen_name + "\" />");
						
					}
					//$('#leftPanel').fadeIn();
					//$('.button').fadeIn();
					
				}
				
				//Sort the screen_names alphabetically
				people.sort();
				
				//Get information on the Twitter users that have been @replied to
				//Let's tally the number of times that person has been spoken to...
				//peopleCount = people.slice();
				
				//Look for duplicate entries by comparing entry to previous entry and remove
				for(i=0;i<people.length;i++){
					if (people[i] === people[i-1]){
				        people.splice(i--,1);
					}
				}
				
				function talkativePerson(name, count){
					 this.name = name;
					 this.count = count;
				}
				
				var aCount = 0;
				//Obligatory explanation
				//Here, we're looking at the people array which has been sorted and spliced so that it is alphabetical and has no duplicates
				//We are then iterating through the people array and counting the number of times that name occurs in the peopleCount array
				//---I know these names are terrible but how else do you describe something so boring---
				//Every time the name in peopleCount matches the name in being searched for in people aCount gets +1 added to it;
				//When all the entries have been searched against that name it creates a new object and then adds it to the ultimateCount array
				//Then it repeats against the next name in the people array...
				for(i=0;i<people.length;i++){
					aCount = 0;
					var searchingFor = people[i];
					
					console.log(searchingFor + "--------");
					
					for(q=0;q<people.length;q++){
						if (peopleCount[q] === searchingFor){
							aCount++;
							console.log(aCount + " " + people[i]);
						} 
					}//ends for loop
					
					if(aCount == 0){
						aCount = 1;
					}

					ultimateCount.push(new talkativePerson(searchingFor, aCount));
				}//ends for loop
				
				console.log(ultimateCount);
				
				console.log()
				
				console.log("The Count " + peopleCount);
				
				
				
				
				
				if(numberOfTweets > 100){
					var workItOut = numberOfTweets/100;
					
					replyNum = Math.floor((replyNum/workItOut));
					rtNum = Math.floor((rtNum/workItOut));
					linkNum = Math.floor((linkNum/workItOut));
					tweetNum = Math.floor((tweetNum/workItOut));
					console.log(replyNum + " " + rtNum + " " + linkNum);
				} else if(numberOfTweets < 100){
					var workItOut = 100/numberOfTweets;
					
					replyNum = Math.round((replyNum*workItOut));
					rtNum = Math.round((rtNum*workItOut));
					linkNum = Math.round((linkNum*workItOut));
					tweetNum = Math.round((tweetNum*workItOut));
				}
				
				console.log(people);
				console.log("Replies: " + replyNum + " | Retweets: " + rtNum + " | Tweets: " + tweetNum + " | Links: " + linkNum + " | Total: " + (replyNum+rtNum+tweetNum+linkNum));
				console.log('The Ultimate Circumference is: ' + ultimateCircumference*2);
				console.log('The radius is of the Ultimate Circumference is: ' + Math.floor((ultimateCircumference/(Math.PI)/2)));
				//Little bit of the History API - God, I love Javascript :D
				var userURL = twitterUser;
				window.history.pushState(userURL, "TwAIN - " + twitterUser , "index.html"+"?username="+twitterUser);
				playAnimation = true;
				centerInfographAnimate();
	}
	
	var theY = 0;

}//ends centerInfograph();

//Is it an X or Y co-ordinate, the centerpoint, the radius, the angle to draw it at
function trigonometry(whichIsIt, xOrY, radius, angle){
	this.dealWithIt = whichIsIt;
	this.theInput = xOrY;
	this.inputRadius = radius;
	this.inputAngle = angle;
	
	if(dealWithIt == "X"){
		var trigonometryX = xOrY + (inputRadius*Math.cos(inputAngle*(Math.PI/180)));
		return trigonometryX;
	} else if(dealWithIt == "Y"){
		var trigonometryY = xOrY + (inputRadius*Math.sin(inputAngle*(Math.PI/180)));
		return trigonometryY;
	}
}

/*
function trigonometryY(y, radius, angle){
	inputY = y;
	inputRadius = radius;
	inputAngle = angle;

	var trigonometryY = inputY + (inputRadius*Math.sin(inputAngle*(Math.PI/180)));
	
	return trigonometryY;
}*/