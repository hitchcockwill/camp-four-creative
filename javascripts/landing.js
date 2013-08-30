(function() {
  var initPortfolio, setProjectContent, slideInProject, slideOutProject;

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

  $(document).ready(function() {
    return initPortfolio();
  });

}).call(this);
