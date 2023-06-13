class Obstacle {
    constructor() {
        this.x = myGameAreaObstacle.canvas.width - 20;
        this.y = Math.floor(Math.random() * (myGameAreaObstacle.canvas.height - 20))
        this.color = "black";
    }
}

function startGame() {
    myGameAreaObstacle.start();
}

function updateGameArea() {
    myGameAreaObstacle.clear();
    myGameAreaObstacle.moveObstacles();
    myGameAreaObstacle.drawObstacles();
}

const myGameAreaObstacle = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.id = "myGameAreaObstacle";
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.obstacles = [];
        this.createObstacleInterval = setInterval(this.createObstacle, 500);
        this.updateGameInterval = setInterval(updateGameArea, 200);


    },
    clear: function () {
        this.context = document.getElementById("myGameAreaObstacle").getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function (coordinateX, coordinateY, color) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, 20, 20);
    },

    createObstacle: function () {
        if (myGameAreaObstacle.obstacles.length < 5) {
            const obstacle = new Obstacle();
            myGameAreaObstacle.obstacles.push(obstacle);
        }
    },

    moveObstacles: function () {
        myGameAreaObstacle.obstacles.forEach(obstacle => {
            obstacle.x -= 20;
            if (obstacle.x < 0) {
                myGameAreaObstacle.obstacles.shift();
            }
        });
    },

    drawObstacles: function () {
        myGameAreaObstacle.obstacles.forEach(obstacle => {
            myGameAreaObstacle.draw(obstacle.x, obstacle.y, obstacle.color)
        })
    },
}

startGame();