// Box width
let bw = 400;
// Box height
let bh = 400;
// Padding
let p = 10;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const it = document.getElementById("iteration");

canvas.style.position = "absolute";
canvas.style.top = innerHeight / 2 - canvas.height / 1.75 + "px";
canvas.style.left = innerWidth / 2 + "px";

function drawBoard(){
    for (let x = 0; x <= bw; x += 20) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

    for (let x = 0; x <= bh; x += 20) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }
    context.strokeStyle = "white";
    context.stroke();
}

drawBoard();

function chance(chance) {
    let random = Math.random();
    random = random * 100;
    return chance > random;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generate_piece() {
    if (chance(35)) {
        return "O";
    } else {
        return "X";
    }
}

function get_piece(board, x, y) {
    return board[x][y] === "O";
}

let board = [];

function redraw() {
    context.clearRect(0,0, canvas.width, canvas.height);
    drawBoard();
    let pieces = [];

    for (let i = 0; i < 20; i++) {
        pieces.push(["","","","","","","","","","","","","","","","","","","",""]);
    }
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (get_piece(board, i, j)) {
                pieces[i][j] = new Piece(j, i, "white", 8);
                pieces[i][j].draw();
            }
        }
    }
}

function areArraysEqualSets(a1, a2) {
    for (let i = 0; i < a1.length; i++) {
        for (let j = 0; j < a1.length; j++) {
            if (a1[i][j] !== a2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

class Piece {
    constructor(x, y, color, size) {
        this.x = 20.5 + 20*x;
        this.y = 20.5 + 20*y;
        this.color = color;
        this.size = size;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }

    change_color(color) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.color = color;
        context.fill(this.color);
        context.fill();
    }
}

//board generation
function generate_new_board() {
    board = [];
    for (let i = 0; i < 20; i++) {
        board.push([generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece(),generate_piece()])
    }
}

//evolution
async function evolve_board() {

    generate_new_board();
    redraw();

    let iteration_survival = [];
    let iteration_death = [];
    let iteration_birth = [];

    for (let i = 0; i < 20; i++) {
        iteration_survival.push(["","","","","","","","","","","","","","","","","","","",""]);
        iteration_death.push(["","","","","","","","","","","","","","","","","","","",""]);
        iteration_birth.push(["","","","","","","","","","","","","","","","","","","",""]);

    }

    const runs = 100;
    for (let k = 0; k < runs; k++) {
        console.log("Iteration " + k);
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                iteration_survival[i][j] = stages(board, i, j, "Survival");
                iteration_death[i][j] = stages(board, i, j, "Death");
                iteration_birth[i][j] = stages(board, i, j, "Birth");
            }
        }

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if (iteration_death[i][j] === true || iteration_survival === false) {
                    board[i][j] = "X";
                }
                if (iteration_birth[i][j] === true) {
                    board[i][j] = "O";
                }
            }
        }
        redraw();
        if (k === runs - 1) {
            it.innerText = "Iteration #" + (k+1);
            k = 0;
            await sleep(512);
            generate_new_board();
            redraw();

        } else {
            it.innerText = "Iteration #" + (k+1);
            await sleep(75);
        }

    }
}

evolve_board();