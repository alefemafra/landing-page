(function($) {

    var allPanels = $('.accordion  .conteudo').hide();

    $('.accordion .titulo a').click(function() {
        if ($(this).parent('.titulo').hasClass('ativo')) {
            $('.titulo').removeClass('ativo');
            $(this).parent().next().slideUp();
        } else {
            allPanels.slideUp();
            $('.titulo').removeClass('ativo');
            $(this).parent('.titulo').addClass('ativo');
            $(this).parent().next().slideDown();
        }
        return false;
    });

    $('.slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        infinite: true,
        arrows: false,
        dots: true,
        prevArrow: '.prev-slide',
        nextArrow: '.next-slide',
        appendDots: '.dots'
    });

    $('.prev-slide').on('click', function(e) {
        e.preventDefault();
        $('.slide').slick('slickPrev');
    });

    $('.next-slide').on('click', function(e) {
        e.preventDefault();
        $('.slide').slick('slickNext');
    });

    $('.accordion .item').first().find('a').click();

    $('input.telefone').mask('(00) 00000-0000');
    $('input.email').mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });

    $(".contato-general .button .submit").on("click", function(e) {
        $('.general-input').removeClass('required');

        if ($('input.nome').val() == '') {
            e.preventDefault(e);
            $('.general-input.nome').addClass('required');
        } else if ($('input.email').val() == '') {
            e.preventDefault(e);
            $('.general-input.email').addClass('required');
        } else if ($('textarea.mensagem').val() == '') {
            e.preventDefault(e);
            $('.general-input.mensagem').addClass('required');
        }
    });

})(jQuery);