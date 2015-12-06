<?php
//File name
$myFile = "data.txt";

//Open File
$fh = fopen($myFile, 'w') or die("can't open file");

//Get data that was posted via javascript
$stringData = $_POST["name"];

//Write it to text
fwrite($fh, $stringData);
fclose($fh);
?>  