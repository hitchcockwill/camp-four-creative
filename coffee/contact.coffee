
setWindowHeight = ->
  $win = $(window)
  $content = $('.contact-content')

  $content.css
    'height': if $win.height() > 500 then $win.height() else 750


initFormListeners = ->
  $fields = $('form').find('input, textarea')

  $fields.each ->
    $this = $(this)
    $this.on('focus', ->
        $this.parents('.control-group').addClass('focus')
      ).on('blur', ->
        $this.parents('.control-group').removeClass('focus')
      )

initChosen = ->
  $('select').chosen
    disable_search_threshold: 10

$(document).ready ->
  console.log('contact page')
  setWindowHeight()
  initChosen()
  initFormListeners()

  $('button[type="submit"]').on 'click', (e) ->
    e.preventDefault()
    $('form').submit()