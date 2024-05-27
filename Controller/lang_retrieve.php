<?php
// Retrieve the language parameter from URL if available
$lang = $_GET['lang'] ?? null;

// Check if the language parameter is in local storage
if (!$lang && isset($_COOKIE['lang'])) {
    $lang = $_COOKIE['lang'];
}

// Check if the language parameter is in the HTML header
if (!$lang && isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
}

// Define the supported languages
$supportedLanguages = ['fr', 'en', 'cnko'];

// Check if the extracted language is supported, otherwise default to 'fr'
$lang = in_array($lang, $supportedLanguages) ? $lang : 'fr';


