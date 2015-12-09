/*
 * Piggybank Ambient Interface JavaScript code
 * ICS 414 Team Project
 *
 * Thomas Pali
 * Marc Partoriza
 * Jason Ramano
 *
 */

// Function to adjust the current piggybank image being displayed according
// to the balance divided by the budget.
function changePiggy() {
	var balance = document.getElementById("currentBalance").innerHTML;
	var budget = document.getElementById("currentBudget").innerHTML;

	var divided = balance / budget;
	
	if (divided >= 1.00) {
		document.getElementById("piggy").src = "full.jpg";
		document.getElementById("balance").style.color='green';
	} else if (divided >= 0.90) {
		document.getElementById("piggy").src = "90pb.jpg";
		document.getElementById("balance").style.color='green';
	} else if (divided >= 0.80 && divided < 0.90) {
		document.getElementById("piggy").src = "80pb.jpg";
		document.getElementById("balance").style.color='green';
	} else if (divided >= 0.70 && divided < 0.80){
		document.getElementById("piggy").src = "70pb.jpg";
		document.getElementById("balance").style.color='orange';
	} else if (divided >= 0.60 && divided < 0.70){
		document.getElementById("piggy").src = "60pb.jpg";
		document.getElementById("balance").style.color='orange';
	} else if (divided >= 0.50 && divided < 0.60){
		document.getElementById("piggy").src = "50pb.jpg";
		document.getElementById("balance").style.color='orange';
	} else if (divided >= 0.40 && divided < 0.50){
		document.getElementById("piggy").src = "40pb.jpg";
		document.getElementById("balance").style.color='orange';
	} else if (divided >= 0.30 && divided < 0.40){
		document.getElementById("piggy").src = "30pb.jpg";
		document.getElementById("balance").style.color='red';
	} else if (divided >= 0.20 && divided < 0.30){
		document.getElementById("piggy").src = "20pb.jpg";
		document.getElementById("balance").style.color='red';
	} else if (divided >= 0.10 && divided < 0.20){
		document.getElementById("piggy").src = "10pb.jpg";
		document.getElementById("balance").style.color='red';
	} else if (divided <= 0){
		document.getElementById("piggy").src = "empty.jpg";
		document.getElementById("balance").style.color='red';
	} 
	
}

// Function to periodically call the readURL function
function periodicycle() {
	setInterval(readURL, document.getElementById("cycleCount").innerHTML);
}

// Function to update the balance through the HTML form
// Also does error checking on the input
// Resets the data file then writes the new balance to the data file
// e is an event since this function is passed from html through an event
function updateBalance(e) {
	e.preventDefault();
	var input = document.getElementById("newBalance");
	var updated = input.elements[0].value;

	if (updated != "") { 
		if (confirm("Hit OK to overwrite current file, hit CANCEL to use stored values.")) { 
			if (updated >= 0) {
			document.getElementById("currentBalance").innerHTML = parseFloat(updated);
			document.getElementById("balance").innerHTML = "Current Balance: $" + document.getElementById("currentBalance").innerHTML;
			reset(); 
			writeToFile(updated);
			document.getElementById("start").style.visibility='visible';
			} else {
					alert("ERROR: Please enter positive numbers only.");
				}
		} else {
			document.getElementById("noverwrite").innerHTML = "TRUE";
			readURL();
		}
	} else {
		alert("ERROR: Field blank.");
	}
}

// Function to update teh budget through the HTML form
// Also does error checking on the input
// e is an event since this function is passed from html through an event
function updateBudget(e) {
	e.preventDefault();
	var input = document.getElementById("newBudget");
	var updated = input.elements[0].value;

	
	

	if (updated != "") { 
			if (updated > 0) {
			document.getElementById("currentBudget").innerHTML = parseFloat(updated);
			document.getElementById("budget").innerHTML = "Current Budget: $" + document.getElementById("currentBudget").innerHTML; 
			document.getElementById("newBalance").style.visibility='visible';	
			} else {
				alert("ERROR: Pleaser enter positive numbers only.");
			}
	} else {
		alert("ERROR: Field blank.");
	}

	

}

// Function to update the URL through the HTML form
// Validates url or sends an error message
// e is an event since this function is passed from html through an event
function updateURL(e) {
	e.preventDefault();
	var input = document.getElementById("newURL");
	var updated = input.elements[0].value;

	if (updated != "") { 
		$.ajax({
	    url: updated,
	    type:'GET',
	    error: function()
	    {
	        alert("ERROR: Invalid url");
	    },
	    success: function()
	    {
		    document.getElementById("url").innerHTML = updated;
			document.getElementById("URL").innerHTML = "Current URL to read from: " + document.getElementById("url").innerHTML; 	
			var afterSlash = updated.substr(updated.lastIndexOf("/") + 1, (updated.length - updated.lastIndexOf("/")));	
			document.getElementById("file").innerHTML = afterSlash;
			document.getElementById("newCycle").style.visibility='visible';
			readURL();
	    }
		});

	} else {
		alert("ERROR: Field blank.");
	}
}

// Function to update the cycle count through the HTML form
// Also does error checking on the input
// e is an event since this function is passed from html through an event
function updateCycle(e) {
	e.preventDefault();
	var input = document.getElementById("newCycle");
	var updated = input.elements[0].value;

	if (updated != "") { 
			if (updated > 0) {
			document.getElementById("cycleCount").innerHTML = 1000 * updated;
			document.getElementById("cycle").innerHTML = "Current Cycle Count (ms): " + document.getElementById("cycleCount").innerHTML; 
			document.getElementById("newBudget").style.visibility='visible';
			} else {	
				alert("ERROR: Pleaser enter positive numbers only.");
			}
	} else {
		alert("ERROR: Field blank.");
	}
}

// Function that uses AJAX to read through the data file from the URL variable set on the html page
function readURL(){

 var values;
 var amount = 0.00;
 var URL = document.getElementById("url").innerHTML;

 $.ajax({
 type:    "GET",
 url:     URL,
 success: function(text) {
 // `text` is the file text
 values = text.split("\n");

 for (i = 0; i < values.length; i++) {
 amount += parseFloat(values[i]);
 }

 amount = Math.round(amount * 100) / 100;


 document.getElementById("currentBalance").innerHTML = amount;
 if (isNaN(document.getElementById("currentBalance").innerHTML)) {
 	alert("ERROR: Invalid URL to read from");
 	window.location = "http://www.remoudou2.co.nf/index.html";
 } else {
		 document.getElementById("balance").innerHTML = "Current Balance: $" + document.getElementById("currentBalance").innerHTML; 
		 if (document.getElementById("noverwrite").innerHTML == "TRUE") {
		 	// Do nothing, no color change yet.
		 	document.getElementById("start").style.visibility='visible';
		 	document.getElementById("noverwrite").innerHTML = "";
		 } else {
 			changePiggy();
 }

}
 }, // end of success
 error: function() {
 	alert("ERROR: Invalid URL entered");
 	window.location = "http://www.remoudou2.co.nf/index.html";
 }

 }); // end of .ajax


 
} // end of readURL()

// Function to check that the user inputted all of the fields
// Alerts if the user has not entered any field
function checkFields() { 
	if(document.getElementById("currentBalance").innerHTML == ""
		|| document.getElementById("currentBudget").innerHTML == ""
		|| document.getElementById("url").innerHTML == ""
		|| document.getElementById("cycleCount").innerHTML == "") {
		alert("ERROR: You are missing one or more field(s)!")
		return false;
	} else {
		return true;
	}
}

// Function to start interface
// Does error checking to make sure that the user has entered the required information.
// Initially colors the piggybank to the appropriate color.
// Starts periodically calling the function to read from  the data file 'data.txt'
// e is an event since this function is passed from html through an event
function start (e) {
	e.preventDefault();

	if (checkFields()) {
		changePiggy();
		fadeFields();
		periodicycle();
	} 
}

// Function to write to the data file
// Calls writeToFile.php to append to the data file
// amount is the amount to be appended to the data file
function writeToFile(amount) {
	var xmlhttp;

	//IE7+, Firefox, Chrome, Opera, Safari
	if(window.XMLHttpRequest){
	    xmlhttp = new XMLHttpRequest();
	}

	//IE6, IE5
	else{
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function(){
		    if (xmlhttp.readyState==4 && xmlhttp.status==200){
		        console.log("WROTE TO DATA FILE");
		    }
		} // end of anonymous function

	xmlhttp.open("POST", "writeToFile.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var string = "\n" + amount.toString();
	xmlhttp.send("amount=" + string + "&fname=" + document.getElementById("file").innerHTML);

} // end of writeToFile(amount)

// Function to reset data file
// Calls resetFile.php to reset the data file
// e is an event since this function is passed from html through an event
function reset(e) {
	if (e != undefined) {
	e.preventDefault();
	}
	var xmlhttp;
	//IE7+, Firefox, Chrome, Opera, Safari
	if(window.XMLHttpRequest){
	    xmlhttp = new XMLHttpRequest();
	}
	//IE6, IE5
	else{
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		    if (xmlhttp.readyState==4 && xmlhttp.status==200){
		        console.log("RESET DATA FILE");
		    }
		} // end of anonymous function
	xmlhttp.open("POST", "resetFile.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("reset=0" + "&fname=" + document.getElementById("file").innerHTML);

}

// Function to create a new file from the user's input
// e is an event because this function is passed through an HTML event
function createFile(e) {
	// Stop Javascript from adding hash value to the url
	e.preventDefault();
	// Get the inputted filename
	var input = document.getElementById("newFile");
	var fileName= input.elements[0].value;
	var xmlhttp;
	// Check to see that field is not blank
	if (fileName != "") {
	//IE7+, Firefox, Chrome, Opera, Safari
	if(window.XMLHttpRequest){
	    xmlhttp = new XMLHttpRequest();
	}
	//IE6, IE5
	else{
	    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		    if (xmlhttp.readyState==4 && xmlhttp.status==200){
		        console.log("CREATED DATA FILE");
		    }
		} // end of anonymous function
	xmlhttp.open("POST", "createFile.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("fileName=" + fileName);
	alert("FILE CREATED! \nURL: http://www.remoudou2.co.nf/" + fileName +".txt");
	} else {
		alert("ERROR: Field blank");
	}
}

// This is the event handler for the actual settings dialog
// Has a confirm and close button
// Does error checking to see if input is a number
// Decides whether to make a deposit or withdrawel
$("#settingsDialog").dialog({
   autoOpen: false,
   modal: true,
   buttons: {
      Confirm: function() {
         //Updating Transactionsss
         //deposit boolean
         var deposit;
         //float transaction amount
         var transactionAmount;

         //Check if it's a deposit or withdraw
         if(document.getElementById("depositTransaction").checked){
            deposit = true;
         }
         else if(document.getElementById("withdrawTransaction").checked){
            deposit = false;
         }

         var oldBalance = document.getElementById("currentBalance").innerHTML;
         transactionAmount = parseFloat(($("#newTransaction").val()));

         //Give an error alert if the user inputted invalid transaction amount (ex: string)
         if(isNaN(transactionAmount)){
            document.getElementById("currentBalance").innerHTML = oldBalance;
            alert("Invalid Transaction Amount");
         }

         //Apply Transcation to balance
         if (deposit && !(isNaN(transactionAmount))) {
            var amount = transactionAmount;
            writeToFile(amount);
         }
         else if (!(deposit) && !(isNaN(transactionAmount))) { 
         	var amount = transactionAmount * -1.00;
            writeToFile(amount);
            }

         $(this).dialog("close");
      },
      Cancel: function () {
         $(this).dialog("close");
      }
   }
});

// This is an event handler to open up the settings dialog when the settings button is pressed
$("#settings").click(function () {
   $("#settingsDialog").dialog("open");
});

// This function is used to make HTML elements fade away
// elemeent is some html element
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

// Function to make input fields fade away once interface is started
function fadeFields() {
	fade(document.getElementById("newBalance"));
	fade(document.getElementById("newBudget"));
	fade(document.getElementById("newCycle"));
	fade(document.getElementById("newURL"));
	fade(document.getElementById("start"));
	fade(document.getElementById("newFile"));

	document.getElementById("settings").style.visibility='visible';
	document.getElementById("reset").style.visibility='visible';
}
   