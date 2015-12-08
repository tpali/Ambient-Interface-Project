<?php
//File name
// Get fielname passed in from Javascript
$myFile = $_POST["fname"];
// Get amount passed in from Javascript
$stringData = $_POST["amount"];
// Set current to the current contents of the file
$current = file_get_contents($myFile);
// Append the new amount to the end of file
$current .= $stringData;
//Write the updated contents to the file
file_put_contents($myFile, $current);
?>  