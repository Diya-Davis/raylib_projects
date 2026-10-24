const r = require("raylib");

function setup(width, height, title, fps) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    let selectedSystem = 0;
    const binary = {
        name: "01. Binary Fractal Tree",
        axiom: "0",
        rules: { 1: ["1", "1"], 0: ["1", "[", "0", "]", "0"] },
        iteration: 7,
        angle: -90,
    };

    const systems = [binary];
    //[
    //    "02. Algae",
    //    "03. Fractal Plant",
    //    "04. Sierpinski Triangle",
    //    "05. Koch Curve",
    //    "06. Cantor Set",
    //];

    return { width, height, systems, selectedSystem };
}

function running() {
    return !r.WindowShouldClose();
}

function drawMenu(world) {
    r.ClearBackground(r.BLACK);

    r.DrawText("L-SYSTEMS", 350, 50, 40, r.RED);

    for (let i = 0; i < world.systems.length; i++) {
        let x = 200;
        let y = 150 + i * 100;

        r.DrawRectangle(x, y, 600, 65, r.DARKGRAY);
        r.DrawText(world.systems[i].name, x + 20, y + 15, 25, r.GREEN);
    }
}

function drawSelectedSystem(w) {
    r.ClearBackground(r.BLACK);
    const system = w.systems[w.selectedSystem - 1];
    r.DrawText(system.name, 30, 30, 30, r.GREEN);
    const sequence = getFractalSequence(
        system.axiom,
        system.rules,
        system.iteration,
    );
    drawFractal(sequence, w, system.angle);
}

function drawFractal(sequence, world, angle) {
    let x = world.width / 2;
    let y = world.height - 20;
    let length = 5;
    const stack = [];

    for (const symbol of sequence) {
        if (symbol === "1" || symbol === "0") {
            const radians = angle * (Math.PI / 180);
            const newX = x + length * Math.cos(radians);
            const newY = y + length * Math.sin(radians);

            r.DrawLineEx({ x, y }, { x: newX, y: newY }, 3, r.GREEN);

            x = newX;
            y = newY;
        } else if (symbol === "[") {
            stack.push({ x, y, angle });
            angle -= 45;
        } else if (symbol === "]") {
            const saved = stack.pop();
            x = saved.x;
            y = saved.y;
            angle = saved.angle + 45;
        }
    }
}

function getFractalSequence(sequence, rules, iteration) {
    if (iteration === 0) return sequence;
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
    return getFractalSequence(newSequence, rules, iteration - 1);
}

function draw(world) {
    r.BeginDrawing();

    if (world.selectedSystem === 0) {
        drawMenu(world);
    } else {
        drawSelectedSystem(world);
    }

    r.EndDrawing();
}

function update(w) {
    if (r.IsKeyPressed(r.KEY_RIGHT)) w.selectedSystem += 1;
    if (r.IsKeyPressed(r.KEY_LEFT)) w.selectedSystem -= 1;
    if (r.IsKeyPressed(r.KEY_SPACE)) w.selectedSystem = 0;
    if (w.selectedSystem === w.systems.length + 1 || w.selectedSystem === -1)
        w.selectedSystem = 0;
}

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
    const world = setup(1000, 900, "L-System", 60);
    loop(world);
    teardown();
}

main();
