<?php
header('Content-Type: application/json');
$json = file_get_contents('../Language/footerText.json');
echo $json;
?>
