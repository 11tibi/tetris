import {BOARD} from "./constants.js";
import {fields} from "./Fields.js"

enum BlockType {
    STRAIGHT,
    SQUARE,
    T,
    L,
    SKEW
}

let ColorType = ["#0341AE", "#72CB3B", "#FFD500", "#FF971C", "#FF3213"];

export class Block {
    private readonly ctx: CanvasRenderingContext2D;
    private X: number;
    private Y: number;
    private readonly type: BlockType;
    private readonly colorType: string;
    private rotation: number;
    private readonly figures: Array<Array<Array<number>>>;


    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.X = x;
        this.Y = y;
        this.type = BlockType[BlockType[Math.floor(Math.random() * Object.keys(BlockType).length / 2)]];
        this.colorType = ColorType[Math.floor(Math.random() * ColorType.length)];
        this.rotation = 0;
        this.figures = [
            [[1, 5, 9, 13], [4, 5, 6, 7]],
            [[1, 2, 5, 9], [0, 4, 5, 6], [1, 5, 9, 8], [4, 5, 6, 10]],
            [[1, 2, 6, 10], [5, 6, 7, 9], [2, 6, 10, 11], [3, 5, 6, 7]],
            [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]],
            [[1, 2, 5, 6]],
        ];
    }

    public draw(): void {
        /**
         * Draw the current block
         */
        this.ctx.fillStyle = this.colorType;
        const currFigure: any = this.figures[this.type][this.rotation % (this.figures[this.type].length)];
        for(let i=0; i<4; i++) {
            for(let j=0; j<4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    this.ctx.fillRect((BOARD.BOARD_START_X + this.X * BOARD.SQUARE_WIDTH) + BOARD.SQUARE_HEIGHT * j,
                        (BOARD.BOARD_START_Y + this.Y * BOARD.SQUARE_HEIGHT) + BOARD.SQUARE_WIDTH * i,
                        BOARD.SQUARE_WIDTH, BOARD.SQUARE_HEIGHT);
                }
            }
        }
    }

    private clear(): void {
        /**
         * Clear the current block
         */
        this.ctx.fillStyle = "#1f1f1f";
        const currFigure: any = this.figures[this.type][this.rotation % (this.figures[this.type].length)];
        for(let i=0; i<4; i++) {
            for(let j=0; j<4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    this.ctx.fillRect((BOARD.BOARD_START_X + this.X * BOARD.SQUARE_WIDTH) + BOARD.SQUARE_HEIGHT * j-1,
                        (BOARD.BOARD_START_Y + this.Y * BOARD.SQUARE_HEIGHT) + BOARD.SQUARE_WIDTH * i-1,
                        BOARD.SQUARE_WIDTH+2, BOARD.SQUARE_HEIGHT+1);
                }
            }
        }
    }

    private drop(): void {
        while (!this.checkCollision()) {
            this.Y++;
        }
        this.Y--;
    }

    private moveDown(): void {
        this.clear();
        this.Y++;
        if (this.checkCollision()) {
            this.Y--;
            // generate next piece
        }
        this.draw();
    }

    private moveSide(side: string): void {
        if (side === "left") {
            this.X--;
            if (this.checkCollision()) {
                this.X++;
            }
        } else if (side === "right") {
            this.X++;
            if (this.checkCollision()) {
                this.X--;
            }
        }

    }

    public move(key: string): void {
        this.clear();
        switch (key) {
            case "ArrowRight": this.moveSide("right"); break;
            case "ArrowLeft": this.moveSide("left"); break;
            case "ArrowDown": this.moveDown(); break;
            case "ArrowUp": this.drop(); break;
            case " ": this.rotate(); break;
        }
        this.draw();
    }

    public checkCollision(): boolean {
        const currFigure: any = this.figures[this.type][this.rotation % (this.figures[this.type].length)];
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    let x_ind: number = this.X + j;
                    let y_ind: number = this.Y + i;
                    if (x_ind < 0 || x_ind >= BOARD.SQUARES_X || y_ind < 0 || y_ind >= BOARD.SQUARES_Y) {
                        console.log(`x = ${x_ind} y = ${y_ind}`);
                        return true;
                    }
                    if (fields[y_ind][x_ind]) {
                        console.log(`x = ${x_ind} y = ${y_ind}`);
                        return true;
                    }
                }

            }
        }
        return false;
    }

    private rotate(): void {
        this.rotation++;
        if (this.checkCollision()) {
            this.rotation--;
        }
        // TODO check if rotation is possible
    }

    public toString(): string {
        return `x = ${this.X}, y = ${this.Y}`;
    }
}