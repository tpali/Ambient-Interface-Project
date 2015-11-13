/*
 * Piggybank Ambient Interface JavaScript code
 * ICS 414 Team Project
 *
 * Thomas Pali
 * Marc Partoriza
 * Jason Ramano
 *
 */

//Piggybank Class
 function PiggyBank (name, balance, type, color) {
    this.name = name;
    this.balance = balance;
    this.limit = balance;
    this.type = type;
    this.color = color;

    ///// Accessor Functions /////
    function getName() {
    	return this.name;
    }

    function getBalance() {
        return this.balance;
    }

    function getType() {
    	return this.type;
    }
    function getColor() {
    	return this.color;
    }

    ///// Mutation Functions /////
    function changeName(newName) {
    	this.name = newName;
    }

    function increaseBalance(amount){
       this.balance += amount;
    }

    function decreaseBalance(amount){
       this.balance -= amount;
    }

    function setLimit(newAmount) {
        this.limit = newAmount;
    }

    function changeType(newType) {
    	this.type = newType;
    }

    function changeColor(newColor) {
    	this.color = newColor;
    }

}


function loadFile() {
    var value = 100;
    var oFrame = document.getElementById("frmFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    var arrLines = strRawContents.split("\n");

    for (var i = 0; i < arrLines.length; i++) {
        var curLine = arrLines[i];
        //document.getElementById("data").innerHTML += curLine + "</br>";
        value += parseFloat(curLine);
    }
   //document.getElementById("data").innerHTML = "New balance after reading from file: $" + value;
}



//Check in 4 function
function readURL(){
    var input = document.getElementById("input");
    var URL = input.elements[0].value;
    var cycleCount = input.elements[1].value;
    var range = input.elements[2].value;
    var values;
    var initialAmount = 100.00;
    var amount = initialAmount;


    $.ajax({
    type:    "GET",
    url:     URL,
    success: function(text) {
        // `text` is the file text
        values = text.split("\n");

        for (i = 0; i < values.length; i++) {
        amount += parseFloat(values[i]);
        }

    alert("Initial Amount: " + initialAmount + '\n'
         + "URL: " + URL + '\n'
         + "Cycle Time: " +  cycleCount + '\n'
         + "Range: " + range + '\n'
         + "Updated Amount: " + amount + '\n'
         + "Updated / Initial * Range: " + ((amount/initialAmount)*range) + '\n');
    }
    });

    
   
}

/*
$.ajax({
   url: 'proxy.php',
   type: 'POST',
   data: {
      address: 'http://www.remoudou.co.nf/data.txt'
   },
   success: function(response) {
      alert(response);
   }
});
*/

/*
//Running and testing basic
var pb = new PiggyBank("Test", 100, "Budget", "Green");
document.getElementById("currentBalance").innerHTML = pb.balance + " left";

//jQuery
$("#settingsDialog").dialog({
   autoOpen: false,
   modal: true,
   buttons: {
      Confirm: function() {
         pb.balance = ($("#newBudget").val());
         document.getElementById("currentBalance").innerHTML = "$" + pb.balance + " left";
         $(this).dialog("close");
      },
      Cancel: function () {
         $(this).dialog("close");
      }
   }
});

$("#settings").click(function () {
   $("#settingsDialog").dialog("open");
});
*/
