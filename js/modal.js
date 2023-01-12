$(document).ready(function () {
    // Modal
    $('[data-modal=request]').on('click', function () {
        $('.overlay, #request').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #request').fadeOut('slow');
    });

    //validation

    $('.feed-form').validate({
        rules: {
            name: "required",
            phone: "required",
            checkbox: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Please enter your name",
            phone: "We need your phone to contact you",
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            },
            checkbox: ""

        }
    });

    $('input[name=phone]').mask("(999) 999-9999");

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('.modal').fadeOut();
            $('form').trigger('reset');
        });
        return false;
    });

});

