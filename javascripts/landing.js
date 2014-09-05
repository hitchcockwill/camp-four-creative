(function() {
  var $doc, $navBar, didScroll, heroHeight, imageLoad, initLinkNavigation, initScrolling, linkNavigate, scrollHandle;

  didScroll = false;

  $navBar = null;

  heroHeight = null;

  $doc = $(document);

  initScrolling = function() {
    var $hero;
    $navBar = $("#primary-header");
    $hero = $('#landing-hero');
    heroHeight = $hero.outerHeight() - 50;
    $doc = $(document);
    return setInterval(function() {
      return scrollHandle();
    }, 50);
  };

  scrollHandle = function(force) {
    var scrollTop;
    if (didScroll || force) {
      didScroll = false;
      scrollTop = $doc.scrollTop();
      if (!$navBar.hasClass('trans') && scrollTop < heroHeight) {
        return $navBar.addClass('trans');
      } else if ($navBar.hasClass('trans') && scrollTop > heroHeight) {
        return $navBar.removeClass('trans');
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

  linkNavigate = function(target) {
    var $link;
    $link = $doc.find("[data-target='" + target + "']");
    console.log('found link: ', $link, $link.offset().top);
    return _.defer(function() {
      console.log('scroll to: ', $link.offset().top + 'px');
      return $('html, body').scrollTop($link.offset().top);
    });
  };

  initLinkNavigation = function() {
    return setTimeout(function() {
      if (window.location.hash) {
        return linkNavigate(window.location.hash);
      }
    }, 100);
  };

  $(document).ready(function() {
    initScrolling();
    scrollHandle(true);
    $(window).scroll(function() {
      return didScroll = true;
    });
    return $(window).resize(function() {
      var didResize;
      return didResize = true;
    });
  });

}).call(this);
