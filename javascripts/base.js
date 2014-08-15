(function() {
  var backgroundImageLoad, setRetinaImage;

  setRetinaImage = function() {
    return $("img.retina").each(function() {
      var $this, attr, retinaSrc, src;
      $this = $(this);
      if (!$this.hasClass("isRetina")) {
        attr = $this.attr("data-original") && $this.attr("data-original").length ? "data-original" : "src";
        src = $this.attr(attr);
        retinaSrc = src.replace(/\.(\w+)$/, "@2x.$1");
        return $this.removeAttr("data-src").attr(attr, retinaSrc).addClass("isRetina");
      }
    });
  };

  backgroundImageLoad = function($images) {
    return $images.each(function() {
      var $image, img, src;
      $image = $(this);
      src = $image.attr("data-src");
      if (src) {
        img = new Image();
        img.style.display = "none";
        img.onload = function() {
          $image.css('background-image', "url(" + src + ")");
          $image.fadeIn(750);
          return img.remove();
        };
      }
      return img.src = src;
    });
  };

  $(document).ready(function() {
    $("body").attr("data-device-type", categorizr());
    backgroundImageLoad($(".image-wrapper"));
    if (window.devicePixelRatio >= 2) {
      return setRetinaImage();
    }
  });

}).call(this);
