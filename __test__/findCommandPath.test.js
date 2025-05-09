const { findCommandPath } = require("../findCommandPath");

test("generate command with complex obstacles", () => {
    const obstacles = [[2, 0], [2, 1]];
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'EAST', 
        { goalX: 3, goalY: 3 }, 
        obstacles
    );
    expect(result).toBe("FLFFFLBB");
});

test("generate simple forward command", () => {
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'NORTH', 
        { goalX: 0, goalY: 3 }, 
    );
    expect(result).toBe("FFF");
});

test("generate turn and move command", () => {
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'NORTH', 
        { goalX: 2, goalY: 0 }
    );
    expect(["RFF", "LBB"]).toContain(result);
});

test("generate command with backward", () => {
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'SOUTH', 
        { goalX: 0, goalY: 1 }, 
    );
    expect(result).toBe("B");
});

test("generate command with left turns", () => {
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'EAST', 
        { goalX: 0, goalY: 2 }, 
    );
    expect(result).toBe("LFF");
});

test("generate command with right turns", () => {
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'WEST', 
        { goalX: 2, goalY: 0 }, 
    );
    expect(result).toBe("BB");
});

test("generate command path with complex obstacles in the way", () => {
    const obstacles = [
        [0, 1], [1, 1], [-1, -1], [-1, 1], [1, -1], 
        [-1, 0], [1, 0], [-1, 2], [2, 2], [2, -2], 
        [-2, 2], [-2, -2], [1, 2]
    ];
    const result = findCommandPath(
        { initX: 0, initY: 0 }, 
        'NORTH', 
        { goalX: 0, goalY: 2 }, 
        obstacles
    );
    expect(result).toBe("BBBLFFFLBBBBBBLFFFLB");
});

