;(function () {
    
    'use strict';

    var mobileMenuOutsideClick = function() {

        $(document).click(function (e) {
            var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.js-gtco-nav-toggle').addClass('gtco-nav-white');

                if ( $('body').hasClass('offcanvas') ) {
                    $('body').removeClass('offcanvas overflow');
                    $('.js-gtco-nav-toggle').removeClass('active');
                }
            }
        });

    };

    var offcanvasMenu = function() {

        $('#page').prepend('<div id="gtco-offcanvas" />');
        $('#page').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-white"><i></i></a>');
        var clone1 = $('.menu-1 > ul').clone();
        $('#gtco-offcanvas').append(clone1);
        var clone2 = $('.menu-2 > ul').clone();
        $('#gtco-offcanvas').append(clone2);

        $('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
        $('#gtco-offcanvas')
            .find('li')
            .removeClass('has-dropdown');

        // Toggle dropdown menu on mobile
        $('.offcanvas-has-dropdown').on('click', function(e){
            var $this = $(this);
            $this.toggleClass('active').find('ul').slideToggle(300);
            e.stopPropagation();
        });

        // Auto close offcanvas when clicking any navigation link
        $('#gtco-offcanvas a').on('click', function() {
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas overflow');
                $('.js-gtco-nav-toggle').removeClass('active');
            }
        });

        $(window).resize(function(){
            if ( $('body').hasClass('offcanvas') ) {
                $('body').removeClass('offcanvas overflow');
                $('.js-gtco-nav-toggle').removeClass('active');
            }
        });
    };

    var burgerMenu = function() {

        $('body').on('click', '.js-gtco-nav-toggle', function(event){
            var $this = $(this);

            if ( $('body').hasClass('overflow offcanvas') ) {
                $('body').removeClass('overflow offcanvas');
            } else {
                $('body').addClass('overflow offcanvas');
            }
            $this.toggleClass('active');
            event.preventDefault();

        });
    };

    var contentWayPoint = function() {
        var i = 0;
        if ($('.animate-box').length > 0) {
            $('.animate-box').waypoint( function( direction ) {

                if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
                    
                    i++;

                    $(this.element).addClass('item-animate');
                    setTimeout(function(){

                        $('body .animate-box.item-animate').each(function(k){
                            var el = $(this);
                            setTimeout( function () {
                                var effect = el.data('animate-effect');
                                if ( effect === 'fadeIn') {
                                    el.addClass('fadeIn animated-fast');
                                } else if ( effect === 'fadeInLeft') {
                                    el.addClass('fadeInLeft animated-fast');
                                } else if ( effect === 'fadeInRight') {
                                    el.addClass('fadeInRight animated-fast');
                                } else {
                                    el.addClass('fadeInUp animated-fast');
                                }

                                el.removeClass('item-animate');
                            },  k * 200 );
                        });
                        
                    }, 100);
                    
                }

            } , { offset: '85%' } );
        }
    };

    var dropdown = function() {

        $('.has-dropdown').mouseenter(function(){

            var $this = $(this);
            $this
                .find('.dropdown')
                .css('display', 'block')
                .addClass('animated-fast fadeInUpMenu');

        }).mouseleave(function(){
            var $this = $(this);

            $this
                .find('.dropdown')
                .css('display', 'none')
                .removeClass('animated-fast fadeInUpMenu');
        });

    };

    var owlCarousel = function(){
        
        var owl = $('.owl-carousel-carousel');
        if (owl.length > 0) {
            owl.owlCarousel({
                items: 3,
                loop: true,
                margin: 20,
                nav: true,
                dots: true,
                smartSpeed: 800,
                autoHeight: true,
                navText: [
                  "<i class='ti-arrow-left owl-direction'></i>",
                  "<i class='ti-arrow-right owl-direction'></i>"
                ],
                responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
                }
            });
        }

        var owl2 = $('.owl-carousel-fullwidth');
        if (owl2.length > 0) {
            owl2.owlCarousel({
                items: 1,
                loop: true,
                margin: 20,
                nav: true,
                dots: true,
                smartSpeed: 800,
                autoHeight: true,
                navText: [
                  "<i class='ti-arrow-left owl-direction'></i>",
                  "<i class='ti-arrow-right owl-direction'></i>"
                ]
            });
        }
    };

    var tabs = function() {

        if ($('.gtco-tab-content-wrap').length > 0) {
            $('.gtco-tab-content-wrap').css('height', 0);
            var autoHeight = function() {

                setTimeout(function(){

                    var tabContentWrap = $('.gtco-tab-content-wrap'),
                        tabHeight = $('.gtco-tab-nav').outerHeight(),
                        formActiveHeight = $('.tab-content.active').outerHeight(),
                        totalHeight = parseInt(tabHeight + formActiveHeight + 90);

                        tabContentWrap.css('height', totalHeight );

                    $(window).resize(function(){
                        var tabContentWrap = $('.gtco-tab-content-wrap'),
                            tabHeight = $('.gtco-tab-nav').outerHeight(),
                            formActiveHeight = $('.tab-content.active').outerHeight(),
                            totalHeight = parseInt(tabHeight + formActiveHeight + 90);

                            tabContentWrap.css('height', totalHeight );
                    });

                }, 100);
                
            };

            autoHeight();

            $('.gtco-tab-nav a').on('click', function(event){
                
                var $this = $(this),
                    tab = $this.data('tab');

                $('.tab-content')
                    .addClass('animated-fast fadeOutDown');

                $('.tab-content')
                    .removeClass('active');

                $('.gtco-tab-nav li').removeClass('active');
                
                $this
                    .closest('li')
                        .addClass('active')

                $this
                    .closest('.gtco-tabs')
                        .find('.tab-content[data-tab-content="'+tab+'"]')
                        .removeClass('animated-fast fadeOutDown')
                        .addClass('animated-fast active fadeIn');

                autoHeight();
                event.preventDefault();

            }); 
        }
    };

    var goToTop = function() {

        $('.js-gotop').on('click', function(event){
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0
            }, 500);
            
            return false;
        });

        $(window).scroll(function(){
            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.js-top').addClass('active');
            } else {
                $('.js-top').removeClass('active');
            }
        });
    };

    var loaderPage = function() {
        $(".gtco-loader").fadeOut("slow");
    };

    var counter = function() {
        if ($('.js-counter').length > 0) {
            $('.js-counter').countTo({
                formatter: function (value, options) {
                    return value.toFixed(options.decimals);
                },
            });
        }
    };

    var counterWayPoint = function() {
        if ($('#gtco-counter').length > 0 ) {
            $('#gtco-counter').waypoint( function( direction ) {
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                    setTimeout( counter , 400);                  
                    $(this.element).addClass('animated');
                }
            } , { offset: '90%' } );
        }
    };

    $(function(){
        mobileMenuOutsideClick();
        offcanvasMenu();
        burgerMenu();
        contentWayPoint();
        dropdown();
        owlCarousel();
        tabs();
        goToTop();
        loaderPage();
        counterWayPoint();
    });

}());