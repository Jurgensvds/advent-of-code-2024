export interface GridCoord {
    row: number;
    col: number;
}

export const getAllNeighbors = (grid: string[][], row: number, col: number): GridCoord[] => {
    const neighbors: GridCoord[] = [];
    if (row > 0) {
      neighbors.push({ row: row - 1, col });
    }
    if (row < grid.length - 1) {
      neighbors.push({ row: row + 1, col });
    }
    if (col > 0) {
      neighbors.push({ row, col: col - 1 });
    }
    if (col < grid[0].length - 1) {
      neighbors.push({ row, col: col + 1 });
    }
    return neighbors;
  };