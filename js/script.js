jQuery(function ($) {
    // Bottom-to-top button
    var btn = $('#button');

    $(window).scroll(function () {
        btn.toggleClass('show', $(window).scrollTop() > 300);
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    // Mobile menu dropdown functionality
    function setupMobileMenu() {
        $(".primary-menu li.menu-dropdown > a").append('<span class="dropdown-btn"><i class="fas fa-chevron-down"></i></span>');

        $('.dropdown-btn').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $parentLi = $(this).parent().parent();
            $parentLi.toggleClass('open').siblings().removeClass('open');
            $parentLi.find("ul.sub-menu").first().slideToggle();
            $parentLi.siblings().find("ul.sub-menu").slideUp().parent().removeClass('open');
        });

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.menu-dropdown').length) {
                $('.menu-dropdown').removeClass('open');
                $('.sub-menu').slideUp();
            }
        });
    }

    // Active menu item highlighting
    function highlightActiveMenu() {
        var currentPath = window.location.pathname.replace(/\/$/, '');
        
        $('.primary-menu a, .category-list-section .isotop-button a').each(function () {
            var href = $(this).attr('href').replace(/\/$/, '');
            var lastPartHref = href.substring(href.lastIndexOf('/') + 1);
            $(this).toggleClass('active', currentPath.endsWith(lastPartHref));
        });
    }

    // Mobile menu toggle
    function setupMobileToggle() {
        $('.hamburger').click(function () {
            $(this).toggleClass('active');
            $('.overlay').toggleClass('active');
            $('.primary-menu').toggleClass('active');
        });

        $('.overlay').click(function () {
            $('.overlay').removeClass('active');
            $('.hamburger').removeClass('active');
            $('.primary-menu').removeClass('active');
        });
    }

    // Sticky header functionality
    function setupStickyHeader() {
        var navHeight = $('.site-header .bottom-header').innerHeight();
        var siteHeaderHeight = $('.site-header').innerHeight();
        var bottomHeaderTop = siteHeaderHeight;
        $('.site-header .bottom-header').css('min-height', navHeight);

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var viewFooter = $('body').height() - $('footer').outerHeight() - ($(window).height() / 2);
            if ($(window).width() < 991) {
                viewFooter = $('body').height() - $('footer').outerHeight();
            }
            $('.site-header .bottom-header').toggleClass('sticky', scroll > bottomHeaderTop && scroll < viewFooter);
        });
    }

    // Initialize functions
    $(document).ready(function () {
        $('.primary-menu li').has('ul').addClass('menu-dropdown');
        setupMobileMenu();
        highlightActiveMenu();
        setupMobileToggle();
        setupStickyHeader();
    });
});

// Initialize WOW.js
new WOW().init();

// Splide initialization helper
function initializeSplide(selector, options, extensions) {
    const splideInstances = [];

    document.querySelectorAll(selector).forEach(element => {
        if (element.querySelector('.splide__track') && element.querySelector('.splide__list')) {
            const splide = new Splide(element, options).mount(extensions);
            splideInstances.push(splide);
        } else {
            console.error(`Splide initialization failed: Missing required elements in ${selector}`);
        }
    });

    return splideInstances;
}

// Initialize Splide sliders
if (document.querySelector('.brand-slide')) {
    initializeSplide('.brand-slide', {
        type: 'loop',
        perPage: 5,
        arrows: false,
        pagination: false,
        gap: 30,
        autoScroll: {
            speed: 0.5,
        },
        breakpoints: {
            991: { perPage: 4 },
            575: { perPage: 2 }
        }
    }, window.splide.Extensions);
}

if (document.querySelector('.banner-slide')) {
    initializeSplide('.banner-slide', {
        type: 'fade',
        rewind: true,
        perPage: 1,
        pagination: true,
        arrows: false,
    });
}