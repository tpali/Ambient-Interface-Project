<?php
//File name
$myFile = "data.txt";
//Open File
$fh = fopen($myFile, 'w') or die("can't open file");
//Get data that was posted via javascript
$stringData = $_POST["reset"];
//Write it to text
fwrite($fh, $stringData);
fclose($fh);
?> 