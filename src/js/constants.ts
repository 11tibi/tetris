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
    BOARD_START_Y: number,
    // Shapes that the figures can take
    FIGURES: Array<Array<Array<number>>>,
    // Hex value of the colors that the blocks can take
    COLOR_TYPE: Array<string>
}

export const BOARD: BoardProps = {
    SQUARE_WIDTH: 30,
    SQUARE_HEIGHT: 30,
    SQUARES_X: 10,
    SQUARES_Y: 18,
    BOARD_START_X: (window.innerWidth / 2) - (30 * 10) / 2,
    BOARD_START_Y: (window.innerHeight / 2) - (30 * 18) / 2,
    FIGURES: [
        [[1, 5, 9, 13], [4, 5, 6, 7]],
        [[1, 2, 5, 9], [0, 4, 5, 6], [1, 5, 9, 8], [4, 5, 6, 10]],
        [[1, 2, 6, 10], [5, 6, 7, 9], [2, 6, 10, 11], [3, 5, 6, 7]],
        [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]],
        [[1, 2, 5, 6]],
    ],
    COLOR_TYPE: ["#0341AE", "#72CB3B", "#FFD500", "#FF971C", "#FF3213"]
}
