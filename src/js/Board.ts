import {BOARD} from "./constants.js";
import {Block} from "./Block.js";

export class Board {
    private readonly ctx: CanvasRenderingContext2D;
    private fields: Array<Array<boolean>>;
    private currentPiece: Block;
    private lastPosition: Array<number>;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.fields = [];
        for (let i=0; i<BOARD.SQUARES_Y; i++) {
            this.fields.push([]);
            for (let j=0; j<BOARD.SQUARES_X; j++) {
                this.fields[i].push(false);
            }
        }
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

    public checkCollision(): boolean {
        const currFigure: any = BOARD.FIGURES[this.currentPiece.getType()]
            [this.currentPiece.getRotation() % (BOARD.FIGURES[this.currentPiece.getType()].length)];
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    let x_ind: number = this.currentPiece.getX() + j;
                    let y_ind: number = this.currentPiece.getY() + i;
                    if (x_ind < 0 || x_ind >= BOARD.SQUARES_X || y_ind < 0 || y_ind >= BOARD.SQUARES_Y) {
                        console.log(`x = ${x_ind} y = ${y_ind}`);
                        return true;
                    }
                    if (this.fields[y_ind][x_ind]) {
                        console.log(`x = ${x_ind} y = ${y_ind}`);
                        return true;
                    }
                }

            }
        }
        return false;
    }

    private freeze(): void {
        const currFigure: any = BOARD.FIGURES[this.currentPiece.getType()]
            [this.currentPiece.getRotation() % (BOARD.FIGURES[this.currentPiece.getType()].length)];
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    let x_ind: number = this.currentPiece.getX() + j;
                    let y_ind: number = this.currentPiece.getY() + i;
                    this.fields[y_ind][x_ind] = true;
                }
            }
        }
    }

    public checkFreeze(): boolean {
        const currFigure: any = BOARD.FIGURES[this.currentPiece.getType()]
            [this.currentPiece.getRotation() % (BOARD.FIGURES[this.currentPiece.getType()].length)];
        for (let i=0; i<4; i++) {
            for (let j=0; j<4; j++) {
                if (currFigure.includes(i * 4 + j)) {
                    let x_ind: number = this.currentPiece.getX() + j;
                    let y_ind: number = this.currentPiece.getY() + i;
                    if (y_ind === BOARD.SQUARES_Y - 1) {
                        return true;
                    }
                    if (this.fields[y_ind+1][x_ind]) {
                        return true;
                    }
                }

            }
        }
        return false
    }

    private deleteFullRows(): void {
        for (let i=0; i<BOARD.SQUARES_Y; i++) {
            if (this.fields[i].every(Boolean)) {
                
            }
        }
    }

    public run(): void {
        this.draw();
        this.currentPiece = new Block(this.ctx, 3, 0);
        window.addEventListener('keydown', (event) => {
            this.currentPiece.clear();
            this.lastPosition = this.currentPiece.move(event.key);
            if (this.checkCollision()) {
                this.currentPiece.setX(this.lastPosition[0]);
                this.currentPiece.setY(this.lastPosition[1]);
                this.currentPiece.setRotation(this.lastPosition[2]);
            }
            this.currentPiece.draw();
        });

        setInterval(() => {
            if (this.checkFreeze()) {
                this.freeze();
                this.currentPiece = new Block(this.ctx, 3, 0);
            } else {
                this.currentPiece.clear();
                this.lastPosition = this.currentPiece.move("ArrowDown");
                this.currentPiece.draw();
                if (this.checkCollision()) {
                    this.currentPiece.clear();
                    this.currentPiece.setX(this.lastPosition[0]);
                    this.currentPiece.setY(this.lastPosition[1]);
                    this.currentPiece.draw();
                }
            }
        }, 600)
    }
}