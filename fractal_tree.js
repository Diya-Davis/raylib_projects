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

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);
    const rules = { 1: ["1", "1"], 0: ["1", "[", "0", "]", "0"] };
    const noOfFractral = 5;
    const sequence = getFractalSequence("1", rules, noOfFractral);
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
