function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = window.innerWidth;
    this.canvas.height = Math.floor(window.innerHeight / 2);
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.square = new Square(this.ctx);
}

Game.prototype.start = function() {
    if (!this.isRunning()) {
        this.drawIntervalId = setInterval(function() {
            this.draw();
        }.bind(this), 1000 / this.fps);
    }
}

Game.prototype.stop = function() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.onKeyDown = function (event) {
    this.square.onKeyEvent(event);
}

Game.prototype.onKeyUp = function (event) {
    this.square.onKeyEvent(event);
}

Game.prototype.isRunning = function () {
    return this.drawIntervalId !== undefined;
}

Game.prototype.draw = function () {
    this.clear();
    this.square.draw();
}

