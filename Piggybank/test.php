<?php
$myFile = "data.txt";

$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = $_POST["name"];
fwrite($fh, $stringData);
fclose($fh);
dsafsdafdasfsdaf
?>