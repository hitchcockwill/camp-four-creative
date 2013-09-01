(function() {
  var $doc, $navBar, $navLinks, didScroll, fixNav, galleryHeight, handleActiveNav, handleFixedBar, initActiveNav, initPortfolio, initScrolling, navFixed, setProjectContent, slideInProject, slideOutProject, unFixNav;

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
    return $gallery.delay(250).animate({
      height: "1px"
    }, 250);
  };

  slideOutProject = function($project, $gallery) {
    $gallery.animate({
      height: galleryHeight + "px"
    }, 500, function() {
      return $gallery.css("height", "auto");
    });
    return $project.parent().removeClass("open");
  };

  didScroll = false;

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
    position = $navBar.position().top - scrollTop;
    if (position <= 0 && navFixed === false) {
      return fixNav();
    } else if (position > 0) {
      return unFixNav();
    }
  };

  initActiveNav = function() {
    return $navLinks.each(function() {
      var $this, className;
      $this = $(this);
      className = $this.attr("class");
      return $this.attr("data-anchor", $("section." + className).position().top);
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

  $(document).ready(function() {
    initPortfolio();
    initScrolling();
    return $(window).scroll(function() {
      return didScroll = true;
    });
  });

}).call(this);
