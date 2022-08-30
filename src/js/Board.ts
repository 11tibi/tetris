import {BOARD} from "./constants.js";

export class Board {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public draw(): void {
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(
            (window.innerWidth / 2) - (BOARD.SQUARE_WIDTH * BOARD.SQUARES_X) / 2,
            (window.innerHeight / 2) - (BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y) / 2,
            BOARD.SQUARE_WIDTH * BOARD.SQUARES_X,
            BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y
        )

        this.ctx.fillStyle = "#000";
        this.ctx.lineWidth = 0.5;

        let x: number = window.innerWidth / 2 - (BOARD.SQUARE_WIDTH * BOARD.SQUARES_X) / 2;
        let y: number = window.innerHeight / 2 - (BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y) / 2;
        let x_end: number = window.innerWidth / 2 + (BOARD.SQUARES_X * BOARD.SQUARE_WIDTH) / 2;
        for (let i = 0; i < BOARD.SQUARES_Y + 1; i++) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x_end, y);
            this.ctx.stroke();
            y += BOARD.SQUARE_HEIGHT;
        }
        x = window.innerWidth / 2 - (BOARD.SQUARE_WIDTH * BOARD.SQUARES_X) / 2;
        y = window.innerHeight / 2 - (BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y) / 2;
        let y_end: number = window.innerHeight / 2 - 225 + 450;
        for (let i = 0; i < BOARD.SQUARES_X; i++) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y_end);
            this.ctx.stroke();
            x += BOARD.SQUARE_WIDTH;
        }
    }
}