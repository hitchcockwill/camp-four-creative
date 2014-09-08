
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
    submitForm(e)


submitForm = (event) ->
  event.preventDefault()

  formData = scrapeForm()
  valid = validateForm(formData)
  clearValidationErrors()
  if valid isnt true
    showValidationErrors(valid)
    return false
  else
    $.ajax
      type: 'post'
      url: 'send_footprint_form.php'
      data: formData
      success: (data) ->
        console.log 'php success'
      error: (data, log) ->
        console.log 'there was an error: ', data, log



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
  if !formData.about_company then errors.about_company = true
  if !formData.project_goals then errors.project_goals = true
  if !formData.packages then errors.packages = true

  return if _.isEmpty(errors) then true else errors

scrapeForm = ->
  data = $('form').serializeArray();
  dataObject = {}
  _.each data, (f) ->
    dataObject[f.name] = f.value
  return dataObject


initDropdowns = ->
  $('select').selectize()

$(document).ready ->
  setWindowHeight()
  initDropdowns()
  initFormListeners()

