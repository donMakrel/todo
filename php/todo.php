<?php
    if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        $xml = file_get_contents("xml/todo.xml");
        header('Content-Type: text/xml');
        echo $xml;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $data = file_get_contents("php://input");
        $file = fopen("xml/todo.xml", "w");

        fwrite($file, $data);
        fclose($file);
    }
?>