export const checkRowComplete = (grid, cuts) => {
    for (let row = 0; row < grid.length; row++) {
        if (cuts[row].every((cell) => cell === true)) {
            return true;
        }
    }
    return false;
};

export const checkColumnComplete = (grid, cuts) => {
    for (let col = 0; col < grid[0].length; col++) {
        if (grid.every((row, rowIndex) => cuts[rowIndex][col] === true)) {
            return true;
        }
    }
    return false;
};