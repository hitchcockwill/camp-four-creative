(function() {
  var clearValidationErrors, initDropdowns, initFormListeners, scrapeForm, setWindowHeight, showValidationErrors, submitForm, validateForm;

  setWindowHeight = function() {
    var $content, $win;
    $win = $(window);
    $content = $('.contact-content');
    return $content.css({
      'height': $win.height() > 500 ? $win.height() : 750
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
      return $.ajax({
        type: 'post',
        url: 'send_basic_form.php',
        data: formData,
        success: function(data) {
          return console.log('php success');
        },
        error: function(data, log) {
          return console.log('there was an error: ', data, log);
        }
      });
    }
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
    if (!formData.about_project) {
      errors.about_project = true;
    }
    if (!formData.budget) {
      errors.budget = true;
    }
    if (!formData.timeframe) {
      errors.timeframe = true;
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
    return dataObject;
  };

  initDropdowns = function() {
    return $('select').selectize();
  };

  $(document).ready(function() {
    setWindowHeight();
    initDropdowns();
    return initFormListeners();
  });

}).call(this);
