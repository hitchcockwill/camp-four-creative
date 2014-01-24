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
  $email_message = "Form details below.\n\n";

  function clean_string($string) {
    $bad = array("content-type","bcc:","to:","cc:","href");
    return str_replace($bad,"",$string);
  }

  $email_message .= "Name: ".clean_string($name)."\n";
  $email_message .= "Company: ".clean_string($company)."\n";
  $email_message .= "Email: ".clean_string($email_from)."\n";
  $email_message .= "Url: ".clean_string($url)."\n";
  $email_message .= "Description: ".clean_string($description)."\n";
  $email_message .= "Budget: ".clean_string($budget)."\n";
  $email_message .= "Timeframe: ".clean_string($timeframe)."\n";


// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();

// Send mail
@mail($email_to, $email_subject, $email_message, $headers);

?>

<!-- Success HTML -->

<p>Thank you for contacting us. We will take a look at your project and get back to you soon.</p>

<p>
  Best,<br>
  Will
</p>

<?php

}

?>