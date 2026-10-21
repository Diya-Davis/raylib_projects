const r = require("raylib");

function setup(width, height, fps, title) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(width, height, title);
    r.SetTargetFPS(fps);

    const sun = { x: 400, y: 400, radius: 30, color: r.ORANGE, speed: 1 };
    const mercury = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 320,
        color: r.GOLD,
        speed: 0.005,
    };
    const venus = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 280,
        color: r.ORANGE,
        speed: 0.008,
    };
    const earth = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 240,
        color: r.GREEN,
        speed: 0.006,
    };
    const mars = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 200,
        color: r.RED,
        speed: 0.004,
    };
    const jupiter = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 160,
        color: r.LIGHTGRAY,
        speed: 0.007,
    };
    const saturn = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 120,
        color: r.BROWN,
        speed: 0.003,
    };
    const uranus = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 80,
        color: r.SKYBLUE,
        speed: 0.009,
    };
    const neptune = {
        radius: 15,
        angle: 0,
        x: 400,
        y: 40,
        color: r.BLUE,
        speed: 0.001,
    };
    const planets = [
        mercury,
        venus,
        earth,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
    ];
    return { width, height, planets, sun };
}
function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    drawOrbits(world.sun, world.width);
    drawPlanet(world);
    r.EndDrawing();
}

function drawPlanet(world) {
    planets = world.planets;
    for (const planet of planets) {
        r.DrawCircleV(planet, planet.radius, planet.color);
    }
    r.DrawCircleV(world.sun, world.sun.radius, world.sun.color);
}

function drawOrbits(sun, width) {
    for (let i = 0.9; i >= 0.2; i = i - 0.1) {
        r.DrawCircleV(sun, (width / 2) * i, r.WHITE);
        r.DrawCircleV(sun, (width / 2) * (i - 0.01), r.BLACK);
    }
}

function running() {
    return !r.WindowShouldClose();
}

function teardown() {
    r.CloseWindow();
}

function update(world) {
    planets = world.planets;
    radii = 80;
    for (const planet of planets) {
        planet.x = Math.cos(planet.angle * Math.PI) * radii + world.sun.x;
        planet.y = Math.sin(planet.angle * Math.PI) * radii + world.sun.y;
        radii += 40;
    }
    for (const planet of planets) {
        planet.angle = planet.angle + planet.speed;
    }
}

module.exports = {
    setup,
    running,
    draw,
    teardown,
    update,
};
