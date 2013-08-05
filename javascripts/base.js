(function() {
  var handleImageSizing, setImageSize;

  handleImageSizing = function($image) {
    var resizing;
    setImageSize($image);
    resizing = false;
    $(window).resize(function() {
      return resizing = true;
    });
    return setInterval(function() {
      if (resizing) {
        setImageSize($image);
        return resizing = false;
      }
    }, 100);
  };

  setImageSize = function($image) {
    if ($image.height() < $image.parent().height()) {
      return $image.parent().css("height", String($image.height()) + "px");
    } else {
      return $image.parent().css("height", "500px");
    }
  };

  $(function() {
    var $imageWrap;
    $imageWrap = $("img.main-image");
    if ($imageWrap.length) {
      return handleImageSizing($imageWrap);
    }
  });

}).call(this);
