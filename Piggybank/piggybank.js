/*
 * Piggybank Ambient Interface JavaScript code
 * ICS 414 Team Project
 *
 * Thomas Pali
 * Marc Partoriza
 * Jason Ramano
 */

 function Piggybank (name, balance, type, color) {
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
    };

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

    function changeBalance(newBalance) {
    	this.balance = newBalance;
    }

    funciton changeType(newType) {
    	this.type = newType;
    }

    function changeColor(newColor) {
    	this.color = newColor;
    }


}
