/* Author:
	Will Hitchcock for willhitchcock.com
	hitchcock.will@gmail.com
*/

$(document).ready(function(){
    projectHover();
    navigation();
    autoInput();
    quoteInit();
});

function projectHover() {
    var projects = $('#projects li');
    var listHeight = projects.outerHeight();
    var yStart = projects.find('div').css("bottom");
    projects.hover(function(){
       $(this).find('div').stop().animate({top:0}, 400);
    }, function() {
        $(this).find('div').stop().animate({top:listHeight}, 300);
    });
}

function navigation() {
    var navLinks = $('#nav li a');
    
    //click handling
    navLinks.on('click', function(event){
        event.preventDefault();
        navLinks.parent().removeClass('selected');
        var target = "#" + $(this).parent().attr('class');
        $(this).parent().addClass('selected');
        $('html, body').stop().animate({scrollTop: $(target).offset().top - 80}, 300);
    });
    $("#logo").on('click', function(event){
        event.preventDefault();
        $('html, body').stop().animate({scrollTop: 0}, 300);
    });
    
    //scroll handling
    var contentDivs = $('#main div.section');
    var doc = $(document);
    doc.scroll(function(){
        if (contentDivs.eq(0).offset().top > doc.scrollTop() + 100) {
            navLinks.parent().removeClass('selected');
            return;
        }
        else {
            contentDivs.each(function(){
                if($(this).offset().top < doc.scrollTop() + 100) {
                    navLinks.parent().removeClass('selected');
                    $("#nav li." + $(this).attr("id")).addClass('selected');
                }
            });
        }
    });
}

function autoInput() {
    var textarea = $("textarea");
    textarea.attr("value", textarea.attr("id"));
    $("input, textarea").focus(function(){ 
      var input = $(this);
      if(input.attr("value") === input.attr("id")) {
        input.attr("value","");
      }
    }).blur(function(){
      var input = $(this);
      if(input.attr("value") === "" || input.attr("id") === "undefined") {
        var thisValue = input.attr("id");
        input.attr("value", thisValue);
      }
    });
}

function quoteInit() {
    var error = $("#error");
    $("form input.button").click(function(event) {
        event.preventDefault();
        error.hide();
        var $name = $("#main input#Name");
        var $email = $("#main input#Email");
        var $message = $("#main textarea#Message");
        var name = $name.val();
        var email = $email.val();
        var message = $message.val();

        if (name === "Name" || name==="") {
            error.html("Please enter your name.").show();
            $name.focus();
            return false;
        }
        if (email === "Email" || email === "") {
            error.html("Please enter your Email.").show();
            $email.focus();
            return false;
        }

        if (message === "Message" || message==="") {
            error.html("Please enter a message").show();
            $message.focus();
            return false;
        }

        var dataString = 'contactName=' + name + '&contactEmail=' + email + "&contactMessage=" + message;
        $.ajax({
            type: "POST",
            url: "contact.php",
            data: dataString,
            success: function(data) {
              data = jQuery.parseJSON(data);
              if (data && data.error == "true") {
                 error.html(data.error_message).show();
              }
              else {
                 $('#success').html("Your message successfully sent. I will be in touch soon!").show();
                 $name.val('Name')
                 $email.val('Email')
                 $message.val('Message')
              }
            }
        });
        return false;
    });
}

