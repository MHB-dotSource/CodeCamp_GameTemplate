function startGame() {
    myGameAreaWASD.start();
    playerCharacterWASD.start();
}

function updateGameArea() {
    myGameAreaWASD.clear();
    playerCharacterWASD.update();
}

const myGameAreaWASD = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.id = "myGameAreaWASD";
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context = document.getElementById("myGameAreaWASD").getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function (coordinateX, coordinateY, color) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, 20, 20);
    }
}

const playerCharacterWASD = {
    color: "red",
    head: { x: 100, y: 100 },
    key: null,
    xSpeed: 0,
    ySpeed: 0,
    start: function () {
        window.addEventListener('keydown', function (e) {
            playerCharacterWASD.key = e.key;
        })
        myGameAreaWASD.draw(this.head.x, this.head.y, this.color);
    },
    update: function () {
        this.updateSpeed();
        this.updatePosition();
        myGameAreaWASD.draw(this.head.x, this.head.y, this.color);
    },
    updatePosition: function () {
        this.head.x += this.xSpeed;
        this.head.y += this.ySpeed;
        this.xSpeed = 0;
        this.ySpeed = 0;
    },
    updateSpeed: function () {
        if (this.key === "s") {
            this.ySpeed = 20;
        } else if (this.key === "w") {
            this.ySpeed = -20;
        }

        if (this.key === "a") {
            this.xSpeed = -20;
        } else if (this.key === "d") {
            this.xSpeed = 20;
        }

        this.key = "";
    },
}

startGame();