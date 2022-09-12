import { BOARD } from "./constants.js";
export let fields = [];
for (let i = 0; i < BOARD.SQUARES_Y; i++) {
    fields.push([]);
    for (let j = 0; j < BOARD.BOARD_START_X; j++) {
        fields[i].push(false);
    }
}
