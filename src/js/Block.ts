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
    private readonly ctx: CanvasRenderingContext2D;
    private X: number;
    private Y: number;
    private readonly type: BlockType;
    private readonly colorType: string;
    private rotation: number;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.X = x;
        this.Y = y;
        this.type = BlockType[BlockType[Math.floor(Math.random() * Object.keys(BlockType).length / 2)]];
        this.colorType = ColorType[Math.floor(Math.random() * ColorType.length)];
        this.rotation = 0;
    }

    public getX(): number {
        return this.X;
    }

    public getY(): number {
        return this.Y;
    }

    public setX(x: number): void {
        this.X = x;
    }

    public setY(y: number): void {
        this.Y = y;
    }

    public setRotation(rotation: number): void {
        this.rotation = rotation;
    }

    public getType(): BlockType {
        return this.type;
    }

    public getRotation(): number {
        return this.rotation;
    }

    public draw(): void {
        /**
         * Draw the current block
         */
        this.ctx.fillStyle = this.colorType;
        const currFigure: any = BOARD.FIGURES[this.type][this.rotation % (BOARD.FIGURES[this.type].length)];
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

    public clear(): void {
        /**
         * Clear the current block
         */
        this.ctx.fillStyle = "#1f1f1f";
        const currFigure: any = BOARD.FIGURES[this.type][this.rotation % (BOARD.FIGURES[this.type].length)];
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
        /**
         * Drop the piece
         */
        // while (!this.checkCollision()) {
        //     this.Y++;
        // }
        // this.Y--;
    }

    private moveDown(): void {
        this.Y++;
    }

    private moveSide(side: string): void {
        /**
         * Move the piece to left or right
         * @param {side} direction where the piece will be moved it should be "right" or "left"
         */
        if (side === "left") {
            this.X--;
        } else if (side === "right") {
            this.X++;
        } else {
            throw new Error('"side" must be left or right');
        }

    }

    public move(key: string): Array<number> {
        /**
         * Move the piece to a certain direction
         * @param {key} the string representation of the key pressed
         * @returns The last position and rotation of the piece
         */
        const lastPosition: Array<number> = [this.X, this.Y, this.rotation];
        switch (key) {
            case "ArrowRight": this.moveSide("right"); break;
            case "ArrowLeft": this.moveSide("left"); break;
            case "ArrowDown": this.moveDown(); break;
            case "ArrowUp": this.drop(); break;
            case " ": this.rotate(); break;
        }
        return lastPosition;
    }

    private rotate(): void {
        this.rotation++;
    }

    public toString(): string {
        return `x = ${this.X}, y = ${this.Y}`;
    }
}