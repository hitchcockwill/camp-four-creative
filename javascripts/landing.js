(function() {
  var initPortfolio, showContent;

  initPortfolio = function() {
    var $gallery, $project;
    $gallery = $("#projects-gallery");
    $project = $("#project-wrapper");
    return $gallery.find("a.p").on("click", function(e) {
      e.preventDefault();
      return showContent($(this), $project);
    });
  };

  showContent = function($item, $project) {
    var src;
    src = $item.attr("src");
    return $project.load($item.attr("href"), function(stuff) {});
  };

  $(document).ready(function() {
    return initPortfolio();
  });

}).call(this);
