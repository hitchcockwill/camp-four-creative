<?php

if(isset($_POST['email'])) {

  // Subject
  $email_to = "will@campfourcreative.com";
  $email_subject = "C4C: New Inquiry";

  // Fields
  $name = $_POST['name']; // required
  $company = $_POST['company']; // required
  $email_from = $_POST['email']; // required
  $url = $_POST['url']; // not required
  $description = $_POST['description']; // required
  $budget = $_POST['budget']; // required
  $timeframe = $_POST['timeframe']; // required

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
  $email_message .= "<strong>Description:</strong><br> ".clean_string($description)."<br><br>";
  $email_message .= "<strong>Budget:</strong><br> ".clean_string($budget)."<br><br>";
  $email_message .= "<strong>Timeframe:</strong><br> ".clean_string($timeframe)."<br><br>";


  // create email headers
  $headers = 'From: '.$email_from."\r\n".
  'Reply-To: '.$email_from."\r\n" .
  'X-Mailer: PHP/' . phpversion() .
  $headers .= 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  // Send mail
  @mail($email_to, $email_subject, $email_message, $headers);

  header( 'Location: http://www.campfourcreative.com/contact/success.html' );

}

?>