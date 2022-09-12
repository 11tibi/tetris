import { BOARD } from "./constants.js";
var BlockType;
(function (BlockType) {
    BlockType[BlockType["STRAIGHT"] = 0] = "STRAIGHT";
    BlockType[BlockType["SQUARE"] = 1] = "SQUARE";
    BlockType[BlockType["T"] = 2] = "T";
    BlockType[BlockType["L"] = 3] = "L";
    BlockType[BlockType["SKEW"] = 4] = "SKEW";
})(BlockType || (BlockType = {}));
export class Block {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.X = x;
        this.Y = y;
        this.type = BlockType[BlockType[Math.floor(Math.random() * Object.keys(BlockType).length / 2)]];
        this.colorType = Math.floor(Math.random() * BOARD.COLOR_TYPE.length);
        this.rotation = 0;
    }
    getX() {
        return this.X;
    }
    getY() {
        return this.Y;
    }
    setX(x) {
        this.X = x;
    }
    setY(y) {
        this.Y = y;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }
    getType() {
        return this.type;
    }
    getRotation() {
        return this.rotation;
    }
    getColorType() {
        return this.colorType;
    }
    draw() {
        /**
         * Draw the current block
         */
        this.ctx.fillStyle = BOARD.COLOR_TYPE[this.colorType];
        const currFigure = BOARD.FIGURES[this.type][this.rotation % (BOARD.FIGURES[this.type].length)];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    this.ctx.fillRect((BOARD.BOARD_START_X + this.X * BOARD.SQUARE_WIDTH) + BOARD.SQUARE_HEIGHT * j, (BOARD.BOARD_START_Y + this.Y * BOARD.SQUARE_HEIGHT) + BOARD.SQUARE_WIDTH * i, BOARD.SQUARE_WIDTH, BOARD.SQUARE_HEIGHT);
                }
            }
        }
    }
    clear() {
        /**
         * Clear the current block
         */
        this.ctx.fillStyle = "#1f1f1f";
        const currFigure = BOARD.FIGURES[this.type][this.rotation % (BOARD.FIGURES[this.type].length)];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    this.ctx.fillRect((BOARD.BOARD_START_X + this.X * BOARD.SQUARE_WIDTH) + BOARD.SQUARE_HEIGHT * j - 1, (BOARD.BOARD_START_Y + this.Y * BOARD.SQUARE_HEIGHT) + BOARD.SQUARE_WIDTH * i - 1, BOARD.SQUARE_WIDTH + 2, BOARD.SQUARE_HEIGHT + 1);
                }
            }
        }
    }
    drop() {
        /**
         * Drop the piece
         */
        // while (!this.checkCollision()) {
        //     this.Y++;
        // }
        // this.Y--;
    }
    moveDown() {
        this.Y++;
    }
    moveSide(side) {
        /**
         * Move the piece to left or right
         * @param {side} direction where the piece will be moved it should be "right" or "left"
         */
        if (side === "left") {
            this.X--;
        }
        else if (side === "right") {
            this.X++;
        }
        else {
            throw new Error('"side" must be left or right');
        }
    }
    move(key) {
        /**
         * Move the piece to a certain direction
         * @param {key} the string representation of the key pressed
         * @returns The last position and rotation of the piece
         */
        const lastPosition = [this.X, this.Y, this.rotation];
        switch (key) {
            case "ArrowRight":
                this.moveSide("right");
                break;
            case "ArrowLeft":
                this.moveSide("left");
                break;
            case "ArrowDown":
                this.moveDown();
                break;
            case "ArrowUp":
                this.drop();
                break;
            case " ":
                this.rotate();
                break;
        }
        return lastPosition;
    }
    rotate() {
        this.rotation++;
    }
    toString() {
        return `x = ${this.X}, y = ${this.Y}`;
    }
}
