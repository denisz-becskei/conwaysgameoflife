function check_position(board, x, y) {
    if (x !== 0 && y === 0 && x !== board[x].length - 1) {
        return "left-edge";
    } else if (x === 0 && y !== 0 && x !== board[x].length - 1) {
        return "top-edge";
    } else if (x === 0 && y === 0) {
        return "left-top-corner";
    } else if (x === board[x].length - 1 && y === board[y].length - 1) {
        return "right-bottom-corner";
    } else if (x === board[x].length - 1 && y === 0) {
        return "left-bottom-corner";
    } else if (x === 0 && y === board[y].length - 1) {
        return "right-top-corner";
    } else if (x === board[x].length - 1 && y !== 0 && y !== board[y].length - 1) {
        return "bottom-edge";
    } else if (x !== 0 && y === board[y].length - 1 && x !== board[x].length - 1) {
        return "right-edge";
    } else {
        return "normal";
    }
}

function stages(board, x, y, action) {
    let circles_around = 0;

    let pos = check_position(board, x, y);
    switch (pos) {
        case "left-edge":
            for (let i = -1; i <= 1; i++) {
                for (let j = 0; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "top-edge":
            for (let i = 0; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "left-top-corner":
            for (let i = 0; i <= 1; i++) {
                for (let j = 0; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "right-bottom-corner":
            for (let i = -1; i <= 0; i++) {
                for (let j = -1; j <= 0; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "right-top-corner":
            for (let i = 0; i <= 1; i++) {
                for (let j = -1; j <= 0; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "left-bottom-corner":
            for (let i = -1; i <= 0; i++) {
                for (let j = 0; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "bottom-edge":
            for (let i = -1; i <= 0; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        case "right-edge":
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 0; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
        default:
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (board[x + i][y + j] === "O") {
                        circles_around++;
                    }
                }
            }
            break;
    }
    switch (action) {
        case "Survival":
            return circles_around === 3 || circles_around === 2;
        case "Death":
            return circles_around < 2 || circles_around >= 4;
        case "Birth":
            return circles_around === 3;
    }

}

