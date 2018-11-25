/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Ethan Kenneth Winter
    Date:   17 April, 2018

    Filename: script.1.js
*/

"use strict";

// pg686
  let zIndexCounter;
  let pos = [];
  let origin;

// perform setup tasks when page first loads
function setUpPage() {
   document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
   document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);

//pg 686
      let movableItems = document.querySelectorAll("#room div");
      zIndexCounter = movableItems.length + 1;

      for( let i = 0; i < movableItems.length; i++) {


// movableItems[i].addEventListener("mousedown", startDrag, false)
 		addEvent(movableItems[i], "mousedown", startDrag, false);
    addEvent(movableItems[i], "touchstart", startDrag, false);
      }// End for loop
}// End function setUpPage

// configure page to display Setup content
function loadSetup() {
   document.querySelector("nav ul li:first-of-type").className = "current";
   document.querySelector("nav ul li:last-of-type").className = "";
   document.getElementById("setup").style.display = "block";
   document.getElementById("location").style.display = "none";
   location.search = "";
}

// configure page to display Directions content
function loadDirections(string) {
   document.querySelector("nav ul li:first-of-type").className = "";
   document.querySelector("nav ul li:last-of-type").className = "current";
   document.getElementById("setup").style.display = "none";
   document.getElementById("location").style.display = "block";
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);



// pg 686
function startDrag(evt) {
  this.style.zIndex = zIndexCounter;
  zIndexCounter++;

// pg691
 	if(evt.type !== "mousedown") {
//pg 695
 	  evt.preventDefault();

    this.addEventListener("touchmove", moveDrag, false);
// 		//this.addEventListener("mspointermove", moveDrag, false);
// 		//this.addEventListener("pointermove", moveDrag, false);

 		this.addEventListener("touchend", removeTouchListener, false);
// 		//this.addEventListener("mspointerup", removeTouchListener, false);
// 		//this.addEventListener("pointerup", removeTouchListener, false);

 	} else {
		addEvent(this, "mousemove", moveDrag, false);
 		addEvent(this, "mouseup", removeDragListener, false);
 	}// End else

 	  pos = [this.offsetLeft, this.offsetTop];
 	  origin = getCoords(evt);
}// End function startDrag


// p687
function moveDrag(evt) {

  let currentPos = getCoords(evt);
 	let deltaX = currentPos[0] - origin[0];
 	let deltaY = currentPos[1] - origin[1];

 	this.style.left = (pos[0] + deltaX) + "px";
 	this.style.top = (pos[1] + deltaY) + "px";

// Added in to see how many times x/y coords change
  document.getElementById("xcoord").innerHTML = this.style.left;
  document.getElementById("ycoord").innerHTML = this.style.top;

}// End function moveDrag

// pg688
function getCoords(evt) {
  let coords = [];
//pg 693
  if(evt.targetTouches && evt.targetTouches.length) {
 		let thisTouch = evt.targetTouches[0];
 		coords[0] = thisTouch.clientX;
 		coords[1] = thisTouch.clientY;
 	} else {
    coords[0] = evt.clientX;
 		coords[1] = evt.clientY;
  }// End else
  return coords;
}// End function getCoords

// pg688
function removeDragListener() {
 	removeEvent(this, "mousemove", moveDrag, false);
 	// removeEvent(this, "mouseup", moveUp, false);
  removeEvent(this, "mouseup", removeDragListener, false);
}// End function removeDragListener


// pg 672
function removeTouchListener() {
  removeEvent(this, "touchmove", moveDrag, false);
 	removeEvent(this, "touchend", removeTouchListener, false);

}// End function removeTouchListener
