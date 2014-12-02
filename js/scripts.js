var feedUrl = 'http://www.sonypictures.com/previews/movies/cloudywithachanceofmeatballs2.xml'; 
//need feed URL

var autocloseToggle = true;
var singlevideoToggle = false;
var callbackToggle = false;
var parentSwf = 'flashcontent';
var useQAplayer = false;
var today = new Date();
var launch = new Date(2013,00,28); /* zero based month */ //need a launch date
var ua = navigator.userAgent;
//get the User Agent

var checker = {
	iphone: ua.match(/(iPhone|iPod|iPad)/),
	blackberry: ua.match(/BlackBerry/),
	android: ua.match(/Android/)
};
//check iphone/bb/android


$(function(){
	
	var ua = navigator.userAgent.toLowerCase();

	jQuery.fn.collapse = function(){
		$(this).css('left','-9999px').find('a').css('opacity', 0).end()
		.prev('h3')
		.css('background-position','0 0');
		$('#cloudy_overlay').stop(true,true).fadeOut(100);
	}
	jQuery.fn.animateButtons = function() { 
		this.each(function(i){ 
			$(this).delay((i++) * 100).fadeTo(250,1); }); 
	}
	
	if (checker.iphone) { 
		$('body').css('width','1024px');  
	}
	//Date Code
	if ((today >= launch) || $.urlParam('date')==='post') { 
		$('#buy-sell').css('background-position','0 -55px')
		.text('Now On Blu-ray&trade; Combo Pack &amp; Digital!'); 
	} 
	
	var timer = setTimeout(function(){
/*
		openOverlay();
		feedDetails=new Object();
		feedDetails.feedUrl = (window.location.hash.slice(1)=='watchtheaction?hs308=email') ? 'http://www.sonypictures.com/previews/movies/cloudywithachanceofmeatballs2.xml' : 'http://www.sonypictures.com/previews/movies/cloudywithachanceofmeatballs2.xml';
		updateFeed(feedDetails);
*/

	},2500);
	//sets the movie
	
	$('a').click(function(){ clearTimeout(timer); });

	
	$('#bcr_play_trailer').click(function(){
		feedDetails=new Object();
		feedDetails.feedUrl = 'http://www.sonypictures.com/previews/movies/cloudywithachanceofmeatballs2.xml';
		updateFeed(feedDetails);
		// openOverlay();
    });
	
	$('#bcr_watch_trailer').click(function(){
		feedDetails=new Object();
		feedDetails.feedUrl = 'http://www.sonypictures.com/previews/movies/cloudywithachanceofmeatballs2.xml';
		updateFeed(feedDetails);
		// openOverlay();
    });
	
	$('#bcr_watch_action').click(function(){
		feedDetails=new Object();
		feedDetails.feedUrl = 'http://www.sonypictures.com/previews/movies/cloudywithachanceofmeatballs2.xml';
		updateFeed(feedDetails);
    });
	
	/* Modernizr and Regular JS for the expandable menus */
	
	
	if (Modernizr.touch)
	{
		$('#buy-bluray,#buy-digital,#buy-dvd').css('z-index','100');
		$('#buy-menu-left,#buy-menu-center,#buy-menu-right').css('z-index','90');
		$('#buy-bluray').click({ left_position: '466px', other_menus: '#buy-menu-center,#buy-menu-right' },expand);
		$('#buy-digital').click({ left_position: '375px', other_menus: '#buy-menu-left,#buy-menu-right' },expand);
		$('#buy-dvd').click({ left_position: '790px', other_menus: '#buy-menu-left,#buy-menu-center' },expand);
    }
	else
	{
	/* ------------------------------------------------------------------- */
     $('#buy-bluray').mouseenter({ left_position: '466px', other_menus: '#buy-menu-center,#buy-menu-right' },expand);
     
	$('#buy-menu-left').mouseleave(function(){ $(this).collapse(); })
	.mousemove(function(e){
		if (((e.pageX - $(this).offset().left) > 174) && ((e.pageY - $(this).offset().top) < 354)) {  $(this).css('left','-9999px'); $(this).collapse();  
		}
	});
		
	/* ------------------------------------------------------------------- */
	$('#buy-digital').mouseenter({ left_position: '375px', other_menus: '#buy-menu-left,#buy-menu-right' },expand);
		$('#buy-menu-center')
		.mouseleave(function(){ $(this).collapse(); })
		.mousemove(function(e){
	if (((e.pageX - $(this).offset().left) < 256) && ((e.pageY - $(this).offset().top) < 319)) { $(this).css('left','-9999px'); $(this).collapse(); }
		});
	/* ------------------------------------------------------------------- */
	$('#buy-dvd').mouseenter({ left_position: '790px', other_menus: '#buy-menu-left,#buy-menu-center' },expand);
	$('#buy-menu-right').mouseleave(function(){ $(this).collapse(); });
		/* ------------------------------------------------------------------- */
    }
	
	$('.buy-close').click(function(){ $(this).parent().collapse(); });
	
	$('#cloudy_overlay')
	.width($(document).width())
	.height($(document).height())
	.on('click',function(){
		 $('#buy-menu-left,#buy-menu-center,#buy-menu-right').collapse(); 
	});
	
});

$(window).resize(function(){
	$('#cloudy_overlay')
	.width($(document).width())
	.height($(document).height());
});

function getAnchorAndAreaLinks(){ return $('a,area'); }
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return results[1] || 0;
}

function expand(e)
{
	$(this).css('background-position','0 -58px').next('div').css('left',e.data.left_position).find('a').animateButtons();
	$(e.data.other_menus).collapse();
	$('#cloudy_overlay').stop(true,true).fadeIn(300);
}