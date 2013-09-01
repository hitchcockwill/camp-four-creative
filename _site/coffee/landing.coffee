
initPortfolio = ->
  $gallery = $("#projects-gallery")
  $project = $("#project-wrapper")

  $gallery.find("a.p").on "click", (e) ->
    e.preventDefault()
    setProjectContent($(this), $project)

  $project.on "click", "a.close", (e) ->
    e.preventDefault()
    slideOutProject($project)

setProjectContent = ($item, $project) ->
  src = $item.attr("src")
  $project.load $item.attr("href"), () ->
    slideInProject($project)

slideInProject = ($project) ->
  $project.parent().addClass("open")

slideOutProject = ($project) ->
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
  position = $navBar.position().top - scrollTop
  console.log position, navFixed
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
      console.log anchor, scrollTop
      if anchor <= (scrollTop+100) then $this.addClass("active").siblings().removeClass("active")
  else $navLinks.removeClass("active")

fixNav = ->
  navFixed = true
  $navBar.addClass("fixed")

unFixNav = ->
  navFixed = false
  $navBar.removeClass("fixed")

$(document).ready () ->
  initPortfolio()
  initScrolling()

  $(window).scroll ->
    didScroll = true
