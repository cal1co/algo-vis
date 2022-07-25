# Algo-Vis

## An interactive and educational algorithm visualising tool. 

## [Live Link](https://algo-vis-tool.netlify.app)

## Pathfinding 
- Pathfinding algorithms are algrothms that are tasked with *pathing* the shortest route between two points.
- These algorithms (for the most part) stem from *Dijkstras* algorithm.
- Pathfinding algorithms are applied for tasks in our day to day lives such as Google Maps, Uber, Sat Nav/GPS, and more.

### Dijkstras
- A weighted algorithm. **Weight visualisation pending**
- Begins at a node and examines neighbours with the lowest distance.
- The current node is marked visited after evaluating neighbours.
- The process repeats until a neighbour is found to be the target node.

### A*
- A variant of Dijkstras.
- Commonly used in video games. How can a zombie find where you are relative to itself? 
- A* greatly improves the performance of pathfinding relative to Dijkstras *(Sometimes being almost 60 times faster!)*. 
- Nodes are assigned weights equal to the weight of the edge to that node in addition to the approximate distance between the node and the target. i.e. A score is given to a node by calculating the distance (called *heuristic* - ignoring barriers and other obstacles) in addition to the number of steps already taken to from the starting position. 
- By choosing the nodes with the lowest heuristic 

### Breadth First Search (BFS)
- Breadth first search explores equally in all directions.
- Imagine a stack where you take from the top every iteration. When a node is visited, its neighbours are added to the bottom.

### Depth First Search (DFS)
- Depth first search explores all nodes in a direction until it needs to backtrack. 
- Imagine a stack where you take from the top every iteration. When a node is visited, its neighbours are added to the top 

## Maze Generation:
- There are many ways of generating mazes

### Kruskals
- Kruskals algorithm creates a minimum spanning tree.
- A minimum spanning tree or *'MST'* is a tree which connects nodes to one another without creating a cycle (edges that belong to the same tree). 
- Selecting the smallest edge (or random if edges are of equal weights), nodes are connected with one another in a way which creates a tree. 
- Edges cannot be selected if their nodes already belong in the same tree.
- Creating a MST ensures that the maze is always solvable due to the fact that all nodes are connected in a way inwhich ensures a path between two nodes

## Sorting 

### Bubble Sort 

### Selection Sort

### Insertion Sort

### Merge Sort

### Quick Sort

### Heap Sort

### Radix Sort

### Bogo Sort


## Game Theory 

### *TIC-TAC-TOE:* Mini-Max 

### *Sudoku:* Backtracking (DFS) 

## Misc 

### Wave Function Collapse (WFC) and Procedural Content Generation (PCG)