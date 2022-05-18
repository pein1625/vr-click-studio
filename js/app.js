// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });

  $(".menu-item-group > .menu-link, .menu-item-mega > .menu-link").on("click", function (e) {
    if ($(window).width() < 1200 || !mobileAndTabletCheck()) return;

    e.preventDefault();
  });
});

// navbar mobile toggle
$(function () {
  var $body = $("html, body");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
  });
});

$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);
  var $body = $("html");

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.addClass("show");

      return;
    }

    $moveTop.removeClass("show");
  });

  $moveTop.on("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});

// swiper template
function addSwiper(selector, options = {}, nodes = null) {
  if (!nodes) {
    nodes = document.querySelectorAll(selector);
  }

  return Array.from(nodes, function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    if (options.loopedSlides === true) {
      options.loopedSlides = $sliderContainer.find(".swiper-slide").length;
    }

    return new Swiper($sliderEl, options);
  });
}

// solution + card-slider
$(function () {
  if (!$(".solution-slider").length) {
    return;
  }

  var cardSliders = [];
  var solutionSliders = [];

  $(".s-solution__grid").each(function () {
    var el = this;
    var cardEl = el.querySelectorAll(".card-slider");
    var solutionEl = el.querySelectorAll(".solution-slider");

    var thumbSlider = addSwiper(".card-slider", {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      pagination: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true
    }, cardEl)[0];

    var solutionSlider = addSwiper(".solution-slider", {
      effect: "fade",
      allowTouchMove: false,
      pagination: true,
      thumbs: {
        swiper: thumbSlider
      }
    }, solutionEl)[0];

    cardSliders.push(thumbSlider);
    solutionSliders.push(solutionSlider);
  });

  if (!cardSliders.length) return;

  $(".js-solution-tab").on("shown.bs.tab", function () {
    cardSliders.forEach(slider => slider.update());
    solutionSliders.forEach(slider => slider.update());
  });
});

// Feedback slider
$(function () {
  addSwiper(".feedback-slider", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    navigation: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
});

// Project slider
$(function () {
  var projectSliders = addSwiper(".project-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.5,
    loop: true,
    loopedSlides: true,
    navigation: true,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 10,
      modifier: 1,
      slideShadows: false
    },
    breakpoints: {
      576: {
        slidesPerView: 3
      }
    }
  });

  if (!projectSliders) return;

  $(".js-project-tab").on("shown.bs.tab", function () {
    projectSliders.map(slider => {
      slider.update();
    });
  });
});

// video slider
$(function () {
  addSwiper(".video-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    loopedSlides: true,
    navigation: true,
    pagination: true,
    spaceBetween: 10,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false
    }
  });
});

$(function () {

  new WOW().init();
});

$(function () {

  var $search = $(".search");

  $(".h-search-toggle").on("click", function (e) {

    e.stopPropagation();

    $search.fadeToggle("fast");
  });

  $search.on("click", function (e) {

    e.stopPropagation();
  });

  $("html, body").on("click", function () {

    if ($(window).width() < 1200) return;

    $search.fadeOut("fast");
  });
});

$(function () {

  $(".js-frame-overlay").on("click", function (e) {

    e.preventDefault();

    $(this).hide();
  });
});

// Post

$(function () {

  let menu = "<ul>";

  let count = 0;

  let count2 = 0;

  let prevTag = "h2";

  $(".js-post-content").find("h2, h3").map(function (index) {

    const $el = $(this);

    const text = $el.text();

    console.log($el.text());

    if ($el.is("h2")) {

      if (prevTag === "h3") {

        count2 = 0;

        menu += "</li></ul>";
      }

      count++;

      prevTag = "h2";
    } else if ($el.is("h3")) {

      if (prevTag === "h2") {

        count2++;

        menu.replace(/<\/li>$/, "");

        menu += "<ul>";
      }

      prevTag = "h3";
    }

    // let countText = count2 ? count + "." + count2 : count + ".";

    let countText = "";

    menu += `<li><a href='.js-post-title-${index}'>${countText} ${text}</a></li>`;

    $el.addClass("js-post-title-" + index);
  });

  $(".s-post__menu").addClass("show");

  $(".s-post__menu-content").html(menu);

  let toggleText = "Ẩn";

  $(".s-post__menu-toggle").on("click", function () {

    $(".s-post__menu-content").slideToggle("fast");

    if (toggleText === "Ẩn") {

      toggleText = "Hiện";
    } else {

      toggleText = "Ẩn";
    }

    $(this).html(toggleText);
  });

  $(".s-post__menu-content").on("click", "a", function (e) {

    e.preventDefault();

    let target = $(this).attr("href");

    if (!$(target).length) {

      return;
    }

    $("html, body").animate({

      scrollTop: $(target).offset().top

    }, 700);
  });

  $(".js-post-content").find("table").addClass("table table-bordered table-hover mb-0").wrap('<div class="table-responsive"></div>');
});

$(function () {

  const $window = $(window);

  const $header = $('.header');

  $window.on('scroll', function () {

    if ($window.scrollTop() > 150) {

      $header.addClass('is-fixed');
    } else {

      $header.removeClass('is-fixed');
    }
  });
});