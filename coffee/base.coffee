
setRetinaImage = ->
  $("img.retina").each ->
    $this = $(this)
    if !$this.hasClass("isRetina")
      attr = if $this.attr("data-original") and $this.attr("data-original").length then "data-original" else "src"
      src = $this.attr(attr)
      retinaSrc = src.replace(/\.(\w+)$/, "@2x.$1")
      $this.removeAttr("data-src").attr(attr, retinaSrc).addClass("isRetina") 


$(document).ready () ->

  # set devive type
  $("body").attr("data-device-type", categorizr())

  if window.devicePixelRatio >= 2
    setRetinaImage()
