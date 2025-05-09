const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];
const VALID_COMMANDS = ['F', 'B', 'R', 'L'];

const DIRECTIONS_DELTAS = {
    NORTH: { x: 0, y: 1 },
    EAST: { x: 1, y: 0 },
    SOUTH: { x: 0, y: -1 },
    WEST: { x: -1, y: 0 },
};

// Handle Validation to return clean string.
const getCleanStr = (str) => {
    const cleanStr =
        typeof str === "string"
            ? str.toUpperCase().replace(/\s+/g, "")
            : "";

    return cleanStr;
};

// GLobal Handle Error.
const assert = (condition, msg) => condition || (() => { throw new Error(msg); })();

// Handle Rover rotate 
const rotate = (currentDir, turnOffset) => {
    const currentIdx = DIRECTIONS.indexOf(currentDir);
    const newIdx = (currentIdx + turnOffset + 4) % 4;

    return DIRECTIONS[newIdx];
};

// Handle Rover Move
const move = ({ x, y }, direction, obstacles, stepOffset) => {
    const delta = DIRECTIONS_DELTAS[direction];
    const nextDelta = {
        x: x + (delta.x * stepOffset),
        y: y + (delta.y * stepOffset),
    };

    const key = `${nextDelta.x},${nextDelta.y}`;
    const isCollision = obstacles?.has(key);
    console.log(isCollision, key, obstacles);

    return isCollision
        ? { position: { x, y }, direction, status: "STOPPED" }
        : { position: nextDelta, direction };
};

const getCommandMap = (state) => ({
    R: () => ({ direction: rotate(state.direction, 1) }),
    L: () => ({ direction: rotate(state.direction, -1) }),
    F: () => move(state.position, state.direction, state.obstacles, 1),
    B: () => move(state.position, state.direction, state.obstacles, -1),
});

const reduceCommand = (cmd, state) => {
    const execute = getCommandMap(state)[cmd];
    assert(VALID_COMMANDS.includes(cmd), `wrong command: ${cmd}`)

    return execute();
};

const executeCommand = (initX, initY, initDirection, command, obstacles = []) => {
    const cleanDir = getCleanStr(initDirection);
    const cleanCommand = getCleanStr(command);

    let state = {
        position: { x: initX, y: initY },
        direction: cleanDir,
        obstacles: new Set(obstacles.map(([x, y]) => `${x},${y}`)),
    };

    state = [...cleanCommand].reduce((currentState, cmd) => {
        const newState = reduceCommand(cmd, currentState)

        return newState.status || currentState.status
            ? { ...currentState, status: "STOPPED" }
            : { ...currentState, ...newState }
    }, state)

    const { x, y } = state.position;
    const resWithoutObstacles = `(${x}, ${y}) ${state.direction}`
    return state.status
        ? `${resWithoutObstacles} ${state.status}`
        : resWithoutObstacles
};

module.exports = { executeCommand };
console.log(executeCommand(0, 0, 'NORTH', 'F', [[0, 1]]));