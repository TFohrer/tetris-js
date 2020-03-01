const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const ctxNext = canvas.getContext('2d');


let time = { start: 0, elapsed: 0, level: 1000 };

// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);


let board = new Board(ctx, ctxNext);
let requestId;
initEventListener();

function play() {
    resetGame();
    time.start = performance.now();
    animate();
    /*let piece = new Piece(ctx);
    piece.draw();

    board.piece = piece;
    console.table(board.grid);*/
}


moves = {
    [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]:    p => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: p => board.rotate(p)
};

function initNext() {
    // Calculate size of canvas from constants.
    ctxNext.canvas.width = 4 * BLOCK_SIZE;
    ctxNext.canvas.height = 4 * BLOCK_SIZE;
    ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

function initEventListener(){
    document.addEventListener('keydown', event => {
        if (moves[event.keyCode]) {
            // Stop the event from bubbling.
            event.preventDefault();

            // Get new state of piece
            let p = moves[event.keyCode](board.piece);

            if (board.valid(p)) {
                // If the move is valid, move the piece.
                board.piece.move(p);

                // Clear old position before drawing.
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                board.piece.draw();
            }
        }
    });
}

function resetGame() {
    /*account.score = 0;
    account.lines = 0;
    account.level = 0;*/
    board.reset();
    time = { start: 0, elapsed: 0 };
}

function animate(now = 0) {
    time.elapsed = now - time.start;
    //if (time.elapsed > time.level) {
        time.start = now;
        if (!board.drop()) {
            gameOver();
            return;
        }
    //}

    // Clear board before drawing new state.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.draw();
    requestId = requestAnimationFrame(animate);
}

function gameOver() {
    cancelAnimationFrame(requestId);
    /*ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);*/
}
