jQuery(document).ready(function($){

	/*-------------------------------------
	Video Load
	-------------------------------------*/

	var loadCheck = setInterval(function(){
		if($('.video-unmasked video').prop('readyState') > 2) {
			unmaskVideo();
			$('body').addClass('page-loaded');
			clearInterval(loadCheck);
		}
	}, 10);

	/*-------------------------------------
	Global Variables
	-------------------------------------*/

	var $window = $(window),
		pageScroll = $window.scrollTop();

	$window.on('scroll resize', function(){
		pageScroll = $window.scrollTop();
	}).trigger('scroll');

	/*-------------------------------------
	Desktop Scroll Page
	-------------------------------------*/

	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {

		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){

			var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'),
				offset = 0;

			if($window.width() >= 1024) {
				offset = 58;
				$('.desktop-navigation button').trigger('click');
			}else{
				offset = 53;
				$('.burger').trigger('click');
			}

			if (target.length) {
				event.preventDefault();

				if(target.attr('id') == 'what-is-chronologic') {
					scrollpoint = target.offset().top + parseInt(target.css('padding-top')) - offset;
				}else if(target.attr('id') == 'what-are-timemints') {
					scrollpoint = $('.timemint-objects .timemint.primary').offset().top -offset;
				}else if(target.attr('id') == 'why-time') {
					scrollpoint = $('#why-time .copy').offset().top - offset;
				}else if(target.attr('id') == 'proof-of-use') {
					scrollpoint = target.offset().top - offset;
				}else if(target.attr('id') == 'road-map') {
					scrollpoint = target.offset().top - parseInt(target.css('margin-top')) - offset;
				}else if(target.attr('id') == 'ecosystem') {
					scrollpoint = target.offset().top - offset;
				}else if(target.attr('id') == 'chronos') {
					scrollpoint = target.offset().top - offset;
				}else if(target.attr('id') == 'team-and-advisors') {
					scrollpoint = target.offset().top - offset;
				}

				console.log(parseInt(scrollpoint))

				$('html, body').animate({
					scrollTop: scrollpoint
					}, 1000, function() {
						var $target = $(target);
						$target.focus();
					if ($target.is(":focus")) {
						return false;
					} else {
						$target.attr('tabindex','-1');
						$target.focus();
					};
				});
			}
		}
	});

	$('button.scroll').on('click', function(){
		$('html, body').animate({
			scrollTop: 0
		}, 1500);
	})

	$('body').on('click', '.sticky-nav-desktop h1.site-logo', function(){
		$('html, body').animate({
			scrollTop: 0
		}, 1500);
	})

	/*-------------------------------------
	Show all navigation links
	-------------------------------------*/

	function showAllLinks(){
		if(pageScroll >= ($window.height() - $window.height()/4)){
			$('body').addClass('show-all-links');
		}else{
			$('body').removeClass('show-all-links');
		}
	}

	$window.on('scroll', showAllLinks).trigger('scroll');

	/*-------------------------------------
	Sticky Nav on Homepage
	-------------------------------------*/

	function stickyNav(){
		if($(this).scrollTop() > ($window.height()*2)){
			$('body').addClass('sticky-nav-enabled');
		}else if($('body').hasClass('sticky-nav-enabled')){
			$('body').removeClass('sticky-nav-enabled');
		}
	}

	$window.on('scroll', stickyNav).trigger('scroll');

	$('body').append('<div class="sticky-nav-desktop" />');
	$('section.video-unmasked nav.secondary, section.video-unmasked h1').clone().appendTo('.sticky-nav-desktop');

	/*-------------------------------------
	Unmask Video
	-------------------------------------*/

	function unmaskVideo(){
		if(navigator.platform == 'iPad' || navigator.platform == 'iPhone'){
			if (window.matchMedia("(orientation: portrait)").matches) {
			   $('section.intro').css('height', screen.height);
			   $('.video-unmasked, .video-unmasked .container').css('height', screen.height + 'px');
			}else if (window.matchMedia("(orientation: landscape)").matches) {
			   $('.intro').css('height', screen.width);
			   $('.video-unmasked, .video-unmasked .container').css('height', screen.width + 'px');
			}
		}else{
			$('.intro').css('height', $window.height());
			$('.video-unmasked').css('height', $window.height());
		}
	}

	$window.on('resize orientationchange', unmaskVideo).trigger('resize');

	$window.on('scroll', function(){
		if(pageScroll < $('section.intro').outerHeight()){
			$('section.intro').next().addClass('pinned');
		}else{
			$('section.intro').next().removeClass('pinned');
		}
	}).trigger('scroll');

	/*-------------------------------------
	Desktop Navigation
	-------------------------------------*/

	$('.desktop-navigation button').on('click', function(){
		if($('body').hasClass('desktop-navigation-active')){
			$('body').removeClass('desktop-navigation-active');
			disablePage(false);
		}else{
			$('body').addClass('desktop-navigation-active');
			disablePage(true);
		}
	})

	/*-------------------------------------
	Mobile Navigation
	-------------------------------------*/

	$('.burger').on('click', function(){
		if($('body').hasClass('mobile-menu-active')){
			$('body').removeClass('mobile-menu-active');
			disablePage(false);
		}else{
			$('body').addClass('mobile-menu-active');
			disablePage(true);
		}
	})

	// $('.mobile-gui nav.primary a').on('click', function(){
	// 	$('.burger').trigger('click');
	// })

	/*-------------------------------------
	Vimeo Init
	-------------------------------------*/

	var iframe = $('.video-embed iframe')[0];
	var player = $f(iframe);

	/*-------------------------------------
	Modal Framework
	-------------------------------------*/

	$('.modal-trigger:not(.modal-disabled)').on('click', openModal);

	function openModal(e){

		e.preventDefault();

		var thisClass = $(this).attr('class').split(' ').pop(),
			$modal = $('.modal.'+thisClass);

		$modal.fadeIn(300, function(){
			$modal.on('click', closeModal);
			$modal.find('.modal-window').click(function(e){
				e.stopPropagation();
			})
		});

		disablePage(true);

		$modal.find('.modal-close').on('click', function(e){
			closeModal(e);
		});

		function closeModal(e){
			e.preventDefault();
			$modal.find('.modal-close').off('click');
			if($modal.hasClass('video-modal')){
				player.api('pause');
			}
			disablePage(false);
			$modal.fadeOut(300);
		}
	}

	/*-------------------------------------
	Disable Page
	-------------------------------------*/

	var autoplay = false;

	function disablePage(i){
		if(i == true){
			setTimeout(function(){
				$('body').addClass('page-disabled animation-disabled');

				$('video').each(function(){
					if(!$(this).paused == true){
						autoplay = true;
						$(this).get(0).pause();
					}
				});

			}, 2);
		}

		if(i == false){
			$('body').removeClass('page-disabled animation-disabled');

			if(autoplay == true ){
				$('video').each(function(){
					$(this).get(0).play();
				});
			}
		}
	}

	/*-------------------------------------
	Watch Movement
	-------------------------------------*/

	function watchMovement(){

		var $watch = $('#what-is-chronologic .watch'),
			offset,
			start,
			end;

		$window.on('resize', function(){

			offset = ($window.height()/2) - ($watch.outerHeight()/2);
			start = $('#what-is-chronologic').offset().top;

			if($window.width() >= 1024){
				end = $('#what-is-chronologic').offset().top + ($('#what-is-chronologic').outerHeight() - 1100);
			}else{
				end = $('#what-is-chronologic').offset().top + ($('#what-is-chronologic').outerHeight() - 590);
			}

			$window.trigger('scroll');

		}).trigger('resize');

		$window.on('scroll', function(){

			var trigger = pageScroll + offset;

			if(trigger > start && trigger < end){

				//var duration = Math.ceil((trigger - start) / ( end - start) * 100);

				if(!$watch.hasClass('pinned')){
					$watch.addClass('pinned').css('top', offset);
				}

				if($watch.hasClass('watch')){
					$('.grid-markers').removeClass('active');
				}
			}else if(trigger > end){
				if($watch.hasClass('pinned')){
					$watch.removeClass('pinned');
				}

				$watch.attr('style', '').css('top', end - start);

				if($watch.hasClass('watch')){
					$('.grid-markers').addClass('active');
				}

			}else if(trigger < end){
				if($watch.hasClass('pinned')){
					$watch.removeClass('pinned').css('top', 0);
				}

				if($watch.hasClass('watch')){
					$('.grid-markers').removeClass('active');
				}
			}
		});
	}

	if($('html').hasClass('no-touch')){
		watchMovement();
	}

	/*-------------------------------------
	Item Triggers
	-------------------------------------*/

	$.fn.itemTrigger = function(options) {
		var $item = $(this),
			offset;

		$window.on('load resize', function(){
			if(options.triggerPoint == 'screenFirstQuarter'){
				offset = $item.offset().top - ($window.height()/4);
			}

			if(options.triggerPoint == 'screenTop'){
				offset = $item.offset().top;
			}

			if(options.triggerPoint == 'screenCenter'){
				offset = $item.offset().top - ($window.height()/2);
			}

			if(options.triggerPoint == 'inWindow'){
				offset = $item.offset().top - ($window.height() - $item.outerHeight());
			}

			if(options.triggerPoint == 'fitsInWindow'){
				offset = $item.offset().top - ($window.height() - ($item.outerHeight()*2));
			}
		}).trigger('resize');

		$window.on('load scroll resize', function(){

			if(pageScroll > offset){
				if(!$item.hasClass('active')){
					$item.addClass('active');
					if($item.hasClass('timemint-objects')){
						startTimer(96000);
					}
					if($item.hasClass('block')){
						$item.prev().addClass('active');
					}
					if($item.hasClass('team-and-advisors')){
						$('.block-animation.background').addClass('team-and-advisors');
					}
				}
			}else if(pageScroll + $window.height() < $item.offset().top){
				if($item.hasClass('active')){
					$item.removeClass('active');
					if($item.hasClass('timemint-objects')){
						clearInterval(countLoop);
						timemintNumberOutput(96000);
					}
					if($item.hasClass('block')){
						$item.prev().removeClass('active');
					}
				}
			}
		}).trigger('scroll')
	};

	$('.timemint-objects').itemTrigger({
		triggerPoint: 'inWindow'
	});

	$('.block.ecommerce').itemTrigger({
		triggerPoint: 'inWindow'
	});

	$('.block.travel').itemTrigger({
		triggerPoint: 'fitsInWindow'
	});

	$('.block.outsourcing').itemTrigger({
		triggerPoint: 'screenCenter'
	});

	$('.block.software').itemTrigger({
		triggerPoint: 'fitsInWindow'
	});

	$('.block.other').itemTrigger({
		triggerPoint: 'screenCenter'
	});

	$('footer.main').itemTrigger({
		triggerPoint: 'screenFirstQuarter'
	});

	if($('html').hasClass('no-touch')){
		$('#what-is-chronologic .box').itemTrigger({
			triggerPoint: 'screenCenter'
		});
	}else{
		$('#what-is-chronologic').itemTrigger({
			triggerPoint: 'screenTop'
		});
	}

	/* --------------------------------------------------
  Initializes the counter for the total amount of transferred ETH
	-------------------------------------------------- */
	EacCounter.getTotalEthTransferred().then(function (value) {
		$('.eth-transferred-counter').each(function () {
			$(this).html(String(Math.round(value)));
			$(this).parent().removeClass('hide');
		});
	});

	/*-------------------------------------
	Countdown Init
	-------------------------------------*/

	moment.tz.add([
	    'America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0'
	]);

	var countDownDate = moment.tz("2017-08-28 09:00", 'America/New_York').toDate().getTime(),
		now = new Date().getTime(),
		distance = countDownDate - now,
		timerValue = distance / 1000;

	$('.video-unmasked .countdown').ClassyCountdown({
	    end: $.now() + timerValue,
	    labels: true,
	    style: {
	        element: "",
	        textResponsive: .5,
	        days: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#e2e1e1",
	                fgColor: "#2f4ffd"
	            }
	        },
	        hours: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#e2e1e1",
	                fgColor: "#2f4ffd"
	            }
	        },
	        minutes: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#e2e1e1",
	                fgColor: "#2f4ffd"
	            }
	        },
	        seconds: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#e2e1e1",
	                fgColor: "#2f4ffd"
	            }
	        }

	    },
	    onEndCallback: function() {

		}
	});

	$('.mobile-menu-countdown').ClassyCountdown({
	    end: $.now() + timerValue,
	    labels: true,
	    style: {
	        element: "",
	        textResponsive: .5,
	        days: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#ffffff",
	                fgColor: "#2f4ffd"
	            }
	        },
	        hours: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#ffffff",
	                fgColor: "#2f4ffd"
	            }
	        },
	        minutes: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#ffffff",
	                fgColor: "#2f4ffd"
	            }
	        },
	        seconds: {
	            gauge: {
	                thickness: .03,
	                bgColor: "#ffffff",
	                fgColor: "#2f4ffd"
	            }
	        }

	    },
	    onEndCallback: function(){}
	});

	/*-------------------------------------
	Timemints Counter
	-------------------------------------*/

	var startNum = 0,
		middleNum = 0,
		endNum = 0,
		$numOutput = $('.timemint.primary .number'),
		curNum = 0,
		curNumString = '',
		countLoop;

	function startTimer(e){
		startNum = e,
		middleNum = startNum + 150,
		endNum = middleNum + 1000,
		countLoop = setInterval(timeMove1, 10);
	}

	function timeMove1(){
		if(startNum < middleNum){
			timemintNumberOutput(startNum++);
		}else{
			clearInterval(countLoop);
			countLoop = setInterval(timeMove2, 1000);
		}
	}

	function timeMove2(){
		if(startNum < endNum){
			timemintNumberOutput(startNum++);
		}else{
			clearInterval(countLoop);
		}
	}

	function timemintNumberOutput(e){
		curNum = e.toString();
		curNumString = curNum.split('');
		$numOutput.empty();
		$.each(curNumString, function (i, el) {
			$numOutput.append("<span>" + el + "</span");
		});
	}

	/*-------------------------------------
	Proof
	-------------------------------------*/

	$('#road-map .owl-carousel').owlCarousel({
		nav: true,
		dots:false,
	    responsiveRefreshRate:100,
	    loop:false,
	    smartSpeed:450,
	    responsive:{
	    	0:{
				autoWidth:true
	        },
	        1024:{
				items:4
	        },
	        1720:{
				items:6
	        }
	    }
	});

	/*-------------------------------------
	Bio Box
	-------------------------------------*/

	$('#team-and-advisors .box').on('click', function(){
		$('#team-and-advisors .box.active').not(this).removeClass('active').find('.bio').height(0);
		$(this).toggleClass('active');
		if($(this).hasClass('active')){
			$(this).find('.bio').height($(this).find('.bio > p').height());
		}else{
			$(this).find('.bio').height(0);
		}
	});

	/*-------------------------------------
	Animation Adjustments
	-------------------------------------*/

	function animationHeight(){
		var winHeight = $window.height();
		$('main > .block-animation').height($('#road-map').offset().top)
	}

	animationHeight();

	$window.on('load resize', animationHeight());

	/*-------------------------------------
	Footer Adjustments
	-------------------------------------*/

	function footerHeight(){
		var winHeight = $window.height();
		$('footer.main').height(winHeight);
	}

	footerHeight()

	$window.on('load resize', footerHeight());

});
