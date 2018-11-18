//assign value to all cards
const char = ['one', 'one', 'two', 'two', 'three', 'three', 'four', 'four', 'five', 'five'];
document.getElementById('restart').onclick = restart
// pulling from the DOM and targeting all HTML elements w/ the class name card
const cards = document.getElementsByClassName('card')
let gameState = {}
let prevCard = null;
let timeoutID = null;
let image = {
  'one': 'images/one.jpg',
  'two': 'images/two.jpg',
  'three': 'images/three.jpg',
  'four' : 'images/four.jpg',
  'five': 'images/five.jpg',
  'none': "images/front.jpg"
}
console.log(cards);


//
Array.from(cards).forEach(function(el, i){
  el.addEventListener("click",function(e){
    // clicks card for flip-over
    if(timeoutId !== null){ // is timeoutId is NOT null then we stop the click
      e.stopPropagation()
    }else{
      let key = gameState[i].value
      this.style.backgroundImage = `url(${image[key]})`
      // is this the first card clicked? if so assign that index value (store it in a variable)
      if(prevCard === null){
        prevCard = i // if preious card is null (which it is) then we assign it to the index it was clicked on
      }else{
        // if prevCard is not null, we take prevCard value and current index of section clicked on to compare if they are the same
        timeoutId = setTimeout( match, 1500, prevCard, i)
        console.log(`Does the two card match? We set the timeout delay ${timeoutId}`)
      }
    }
    // is this the second card clicked? run our match function to check if the have the same value
  })
}) // creates a copy of an array-like data structure

function startGame(){
  let newArray;
  newArray = shuffle(char)
  Array.from(cards).forEach(function(el,index){
    gameState[index] = {
      "value":newArray[index],
      "matched":false
    }
  });
  console.log(gameState)
}
startGame()
 //shuffle array function
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// do the cards matcheach other?
function match(prev, i){
  // (gameState['0'].value = 'five') === (gameState['8'].value = 'five'), if true then we set flipped: true, else flipped: false
  // if values match
  if(gameState[prev].value === gameState[i].value){
    gameState[prev].match = true
    gameState[i].match = true
  }else{
    //if they dont match
    cards[prev].style.backgroundImage = `url(${image.none})`;
    cards[i].style.backgroundImage = `url(${image.none})`;
  }
  //these are going to be ran everytime match is ran
  prevCard = null
  timeoutId = null
  console.log(`After 5 seconds we set timeoutId back to ${timeoutId}`)
}
// restart button
function restart(){
  Array.from(cards).forEach(function(el){
    el.style.backgroundImage = `url(${image.none})`;
  })
  // set the gameState object to an empty object
  gameState = {}
  // set the prevCard variable back to null
  prevCard = null
  timeoutId = null
  // Invoke (call on the function) the startGame function
  startGame()
}
