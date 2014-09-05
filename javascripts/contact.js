(function() {
  var clearValidationErrors, initDropdowns, initFormListeners, scrapeForm, setWindowHeight, showValidationErrors, validateForm;

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
      var valid;
      valid = validateForm(scrapeForm());
      clearValidationErrors();
      if (valid === true) {

      } else {
        e.preventDefault();
        return showValidationErrors(valid);
      }
    });
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
    if (!formData.description) {
      errors.description = true;
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
