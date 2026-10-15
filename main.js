const sketch = require("./snake_game_sketch");

function loop(world) {
    while (sketch.running()) {
        sketch.draw(world);
        sketch.update(world);
    }
}

function main() {
    const world = sketch.setup(600, 600);
    loop(world);
    sketch.teardown();
}
main();
