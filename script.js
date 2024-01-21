// A table of strings to display
var table = ["Hello, world!", "I make funny game", "Splatoon 3 kinda a good game ngl", "Snakes can predict earthquakes", "We spend a year on the toilet in our lifetime.", "Adam T. sucks", "To the window, to the wall.", "The teacher spinner used to be called BoilingBrook spinner, and did not have upgrade."];

// A function to get a random string from the table
function getRandomString() {
  var index = Math.floor(Math.random() * table.length);
  return table[index];
}

// A function to update the bottom text element with a random string
function updateBottomText() {
  var element = document.getElementById("bottom-text");
  element.innerHTML = getRandomString();
}

// A function to set up a timer to update the bottom text every 30 seconds
function startTimer() {
  updateBottomText(); // Update the bottom text once at the start
  setInterval(updateBottomText, 5000); // Update the bottom text every 30 seconds
}
