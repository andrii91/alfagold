$(document).ready(function () {
  $(window).scroll(function () {
    return $('nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  $("input[name='phone']").mask("+38 (999) 999-9999");

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  $('input[name="user_agent"]').val(navigator.userAgent);
  $('input[name="ref"]').val(document.referrer);

  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city);
  }, "jsonp");

  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);

  /*db/registration.php*/

  /* form valid*/
  var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      if ($(this).val() == '') {
        var errorfield = $(this);
        if ($(this).attr("type") == 'email') {
          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
          if (!pattern.test($(this).val())) {
            $("input[name=email]").val('');
            $(this).addClass('error').parent('label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }
        } else if ($(this).attr("type") == 'tel') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('label').append('<div class="allert">' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }
        } else {
          $(this).addClass('error').parent('label').append('<div class="allert">' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
          return false;
        }
        error = 1;
        return false;
      } else {
        error = 0;
        $(this).addClass('error').parent('label').find('.allert').remove();
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });


  $('form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    $form.find('.submit').addClass('inactive');
    $form.find('.submit').prop('disabled', true);



    $.ajax({
      type: 'POST',
      url: 'crm/index.php',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });

    setTimeout(function () {
      window.location.href = "success.html";
    }, 800);

  });

  //  var slider = $('#video-carousel');

  $('#video-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    prevArrow: '<button type="button" class="prev"><svg  width="52" height="52" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="26"/><path d="M33 25H23l3-3v-1-1h-1-1l-5 5v2l5 5h2v-1-1l-3-3h10v-1-1z" fill="#fff"/></svg></button>',
    nextArrow: '<button type="button" class="next"><svg width="52" height="52" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="26"/><path d="M19 27h10l-3 3v2h2l5-5v-1-1l-5-5h-1l-1 1v1l3 3H19v2z" fill="#fff"/></svg></button>',
    slidesToShow: 2,
    slidesToScroll: 2,

    responsive: [{
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          arrows: false,
          slidesToScroll: 1,
          dots: true
        }
    },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          arrows: false,

          slidesToShow: 1,
          slidesToScroll: 1
        }
    }
  ]
  });

  $('#text-carousel').slick({
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 300,
    prevArrow: '<button type="button" class="prev"><svg  width="52" height="52" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="26"/><path d="M33 25H23l3-3v-1-1h-1-1l-5 5v2l5 5h2v-1-1l-3-3h10v-1-1z" fill="#fff"/></svg></button>',
    nextArrow: '<button type="button" class="next"><svg width="52" height="52" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="26"/><path d="M19 27h10l-3 3v2h2l5-5v-1-1l-5-5h-1l-1 1v1l3 3H19v2z" fill="#fff"/></svg></button>',
    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [{
        breakpoint: 960,
        settings: {
          arrows: false,
          dots: true
        }
    },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          arrows: false,

          slidesToShow: 1,
          slidesToScroll: 1
        }
    }
  ]
  });

  $('.section_1-mob_slider').slick({
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,

    responsive: [{
        breakpoint: 960,
        settings: {
          dots: true
        }
    },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,

          slidesToShow: 2,
          slidesToScroll: 2
        }
    }
  ]
  });

  if ($(window).width() < 1200) {

    $('.advantages-items').slick({
      dots: true,
      infinite: true,
      adaptiveHeight: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false,

      responsive: [{
          breakpoint: 960,
          settings: {
            dots: true
          }
    },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,

            slidesToShow: 2,
            slidesToScroll: 2
          }
    }
  ]
    });

  }



  $('.reviews-tab li a').click(function (e) {
    e.preventDefault();
    $('.reviews-tab li a').removeClass('active');
    $(this).addClass('active');

    $('.reviews-item').removeClass('active');
    $($(this).attr('href')).addClass('active');

    $('#text-carousel').slick('refresh');
    $('#video-carousel').slick('refresh');

  })

  $('.faq-item').click(function () {
    $(this).toggleClass('active');
    $(this).find('.more').slideToggle('300');
  })

  $('.services-btn').click(function () {
    $('#pack').text($(this).parents('.services-item').find('.title span').text());
    $('#reg-serv input[name="pack"]').val($(this).parents('.services-item').find('.title span').text());
  });


  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 40
    }, 1500);

  });

  $('#nav-icon').click(function () {
    $('img[data-src]').each(function () {
      $(this).attr('src', $(this).data('src'));
    })

    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    $('.menu').slideToggle(200);
  });

  $('.head-img>img').click(function () {
    $(this).parent().find('.play-btn').trigger('click');
  })
  
  $('.menu').hover(function(){
     $('img[data-src]').each(function(){
      $(this).attr('src', $(this).data('src'));
    })
  })
  
    var observer = lozad();
  observer.observe();
});