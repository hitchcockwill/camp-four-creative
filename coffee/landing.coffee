
# Scrolling events

didScroll = false
$navBar = null
heroHeight = null
$doc = $(document)

initScrolling = ->
  $navBar = $("#primary-header")
  $hero = $('#landing-hero')
  heroHeight = $hero.outerHeight() - 50
  $doc = $(document)

  setInterval ->
    scrollHandle()
  , 50

scrollHandle = (force) ->
  if didScroll or force
    didScroll = false
    scrollTop = $doc.scrollTop()
    # handleFixedBar(scrollTop)
    # handleActiveNav(scrollTop)
    if !$navBar.hasClass('trans') and scrollTop < heroHeight
      $navBar.addClass('trans')
    else if $navBar.hasClass('trans') and scrollTop > heroHeight
      $navBar.removeClass('trans')


# Image loading

imageLoad = ($image, cb) ->
  src = $image.attr("data-src")
  $image.parent().hide()
  if src
    img = new Image()
    img.style.display = "none"
    img.onload = ->
      $image.attr("src", src)
      if cb then cb $image
      else $image.removeAttr("data-src").parent().fadeIn(1000)
    img.src = src


# link navigation
linkNavigate = (target) ->
  $link = $doc.find("[data-target='#{target}']")
  console.log 'found link: ', $link, $link.offset().top
  _.defer ->
    console.log 'scroll to: ', $link.offset().top + 'px'
    # $('html, body').animate({'scrollTop': $link.offset().top + 'px'}, 100)
    $('html, body').scrollTop($link.offset().top)

initLinkNavigation = ->
  setTimeout ->
    if window.location.hash then linkNavigate(window.location.hash)
  , 100



$(document).ready () ->
  initScrolling()
  scrollHandle(true)

  # initLinkNavigation()

  $(window).scroll ->
    didScroll = true
  $(window).resize ->
    didResize = true
