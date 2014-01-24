
setWindowHeight = ->
  $win = $(window)
  $content = $('.contact-content')

  $content.css
    'height': if $win.height() > 500 then $win.height() else 750


initFormListeners = ->
  $form = $('form')
  $fields = $form.find('input, textarea')

  $('button[type="submit"]').on 'click', (e) ->
    e.preventDefault()
    $('form').submit()

  $fields.each ->
    $this = $(this)
    $this.on('focus', ->
        $this.parents('.control-group').addClass('focus')
      ).on('blur', ->
        $this.parents('.control-group').removeClass('focus')
      )

  $form.on 'submit', (e) ->
    valid = validateForm(scrapeForm())
    clearValidationErrors()
    if valid is true
      # send form
    else
      e.preventDefault()
      showValidationErrors(valid)

showValidationErrors = (errors) ->
  $form = $('form')
  for error of errors
    $form.find("[name='#{error}']").parents('.control-group').addClass('invalid')

clearValidationErrors = ->
  $('form .control-group').removeClass('invalid');

validateForm = (formData) ->
  errors = {}
  if !formData.name then errors.name = true
  if !formData.url then errors.url = true
  if !formData.company then errors.company = true
  if !formData.email then errors.email = true
  if !formData.description then errors.description = true
  if !formData.budget then errors.budget = true
  if !formData.timeframe then errors.timeframe = true

  return if _.isEmpty(errors) then true else errors

scrapeForm = ->
  data = $('form').serializeArray();
  dataObject = {}
  _.each data, (f) ->
    dataObject[f.name] = f.value
  return dataObject


initChosen = ->
  $('select').chosen
    disable_search_threshold: 10

$(document).ready ->
  setWindowHeight()
  initChosen()
  initFormListeners()

