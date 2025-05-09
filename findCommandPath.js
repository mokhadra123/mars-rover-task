const { rotate, calcNewPosition } = require("./index");

// Calculate distance between two points with manhattan distance
const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const findCommandPath = (initPos, initDir, goalPos, obstacles = []) => {
    // destruction the object positions (initial and goal)
    const { initX, initY } = initPos;
    const { goalX, goalY } = goalPos;

    // Initialize visited positions with Set to avoid revisiting them.
    const visited = new Set();
    // Initialize a queue to store neighboring positions and their associated data.
    const queue = [{
        position: { x: initX, y: initY },
        direction: initDir,
        path: "",
        cost: 0,
    }];

    // Check on obstacles positions
    const isObstacle = (x, y) => obstacles.some(([obsX, obsY]) => obsX === x && obsY === y);
    // Generate Key for a position and direction to store it inside visited set.
    const getKey = ({ x, y }, direction) => `${x},${y},${direction}`;

    while (queue.length > 0) {
        // Sort queue with the smallest cost.
        queue.sort((a, b) =>
            (a.cost + heuristic(a.position, { x: goalX, y: goalY })) -
            (b.cost + heuristic(b.position, { x: goalX, y: goalY }))
        );

        // Dequeue the first position and store its position and direction as a unique key.
        const current = queue.shift();
        const key = getKey(current.position, current.direction)

        // skip if it is visited.
        if (visited.has(key)) continue;
        visited.add(key);

         // Goal reached
        if (current.position.x === goalX && current.position.y === goalY) {
            return current.path;
        }

        // Define possible command options with each command options new Position OR new direction.
        const commandOptions = [
            ["F", calcNewPosition(current.position, current.direction, 1), current.direction],
            ["B", calcNewPosition(current.position, current.direction, -1), current.direction],
            ["L", current.position, rotate(current.direction, -1)],
            ["R", current.position, rotate(current.direction, 1)],
        ];

        // Ensure that only valid moves to can add them to the queue.
        const options = commandOptions.filter(([cmd, pos]) => {
            if (cmd === "F" || cmd === "B") {
                return !isObstacle(pos.x, pos.y); 
            }
            return true;
        });

        // After check on valid moves map on the options and push the next state into the queue.
        options.forEach(([cmd, nextPos, nextDir]) =>
            queue.push({
                position: nextPos,
                direction: nextDir,
                path: current.path + cmd,
                cost: current.cost + 1
            })
        )
    }

    return null;
};

module.exports = { findCommandPath };
