
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

$(document).ready () ->
  initPortfolio()