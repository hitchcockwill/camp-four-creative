(function() {
  var handleImageSizing, imageLoad, setImageSize;

  handleImageSizing = function($image) {
    var $article, resizing;
    $article = $("div.article-wrap");
    setImageSize($image, $article);
    resizing = false;
    $(window).resize(function() {
      return resizing = true;
    });
    return setInterval(function() {
      if (resizing) {
        setImageSize($image, $article);
        return resizing = false;
      }
    }, 100);
  };

  setImageSize = function($image, $article) {
    if ($image.height() < $image.parent().height()) {
      $image.parent().css("height", String($image.height()) + "px");
      return $article.css("margin-top", String($image.height()) + "px");
    } else {
      $image.parent().css("height", "500px");
      return $article.css("margin-top", "500px");
    }
  };

  imageLoad = function(self, cb) {
    var $this, img, src;
    $this = $(self);
    src = $this.attr("data-src");
    if (src) {
      img = new Image();
      img.style.display = "none";
      img.onload = function() {
        var $image;
        $image = $(this);
        $image.addClass("main-image").fadeIn(1000);
        $this.remove();
        if (cb) {
          return cb($image);
        }
      };
      $this.parent().append(img);
      return img.src = src;
    }
  };

  $(document).ready(function() {
    var $imageWrap;
    $imageWrap = $("span.main-image");
    return $imageWrap.each(function() {
      return imageLoad(this, function($image) {
        return handleImageSizing($image);
      });
    });
  });

}).call(this);
