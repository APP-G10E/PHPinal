<head>
    <meta charset="UTF-8">
    <title><?php echo $page_title ?? "EventsIT"; ?></title>
    <link rel="apple-touch-icon" sizes="180x180" href="../Assets/Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../Assets/Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../Assets/Favicon/favicon-16x16.png">
    <link rel="manifest" href="../Assets/Favicon/site.webmanifest">

    <link rel="stylesheet" href="../CSS/global.css">
    <?php if(isset($css_file)): ?>
        <link rel="stylesheet" href="../CSS/<?php echo $css_file; ?>">
    <?php endif; ?>
    <link rel="stylesheet" href="../CSS/footer.css">
</head>
<?php
global $lang
?>
<script>
    function goToHomePage() {
        // Redirect to the home page
        window.location.href = "homepage.php?lang=<?php echo $lang; ?>";
    }
</script>