(function() {
  var setRetinaImage;

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

  $(document).ready(function() {
    $("body").attr("data-device-type", categorizr());
    if (window.devicePixelRatio >= 2) {
      return setRetinaImage();
    }
  });

}).call(this);
