(function() {
  var $doc, $hero, $logo, $navBar, didScroll, heroHeight, imageLoad, initLinkClicking, initScrolling, logoBottom, logoHeight, logoTarget, scrollHandle, scrollToPosition;

  didScroll = false;

  $navBar = null;

  $hero = null;

  $logo = null;

  logoBottom = null;

  logoTarget = null;

  logoHeight = null;

  heroHeight = null;

  $doc = $(document);

  initScrolling = function() {
    $navBar = $("#primary-header");
    $hero = $('#landing-hero');
    heroHeight = $hero.outerHeight() - 50;
    $logo = $('.landing-hero-image img');
    logoHeight = $logo.height();
    logoBottom = $logo.position().top + logoHeight;
    logoTarget = $('.js--logo-target').offset().top - 30;
    $doc = $(document);
    return setInterval(function() {
      return scrollHandle();
    }, 50);
  };

  scrollHandle = function(force) {
    var scrollTop;
    if (didScroll || force) {
      if (!logoHeight) {
        logoHeight = $logo.height();
        logoBottom = $logo.position().top + logoHeight;
      }
      didScroll = false;
      scrollTop = $doc.scrollTop();
      if (!$logo.hasClass('fixed') && scrollTop + logoBottom > logoTarget) {
        $logo.addClass('fixed');
        $hero.addClass('fixed-logo');
        return $navBar.removeClass('trans');
      } else if ($logo.hasClass('fixed') && scrollTop + logoBottom < logoTarget) {
        $logo.removeClass('fixed');
        $hero.removeClass('fixed-logo');
        return $navBar.addClass('trans');
      }
    }
  };

  imageLoad = function($image, cb) {
    var img, src;
    src = $image.attr("data-src");
    $image.parent().hide();
    if (src) {
      img = new Image();
      img.style.display = "none";
      img.onload = function() {
        $image.attr("src", src);
        if (cb) {
          return cb($image);
        } else {
          return $image.removeAttr("data-src").parent().fadeIn(1000);
        }
      };
      return img.src = src;
    }
  };

  initLinkClicking = function() {
    return $('a').click(function(e) {
      var $target, $this, name, _ref;
      $this = $(this);
      if (((_ref = $this.attr('href')) != null ? _ref[1] : void 0) === '#') {
        name = $this.attr('href').split('#')[1];
        $target = $("a[name='" + name + "']");
        e.preventDefault();
        return scrollToPosition($target.offset().top - 100);
      }
    });
  };

  scrollToPosition = function(target) {
    return $('html,body').animate({
      scrollTop: target
    }, 500);
  };

  $(document).ready(function() {
    initScrolling();
    scrollHandle(true);
    initLinkClicking();
    $(window).scroll(function() {
      return didScroll = true;
    });
    return $(window).resize(function() {
      var didResize;
      return didResize = true;
    });
  });

}).call(this);
