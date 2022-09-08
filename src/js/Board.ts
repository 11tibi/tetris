import {BOARD} from "./constants.js";
import {Block} from "./Block.js";

export class Board {
    private readonly ctx: CanvasRenderingContext2D;
    private fields: Array<Array<boolean>>;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.fields = [];
        for (let i=0; i<BOARD.SQUARES_Y; i++) {
            this.fields.push([]);
            for (let j=0; j<BOARD.BOARD_START_X; j++) {
                this.fields[i].push(false);
            }
        }
        console.log(this.fields);
    }

    public draw(): void {
        this.ctx.fillStyle = "#fff";
        this.ctx.rect(
            (window.innerWidth / 2) - (BOARD.SQUARE_WIDTH * BOARD.SQUARES_X) / 2 - 3,
            (window.innerHeight / 2) - (BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y) / 2 - 3,
            BOARD.SQUARE_WIDTH * BOARD.SQUARES_X + 5,
            BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y + 5
        )
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
    }

    public run(): void {
        this.draw();
        let block = new Block(this.ctx, 3, -1);
        window.addEventListener('keydown', (event) => {
            block.move(event.key);
        });

        setInterval(() => {
            block.checkCollision();
            block.draw();
            block.move("ArrowDown");
        }, 600)
    }
}