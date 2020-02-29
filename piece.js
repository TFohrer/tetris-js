class Piece {
    x;
    y;
    color;
    shape;
    ctx;

    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        const typeId = this.randomizeTetrominoType(SHAPES.length-1);
        console.log('typeId : ' + typeId);
        this.shape = SHAPES[typeId];
        this.color = COLORS[typeId];

        // Starting position.
        this.x = 3;
        this.y = 0;
    }

    // we loop through all the cells of the shape if the value in the cell is greater than zero, then we color that block
    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                // this.x, this.y gives the left upper position of the shape
                // x, y gives the position of the block in the shape
                // this.x + x is then the position of the block on the board
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.round(Math.random() * noOfTypes);
    }
}
