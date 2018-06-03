function Square(ctx) {
    this.ctx = ctx;

    this.width = 50;
    this.height = 50;

    this.x0 = 500;    
    this.x = this.x0;
    this.vx = 10;

    this.y0 = this.ctx.canvas.height - this.height;    
    this.y = this.y0;
    this.vy = 0;

    this.movements = {
        up: false,
        down: false,
        right: false,
        left: false
    }
    this.isJumping = false;
}

Square.prototype.onKeyEvent = function(event) {
    var state = event.type === 'keydown' ? true : false;
    switch (event.keyCode) {
        case KEY_UP:
            this.movements.up = state;
            break;
        case KEY_RIGHT:
            this.movements.right = state;
            break;
        case KEY_DOWN:
            this.movements.down = state;
            break;
        case KEY_LEFT:
            this.movements.left = state;
            break;
    }
}

Square.prototype.animate = function() {
    this.move();

    this.vy += GRAVITY;
    this.y += this.vy;
    this.x += this.vx;
    this.vx *= FRICTION;
    this.vy *= FRICTION;

    if (this.isDownsideY()) {
        this.y = this.y0;
        this.vy = 0;
        this.isJumping = false;
    }

}

Square.prototype.isDownsideY = function() {
    return this.y >= this.ctx.canvas.height - this.height;
}

Square.prototype.move = function() {
    if (this.movements.up === true && !this.isJumping) {
        this.isJumping = true;
        this.vy -= SPEED_JUMP;
        // TODO: call jump sprite animation 
    }

    if (this.movements.right) {
        this.vx += SPEED_MOVE;
        // TODO: call right sprite animation (only.. if not jumping :P)
    }

    if (this.movements.left) {
        this.vx -= SPEED_MOVE;
        // TODO: call left sprite animation (only.. if not jumping :P)
    }
}

Square.prototype.draw = function() {
    this.ctx.save();
    this.fillStyle = '#000';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();

    this.animate();
}