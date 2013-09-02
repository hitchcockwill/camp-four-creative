
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
  $gallery.delay(250).animate({height: "1px"}, 250)

slideOutProject = ($project, $gallery) ->
  $gallery.animate {height: galleryHeight+"px"}, 500, ->
    $gallery.css("height", "auto")
  $project.parent().removeClass("open")

# Scrolling events

didScroll = false
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
    className = $this.attr("class")
    $this.attr("data-anchor", $("section.#{className}").position().top)

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
    $("html, body").animate({scrollTop: $(this).attr("data-anchor")-50+"px"}, 350)

  $navBar.find("a.home-anchor").on "click", (e) ->
    e.preventDefault()
    $("html, body").animate({scrollTop: 0}, 350)

$(document).ready () ->
  initPortfolio()
  initScrolling()
  initNavEvents()

  $(window).scroll ->
    didScroll = true
