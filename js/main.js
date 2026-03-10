/* ---------------------------------------------------
    Brand: AMV Vault (Abantu Musik Vault)
    Description: Premium Music Distribution & Artist Portal
    Version: 1.0
    Created: AMV Development Team
--------------------------------------------------------- */

'use strict';

(function ($) {

    /*------------------
        Vault Preloader
    --------------------*/
    $(window).on('load', function () {
        // Vault Gold Loader Fade
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*-------------------------
            Music Release Filter
        ---------------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        
        // Refactored from 'podcast-filter' to 'vault-filter' for music releases
        if ($('.vault-filter').length > 0) {
            var containerEl = document.querySelector('.vault-filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
        Navigation
    --------------------*/
    // Initializing the SlickNav for AMV Vault Mobile
    $(".mobile-menu").slicknav({
        label: 'VAULT MENU',
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    // AMV Artist Canvas Menu (Dashboard access)
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
        Video/Audio Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

})(jQuery);