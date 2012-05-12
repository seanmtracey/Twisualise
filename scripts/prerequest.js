function preRequest(){
	var touchX;
	var touchY;
	
	var makeParticles = false;
	var howMany = 10;
	
	$('#twainCanvas').mouseover(function(){
		makeParticles = true;
	})
	
	$('#twainCanvas').mousemove(function(e){
		touchX = e.pageX;
		touchY = e.pageY;
		//makeParticles = true;
	});
	
	$('#twainCanvas').mouseleave(function(){
		makeParticles = false;
	})
	
	$('#twainQuote').mouseover(function(){
		makeParticles = true;
	});
	
	$('#twainQuote').mousemove(function(e){
		touchX = e.pageX;
		touchY = e.pageY;
	});
	
	var playAnimation = true;
	
	var funParticleArray = [];
	
	var funParticle = function (x, y, radius, r, g, b, a, vx, vy){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
		this.vx = vx;
		this.vy = vy;
	}//ends funParticle();
	
	//ctx.arc(atBall.x, atBall.y, 22, 0, Math.PI*2, false);
	
	animate();
	
	function animate(){
		if(playCenterAnimation ==  true){
			playPrerequestAnimation = false;
		}
		for(x=0;x<3;x++){
			var randomRadius = Math.floor(Math.random()*15);
			
			if(x == 0){
				var theRed = 66;
				var theGreen = 110;
				var theBlue = 166;
			} else if (x == 1) {
				var theRed = 163;
				var theGreen = 0;
				var theBlue = 0;
			} else if (x == 2){
				var theRed = 255;
				var theGreen = 255;
				var theBlue = 0;
			} else if (x == 3){
				var theRed = 130;
				var theGreen = 55;
				var theBlue = 3;
			}
			var randomVX = Math.random()*10 + Math.random()*-10 ;
			var randomVY = Math.random()*10 + Math.random()*-10;
		
			if(makeParticles){
				funParticleArray.push(new funParticle(touchX, touchY, randomRadius, theRed, theGreen, theBlue, 1, randomVX, randomVY));
			}
		}
	
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	
		for(i=0;i<funParticleArray.length;i++){
	
			var tmpBall = funParticleArray[i];
	
	        ctx.fillStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", " + tmpBall.a + ")";
			ctx.strokeStyle = "rgba(" + tmpBall.r + ", " + tmpBall.g + ", " + tmpBall.b + ", .5)";
			
	        ctx.beginPath();
	        ctx.arc(tmpBall.x, tmpBall.y, tmpBall.radius, 0, Math.PI*2, false);
	        ctx.closePath;
	        ctx.fill();
	        
	        ctx.lineWidth = 1;
	        ctx.beginPath();
	        ctx.arc(tmpBall.x, tmpBall.y, tmpBall.radius+2, 0, Math.PI*2, false);
	        ctx.closePath;
	        ctx.stroke();
	
	        tmpBall.x += tmpBall.vx;
	        tmpBall.y += tmpBall.vy;
		}
	
		if(funParticleArray.length >= howMany){
			funParticleArray.shift();
			
			if(funParticleArray.length >= 30){
				for(z=0;z<10;z++){
					funParticleArray.shift();
				}
			}
			
			//console.log("shift");
		}
		
		if(playPrerequestAnimation){
			setTimeout(animate, 33);
		}
		//console.log(funParticleArray.length)
	}
}//Ends preRequest();