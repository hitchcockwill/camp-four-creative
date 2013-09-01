(function() {
  var $doc, $navBar, $navLinks, didScroll, fixNav, handleActiveNav, handleFixedBar, initActiveNav, initPortfolio, initScrolling, navFixed, setProjectContent, slideInProject, slideOutProject, unFixNav;

  initPortfolio = function() {
    var $gallery, $project;
    $gallery = $("#projects-gallery");
    $project = $("#project-wrapper");
    $gallery.find("a.p").on("click", function(e) {
      e.preventDefault();
      return setProjectContent($(this), $project);
    });
    return $project.on("click", "a.close", function(e) {
      e.preventDefault();
      return slideOutProject($project);
    });
  };

  setProjectContent = function($item, $project) {
    var src;
    src = $item.attr("src");
    return $project.load($item.attr("href"), function() {
      return slideInProject($project);
    });
  };

  slideInProject = function($project) {
    return $project.parent().addClass("open");
  };

  slideOutProject = function($project) {
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
    console.log(position, navFixed);
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
        console.log(anchor, scrollTop);
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
