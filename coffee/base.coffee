
setRetinaImage = ->
  $("img.retina").each ->
    $this = $(this)
    if !$this.hasClass("isRetina")
      attr = if $this.attr("data-original") and $this.attr("data-original").length then "data-original" else "src"
      src = $this.attr(attr)
      retinaSrc = src.replace(/\.(\w+)$/, "@2x.$1")
      $this.removeAttr("data-src").attr(attr, retinaSrc).addClass("isRetina")

backgroundImageLoad = ($images) ->
  $images.each ->
    $image = $(this)
    src = $image.attr("data-src")
    if src
      img = new Image()
      img.style.display = "none"
      img.onload = ->
        $image.css('background-image', "url(#{src})")
        $image.fadeIn(750)
        img.remove()
    img.src = src


$(document).ready () ->

  # set devive type
  $("body").attr("data-device-type", categorizr())

  # init foundation
  # $(document).foundation()

  backgroundImageLoad($(".image-wrapper"))

  if window.devicePixelRatio >= 2
    setRetinaImage()
