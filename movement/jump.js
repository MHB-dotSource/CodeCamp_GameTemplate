function startGame() {
    myGameAreaJUMP.start();
    playerCharacterJUMP.start();
}

function updateGameArea() {
    myGameAreaJUMP.clear();
    playerCharacterJUMP.update();
}

const myGameAreaJUMP = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.id = "myGameAreaJUMP";
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context = document.getElementById("myGameAreaJUMP").getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function (coordinateX, coordinateY, color) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, 20, 20);
    }
}

const playerCharacterJUMP = {
    color: "blue",
    head: { x: 100, y: 280 },
    key: null,
    xSpeed: 0,
    ySpeed: 0,
    jumping: false,
    start: function () {
        window.addEventListener('keydown', function (e) {
            playerCharacterJUMP.key = e.key;
        })
        myGameAreaJUMP.draw(this.head.x, this.head.y, this.color);
    },
    update: function () {
        this.updateSpeed();
        this.updatePosition();
        myGameAreaJUMP.draw(this.head.x, this.head.y, this.color);
    },
    updatePosition: function () {
        this.head.x += this.xSpeed;
        this.xSpeed = 0;
        if (this.head.y + this.ySpeed < myGameAreaJUMP.canvas.height - 20) {
            this.ySpeed += 10;
            this.head.y += this.ySpeed;
        } else {
            this.ySpeed = 0;
            this.head.y = myGameAreaJUMP.canvas.height - 20;
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
}

startGame();