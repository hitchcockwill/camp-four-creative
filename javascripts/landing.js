(function() {
  var $doc, $navBar, $navLinks, backgroundImageLoad, didResize, didScroll, fixNav, galleryHeight, handleActiveNav, handleFixedBar, handleProjectImageLoad, imageLoad, initActiveNav, initNavEvents, initPortfolio, initScrolling, initWindowResize, loadSecondaryProjectImages, navFixed, setProjectContent, slideInProject, slideOutProject, unFixNav;

  galleryHeight = null;

  initPortfolio = function() {
    var $gallery, $project;
    $gallery = $("#projects-gallery");
    $project = $("#project-wrapper");
    $gallery.find("a.p").on("click", function(e) {
      e.preventDefault();
      return setProjectContent($(this), $project, $gallery);
    });
    return $project.on("click", "a.close", function(e) {
      e.preventDefault();
      return slideOutProject($project, $gallery);
    });
  };

  setProjectContent = function($item, $project, $gallery) {
    var src;
    src = $item.attr("src");
    return $project.load($item.attr("href"), function() {
      return slideInProject($project, $gallery);
    });
  };

  slideInProject = function($project, $gallery) {
    $project.parent().addClass("open");
    galleryHeight = $gallery.height();
    $gallery.delay(250).animate({
      height: "1px"
    }, 250, function() {
      handleProjectImageLoad($project);
      return initActiveNav();
    });
    return $("html, body").animate({
      scrollTop: $project.parent().offset().top
    }, 250);
  };

  slideOutProject = function($project, $gallery) {
    $gallery.animate({
      height: galleryHeight + "px"
    }, 500, function() {
      $gallery.css("height", "auto");
      initActiveNav();
      return $project.html("");
    });
    $project.parent().removeClass("open");
    return $("html, body").animate({
      scrollTop: $project.parent().offset().top
    }, 250);
  };

  didScroll = false;

  didResize = false;

  navFixed = false;

  $navBar = null;

  $navLinks = null;

  $doc = null;

  initScrolling = function() {
    $navBar = $("section.navigation");
    $navLinks = $navBar.find("div.right-nav a");
    $doc = $(document);
    initActiveNav();
    return setInterval(function() {
      var scrollTop;
      if (didScroll) {
        didScroll = false;
        scrollTop = $doc.scrollTop();
        handleFixedBar(scrollTop);
        return handleActiveNav(scrollTop);
      }
    }, 50);
  };

  handleFixedBar = function(scrollTop) {
    var position;
    position = $navBar.offset().top - scrollTop;
    if (position <= 0 && navFixed === false) {
      return fixNav();
    } else if (position > 0) {
      return unFixNav();
    }
  };

  initActiveNav = function() {
    return $navLinks.each(function() {
      var $section, $this, className;
      $this = $(this);
      className = $this.attr("title");
      $section = $("section." + className);
      if ($section.length) {
        return $this.attr("data-anchor", $section.offset().top);
      }
    });
  };

  handleActiveNav = function(scrollTop) {
    if (navFixed) {
      return $navLinks.each(function() {
        var $this, anchor;
        $this = $(this);
        anchor = parseInt($this.attr("data-anchor"));
        if (anchor <= (scrollTop + 100)) {
          return $this.addClass("active").siblings().removeClass("active");
        }
      });
    } else {
      return $navLinks.removeClass("active");
    }
  };

  fixNav = function() {
    navFixed = true;
    return $navBar.addClass("fixed");
  };

  unFixNav = function() {
    navFixed = false;
    return $navBar.removeClass("fixed");
  };

  initNavEvents = function() {
    $navLinks.on("click", function(e) {
      e.preventDefault();
      return $("html, body").animate({
        scrollTop: $(this).attr("data-anchor") - 40 + "px"
      }, 350);
    });
    return $navBar.find("a.home-anchor").on("click", function(e) {
      e.preventDefault();
      return $("html, body").animate({
        scrollTop: 0
      }, 350);
    });
  };

  initWindowResize = function() {
    return setInterval(function() {
      if (didResize) {
        didResize = false;
        return initActiveNav();
      }
    }, 250);
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
          cb($image);
        } else {
          $image.removeAttr("data-src").parent().fadeIn(1000);
        }
        return initActiveNav();
      };
      return img.src = src;
    }
  };

  handleProjectImageLoad = function($project) {
    var $image, $wrap, img, src;
    $image = $project.find("#portfolio-hero");
    $wrap = $image.closest(".browser-chrome-wrap");
    src = $image.attr("data-src");
    $wrap.hide();
    if (src) {
      img = new Image();
      img.style.display = "none";
      img.onload = function() {
        $image.attr("src", src).removeAttr("data-src");
        $wrap.css("opacity", 0).animate({
          opacity: 1
        }, 1000).slideDown(1000);
        return loadSecondaryProjectImages($project);
      };
      return img.src = src;
    }
  };

  loadSecondaryProjectImages = function($project) {
    var $bottomImage, $otherImages;
    $bottomImage = $project.find("#portfolio-hero-bottom");
    $otherImages = $project.find("div.secondary-image img");
    if ($bottomImage) {
      imageLoad($bottomImage);
    }
    if ($otherImages.length) {
      return $otherImages.each(function() {
        return imageLoad($(this));
      });
    }
  };

  backgroundImageLoad = function($this) {
    var img, src;
    src = $this.attr("data-src");
    if (src) {
      img = new Image();
      img.style.display = "none";
      img.onload = function() {
        $this.fadeIn(1000);
        return img.remove();
      };
    }
    return img.src = src;
  };

  $(document).ready(function() {
    initPortfolio();
    initScrolling();
    initNavEvents();
    initWindowResize();
    backgroundImageLoad($("#landing-hero .image-wrapper"));
    $(window).scroll(function() {
      return didScroll = true;
    });
    return $(window).resize(function() {
      return didResize = true;
    });
  });

}).call(this);
