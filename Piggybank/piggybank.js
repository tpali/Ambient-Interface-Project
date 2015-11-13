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

    //Changed from changeBalance to increaseBalance/decreaseBalance. Thoughts?
    /*function changeBalance(newBalance) {
    	this.balance = newBalance;
    }*/

    function increaseBalance(amount){
       this.balance += amount;
    }

    function decreaseBalance(amount){
       this.balance -= amount;
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
    document.getElementById("data").innerHTML = "New balance after reading from file: " + value;
}


/*
//Check in 4 function
function readURL(URL, cycleTime, range){
   $.get("data.txt"), function(data){
      alert(data);
   }

}


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
         document.getElementById("currentBalance").innerHTML = pb.balance + " left";
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


