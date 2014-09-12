(function() {
  var $packageDropdown, clearLoadingButton, clearValidationErrors, formSubmitSuccess, initDropdowns, initFormListeners, loadingButton, scrapeForm, setWindowHeight, showValidationErrors, submitForm, validateForm;

  $packageDropdown = null;

  setWindowHeight = function() {
    var $content, $win;
    $win = $(window);
    $content = $('.contact-content');
    return $content.css({
      'min-height': $win.height() > 500 ? $win.height() : 750
    });
  };

  initFormListeners = function() {
    var $fields, $form;
    $form = $('form');
    $fields = $form.find('input, textarea');
    $('button[type="submit"]').on('click', function(e) {
      e.preventDefault();
      return $('form').submit();
    });
    $fields.each(function() {
      var $this;
      $this = $(this);
      return $this.on('focus', function() {
        return $this.parents('.control-group').addClass('focus');
      }).on('blur', function() {
        return $this.parents('.control-group').removeClass('focus');
      });
    });
    return $form.on('submit', function(e) {
      return submitForm(e);
    });
  };

  initDropdowns = function() {
    return $packageDropdown = $('#packages').selectize();
  };

  submitForm = function(event) {
    var formData, valid;
    event.preventDefault();
    formData = scrapeForm();
    valid = validateForm(formData);
    clearValidationErrors();
    if (valid !== true) {
      showValidationErrors(valid);
      return false;
    } else {
      loadingButton();
      return $.ajax({
        type: 'post',
        url: 'send_footprint_form.php',
        data: formData,
        success: function(data) {
          clearLoadingButton();
          return formSubmitSuccess();
        },
        error: function(data, log) {
          return console.log('There was an error with the form: ', data, log);
        }
      });
    }
  };

  formSubmitSuccess = function() {
    return $('.success-modal-wrap').addClass('show-modal');
  };

  loadingButton = function() {
    return $('button[type="submit"]').attr('disabled', 'disabled').addClass('disabled').text('Sending...');
  };

  clearLoadingButton = function() {
    return $('button[type="submit"]').removeAttr('disabled').removeClass('disabled').text('Send!');
  };

  showValidationErrors = function(errors) {
    var $form, error, _results;
    $form = $('form');
    _results = [];
    for (error in errors) {
      _results.push($form.find("[name='" + error + "']").parents('.control-group').addClass('invalid'));
    }
    return _results;
  };

  clearValidationErrors = function() {
    return $('form .control-group').removeClass('invalid');
  };

  validateForm = function(formData) {
    var errors;
    errors = {};
    if (!formData.name) {
      errors.name = true;
    }
    if (!formData.url) {
      errors.url = true;
    }
    if (!formData.company) {
      errors.company = true;
    }
    if (!formData.email) {
      errors.email = true;
    }
    if (!formData.about_company) {
      errors.about_company = true;
    }
    if (!formData.project_goals) {
      errors.project_goals = true;
    }
    if (!formData.packages) {
      errors.packages = true;
    }
    if (_.isEmpty(errors)) {
      return true;
    } else {
      return errors;
    }
  };

  scrapeForm = function() {
    var data, dataObject;
    data = $('form').serializeArray();
    dataObject = {};
    _.each(data, function(f) {
      return dataObject[f.name] = f.value;
    });
    dataObject.packages = $packageDropdown[0].selectize.getValue();
    if (dataObject.packages.length) {
      dataObject.packages = dataObject.packages.join(', ');
    }
    return dataObject;
  };

  $(document).ready(function() {
    setWindowHeight();
    initDropdowns();
    return initFormListeners();
  });

}).call(this);
