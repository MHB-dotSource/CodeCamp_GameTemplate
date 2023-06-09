const WIDTH = 16;
const HEIGHT = 18;
const CYCLE_LOOP = [0, 1, 0, 2];

function startGame() {
    myGameAreaSprite.start();
    playerCharacterSprite.start();
}

function updateGameArea() {
    myGameAreaSprite.clear();
    playerCharacterSprite.update();
}

const myGameAreaSprite = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.id = "myGameAreaSprite";
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context = document.getElementById("myGameAreaSprite").getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    draw: function (coordinateX, coordinateY, color) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinateX, coordinateY, 20, 20);
    },

    drawImage: function (img, frameX, frameY, canvasX, canvasY) {
        this.context.drawImage(img, frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT, canvasX, canvasY, 20, 20);
    }

}

const playerCharacterSprite = {
    img: "",
    currentLoopIndex: 0,
    currentDirection: 0,
    hasMoved: false,
    head: { x: 100, y: 100 },
    key: null,
    xSpeed: 0,
    ySpeed: 0,
    start: function () {
        this.img = new Image();
        this.img.src = document.getElementById("spritesheet2").src;
        window.addEventListener('keydown', function (e) {
            playerCharacterSprite.key = e.key;
        })
        window.addEventListener('keyup', function () {
            playerCharacterSprite.key = "";
        })
        myGameAreaSprite.draw(this.head.x, this.head.y, this.color);
    },
    update: function () {
        this.updateSpeed();
        this.updatePosition();
        myGameAreaSprite.drawImage(this.img, CYCLE_LOOP[this.currentLoopIndex], this.currentDirection, this.head.x, this.head.y);
    },
    updatePosition: function () {
        if (this.hasMoved) {
            this.currentLoopIndex++;
            if (this.currentLoopIndex >= CYCLE_LOOP.length) {
                this.currentLoopIndex = 0;
            }
        }
        this.head.x += this.xSpeed;
        this.head.y += this.ySpeed;
        this.xSpeed = 0;
        this.ySpeed = 0;
    },
    updateSpeed: function () {
        switch (this.key) {
            case "s": this.ySpeed = 20;
                this.currentDirection = 0;
                this.hasMoved = true;
                break;
            case "w": this.ySpeed = -20;
                this.currentDirection = 1;
                this.hasMoved = true;
                break;
            case "a": this.xSpeed = -20;
                this.currentDirection = 2;
                this.hasMoved = true;
                break;
            case "d": this.xSpeed = 20;
                this.currentDirection = 3;
                this.hasMoved = true;
                break;
            default: this.currentDirection = 0;
                this.currentLoopIndex = 0
                this.hasMoved = false;
                break;
        }
    },
}

startGame();