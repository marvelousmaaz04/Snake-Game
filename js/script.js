let inputDir = {x: 0, y: 0}
const foodSound = new Audio("music/food.mp3")
const gameOverSound = new Audio("music/gameover.mp3")
const moveSound = new Audio("music/move.mp3")
const musicSound = new Audio("music/music.mp3");

let speed = 9;
let lastPaintTime = 0;
let snakeArray = [
    {x:13, y:15}
]
let score =0;

let food = {x: 6, y:7}; // food is not an array but snake is because it will increase overtime which means it consists of multiple elements

function main(ctime){
    window.requestAnimationFrame(main);
    
    if(((ctime - lastPaintTime)/1000) < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}

function isCollide(snake) {
    // If you bump into yourself
    for(let i=1; i<snakeArray.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    // Part 1: Updating snake var
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press OK to play again.");
        snakeArray = [{x:13, y:15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // If you have eaten, increment the snake and regenerate the food
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a) * Math.random())};
    }

    // Moving the snake

    for (let i = snakeArray.length - 2; i >= 0; i--) {
        // const element = snakeArray[i];
        snakeArray[i+1] = {...snakeArray[i]};
        
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Part 2: Display snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y; // origin is at top left
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y; // origin is at top left
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}

// for game loop

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    inputDir = {x:0, y:1}; // start the game
    musicSound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play();
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.play();
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            moveSound.play();
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            moveSound.play();
            break;
        default:
            break; 
    }
})