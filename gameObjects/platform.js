function startGame() {
    myGameAreaPLATFORM.start();
    playerCharacterPLATFORM.start();
}

function updateGameArea() {
    myGameAreaPLATFORM.clear();
    playerCharacterPLATFORM.update();
}

const myGameAreaPLATFORM = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.id = "myGameAreaPLATFORM";
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context = document.getElementById("myGameAreaPLATFORM").getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function (coordinateX, coordinateY, color) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, 20, 20);
    }
}

const playerCharacterPLATFORM = {
    color: "blue",
    head: { x: 100, y: 280 },
    key: null,
    xSpeed: 0,
    ySpeed: 0,
    PLATFORMing: false,
    start: function () {
        window.addEventListener('keydown', function (e) {
            playerCharacterPLATFORM.key = e.key;
        })
        myGameAreaPLATFORM.draw(this.head.x, this.head.y, this.color);
    },
    update: function () {
        this.updateSpeed();
        this.updatePosition();
        myGameAreaPLATFORM.draw(this.head.x, this.head.y, this.color);
    },
    updatePosition: function () {
        this.head.x += this.xSpeed;
        this.xSpeed = 0;
        if (this.head.y + this.ySpeed < myGameAreaPLATFORM.canvas.height - 20) {
            this.ySpeed += 10;
            this.head.y += this.ySpeed;
        } else {
            this.ySpeed = 0;
            this.head.y = myGameAreaPLATFORM.canvas.height - 20;
            this.PLATFORMing = false;
        }

    },
    updateSpeed: function () {
        if (this.key === "w" && this.PLATFORMing === false) {
            this.ySpeed = -50;
            this.PLATFORMing = true;
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