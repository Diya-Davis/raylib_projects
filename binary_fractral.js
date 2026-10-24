const r = require("raylib");

//const DRAW_RULES = {};
//
//const SYSTEMS = {
//    TREE: {
//        INITIAL: "0",
//        RULES: {
//            0: "101",
//            1: "11",
//        },
//        ITERATION: 5,
//        DELTA_ANGLE: 45
//    },
//};

function setup(windowWidth, windowHeight, title, FPS) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(windowWidth, windowHeight, title);
    r.SetTargetFPS(FPS);

    return {
        windowWidth,
        windowHeight,
        FPS,
        title,
    };
}

function running() {
    return !r.WindowShouldClose();
}

function getFractalSequence(sequence, rules, noOfFractral) {
    if (noOfFractral === 0) return sequence;
    const newSequence = [];

    for (const element of sequence) {
        if (rules[element]) {
            for (const substitute of rules[element]) {
                newSequence.push(substitute);
            }
        } else {
            newSequence.push(element);
        }
    }
    return getFractalSequence(newSequence, rules, noOfFractral - 1);
}

function drawFractal(sequence, world) {
    let x = world.windowWidth / 2;
    let y = world.windowHeight - 20;
    let angle = -90;
    let length = 5;
    const stack = [];

    for (const symbol of sequence) {
        if (symbol === "1" || symbol === "0") {
            const radians = angle * (Math.PI / 180);
            const newX = x + length * Math.cos(radians);
            const newY = y + length * Math.sin(radians);

            r.DrawLineEx({ x, y }, { x: newX, y: newY }, 5, r.GREEN);

            x = newX;
            y = newY;
        } else if (symbol === "[") {
            stack.push({ x, y, angle });
            angle -= 406;
        } else if (symbol === "]") {
            const saved = stack.pop();
            x = saved.x;
            y = saved.y;
            angle = saved.angle + 40;
        }
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);
    const rules = { 1: ["1", "1"], 0: ["1", "[", "0", "]", "0"] };
    const noOfFractral = 7;
    const sequence = getFractalSequence("0", rules, noOfFractral);
    drawFractal(sequence, world);
    r.EndDrawing();
}

function update(world) {}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    while (running()) {
        draw(world);
        update(world);
    }
}

function main() {
    const world = setup(1000, 900, "Fractal tree", 60);
    loop(world);
    teardown();
}
main();
