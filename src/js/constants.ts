interface BoardProps {
    // Width of a square
    SQUARE_WIDTH: number,
    // Height of a square
    SQUARE_HEIGHT: number,
    // Total number of squares in a line
    SQUARES_X: number,
    // Total number of squares in a column
    SQUARES_Y: number,
    // x coordinates from where the grid start
    BOARD_START_X: number,
    // y coordinates from where the grid start
    BOARD_START_Y: number
}

export const BOARD: BoardProps = {
    SQUARE_WIDTH: 30,
    SQUARE_HEIGHT: 30,
    SQUARES_X: 10,
    SQUARES_Y: 18,
    BOARD_START_X: (window.innerWidth / 2) - (30 * 10) / 2,
    BOARD_START_Y: (window.innerHeight / 2) - (30 * 18) / 2
}
