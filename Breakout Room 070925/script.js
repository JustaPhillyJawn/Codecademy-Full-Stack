let minusButton = document.getElementById("minusBtn");
let plusButton = document.getElementById("plusBtn");
let counterDisplay = document.getElementById("counter");

let counter = 0;

function incrementCounter() {
    counter++;
    counterDisplay.innerText = counter;
}

function decrementCounter() {
    counter--;
    counterDisplay.innerText = counter;
}

minusButton.addEventListener("click", function() {
    decrementCounter();
});

plusButton.addEventListener("click", function() {
    incrementCounter();
});