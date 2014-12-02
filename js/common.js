var confettiPapers = new Array();
var confettiPaperCount = 200;
		
var confettiBalloons;
var confettiBalloonCount = 21;

var topHeight = 0;

$(document).ready(function(){
		

	$('#celebrate').click(function(){
		//alert('fd');
		confettiEffect();
	});
	
	// on init
	var frameRate = 35;
	var dt = 1.0 / frameRate;
	var DEG_TO_RAD = Math.PI / 180;
	var RAD_TO_DEG = 180 / Math.PI;
	var colors = [ [ "#df0049", "#660671" ],
	               [ "#00e857", "#005291" ], [ "#2bebbc", "#05798a" ],
	               [ "#ffd200", "#b06c00" ] ];
	var balls = [ "http://static.tumblr.com/tgetjr7/aLmmqune2/balloon_blue_1.png",
	              "http://static.tumblr.com/tgetjr7/Fofmqunf0/balloon_green_1.png",
	              "http://static.tumblr.com/tgetjr7/bQImquni9/balloon_pink_1.png",
	              "http://static.tumblr.com/tgetjr7/UIymqunj2/balloon_yellow_1.png",
	              "http://static.tumblr.com/tgetjr7/GBOmqunee/balloon_blue_2.png",
	              "http://static.tumblr.com/tgetjr7/d4Tmqunf8/balloon_green_2.png",
	              "http://static.tumblr.com/tgetjr7/Ntumqunig/balloon_pink_2.png",
	              "http://static.tumblr.com/tgetjr7/mKAmqunj9/balloon_yellow_2.png",
	              "http://static.tumblr.com/tgetjr7/kpVmqunem/balloon_blue_3.png",
	              "http://static.tumblr.com/tgetjr7/Gtlmqungz/balloon_green_3.png",
	              "http://static.tumblr.com/tgetjr7/536mqunip/balloon_pink_3.png",
	              "http://static.tumblr.com/tgetjr7/jahmqunjg/balloon_yellow_3.png",
	              "http://static.tumblr.com/tgetjr7/bUGmquniv/balloon_pink_4.png",
	              "http://static.tumblr.com/tgetjr7/NSKmquneu/balloon_blue_4.png"];

	function Vector2(_x, _y) {
		this.x = _x, this.y = _y;
		this.Length = function() {
			return Math.sqrt(this.SqrLength());
		}
		this.SqrLength = function() {
			return this.x * this.x + this.y * this.y;
		}
		this.Equals = function(_vec0, _vec1) {
			return _vec0.x == _vec1.x && _vec0.y == _vec1.y;
		}
		this.Add = function(_vec) {
			this.x += _vec.x;
			this.y += _vec.y;
		}
		this.Sub = function(_vec) {
			this.x -= _vec.x;
			this.y -= _vec.y;
		}
		this.Div = function(_f) {
			this.x /= _f;
			this.y /= _f;
		}
		this.Mul = function(_f) {
			this.x *= _f;
			this.y *= _f;
		}
		this.Normalize = function() {
			var sqrLen = this.SqrLength();
			if (sqrLen != 0) {
				var factor = 1.0 / Math.sqrt(sqrLen);
				this.x *= factor;
				this.y *= factor;
			}
		}
		this.Normalized = function() {
			var sqrLen = this.SqrLength();
			if (sqrLen != 0) {
				var factor = 1.0 / Math.sqrt(sqrLen);
				return new Vector2(this.x * factor, this.y
						* factor);
			}
			return new Vector2(0, 0);
		}
	}
	Vector2.Lerp = function(_vec0, _vec1, _t) {
		return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x,
				(_vec1.y - _vec0.y) * _t + _vec0.y);
	}
	Vector2.Distance = function(_vec0, _vec1) {
		return Math.sqrt(Vector2.SqrDistance(_vec0, _vec1));
	}
	Vector2.SqrDistance = function(_vec0, _vec1) {
		var x = _vec0.x - _vec1.x;
		var y = _vec0.y - _vec1.y;
		return (x * x + y * y + z * z);
	}
	Vector2.Scale = function(_vec0, _vec1) {
		return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
	}
	Vector2.Min = function(_vec0, _vec1) {
		return new Vector2(Math.min(_vec0.x, _vec1.x), Math
				.min(_vec0.y, _vec1.y));
	}
	Vector2.Max = function(_vec0, _vec1) {
		return new Vector2(Math.max(_vec0.x, _vec1.x), Math
				.max(_vec0.y, _vec1.y));
	}
	Vector2.ClampMagnitude = function(_vec0, _len) {
		var vecNorm = _vec0.Normalized;
		return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
	}
	Vector2.Sub = function(_vec0, _vec1) {
		return new Vector2(_vec0.x - _vec1.x,
				_vec0.y - _vec1.y, _vec0.z - _vec1.z);
	}

	function ConfettiPaper(_x, _y) {
		this.pos = new Vector2(_x, _y);
		this.rotationSpeed = Math.random() * 600 + 100;
		this.angle = DEG_TO_RAD * Math.random() * 360;
		this.rotation = DEG_TO_RAD * Math.random() * 360;
		this.cosA = 1.0;
		this.sizeX = 2 + Math.random() * 5;
		this.sizeY = this.sizeX + Math.random() * 3;
		if(this.sizeY > 8) {
			this.sizeY = 8;
		}
		
		this.oscillationSpeed = Math.random() * 1.5 + 0.5;
		this.xSpeed = 40.0;
		this.ySpeed = Math.random() * 60 + 160.0;
		this.corners = new Array();
		this.time = Math.random();
		var ci = Math
		.round(Math.random() * (colors.length - 1));
		this.frontColor = colors[ci][0];
		this.backColor = colors[ci][1];
		for ( var i = 0; i < 4; i++) {
			var dx = Math.cos(this.angle + DEG_TO_RAD
					* (i * 90 + 45));
			var dy = Math.sin(this.angle + DEG_TO_RAD
					* (i * 90 + 45));
			this.corners[i] = new Vector2(dx, dy);
		}

		this.Update = function(_dt) {
			this.time += _dt;
			this.rotation += this.rotationSpeed * _dt;
			this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
			this.pos.x += Math.cos(this.time
					* this.oscillationSpeed)
					* this.xSpeed * _dt
					this.pos.y += this.ySpeed * _dt;
			if (this.pos.y > ConfettiPaper.bounds.y) {
				this.pos.x = Math.random()
				* ConfettiPaper.bounds.x;
				this.pos.y = 0;
			}
		}

		this.Draw = function(_g) {
			if (this.cosA > 0) {
				_g.fillStyle = this.frontColor;
			} else {
				_g.fillStyle = this.backColor;
			}
			_g.beginPath();
			_g.moveTo(this.pos.x + this.corners[0].x
					* this.sizeX, this.pos.y
					+ this.corners[0].y * this.sizeY
					* this.cosA);
			for ( var i = 1; i < 4; i++) {
				_g.lineTo(this.pos.x + this.corners[i].x
						* this.sizeX, this.pos.y
						+ this.corners[i].y * this.sizeY
						* this.cosA);
			}
			_g.closePath();
			_g.fill();
		}
	}
	ConfettiPaper.bounds = new Vector2(0, 0);

	function ConfettiBalloon(_x, _y, index) {
		this.pos = new Vector2(_x, _y);

		var imageIndex = index % (balls.length-1) ;

		this.img = new Image;
		this.img.src = balls[imageIndex];
		this.rotationSpeed = Math.random() * 600 + 100;
		this.angle = DEG_TO_RAD * Math.random() * 360;
		this.rotation = DEG_TO_RAD * Math.random() * 360;
		this.cosA = 1.0;
		this.oscillationSpeed = Math.random() * 1.0;
		this.xSpeed = 40.0;
		this.ySpeed = Math.random() * 60 + 220.0;
		this.time = Math.random();

		//this.randomRotate = Math.random() * 3.14;

		this.pos.x = 40 + Math.random()
		* (ConfettiBalloon.bounds.x - 210);
		this.pos.y = Math.random()
		* (ConfettiBalloon.bounds.y - 50);

		this.Update = function(_dt) {
			this.time += _dt;
			this.rotation += this.rotationSpeed * _dt;
			this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
			this.pos.x -= Math.cos(this.time
					* this.oscillationSpeed)
					* this.xSpeed * _dt;							
			this.pos.y -= this.ySpeed * _dt;

			// not display outside canvas
			if(this.pos.x <= 0) {
				this.pos.x = 0;
			}
			if(this.pos.x >= ConfettiBalloon.bounds.x - 130) {
				this.pos.x = ConfettiBalloon.bounds.x - 130;
			}

			if (this.pos.y < -130) {
				this.pos.x = 40 + Math.random()
				* (ConfettiBalloon.bounds.x - 200);								
				this.pos.y = ConfettiBalloon.bounds.y;
			}
		}

		this.Draw = function(_g) {
			_g.drawImage(this.img, this.pos.x, this.pos.y);
		}
		
		this.ResetY = function(_g) {
			this.pos.y = Math.random()*(ConfettiBalloon.bounds.y - 100) + 100;;
			
		}
	}
	ConfettiBalloon.bounds = new Vector2(0, 0);

	confetti = {};
	confetti.Context = function(parent) {
		var i = 0;
		var canvasParent = document.getElementById(parent);
		var canvas = document.createElement('canvas');
		//var canvas = document.getElementById('drawingCanvas');
		canvas.width = canvasParent.offsetWidth;
		canvas.height = canvasParent.offsetHeight;
		canvasParent.appendChild(canvas);
		
		var context = canvas.getContext('2d');
		var interval = null;

		
		confettiBalloons = new Array();
		ConfettiBalloon.bounds = new Vector2(canvas.width,
				canvas.height);
		for (i = 0; i < confettiBalloonCount; i++) {
			confettiBalloons[i] = new ConfettiBalloon(Math
					.random()
					* canvas.width, Math.random()
					* canvas.height, i);
		}

		ConfettiPaper.bounds = new Vector2(canvas.width,
				canvas.height);
		for (i = 0; i < confettiPaperCount; i++) {
			confettiPapers[i] = new ConfettiPaper(Math.random()
					* canvas.width, Math.random()
					* canvas.height);
		}
		this.resize = function() {
			canvas.width = canvasParent.offsetWidth;
			canvas.height = canvasParent.offsetHeight;
			ConfettiPaper.bounds = new Vector2(canvas.width,
					canvas.height);
			ConfettiBalloon.bounds = new Vector2(canvas.width,
					canvas.height);
		}
		this.start = function() {
			this.stop()
			var context = this
			this.interval = setInterval(function() {
				confetti.update();
			}, 1000.0 / frameRate)
		}
		this.stop = function() {
			clearInterval(this.interval);
		}
		this.update = function() {
			var i = 0;
			var indexPaper = 0;
			var indexBallon = 0;
			context
			.clearRect(0, 0, canvas.width,
					canvas.height);
			
			for (i = 0; i < confettiPaperCount; i++) {
				confettiPapers[i].Update(dt);
				confettiPapers[i].Draw(context);
			}
			
			for (i = 0; i < confettiBalloonCount; i++) {
				confettiBalloons[i].Update(dt);
				confettiBalloons[i].Draw(context);
			}
			
		}
	}
	
	$browser_height = $(window).height();
	$('#confetti').css({'height': $browser_height+'px'});
	
	var confetti = new confetti.Context('confetti');
	$('#confetti').hide(0);
	//$('#confetti').show(0);
	//$('#confetti').css({'opacity': 0}).animate({opacity: "1"}, 1000);
	
	
	confetti.start();
	
	/*$(window).resize(function() {
		$browser_height = $(window).height();
		$('#confetti').css({'height': $browser_height+'px'});
		//confetti.resize();
	});*/
});

var confetime = null;
function confettiEffect(){

	var currentHeight = $(window).height()/2;
	var currentWidth = 900 /2;
	
	var i=0;
	for (i = 0; i < confettiBalloonCount; i++) {
		confettiBalloons[i].ResetY();
	}
	play_sound_celebrate();
	
	//$('#confetti').show("scale", { percent:100 , from: {height: currentHeight, width: currentWidth}}, 250);
	$('#confetti').show();
	clearTimeout(confetime);
	confetime = setTimeout(function(){
		//$( "#confetti:visible" ).removeAttr( "style" ).fadeOut();
		//$('#confetti').hide("scale", {percent: 100}, 500);
		//$('#confetti').effect("fade", {}, 500);
		$('#confetti').stop(true,true).fadeOut();
	}, 3000);
}

function setPositionBG(page) {
	
	var documentHeight = 500 + topHeight + (page * 780);
	
	var rate = documentHeight*2.58/7482 + 0.4;
	var position = 2127;//documentHeight/rate;
	
	var height = "innerHeight" in window 
	   ? window.innerHeight
	   : document.documentElement.offsetHeight; 
	   
	position = 3200 - 50 - height;
	$('#index-body').attr("data-0",'background-position:center 0px;');
	//$('#index-body').attr("data-"+documentHeight,'background-position:center -'+ position +'px;');
	$('#index-body').attr("data-"+documentHeight,'background-position:center -'+ position +'px;');
	
	// Set scroll background
	skrollr.init({
		forceHeight: false
	});	
}