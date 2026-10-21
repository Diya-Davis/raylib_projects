const sketch = require("./solar_system");

function loop(world) {
    while (sketch.running()) {
        sketch.draw(world);
        sketch.update(world);
    }
}
function main() {
    const world = sketch.setup(800, 800, 30, "Solar system");
    loop(world);
    sketch.teardown();
}
main();
