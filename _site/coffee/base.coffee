
handleImageSizing = ($image) ->

  setImageSize($image)

  resizing = false
  $(window).resize ->
    resizing = true

  setInterval ->
    if resizing
      setImageSize($image)
      resizing = false
  , 100

setImageSize = ($image) ->
  if $image.height() < $image.parent().height()
    $image.parent().css("height", String($image.height()) + "px")
  else 
    $image.parent().css("height", "500px")

$(()->

  $imageWrap = $("img.main-image")
  if $imageWrap.length then handleImageSizing($imageWrap)

)
