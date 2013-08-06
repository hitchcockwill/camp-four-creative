
handleImageSizing = ($image) ->

  $article = $("div.article-wrap")

  setImageSize($image, $article)

  resizing = false
  $(window).resize ->
    resizing = true

  setInterval ->
    if resizing
      setImageSize($image, $article)
      resizing = false
  , 100

setImageSize = ($image, $article) ->
  if $image.height() < $image.parent().height()
    $image.parent().css("height", String($image.height()) + "px")
    $article.css("margin-top", String($image.height()) + "px")
  else 
    $image.parent().css("height", "500px")
    $article.css("margin-top","500px")
 
imageLoad = (self, cb) ->    
  $this = $(self)
  src = $this.attr("data-src")
  if src
    img = new Image()
    img.style.display = "none"
    img.onload = ->
      $image = $(this)
      $image.addClass("main-image").fadeIn(1000)
      $this.remove()
      if cb then cb($image)
    $this.parent().append(img)
    img.src = src

$(document).ready () ->

  $imageWrap = $("span.main-image")
  $imageWrap.each ->
    imageLoad this, ($image) ->
      handleImageSizing($image)
