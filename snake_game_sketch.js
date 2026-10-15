const r = require("raylib");
const s = require("./snake.js");
function setup(windowWidth, windowHeight) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(windowWidth, windowHeight, "Snake Game");
    r.SetTargetFPS(10);

    let gridNumber = 30;
    let cellSize = windowWidth / gridNumber;
    let directionX = 1;
    let directionY = 0;
    const snake = [
        { x: 15, y: 15 },
        { x: 14, y: 15 },
        { x: 13, y: 15 },
    ];

    return {
        windowWidth,
        windowHeight,
        gridNumber,
        cellSize,
        snake,
        directionX,
        directionY,
        foodX: 0,
        foodY: 0,
        score: 0,
        gameOver: false,
    };
}

function running() {
    return !r.WindowShouldClose();
}
function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    s.drawGrid(world);
    r.DrawText(`Score=${world.score}`, 15, 15, 40, r.GREEN);
    r.DrawRectangle(
        world.foodX * world.cellSize,
        world.foodY * world.cellSize,
        world.cellSize,
        world.cellSize,
        r.RED,
    );
    s.drawSnake(world);
    if (world.gameOver) {
        r.DrawText("GAME OVER", 200, 250, 40, r.RED);
        r.DrawText("Press Space to Restart", 200, 300, 20, r.WHITE);
    }
    r.EndDrawing();
}
function update(world) {
    if (world.gameOver) {
        if (r.IsKeyPressed(r.KEY_SPACE)) {
            s.restartGame(world);
        }
        return;
    }

    s.getUserDirection(world);
    s.setSnakePosition(world);
    s.EatingFood(world);
    s.gameEnd(world);
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    running,
    draw,
    update,
    teardown,
};
