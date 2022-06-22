// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  let nextNodesStack = [startNode];
  const rowdir = [0, 0, -1, 1];
  const coldir = [1, -1, 0, 0];
  while (nextNodesStack.length) {
    const currentNode = nextNodesStack.shift();
    if (currentNode === finishNode) return visitedNodesInOrder;

    if (
      !currentNode.isWall &&
      (currentNode.isStart || !currentNode.isVisited)
    ) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      const { col, row } = currentNode;
      let nextNode;
      for (let i = 0; i < 4; i++) {
        const nextrow = row + rowdir[i];
        const nextcol = col + coldir[i];
        if (isValid(nextrow, nextcol, grid)) {
          nextNode = grid[nextrow][nextcol];
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
    }
  }
  // return visitedNodesInOrder;
}

function isValid(nextrow, nextcol, grid) {
  return (
    nextrow >= 0 &&
    nextcol >= 0 &&
    nextrow < grid.length &&
    nextcol < grid[0].length &&
    !grid[nextrow][nextcol].isVisited
  );
}
