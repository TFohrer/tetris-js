class Board {
    grid;

    // Reset the board when we start a new game.
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Get matrix filled with zeros.
    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 || (this.insideWalls(x) && this.aboveFloor(y)))
            });
        });
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y < ROWS;
    }

    rotate(piece) {
        // Clone with JSON for immutability.
        let p = JSON.parse(JSON.stringify(piece));

        // Transpose matrix
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }

        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());
        return p;
    }
}
