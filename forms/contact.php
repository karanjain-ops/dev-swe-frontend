<?php
  if(isset($_POST['submit'])){
    $name=$_POST['name'];
    $subject=$_POST['subject'];
    $mailFrom = $_POST['email'];
    $state=$_POST['state'];
    $message=$state. "\n". $_POST['message'];
    $mailTo="jainkaran225@gmail.com";
    $headers = "From: ".$mailFrom;
    if(mail($mailTo, $subject, $text, $headers)){
      echo "<script>alert(\"Message Sent!!\")</script>";
    }
    header("Location:https://sahayata-swe.herokuapp.com/index.html#contact");
  }
?>
