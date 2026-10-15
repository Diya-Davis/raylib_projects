const r = require("raylib");

function drawSnake(w) {
    for (let i = 0; i < w.snake.length; i++) {
        r.DrawRectangle(
            w.snake[i].x * w.cellSize,
            w.snake[i].y * w.cellSize,
            w.cellSize,
            w.cellSize,
            i === 0 ? r.DARKGREEN : r.GREEN,
        );
    }
}

function drawGrid(world) {
    for (let i = 0; i < world.gridNumber; i++) {
        r.DrawLine(
            i * world.cellSize,
            0,
            i * world.cellSize,
            world.windowHeight,
            { r: 255, g: 255, b: 255, a: 50 },
        );
        r.DrawLine(
            0,
            i * world.cellSize,
            world.windowWidth,
            i * world.cellSize,
            { r: 255, g: 255, b: 255, a: 50 },
        );
    }
}

function setSnakePosition(w) {
    let newHead = {
        x: w.snake[0].x + w.directionX,
        y: w.snake[0].y + w.directionY,
    };
    w.snake.unshift(newHead);
    if (newHead.x !== w.foodX || newHead.y !== w.foodY) w.snake.pop();
}

function getUserDirection(w) {
    if (r.IsKeyPressed(r.KEY_RIGHT) && w.directionX !== -1) {
        w.directionX = 1;
        w.directionY = 0;
    } else if (r.IsKeyPressed(r.KEY_LEFT) && w.directionX !== 1) {
        w.directionX = -1;
        w.directionY = 0;
    } else if (r.IsKeyPressed(r.KEY_DOWN) && w.directionY !== -1) {
        w.directionX = 0;
        w.directionY = 1;
    } else if (r.IsKeyPressed(r.KEY_UP) && w.directionY !== 1) {
        w.directionX = 0;
        w.directionY = -1;
    }
}

function setFoodPosition(w) {
    w.foodX = r.GetRandomValue(0, w.gridNumber - 1);
    w.foodY = r.GetRandomValue(0, w.gridNumber - 1);
}

function EatingFood(w) {
    if (w.snake[0].x === w.foodX && w.snake[0].y === w.foodY) {
        w.score++;
        setFoodPosition(w);
    }
}

function gameEnd(w) {
    let head = w.snake[0];
    let outsideLeftWindowX = head.x < 0;
    let outsideLeftWindowY = head.y < 0;
    let outsideRightWindowX = head.x >= w.gridNumber;
    let outsideRightWindowY = head.y >= w.gridNumber;
    if (
        outsideLeftWindowX ||
        outsideRightWindowX ||
        outsideLeftWindowY ||
        outsideRightWindowY
    ) {
        w.gameOver = true;
    }
    for (let i = 1; i < w.snake.length; i++) {
        if (head.x === w.snake[i].x && head.y === w.snake[i].y) {
            w.gameOver = true;
        }
    }
}

function restartGame(w) {
    w.snake = [
        { x: 15, y: 15 },
        { x: 14, y: 15 },
        { x: 13, y: 15 },
    ];

    w.directionX = 1;
    w.directionY = 0;
    w.score = 0;
    w.gameOver = false;

    setFoodPosition(w);
}

module.exports = {
    drawGrid,
    drawSnake,
    setSnakePosition,
    restartGame,
    setFoodPosition,
    gameEnd,
    EatingFood,
    getUserDirection,
};
