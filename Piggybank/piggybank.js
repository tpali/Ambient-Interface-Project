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

//Running and testing basic
var pb = new PiggyBank("Test", 100, "Budget", "Green");
document.getElementById("currentBalance").innerHTML = pb.balance + " left";

//jQuery
$("#settingsDialog").dialog({
   autoOpen: false,
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


