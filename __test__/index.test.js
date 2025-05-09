const { executeCommand } = require("../index");

describe('Execute command', () => {
    describe('Mars Rover Command Execution without obstacles', () => {
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

    describe('Rover Obstacle Handling', () => {
        test('rover stops when obstacle encountered while moving forward', () => {
            const obstacles = [[0, 1]];
            const result = executeCommand(0, 0, 'NORTH', 'F', obstacles);
            expect(result).toBe('(0, 0) NORTH STOPPED');
        });

        test('rover stops when obstacle encountered while moving backward', () => {
            const obstacles = [[0, -1]];
            const result = executeCommand(0, 0, 'NORTH', 'B', obstacles);
            expect(result).toBe('(0, 0) NORTH STOPPED');
        });

        test('rover position is last safe position before obstacle', () => {
            const obstacles = [[0, 2]];
            const result = executeCommand(0, 0, 'NORTH', 'FF', obstacles);
            expect(result).toBe('(0, 1) NORTH STOPPED');
        });

        test('rover handles multiple obstacles correctly', () => {
            const obstacles = [[0, 1], [1, 1], [2, 1]];
            const result = executeCommand(0, 0, 'NORTH', 'FFFF', obstacles);
            expect(result).toBe('(0, 0) NORTH STOPPED');
        });

        test('full command sequence with obstacle detection', () => {
            const obstacles = [[1, 2]];
            const result = executeCommand(0, 0, 'NORTH', 'FFRFF', obstacles);
            expect(result).toBe('(0, 2) EAST STOPPED');
        });

        test('rover does not change heading on obstacle', () => {
            const obstacles = [[0, 1]];
            const result = executeCommand(0, 0, 'NORTH', 'FLF', obstacles);
            expect(result).toBe('(0, 0) NORTH STOPPED');
        });

        test('obstacle on initial position does not block movement', () => {
            const obstacles = [[0, 0]];
            const result = executeCommand(0, 0, 'NORTH', 'F', obstacles);
            expect(result).toBe('(0, 1) NORTH');
        });
    });
});

