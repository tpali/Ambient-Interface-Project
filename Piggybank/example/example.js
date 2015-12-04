function changePiggy() {
	var balance = document.getElementById("currentBalance").innerHTML;
	var budget = document.getElementById("currentBudget").innerHTML;

	var divided = balance / budget;
	
	if (divided >= 0.66) {
		document.getElementById("piggy").src = "green.png";
	} else if (divided <= 0.33) {
		document.getElementById("piggy").src = "red.png";
	} else {
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
	document.getElementById("currentBalance").innerHTML = parseFloat(updated);
	document.getElementById("budget").innerHTML = "Current Balance: $" + document.getElementById("currentBalance").innerHTML 
}

function updateBudget(e) {
	e.preventDefault();
	var input = document.getElementById("newBudget");
	var updated = input.elements[0].value;
	document.getElementById("currentBudget").innerHTML = parseFloat(updated);
	document.getElementById("balance").innerHTML = "Current Budget: $" + document.getElementById("currentBalance").innerHTML 
}


// Function to update page values based on what the user inputs into Form
function getSubmit(e) {
	e.preventDefault();
	var input = document.getElementById("input");
	 // Add conditionals to check number of elements 
	 if (input.length == 1) {
	 document.getElementById("url").innerHTML = input.elements[0].value;
	} else if (input.length == 2) {
	 document.getElementById("url").innerHTML = input.elements[0].value;
	 document.getElementById("cycleCount").innerHTML = 1000 * input.elements[1].value;
	} else if (input.length == 3) {
	 document.getElementById("url").innerHTML = input.elements[0].value;
	 document.getElementById("cycleCount").innerHTML = 1000 * input.elements[1].value;
	 document.getElementById("range").innerHTML = input.elements[2].value;
	}
}


function readURL(){
 //e.preventDefault();
 var values;
 //0.00; for below
 var amount = parseFloat(document.getElementById("currentBalance").innerHTML);
 var URL = document.getElementById("url").innerHTML;
 //if (document.getElementById("url") != null) {
 
//console.log("Amount Before: " + amount);

 $.ajax({
 type:    "GET",
 url:     URL,
 success: function(text) {
 // `text` is the file text
 values = text.split("\n");

 for (i = 0; i < values.length; i++) {
 amount += parseFloat(values[i]);
 }

 //console.log("Amount after: " + amount); 
 amount = Math.round(amount * 100) / 100;

 document.getElementById("currentBalance").innerHTML = amount;
 document.getElementById("balance").innerHTML = "Current Balance: $" + document.getElementById("currentBalance").innerHTML 
 changePiggy();
 } // end of success


 }); // end of .ajax

//} 
 
} // end of readURL()
 
// When the page loads start checking the data source
 $( document ).ready(function() {
 	changePiggy();
 	periodicycle();
 });

  