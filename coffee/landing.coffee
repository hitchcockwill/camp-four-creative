
initPortfolio = ->
  $gallery = $("#projects-gallery")
  $project = $("#project-wrapper")

  $gallery.find("a.p").on "click", (e) ->
    e.preventDefault()
    showContent($(this), $project)

showContent = ($item, $project) ->
  src = $item.attr("src")
  $project.load $item.attr("href"), (stuff) ->

$(document).ready () ->
  initPortfolio()