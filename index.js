const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];
const VALID_COMMANDS = ['F', 'B', 'R', 'L'];

const DIRECTIONS_DELTAS = {
    NORTH: { x: 0, y: 1 },
    EAST: { x: 1, y: 0 },
    SOUTH: { x: 0, y: -1 },
    WEST: { x: -1, y: 0 },
}

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
const move = ({ x, y }, direction, stepOffset) => {
    const delta = DIRECTIONS_DELTAS[direction];

    const nextDelta = {
        x: x + (delta.x * stepOffset),
        y: y + (delta.y * stepOffset),
    }

    return { position: nextDelta, direction }
};

const getCommandMap = (state) => ({
    R: () => ({ ...state, direction: rotate(state.direction, 1) }),
    L: () => ({ ...state, direction: rotate(state.direction, -1) }),
    F: () => move(state.position, state.direction, 1),
    B: () => move(state.position, state.direction, -1),
});

const reduceCommand = (cmd, state) => {
    const execute = getCommandMap(state)[cmd];
    assert(VALID_COMMANDS.includes(cmd), `wrong command: ${cmd}`)

    return execute();
}

const executeCommand = (initX, initY , initDirection, command) => {
    const cleanDir = getCleanStr(initDirection);
    const cleanCommand = getCleanStr(command);

    let state = {
        position: { x: initX, y: initY },
        direction: cleanDir,
    };

    state = [...cleanCommand].reduce((currentState, cmd) => {
        const newState = reduceCommand(cmd, currentState)

        return newState;
    }, state)

    const { x, y } = state.position;
    return `(${x}, ${y}) ${state.direction}`
}

module.exports = { executeCommand };
