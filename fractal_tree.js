const r = require("raylib");
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
        for (const substitute of rules[element]) {
            newSequence.push(substitute);
        }
    }
    return getFractalSequence(newSequence, rules, noOfFractral - 1);
}

// function drawFractal(sequence, w) {
//     r.DrawLineEx(
//         { x: w.windowWidth / 2, y: w.windowHeight },
//         { x: w.windowWidth / 2, y: w.windowHeight - 50 },
//         5,
//         r.BLACK,
//     );
// }

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);
    const rules = { A: ["A", "B"], B: ["A"] };
    const noOfFractral = 5;
    const sequence = getFractalSequence("A", rules, noOfFractral);
    //drawFractal(sequence, world);
    console.log(sequence);
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
    const world = setup(600, 600, "Fractal tree", 60);
    loop(world);
    teardown();
}
main();
