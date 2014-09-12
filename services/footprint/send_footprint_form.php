<?php

if(isset($_POST['email'])) {

  // Subject
  $email_to = "will@campfourcreative.com";
  $email_subject = "C4C: New Project Inquiry";

  // Fields
  $name = $_POST['name']; // required
  $url = $_POST['url']; // required
  $company = $_POST['company']; // required
  $email_from = $_POST['email']; // required
  $about_company = $_POST['about_company']; // required
  $project_goals = $_POST['project_goals']; // required
  $packages = $_POST['packages']; // required

  // Build Message
  $email_message = "";

  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

  $email_message .= "<strong>Name:</strong><br> ".clean_string($name)."<br><br>";
  $email_message .= "<strong>Company:</strong><br> ".clean_string($company)."<br><br>";
  $email_message .= "<strong>Email:</strong><br> ".clean_string($email_from)."<br><br>";
  $email_message .= "<strong>Url:</strong><br> ".clean_string($url)."<br><br>";
  $email_message .= "<strong>About Company:</strong><br> ".clean_string($about_company)."<br><br>";
  $email_message .= "<strong>Goals:</strong><br> ".clean_string($project_goals)."<br><br>";
  $email_message .= "<strong>Packages:</strong><br> ".clean_string($packages)."<br><br>";


  // create email headers
  $headers = 'From: '.$name."\r\n".
  'Reply-To: '.$email_from."\r\n" .
  'X-Mailer: PHP/' . phpversion() .
  $headers .= 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  // Send mail
  if(mail($email_to, $email_subject, $email_message, $headers)) {
    // set 200 response code
    http_response_code(200);
    echo "Thank you! Message sent successfully.";
  }
  else {
    // set error
    http_response_code(500);
    echo "Oops! Something bad happened.";
  }

  // header( 'Location: http://www.campfourcreative.com/contact/success.html' );

}

?>