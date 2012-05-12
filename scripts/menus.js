//Deal with the menu objects that control the initial visualisation here.
var centerMenuOption = document.getElementById('centerMenuOption');
var centerMenu = document.getElementById('centerMenu');

centerMenuOption.addEventListener('mouseover', function(){
	document.getElementById('centerMenu').style.display = "block";
}, false);

centerMenuOption.addEventListener('click', function(){
	if(playCenterAnimation){
		//The animation is already playing... hide the menu
		centerMenu.style.display = "none";
	} else {
		//Set all other animations to not play...
		centerMenu.style.display = "none";
		playDateAnimation = false;
		playTalkativeAnimation = false;
		playReplyAnimation = false;
		playTimelineAnimation = false;
		playBoringDataAnimation = false;
		//Set this one to play...
		playCenterAnimation = true;
		//And then play it...
		centerInfographAnimate();
		$('#centerMenuOption img').attr('src', 'images/nav/CenterInfoGraphActive.png');
		$('#historyMenuOption img').attr('src', 'images/nav/historyInactive.png');
		$('#countMenuOption img').attr('src', 'images/nav/countInactive.png');
		$('#boringDataMenuOption img').attr('src', 'images/nav/boringDataInactive.png');
		$('#lazyAssPanel').hide();
		$('#backButton').fadeOut();
	}
}, false);

document.getElementById('twainCanvas').addEventListener('mouseover', function(){
	centerMenu.style.display = "none";
}, true);

//Play the center animation by type...
document.getElementById('centerType').addEventListener('click',function(){
	if(playCenterAnimation){
		//The animation is already playing... hide the menu
		centerMenu.style.display = "none";
	} else {
		//Set all other animations to not play...
		centerMenu.style.display = "none";
		playDateAnimation = false;
		playTalkativeAnimation = false;
		playReplyAnimation = false;
		playTimelineAnimation = false;
		playBoringDataAnimation = false;
		//Set this one to play...
		playCenterAnimation = true;
		//And then play it...
		centerInfographAnimate();
		$('#centerMenuOption img').attr('src', 'images/nav/CenterInfoGraphActive.png');
		$('#historyMenuOption img').attr('src', 'images/nav/historyInactive.png');
		$('#countMenuOption img').attr('src', 'images/nav/countInactive.png');
		$('#boringDataMenuOption img').attr('src', 'images/nav/boringDataInactive.png');
		$('#animationTitles').show();
		$('#animationTitles h2').text('Tweets Overview');
		$('#lazyAssPanel').hide();
		$('#backButton').fadeOut();
	}
}, false);

document.getElementById('centerDate').addEventListener('click',function(){
	if(playDateAnimation){
		//The animation is already playing... hide the menu
		centerMenu.style.display = "none";
	} else {
		//Set all other animations to not play...
		centerMenu.style.display = "none";
		playCenterAnimation = false;
		playTalkativeAnimation = false;
		playReplyAnimation = false;
		playTimelineAnimation = false;
		playBoringDataAnimation = false;
		//Set this one to play...
		playDateAnimation = true;
		//And then play it...
		dateInfographAnimate();
		$('#centerMenuOption img').attr('src', 'images/nav/CenterInfoGraphActive.png');
		$('#historyMenuOption img').attr('src', 'images/nav/historyInactive.png');
		$('#countMenuOption img').attr('src', 'images/nav/countInactive.png');
		$('#boringDataMenuOption img').attr('src', 'images/nav/boringDataInactive.png');
		$('#animationTitles').show();
		$('#animationTitles h2').text('Most Recent Tweets');
		$('#lazyAssPanel').hide();
		$('#backButton').fadeOut();
	}
}, false);

document.getElementById('countMenuOption').addEventListener('click', function(){
	if(playTalkativeAnimation){
		//Do nothing...
	} else{
		playCenterAnimation = false;
		playDateAnimation =  false;
		playReplyAnimation = false;
		playTimelineAnimation = false;
		playBoringDataAnimation = false;
		//Set this one to play...
		playTalkativeAnimation = true;
		//And then play it...
		talkativePersonInfo();
		$('#countMenuOption img').attr('src', 'images/nav/countActive.png');
		$('#historyMenuOption img').attr('src', 'images/nav/historyInactive.png');
		$('#centerMenuOption img').attr('src', 'images/nav/CenterInfoGraphInactive.png');
		$('#boringDataMenuOption img').attr('src', 'images/nav/boringDataInactive.png');
		$('#animationTitles').show();
		$('#animationTitles h2').text('Most Replies');
		$('#lazyAssPanel').hide();
		$('#backButton').fadeOut();
	}
}, false);

document.getElementById('historyMenuOption').addEventListener('click', function(){
	if(playTimelineAnimation){
		//Do nothing...
	} else{
		playCenterAnimation = false;
		playDateAnimation =  false;
		playTalkativeAnimation = false;
		playReplyAnimation = false;
		playBoringDataAnimation = false;
		//Set this one to play...
		playTimelineAnimation = true;
		//And then play it...
		timelineInfographic();
		$('#historyMenuOption img').attr('src', 'images/nav/historyActive.png');
		$('#countMenuOption img').attr('src', 'images/nav/countInactive.png');
		$('#centerMenuOption img').attr('src', 'images/nav/CenterInfoGraphInactive.png');
		$('#boringDataMenuOption img').attr('src', 'images/nav/boringDataInactive.png');
		$('#animationTitles').show();
		$('#animationTitles h2').text('Timeline');
		$('#lazyAssPanel').hide();
		$('#backButton').fadeOut();
	}
}, false);

document.getElementById('boringDataMenuOption').addEventListener('click', function(){
	if(playBoringDataAnimation){
		//Do nothing...
		$('#lazyAssPanel').fadeIn();
	} else{
		playCenterAnimation = false;
		playDateAnimation =  false;
		playTalkativeAnimation = false;
		playReplyAnimation = false;
		playTimelineAnimation = false;
		//Set this one to play...
		playBoringDataAnimation = true;
		//And then play it...
		boringData();
		$('#historyMenuOption img').attr('src', 'images/nav/historyInactive.png');
		$('#countMenuOption img').attr('src', 'images/nav/countInactive.png');
		$('#centerMenuOption img').attr('src', 'images/nav/CenterInfoGraphInactive.png');
		$('#boringDataMenuOption img').attr('src', 'images/nav/boringDataActive.png');
		$('#animationTitles').show();
		$('#animationTitles h2').text('Data Overview');
		$('#lazyAssPanel').fadeIn();
		$('#backButton').fadeOut();
	}
	
}, false);

document.getElementById('newTab').addEventListener('click', function(){
	$('#userForm').fadeIn();
	$('#closeForm').fadeIn();
}, false)