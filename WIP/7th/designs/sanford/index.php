<?php
    $dir = 'images/';
    $files = array_diff(scandir($dir), array('.', '..'));
    $images = [];

    foreach($files as $file) {
        if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
            $images[] = $dir . $file;
        }
    }

    echo json_encode($images);
?>
