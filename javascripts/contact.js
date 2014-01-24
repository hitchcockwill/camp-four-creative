(function() {
  var initChosen, initFormListeners, setWindowHeight;

  setWindowHeight = function() {
    var $content, $win;
    $win = $(window);
    $content = $('.contact-content');
    return $content.css({
      'height': $win.height() > 500 ? $win.height() : 750
    });
  };

  initFormListeners = function() {
    var $fields;
    $fields = $('form').find('input, textarea');
    return $fields.each(function() {
      var $this;
      $this = $(this);
      return $this.on('focus', function() {
        return $this.parents('.control-group').addClass('focus');
      }).on('blur', function() {
        return $this.parents('.control-group').removeClass('focus');
      });
    });
  };

  initChosen = function() {
    return $('select').chosen({
      disable_search_threshold: 10
    });
  };

  $(document).ready(function() {
    console.log('contact page');
    setWindowHeight();
    initChosen();
    return initFormListeners();
  });

}).call(this);
