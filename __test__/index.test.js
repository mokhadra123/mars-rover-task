const { executeCommand } = require("../index");

describe('Mars Rover Command Execution', () => {
    test('initial position and heading is set correctly', () => {
        const result = executeCommand(0, 0, 'NORTH', '');
        expect(result).toBe('(0, 0) NORTH');
    });

    test('single forward command moves rover correctly', () => {
        const result = executeCommand(0, 0, 'NORTH', 'F');
        expect(result).toBe('(0, 1) NORTH');
    });

    test('single backward command moves rover correctly', () => {
        const result = executeCommand(0, 0, 'NORTH', 'B');
        expect(result).toBe('(0, -1) NORTH');
    });

    test('left turn rotates rover 90 degrees counterclockwise', () => {
        const result = executeCommand(0, 0, 'NORTH', 'L');
        expect(result).toBe('(0, 0) WEST');
    });

    test('right turn rotates rover 90 degrees clockwise', () => {
        const result = executeCommand(0, 0, 'NORTH', 'R');
        expect(result).toBe('(0, 0) EAST');
    });

    test('multiple commands are executed in sequence', () => {
        const result = executeCommand(0, 0, 'NORTH', 'FFRFF');
        expect(result).toBe('(2, 2) EAST');
    });

    test('final position after complex command sequence', () => {
        const result = executeCommand(1, 2, 'EAST', 'LFLFLFLFF');
        expect(result).toBe('(2, 2) EAST');
    });

    test('negative coordinates are handled correctly', () => {
        const result = executeCommand(0, 0, 'SOUTH', 'F');
        expect(result).toBe('(0, -1) SOUTH');
    });

    test('invalid command raises exception', () => {
        expect(() => {
            executeCommand(0, 0, 'NORTH', 'FX');
        }).toThrow('wrong command: X');
    });
});
