export const BOARD = {
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
};
