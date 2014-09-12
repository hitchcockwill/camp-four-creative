
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

scrollToPosition = (target) ->
  $('html,body').animate({ scrollTop: target }, 500)

initHeaderResponsiveness = ->
  $header = $('#primary-header')
  $header.find('.header-nav').slicknav
    prependTo: $header.find('.row')
    label: ''




$(document).ready () ->

  console.log "Welcome to Camp Four Creative's website. If you're curious about how everything is built, you should check out the source code at:"
  console.log "https://github.com/hitchcockwill/camp-four-creative"

  backgroundImageLoad($(".image-wrapper"))

  initHeaderResponsiveness()

  if window.devicePixelRatio >= 2
    setRetinaImage()

$(window).load ->

  if window.location.hash isnt ''
    hash = window.location.hash.replace('#', '')
    target = $("a[name='#{hash}']").offset().top - 100
    scrollToPosition(target)

