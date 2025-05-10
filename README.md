
# 🚀 Mars Rover Control System

A Node.js application that simulates the movement of a Mars Rover on a 2D grid. The rover accepts directional commands and can navigate while avoiding obstacles. The project is structured into three distinct parts, each implemented in its own Git branch.

---

## 📌 Project Overview

This project is divided into the following parts:

- **Part 1**: Basic rover movement using commands (`F`, `B`, `L`, `R`)
- **Part 2**: Obstacle detection and collision handling
- **Part 3**: Command pathfinding logic to reach a destination while avoiding obstacles

Each part is implemented in a **separate branch** to keep the code modular and organized.

---

## 🧭 How to Use

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mars-rover.git
cd mars-rover
```

### 2. Checkout the part you want to explore

```bash
git checkout mars-rover-part-1   # Basic movement
git checkout mars-rover-part-2   # Movement + obstacle avoidance
git checkout mars-rover-part-3   # PathFinding logic
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the application

You can use the exported function `executeCommand` as shown below:

```javascript
const { executeCommand } = require("./index");

// Move the rover from (0,0), facing NORTH, with command "FFRFF"
const result = executeCommand(0, 0, "NORTH", "FFRFF");
console.log(result); // Output: (2, 2) EAST
```

With obstacles:

```javascript
const obstacles = [[1, 1], [2, 2]];
const resultWithObstacles = executeCommand(0, 0, "NORTH", "FFRFF", obstacles);
console.log(resultWithObstacles); // Output: (1, 1) EAST STOPPED
```

---

## 📍 Part 3: Command Pathfinding

The `findCommandPath` function allows the rover to find the best path from a starting position to a target position while avoiding obstacles.

### Example Usage:

```javascript
const { findCommandPath } = require("./findCommandPath");

// Define start/end points , directions and obstacles
const startPoint = { initX: 0, initY: 0};
const direction = "NORTH"
const endPoint = { goalX: 3, goalY: 2 };
const obstacles = [[1, 0], [2, 1]];

// Find a command path
const path = findCommandPath(startPoint, direction, endPoint, obstacles);
console.log(path); // Example output: "FRFFRFF"
```


## 🧪 Run Tests

This project includes unit tests written using **Jest**. To run tests:

```bash
npm test
```

---

## 📂 Project Structure

| File / Folder         | Description                             |
|-----------------------|-----------------------------------------|
| `index.js`            | Main logic (Parts 1 & 2)                |
| `findCommandPath.js`  | PathFinding logic (Part 3)              |
| `__test__/`           | Unit tests                              |
| `package.json`        | Project metadata and dependencies       |

---

## ⚙️ Tech Stack

- **Node.js** – JavaScript runtime environment  
- **Jest** – Testing framework  
