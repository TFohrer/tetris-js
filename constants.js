"use strict";

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38
};
// make it immutable
Object.freeze(KEY);

const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

const SHAPES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    // And so on
];
