function startGame() {
    myGameAreaPLATFORM.start();
    playerCharacterPLATFORM.start();
}

function updateGameArea() {
    myGameAreaPLATFORM.clear();
    platforms.update();
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

    draw: function (coordinateX, coordinateY, color, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, width, height);
    }
}

const platforms = {
    storage: [{ x: 100, y: 240, width: 50, height: 20, color: "black" }],
    update: function () {
        this.storage.forEach(platform => {
            myGameAreaPLATFORM.draw(platform.x, platform.y, platform.color, platform.width, platform.height)
        })
    }
}



const playerCharacterPLATFORM = {
    color: "purple",
    head: { x: 100, y: 280 },
    key: null,
    xSpeed: 0,
    ySpeed: 0,
    width: 20,
    height: 20,
    jumping: false,
    start: function () {
        window.addEventListener('keydown', function (e) {
            playerCharacterPLATFORM.key = e.key;
        })
        myGameAreaPLATFORM.draw(this.head.x, this.head.y, this.color, this.width, this.height);
    },
    update: function () {
        this.updateSpeed();
        this.updatePosition();
        myGameAreaPLATFORM.draw(this.head.x, this.head.y, this.color, this.width, this.height);
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
            this.jumping = false;
        }

    },
    updateSpeed: function () {
        if (this.key === "w" && this.jumping === false) {
            this.ySpeed = -50;
            this.jumping = true;
        }

        if (this.key === "a") {
            this.xSpeed = -20;
        } else if (this.key === "d") {
            this.xSpeed = 20;
        }

        this.key = "";
    },

    checkPlatformCollission: function () {
        //case stands on platform - check if falls from platform
        if (!this.jumping && this.head.y != myGameAreaPLATFORM.canvas.height - this.height) { }
        //case is falling - check if lands on platform
        if (this.jumping && this.ySpeed >= 0) { }
        //case is jumping - check if collides with platform from below
        if (this.jumping && this.ySpeed <= 0) {
        }
        //check collission left/right
    },
}

startGame();