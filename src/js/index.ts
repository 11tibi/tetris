import {Board} from './Board.js';

window.onload = window.onresize = function () {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let board = new Board(ctx);
    board.run();
}

