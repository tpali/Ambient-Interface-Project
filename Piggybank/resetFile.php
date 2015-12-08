<?php
// Get filename from Javascsript
$myFile = $_POST["fname"];
//Open File
$fh = fopen($myFile, 'w') or die("can't open file");
//Get data that was posted via javascript
$stringData = $_POST["reset"];
// Overwrite the file with the 0.
fwrite($fh, $stringData);
// Close the file
fclose($fh);
?> 