<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://projets-tomcat.isep.fr:8080/appService?ACTION=GETLOG&TEAM=G10E");
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
$data = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}

curl_close($ch);

if (!$data) {
    echo "No data received.";
    exit;
}

$data_tab = str_split($data, 33);

$filtered_data = array();
foreach ($data_tab as $line) {
    list($t, $o, $r, $c, $n, $v, $a, $x, $year, $month, $day, $hour, $min, $sec) = sscanf($line, "%1s%4s%1s%1s%2s%4s%4s%2s%4s%2s%2s%2s%2s%2s");
    if ($o == 'G10E') {
        $filtered_data[] = array(
            't' => $t,
            'o' => $o,
            'r' => $r,
            'c' => $c,
            'n' => $n,
            'v' => $v,
            'a' => $a,
            'x' => $x,
            'year' => $year,
            'month' => $month,
            'day' => $day,
            'hour' => $hour,
            'min' => $min,
            'sec' => $sec
        );
    }
}

if (empty($filtered_data)) {
    echo "No data matches the conditions.";
    exit;
}

$last_20_frames = array_slice($filtered_data, -20);

header('Content-Type: application/json');
$json = json_encode($last_20_frames);
if ($json === false) {
    echo "Error encoding data as JSON: " . json_last_error_msg();
} else {
    echo $json;
}