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
- Simply, a sorting algorithm is an algorithm that puts each element of a list into an order. 
- There are countless types and variations each with different uses and time complexities depending on the task.

### Bubble Sort
- Average Time Complexity: O(n^2)
- Bubble sort is extremely easy to code, however quite slow in terms of time complexity.
- Iteratively steps through a list, comparing two elements and swapping the two into the desired order.

### Selection Sort
- Average Time Complexity: O(n^2)
- Like bubble sort, slow in terms of time complexity.
- Iterates through a list, selecting the smallest value. Once the smallest value of the iteration is found, it is sorted to the front of the list.

### Insertion Sort
- Average Time Complexity: O(n^2)
- Slow in terms of time complexity but can have advantages for smaller sample sizes.
- Iterating through a list, an item is selected and repeatedly sorted amonst already sorted items.

### Merge Sort
- Average Time Complexity: O(nlogn)
- divide-and-conquer !
- Far more efficient than the ones seen so far.
- Merge sort recursively splits a list into sublists.
- Sublists are merged into a list by comparing in desired order through comparing the starting index of sublist a or b, removing and adding the selected index to the new list. 

### Quick Sort - **Visualisation Pending**
- Average Time Complexity: O(nlogn)
- Also divide-and-conquer
- A 'pivot' is selected in an array and sub arrays are created relative to the left and right of this pivot. 
- Recursively, this process is repeated, sorting the partitioned left and right sub arrays. 

### Heap Sort - **Visualisation Pending**
- Average Time Complexity: O(nlogn)
- A better Selection sort.
- Being in the name, rather than iterating through an array, heap sort, uses a **heap**, being able to find the largest element of a heap in a given step. 

### Radix Sort - **Visualisation Pending**
- Average Time Complexity: O(n * k/d)
- Radix: the number of unique digits. i.e. 0 = 1, 10 = 2, 100 = 3
- Sorts all values by radix. 
- Example: [123, 41, 232, 4, 0, 93]
- step 1: [0, 41, 232, 123, 93] sorting by 0's
- step 3: [0, 123, 41, 232, 93] sorting by 10's
- step 4: [0, 41, 93, 123, 232] sorting by 100's
- Very cool!

### Bogo Sort - **Visualisation Pending**
- Average Time Complexity: (n*n!)
- Worst Case Time Complexity: Infinity
- A permutation of array is created and checked to be in sorted order, if not, repeat.
- This can work on the first try or have a run time that lasts longer than the universe has existed. 
- Might not ever represent this one. Stupid idea, very cool.

## Game Theory 

### Minimax: *TIC-TAC-TOE* - **Visualisation Pending**
- An algorithm that maximises the possiblity of winning or one that minimises the posibility of losing.
- Minimax calculates a tree of possible moves that can be made by a player and itself. 
- Scores are given to the nodes of the calculated trees, allowing the algorithm to in a way ***predict the future***. woah!


### Backtracking (DFS): *Sudoku* - **Visualisation Pending**
- A brute force approach to solving a given sudoku puzzle.
- Values 1-9 are checked and verified until a board is solved. 


## Misc 

### Wave Function Collapse (WFC) and Procedural Content Generation (PCG) **Visualisation Pending**
- My favourite algorithm!
- An image-based PCG (Procedural Content Generation) algorithm that identifies constraints from an input and generates a similar output.
- Imagine an input of tiles. Each tile can connect to only a certain few other types of tiles. 
- Example: 
- Water can connect to water and sand.
- Sand can connect to sand, water, and grass.
- Grass can connect to sand, and grass.
- In a simple case, a 2d space is being created. Uncertainty is equal amongst all tiles
- Selecting a random area, a tile is placed. 
- Since a tile is placed, the surrounding entropy is now lowered (the possible surrounding tiles).
- A tile is placed, uncertainty is lowered - less types of tiles are allowed to be placed.
- Tiles are placed amongst other tiles creating an island. 

