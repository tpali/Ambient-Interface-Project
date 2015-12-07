<?php
//File name
$myFile = "data.txt";

//Open File
//$fh = fopen($myFile, 'w') or die("can't open file");

//Get data that was posted via javascript
$stringData = $_POST["amount"];
$current = file_get_contents($myFile);
$current .= $stringData;
//Write it to text
//fwrite($fh, $stringData);
//fclose($fh);
file_put_contents($myFile, $current);
?>  