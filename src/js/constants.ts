interface BoardProps {
    // Width of a square
    SQUARE_WIDTH: number,
    // Height of a square
    SQUARE_HEIGHT: number
    // Total number of squares in a line
    SQUARES_X: number
    // Total number of squares in a column
    SQUARES_Y: number
}

export const BOARD: BoardProps = {
    SQUARE_WIDTH: 30,
    SQUARE_HEIGHT: 30,
    SQUARES_X: 10,
    SQUARES_Y:18
}
