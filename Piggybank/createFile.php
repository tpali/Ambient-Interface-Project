<?php
// Get filename from field from Javascript and add extension
$myFile = $_POST["fileName"] . ".txt";
// Use fopen to create new file or open existing one
$fh = fopen($myFile, 'w') or die("can't open file");
// Set / Reset the contents of the file to 0
$stringData = "0";
// Write the new contents to the sfile
fwrite($fh, $stringData);
// Close the file
fclose($fh);
?> 