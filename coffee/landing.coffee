
galleryHeight = null

initPortfolio = ->
  $gallery = $("#projects-gallery")
  $project = $("#project-wrapper")

  $gallery.find("a.p").on "click", (e) ->
    e.preventDefault()
    setProjectContent($(this), $project, $gallery)

  $project.on "click", "a.close", (e) ->
    e.preventDefault()
    slideOutProject($project, $gallery)

setProjectContent = ($item, $project, $gallery) ->
  src = $item.attr("src")
  $project.load $item.attr("href"), () ->
    slideInProject($project, $gallery)

slideInProject = ($project, $gallery) ->
  $project.parent().addClass("open")
  galleryHeight = $gallery.height()
  $gallery.delay(250).animate {height: "1px"}, 250, ->
    handleProjectImageLoad($project)
    initActiveNav()
  $("html, body").animate {scrollTop: $project.parent().offset().top}, 250

slideOutProject = ($project, $gallery) ->
  $gallery.animate {height: galleryHeight+"px"}, 500, ->
    $gallery.css("height", "auto")
    initActiveNav()
    $project.html("")
  $project.parent().removeClass("open")
  $("html, body").animate {scrollTop: $project.parent().offset().top}, 250

# Scrolling events

didScroll = false
didResize = false
navFixed = false
$navBar = null
$navLinks = null
$doc = null

initScrolling = ->
  $navBar = $("section.navigation")
  $navLinks = $navBar.find("div.right-nav a")
  $doc = $(document)

  initActiveNav()

  setInterval ->
    if didScroll
      didScroll = false
      scrollTop = $doc.scrollTop()
      handleFixedBar(scrollTop)
      handleActiveNav(scrollTop)
  , 50

handleFixedBar = (scrollTop) ->
  position = $navBar.offset().top - scrollTop
  if position <= 0 and navFixed is false then fixNav()
  else if position > 0 then unFixNav()

initActiveNav = ->
  $navLinks.each ->
    $this = $(this)
    className = $this.attr("title")
    $section = $("section.#{className}")
    if $section.length
      $this.attr("data-anchor", $section.offset().top)

handleActiveNav = (scrollTop) ->
  if navFixed
    $navLinks.each ->
      $this = $(this)
      anchor = parseInt($this.attr("data-anchor"))
      if anchor <= (scrollTop+100) then $this.addClass("active").siblings().removeClass("active")
  else $navLinks.removeClass("active")

fixNav = ->
  navFixed = true
  $navBar.addClass("fixed")

unFixNav = ->
  navFixed = false
  $navBar.removeClass("fixed")

# Nav events

initNavEvents = ->
  $navLinks.on "click", (e) ->
    e.preventDefault()
    $("html, body").animate({scrollTop: $(this).attr("data-anchor")-40+"px"}, 350)

  $navBar.find("a.home-anchor").on "click", (e) ->
    e.preventDefault()
    $("html, body").animate({scrollTop: 0}, 350)

initWindowResize = ->
  setInterval ->
    if didResize
      didResize = false
      initActiveNav()
  , 250


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
      initActiveNav()
    img.src = src

handleProjectImageLoad = ($project) ->
  $image = $project.find("#portfolio-hero")
  $wrap = $image.closest(".browser-chrome-wrap")
  src = $image.attr("data-src")
  $wrap.hide()
  if src
    img = new Image()
    img.style.display = "none"
    img.onload = ->
      $image.attr("src", src).removeAttr("data-src")
      $wrap.css("opacity", 0).animate({opacity: 1}, 1000).slideDown(1000)
      loadSecondaryProjectImages($project)
    img.src = src

loadSecondaryProjectImages = ($project) ->
  $bottomImage = $project.find("#portfolio-hero-bottom")
  $otherImages = $project.find("div.secondary-image img")

  if $bottomImage
    imageLoad $bottomImage
  if $otherImages.length
    $otherImages.each ->
      imageLoad $(this)



$(document).ready () ->
  # initPortfolio()
  # initScrolling()
  # initNavEvents()
  # initWindowResize( )

  $(window).scroll ->
    didScroll = true
  $(window).resize ->
    didResize = true
