function changePiggy() {
	var balance = document.getElementById("currentBalance").innerHTML;
	var budget = document.getElementById("currentBudget").innerHTML;

	var divided = balance / budget;
	
	if (divided >= 0.66) {
		document.getElementById("piggy").src = "green.png";
	} else if (divided <= 0.33) {
		document.getElementById("piggy").src = "red.png";
	} else if (divided > 0.33 && divided < 0.66){
		document.getElementById("piggy").src = "orange.png";
	}
	
}

function periodicycle() {
	setInterval(readURL, document.getElementById("cycleCount").innerHTML);
}

function updateBalance(e) {
	e.preventDefault();
	var input = document.getElementById("newBalance");
	var updated = input.elements[0].value;

	if (updated != "") { 
		if (updated > 0) {
		document.getElementById("currentBalance").innerHTML = parseFloat(updated);
		document.getElementById("balance").innerHTML = "Current Balance: $" + document.getElementById("currentBalance").innerHTML; 
		} else {
				alert("ERROR: Pleaser enter positive numbers only.");
			}
	} else {
		alert("ERROR: Field blank.");
	}
}

function updateBudget(e) {
	e.preventDefault();
	var input = document.getElementById("newBudget");
	var updated = input.elements[0].value;

	if (updated != "") { 
			if (updated > 0) {
			document.getElementById("currentBudget").innerHTML = parseFloat(updated);
			document.getElementById("budget").innerHTML = "Current Budget: $" + document.getElementById("currentBudget").innerHTML; 	
			} else {
				alert("ERROR: Pleaser enter positive numbers only.");
			}
	} else {
		alert("ERROR: Field blank.");
	}
}

function updateURL(e) {
	e.preventDefault();
	var input = document.getElementById("newURL");
	var updated = input.elements[0].value;

	if (updated != "") { 
		document.getElementById("url").innerHTML = updated;
		document.getElementById("URL").innerHTML = "Current URL to read from: " + document.getElementById("url").innerHTML; 		
	} else {
		alert("ERROR: Field blank.");
	}
}

function updateCycle(e) {
	e.preventDefault();
	var input = document.getElementById("newCycle");
	var updated = input.elements[0].value;

	if (updated != "") { 
			if (updated > 0) {
			document.getElementById("cycleCount").innerHTML = 1000 * updated;
			document.getElementById("cycle").innerHTML = "Current Cycle Count (ms): " + document.getElementById("cycleCount").innerHTML; 
			} else {	
				alert("ERROR: Pleaser enter positive numbers only.");
			}
	} else {
		alert("ERROR: Field blank.");
	}
}


function readURL(){
 //e.preventDefault();
 var values;

 // UNCOMMENT ONE OF THE FOLLOWING
 var amount = 0.00;
 //var amount = parseFloat(document.getElementById("currentBalance").innerHTML);
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
 document.getElementById("balance").innerHTML = "Current Balance: $" + document.getElementById("currentBalance").innerHTML 
 changePiggy();
 } // end of success


 }); // end of .ajax


 
} // end of readURL()

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

function start (e) {
	e.preventDefault();

	if (checkFields()) {
		changePiggy();
		periodicycle();
	} 
}
 
// When the page loads start checking the data source
/*
 $( document ).ready(function() {
 	changePiggy();
 	periodicycle();
 });
*/

  