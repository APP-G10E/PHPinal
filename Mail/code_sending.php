<?php
include 'mail_base.php'; // Include the mail base file

function sendVerificationEmail($email, $name, $lang, $verificationCode)
{
    // Load translations
    $translations = json_decode(file_get_contents('../Language/translations.json'), true);

    // Get subject from translations
    $subject = $translations[$lang]["verification_title"];

    // Get message from translations and replace placeholders
    $message = str_replace("{name}", $name, $translations[$lang]["verification_letter"]);
    $message = str_replace("{verification code}", $verificationCode, $message);

    // Set the $from email address
    $from = "jeonghan.bae.official@gmail.com";

    // Call sendEmail function to send the email
    return sendEmail($email, $subject, $message, $from);
}

// $res = sendVerificationEmail('mastropseudo@gmail.com', 'Bae', 'cnko', 999999);
// echo "$res";