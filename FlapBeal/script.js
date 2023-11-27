// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Load the images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// Create some variables
let gap = 85; // The gap between the pipes
let constant = pipeNorth.height + gap; // The constant distance between the north and south pipes
let bX = 50; // The x position of the bird
let bY = 150; // The y position of the bird
let gravity = 1.5; // The gravity that affects the bird
let score = 0; // The score of the game
let isGameOver = false; // The game over flag

// Create an array of pipes
let pipes = [];

// Push the first pair of pipes to the array
pipes[0] = {
    x: canvas.width,
    y: 0
};

// Create a function to draw the images
function draw() {
    // Draw the background image
    ctx.drawImage(bg, 0, 0);

    // Loop through the pipes array
    for (let i = 0; i < pipes.length; i++) {
        // Draw the north and south pipes
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);

        // Move the pipes to the left by 1 pixel
        pipes[i].x--;

        // If the pipe reaches the left edge of the canvas
        if (pipes[i].x == 125) {
            // Push a new pair of pipes to the array with a random y position
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // If the bird collides with a pipe or the ground
        if (bX + bird.width >= pipes[i].x && bX <= pipes[i].x + pipeNorth.width && (bY <= pipes[i].y + pipeNorth.height || bY + bird.height >= pipes[i].y + constant) || bY + bird.height >= canvas.height - fg.height) {
            // Set the game over flag to true
            isGameOver = true;
        }

        // If the bird passes through a pipe
        if (pipes[i].x == 5) {
            // Increase the score by 1
            score++;
        }
    }

    // Draw the foreground image
    ctx.drawImage(fg, 0, canvas.height - fg.height);

    // Draw the bird image
    ctx.drawImage(bird, bX, bY);

    // Draw the score text
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);

    // Apply the gravity to the bird
    bY += gravity;

    // If the game is not over
    if (!isGameOver) {
        // Request the next frame of the animation
        requestAnimationFrame(draw);
    } else {
        // Draw the game over text
        ctx.fillStyle = "#f00";
        ctx.font = "30px Verdana";
        ctx.fillText("Game Over", 50, canvas.height / 2);
    }
}

// Create a function to handle the key down event
function keyDownHandler(e) {
    // If the space key is pressed
    if (e.keyCode == 32) {
        // Move the bird up by 25 pixels
        bY -= 25;
    }
}

// Add an event listener for the key down event
document.addEventListener("keydown", keyDownHandler);

// Call the draw function to start the game
draw();
