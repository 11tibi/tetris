import {BOARD} from "./constants.js";
import {Block} from "./Block.js";

enum GamePhase {
    PLAY,
    GAME_OVER
}

export class Board {
    private readonly ctx: CanvasRenderingContext2D;
    private fields: Array<Array<number>>;
    private currentPiece: Block;
    private lastPosition: Array<number>;
    private score: number;
    private gamePhase: GamePhase;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.initializeGame();
    }

    private initializeGame(): void {
        this.fields = [];
        for (let i=0; i<BOARD.SQUARES_Y; i++) {
            this.fields.push([]);
            for (let j=0; j<BOARD.SQUARES_X; j++) {
                this.fields[i].push(-1);
            }
        }
        this.score = 0;
        this.gamePhase = GamePhase.PLAY
    }

    public draw(): void {
        this.ctx.fillStyle = "#1f1f1f";
        this.ctx.rect(
            (window.innerWidth / 2) - (BOARD.SQUARE_WIDTH * BOARD.SQUARES_X) / 2 - 3,
            (window.innerHeight / 2) - (BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y) / 2 - 3,
            BOARD.SQUARE_WIDTH * BOARD.SQUARES_X + 5,
            BOARD.SQUARE_HEIGHT * BOARD.SQUARES_Y + 5
        )
        this.ctx.fill();
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
        for (let i=0; i<BOARD.SQUARES_Y; i++) {
            for (let j=0; j<BOARD.SQUARES_X; j++) {
                if (this.fields[i][j] != -1) {
                    this.ctx.fillStyle = BOARD.COLOR_TYPE[this.fields[i][j]];
                    this.ctx.fillRect(BOARD.BOARD_START_X + j * BOARD.SQUARE_WIDTH,
                        BOARD.BOARD_START_Y + i * BOARD.SQUARE_HEIGHT,
                        BOARD.SQUARE_WIDTH, BOARD.SQUARE_HEIGHT);
                }
            }
        }
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
                        return true;
                    }
                    if (this.fields[y_ind][x_ind] != -1) {
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
                    this.fields[y_ind][x_ind] = this.currentPiece.getColorType();
                }
            }
        }
        this.deleteFullRows();
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
                    if (this.fields[y_ind+1][x_ind] != -1) {
                        return true;
                    }
                }

            }
        }
        return false
    }

    private deleteFullRows(): void {
        let rows = 0;
        for (let i=0; i<BOARD.SQUARES_Y; i++) {
            if (this.fields[i].every(value => value != -1)) {
                rows++;
                this.fields.splice(i, 1);
                this.fields.unshift(Array(BOARD.SQUARES_X).fill(-1));
                this.draw();
            }
        }
        switch (rows) {
            case 1: this.score += 40; break;
            case 2: this.score += 100; break;
            case 3: this.score += 300; break;
            case 4: this. score += 1200; break;
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
            if (this.gamePhase == GamePhase.PLAY) {
                if (this.checkFreeze()) {
                    this.freeze();
                    this.currentPiece = new Block(this.ctx, 3, 0);
                    this.currentPiece.draw();
                    if (this.checkCollision()) {
                        this.gamePhase = GamePhase.GAME_OVER;
                        console.log("Game Over");
                    }
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
            } else if (this.gamePhase == GamePhase.GAME_OVER) {
                this.ctx.fillStyle = "#ff0000";
                this.ctx.font = "50px Arial";
                this.ctx.textAlign = "center";
                this.ctx.fillText(`Game Over`, window.innerWidth / 2, window.innerHeight / 2);
            }
        }, 600)
    }
}