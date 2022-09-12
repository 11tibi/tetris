import { Board } from './Board.js';
window.onload = window.onresize = function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let board = new Board(ctx);
    board.run();
};
