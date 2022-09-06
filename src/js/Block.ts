import {BOARD} from "./constants.js";

enum BlockType {
    STRAIGHT,
    SQUARE,
    T,
    L,
    SKEW
}

let ColorType = ["#0341AE", "#72CB3B", "#FFD500", "#FF971C", "#FF3213"];

export class Block {
    private ctx: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private readonly type: BlockType;
    private readonly colorType: string;
    private rotation: number;
    private readonly figures: any;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.x = BOARD.BOARD_START_X + x * BOARD.SQUARE_WIDTH;
        this.y = BOARD.BOARD_START_Y + y * BOARD.SQUARE_HEIGHT;
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
        this.ctx.fillStyle = this.colorType;
        const currFigure: any = this.figures[this.type][this.rotation % (this.figures[this.type].length)];
        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){
                if (currFigure.includes(i * 4 + j)){
                    this.ctx.fillRect(this.x + BOARD.SQUARE_HEIGHT * j, this.y + BOARD.SQUARE_WIDTH * i,
                        BOARD.SQUARE_WIDTH, BOARD.SQUARE_HEIGHT);
                }
            }
        }
    }

    public rotate(): void {
        this.rotation += 1;
        // TODO check if rotation is possible
    }
}