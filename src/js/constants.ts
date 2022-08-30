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
    SQUARE_WIDTH: 25,
    SQUARE_HEIGHT: 25,
    SQUARES_X: 10,
    SQUARES_Y:18
}
