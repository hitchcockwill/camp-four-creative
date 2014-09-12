
# Scrolling events

didScroll = false
$navBar = null
$hero = null
$logo = null
logoBottom = null
logoTarget = null
logoHeight = null
heroHeight = null
$doc = $(document)

initScrolling = ->
  $navBar = $("#primary-header")

  $hero = $('#landing-hero')
  heroHeight = $hero.outerHeight() - 50

  $logo = $('.landing-hero-image img')
  logoHeight = $logo.height()
  logoBottom = $logo.position().top + logoHeight
  logoTarget = $('.js--logo-target').offset().top - 30

  $doc = $(document)

  setInterval ->
    scrollHandle()
  , 50

scrollHandle = (force) ->
  if didScroll or force
    if !logoHeight
      logoHeight = $logo.height()
      logoBottom = $logo.position().top + logoHeight
    didScroll = false
    scrollTop = $doc.scrollTop()

    # check navigation status
    # check hero logo status
    if !$logo.hasClass('fixed') and scrollTop + logoBottom > logoTarget
      $logo.addClass('fixed')
      $hero.addClass('fixed-logo')
      $navBar.removeClass('trans')

    else if $logo.hasClass('fixed') and scrollTop + logoBottom < logoTarget
      $logo.removeClass('fixed')
      $hero.removeClass('fixed-logo')
      $navBar.addClass('trans')






# #######################################################################
# IMAGE LOADING
# #######################################################################

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


initLinkClicking = ->
  $('a').click (e) ->
    $this = $(this)
    if $this.attr('href')?[1] is '#'
      name = $this.attr('href').split('#')[1]
      $target = $("a[name='#{name}']")
      e.preventDefault()
      scrollToPosition($target.offset().top - 100)

scrollToPosition = (target) ->
  $('html,body').animate({ scrollTop: target }, 500)









# #######################################################################
# TRACKING EVENTS
# #######################################################################

# header clicks
$('section.navigation .right-nav a').on 'click', ->
  _gaq.push(['_trackEvent', 'Header', 'Click', $(this).attr('title')])

# project clicks
$('section.projects div.project a').on 'click', ->
  _gaq.push(['_trackEvent', 'Project', 'Click', $(this).attr('data-project')])
$('section.projects .share-project a').on 'click', ->
  _gaq.push(['_trackEvent', 'Share', 'Click', 'Github'])

# social clicks
$('section.about .social-links a').on 'click', ->
  _gaq.push(['_trackEvent', 'Social', 'Click', $(this).attr('data-social')])

# contact clicks
$('section.contact a.mail').on 'click', ->
  _gaq.push(['_trackEvent', 'Contact', 'Click', 'main contact'])
$('section.projects a.contact').on 'click', ->
  _gaq.push(['_trackEvent', 'Contact', 'Click', 'project contact'])




# #######################################################################
# DOCUMENT READY
# #######################################################################

$(document).ready () ->
  initScrolling()
  scrollHandle(true)

  # init link clicking
  initLinkClicking()

  $(window).scroll ->
    didScroll = true
  $(window).resize ->
    didResize = true
