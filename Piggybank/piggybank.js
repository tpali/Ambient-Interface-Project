

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
//@name - name of the user using the application
//@budget - the designated budget the user wants to use
//@balance - the current balance user has
//@type    - the type of budget the user wants (daily, weekly, monthly)
//@color   - the color the piggy bank is going to depict, depends balance/budget.
 function PiggyBank (name, budget, balance, type, color) {
    this.name = name;
    this.balance = balance;
    this.budget = budget;
    this.limit = balance;
    this.type = type;
    this.color = color;

    ///// Accessor Functions /////
    function getName() {
    	return this.name;
    }

    function getBudget(){
       return this.budget;
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

    function changeBudget(amount){
       this.budget = amount;
    }

    function increaseBalance(amount){
       this.balance += amount;
    }

    function decreaseBalance(amount){
       this.balance -= amount;
    }

    function changeBalance(amount){
       this.balance = amount;
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

    //Need to implement
    function updatePiggybank(){
       //updates the piggy bank when the user changes something in settings
    }


}


//Piggybank and interface initialization
var pb = new PiggyBank("Test", 100, 100, "Weekly", "Green");
document.getElementById("currentBudget").innerHTML = "Budget: $" + pb.budget;
document.getElementById("currentBalance").innerHTML = "Current Balance: $" + pb.balance + " left";
document.getElementById("currentType").innerHTML = "Budget Schedule Type: " + pb.type;

/////////////////////////////////////////////////////////////////////////
/////////////////////////Test writing to file////////////////////////////
/////////////////////////////////////////////////////////////////////////
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
        alert("done");
    }
}

xmlhttp.open("POST", "writeToFile.php", true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("name=Marc");








//jQuery
$("#settingsDialog").dialog({
   autoOpen: false,
   modal: true,
   buttons: {
      Confirm: function() {

         //Updating Transactions

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

         var oldBalance = pb.balance;
         transactionAmount = parseFloat(($("#newTransaction").val()));

         //Give an error alert if the user inputted invalid transaction amount (ex: string)
         if(isNaN(pb.balance)){
            pb.balance = oldBalance;
            alert("Invalid Transaction Amount");
         }

         //Apply Transcation to balance
         if(deposit){
            //pb.balance += transactionAmount;
            //deposit transaction function here
         }
         else { //pb.balance -= transactionAmount;
            //withdraw transaction function here
            }

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

/*
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
 }*/
