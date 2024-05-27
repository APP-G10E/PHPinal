<?php
function sendEmail($to, $subject, $message, $from): bool
{
    $headers = "From: $from";

    if (mail($to, $subject, $message, $headers)) {
        return true; // Email sent successfully
    } else {
        return false; // Email sending failed
    }
}


