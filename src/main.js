
let gameGrid;
var s = function () {
    setup = function () {
        // Change the board from 4x4 to 8x8.
        createCanvas(400, 400);
        gameGrid = [
            [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
        ];
        console.table(gameGrid);
        enterRandomNumber();
        enterRandomNumber();
        console.table(gameGrid);
    }



    // Change the playing interface from a console to a graphical UI.
    draw = function () {
        background(255);
        let w = 100;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                noFill();
                strokeWeight(2);
                stroke(0);
                rect(i * w, j * w, w, w);
                let val = gameGrid[i][j];
                if (gameGrid[i][j] !== 0) {
                    fill(0);
                    textSize(64);
                    textAlign(CENTER, CENTER);
                    text(val, i * w + w / 2, j * w + w / 2);
                }
            }
        }
    }

    keyPressed = function () {
        let flipped = false;
        let rotated = false;
        switch (keyCode) {
            case DOWN_ARROW:
                break;
            case UP_ARROW:
                gameGrid = flip(gameGrid);
                flipped = true;
                break;
            case RIGHT_ARROW:
                gameGrid = rotateTheGrid(gameGrid);
                rotated = true;
                // flipped = false;
                break;
            case LEFT_ARROW:
                gameGrid = rotateTheGrid(gameGrid);
                gameGrid = flip(gameGrid);
                rotated = true;
                flipped = true;
                break;
            default:
                // later
        }

        let past = copyGrid(gameGrid);
        for (let i = 0; i < 4; i++) {
            gameGrid[i] = operate(gameGrid[i]);
        }
        let changed = compare(past, gameGrid);
        if (flipped) {
            gameGrid = flip(gameGrid);
        }
        if (rotated) {
            gameGrid = rotateTheGrid(gameGrid);
          }
        if (changed) {
            enterRandomNumber();
        }
    }

    function rotateTheGrid(gameGrid) {
        let newGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                newGrid[i][j] = gameGrid[j][i];
            }
        }
        return newGrid;
    }

    function copyGrid(gameGrid) {
        let extra = [
            [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
        ];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                extra[i][j] = gameGrid[i][j];
            }
        }
        return extra;
    }

    function compare(a, b) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (a[i][j] !== b[i][j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function flip(gameGrid) {
        for (let i = 0; i < 4; i++) {
            gameGrid[i].reverse();
        }
        return gameGrid;
    }

    function operate(row) {
        row = slide(row);
        row = combineVals(row);
        row = slide(row);
        return row;
    }

    function combineVals(row) {
        for (let i = 3; i >= 1; i--) {
            let a = row[i];
            let b = row[i - 1];
            if (a == b) {
                row[i] = a + b;
                // score += row[i];
                row[i - 1] = 0;
                break;
            }
        }
        return row;
    }

    function slide(row) {
        let arr = row.filter(val => val);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(0);
        arr = zeros.concat(arr);
        return arr;
    }
}

function enterRandomNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameGrid[i][j] === 0) {
                options.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (options.length > 0) {
        let spot = random(options);
        let r = random(1);
        gameGrid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
        // grid_new[spot.x][spot.y] = 1;
    }
}

var myp5 = new p5(s);

