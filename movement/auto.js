function startGame() {
    myGameAreaAUTO.start();
    playerCharacterAUTO.start();
}

function updateGameArea() {
    myGameAreaAUTO.clear();
    playerCharacterAUTO.update();
}

const myGameAreaAUTO = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.id = "myGameAreaAUTO";
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context = document.getElementById("myGameAreaAUTO").getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function (coordinateX, coordinateY, color) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, 20, 20);
    }
}

const playerCharacterAUTO = {
    color: "green",
    head: { x: 100, y: 100 },
    key: null,
    xSpeed: 5,
    ySpeed: 0,
    start: function () {
        window.addEventListener('keydown', function (e) {
            playerCharacterAUTO.key = e.key;
        })
        myGameAreaAUTO.draw(this.head.x, this.head.y, this.color);
    },
    update: function () {
        this.updateSpeed();
        this.updatePosition();
        myGameAreaAUTO.draw(this.head.x, this.head.y, this.color);
    },
    updatePosition: function () {
        this.head.x += this.xSpeed;
        this.head.y += this.ySpeed;
    },
    updateSpeed: function () {
        if (this.key === "ArrowDown" && this.ySpeed >= 0) {
            this.xSpeed = 0;
            this.ySpeed = 5;
        } else if (this.key === "ArrowUp" && this.ySpeed <= 0) {
            this.xSpeed = 0;
            this.ySpeed = -5;
        } else if (this.key === "ArrowLeft" && this.xSpeed <= 0) {
            this.xSpeed = -5;
            this.ySpeed = 0;
        } else if (this.key === "ArrowRight" && this.xSpeed >= 0) {
            this.xSpeed = 5;
            this.ySpeed = 0;
        }
    },
}

startGame();