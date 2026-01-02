export type MultipleChoiceOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  question: string;
  options: MultipleChoiceOption[];
  points: number;
  explanation?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  questions: Question[];
  totalPoints: number;
};

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    description: 'Test your understanding of basic algorithmic concepts and computational thinking.',
    difficulty: 'Easy',
    category: 'Fundamentals',
    questions: [
      {
        id: 'q1',
        question: 'What is an algorithm?',
        options: [
          { id: 'a', text: 'A programming language', isCorrect: false },
          { id: 'b', text: 'A step-by-step procedure to solve a problem', isCorrect: true },
          { id: 'c', text: 'A type of computer hardware', isCorrect: false },
          { id: 'd', text: 'A database management system', isCorrect: false }
        ],
        points: 25,
        explanation: 'An algorithm is a well-defined sequence of steps to solve a problem or perform a computation.'
      },
      {
        id: 'q2',
        question: 'Which of the following is NOT a characteristic of a good algorithm?',
        options: [
          { id: 'a', text: 'Clear and unambiguous', isCorrect: false },
          { id: 'b', text: 'Has well-defined inputs and outputs', isCorrect: false },
          { id: 'c', text: 'Infinite in execution time', isCorrect: true },
          { id: 'd', text: 'Effective and feasible', isCorrect: false }
        ],
        points: 25,
        explanation: 'A good algorithm must terminate after a finite number of steps.'
      },
      {
        id: 'q3',
        question: 'What is the time complexity of linear search in the worst case?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: false },
          { id: 'b', text: 'O(log n)', isCorrect: false },
          { id: 'c', text: 'O(n)', isCorrect: true },
          { id: 'd', text: 'O(n²)', isCorrect: false }
        ],
        points: 25,
        explanation: 'Linear search examines each element one by one, so in the worst case it checks all n elements.'
      },
      {
        id: 'q4',
        question: 'Which data structure uses LIFO (Last In First Out) principle?',
        options: [
          { id: 'a', text: 'Queue', isCorrect: false },
          { id: 'b', text: 'Stack', isCorrect: true },
          { id: 'c', text: 'Array', isCorrect: false },
          { id: 'd', text: 'Tree', isCorrect: false }
        ],
        points: 25,
        explanation: 'A stack follows the LIFO principle where the last element added is the first one to be removed.'
      }
    ],
    totalPoints: 100
  },
  {
    id: '2',
    title: 'Sorting and Searching',
    description: 'Evaluate your knowledge of sorting algorithms and search techniques.',
    difficulty: 'Easy',
    category: 'Algorithms',
    questions: [
      {
        id: 'q1',
        question: 'Which sorting algorithm has the best average-case time complexity?',
        options: [
          { id: 'a', text: 'Bubble Sort - O(n²)', isCorrect: false },
          { id: 'b', text: 'Quick Sort - O(n log n)', isCorrect: true },
          { id: 'c', text: 'Selection Sort - O(n²)', isCorrect: false },
          { id: 'd', text: 'Insertion Sort - O(n²)', isCorrect: false }
        ],
        points: 25,
        explanation: 'Quick Sort has an average time complexity of O(n log n), making it one of the most efficient sorting algorithms.'
      },
      {
        id: 'q2',
        question: 'Binary search can only be applied to:',
        options: [
          { id: 'a', text: 'Unsorted arrays', isCorrect: false },
          { id: 'b', text: 'Sorted arrays', isCorrect: true },
          { id: 'c', text: 'Linked lists only', isCorrect: false },
          { id: 'd', text: 'Trees only', isCorrect: false }
        ],
        points: 25,
        explanation: 'Binary search requires the data to be sorted to efficiently divide the search space in half.'
      },
      {
        id: 'q3',
        question: 'What is the space complexity of merge sort?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: false },
          { id: 'b', text: 'O(log n)', isCorrect: false },
          { id: 'c', text: 'O(n)', isCorrect: true },
          { id: 'd', text: 'O(n²)', isCorrect: false }
        ],
        points: 25,
        explanation: 'Merge sort requires O(n) additional space for the temporary arrays during the merge process.'
      },
      {
        id: 'q4',
        question: 'Which statement about bubble sort is TRUE?',
        options: [
          { id: 'a', text: 'It is the most efficient sorting algorithm', isCorrect: false },
          { id: 'b', text: 'It repeatedly swaps adjacent elements if they are in wrong order', isCorrect: true },
          { id: 'c', text: 'It cannot sort arrays with duplicate elements', isCorrect: false },
          { id: 'd', text: 'It requires O(n log n) time in all cases', isCorrect: false }
        ],
        points: 25,
        explanation: 'Bubble sort works by repeatedly comparing and swapping adjacent elements that are out of order.'
      }
    ],
    totalPoints: 100
  },
  {
    id: '3',
    title: 'Recursion and Functions',
    description: 'Test your understanding of recursive algorithms and function calls.',
    difficulty: 'Medium',
    category: 'Recursion',
    questions: [
      {
        id: 'q1',
        question: 'What is the base case in a recursive function?',
        options: [
          { id: 'a', text: 'The first function call', isCorrect: false },
          { id: 'b', text: 'The condition that stops recursion', isCorrect: true },
          { id: 'c', text: 'The return statement', isCorrect: false },
          { id: 'd', text: 'The parameter of the function', isCorrect: false }
        ],
        points: 20,
        explanation: 'The base case is the condition that stops the recursion from continuing indefinitely.'
      },
      {
        id: 'q2',
        question: 'What is the value of factorial(5)?',
        options: [
          { id: 'a', text: '25', isCorrect: false },
          { id: 'b', text: '120', isCorrect: true },
          { id: 'c', text: '60', isCorrect: false },
          { id: 'd', text: '720', isCorrect: false }
        ],
        points: 20,
        explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120'
      },
      {
        id: 'q3',
        question: 'Which of the following problems is best solved with recursion?',
        options: [
          { id: 'a', text: 'Finding maximum in an array', isCorrect: false },
          { id: 'b', text: 'Tree traversal', isCorrect: true },
          { id: 'c', text: 'Linear search', isCorrect: false },
          { id: 'd', text: 'Bubble sort', isCorrect: false }
        ],
        points: 20,
        explanation: 'Tree traversal naturally fits the recursive paradigm as trees have a recursive structure.'
      },
      {
        id: 'q4',
        question: 'What happens if a recursive function has no base case?',
        options: [
          { id: 'a', text: 'The program runs faster', isCorrect: false },
          { id: 'b', text: 'It causes infinite recursion/stack overflow', isCorrect: true },
          { id: 'c', text: 'It returns null', isCorrect: false },
          { id: 'd', text: 'It compiles but does nothing', isCorrect: false }
        ],
        points: 20,
        explanation: 'Without a base case, the function will call itself indefinitely, leading to stack overflow.'
      },
      {
        id: 'q5',
        question: 'What is tail recursion?',
        options: [
          { id: 'a', text: 'Recursion that occurs at the end of the program', isCorrect: false },
          { id: 'b', text: 'When the recursive call is the last operation in the function', isCorrect: true },
          { id: 'c', text: 'Recursion with multiple base cases', isCorrect: false },
          { id: 'd', text: 'A type of loop', isCorrect: false }
        ],
        points: 20,
        explanation: 'Tail recursion occurs when the recursive call is the last operation, allowing for optimization.'
      }
    ],
    totalPoints: 100
  },
  {
    id: '4',
    title: 'Data Structures Basics',
    description: 'Assess your knowledge of fundamental data structures.',
    difficulty: 'Medium',
    category: 'Data Structures',
    questions: [
      {
        id: 'q1',
        question: 'Which data structure uses FIFO (First In First Out) principle?',
        options: [
          { id: 'a', text: 'Stack', isCorrect: false },
          { id: 'b', text: 'Queue', isCorrect: true },
          { id: 'c', text: 'Tree', isCorrect: false },
          { id: 'd', text: 'Graph', isCorrect: false }
        ],
        points: 20,
        explanation: 'A queue follows FIFO where the first element added is the first one to be removed.'
      },
      {
        id: 'q2',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: true },
          { id: 'b', text: 'O(log n)', isCorrect: false },
          { id: 'c', text: 'O(n)', isCorrect: false },
          { id: 'd', text: 'O(n²)', isCorrect: false }
        ],
        points: 20,
        explanation: 'Array elements can be accessed directly using their index in constant time O(1).'
      },
      {
        id: 'q3',
        question: 'In a binary tree, what is the maximum number of nodes at level 3?',
        options: [
          { id: 'a', text: '4', isCorrect: false },
          { id: 'b', text: '8', isCorrect: true },
          { id: 'c', text: '16', isCorrect: false },
          { id: 'd', text: '7', isCorrect: false }
        ],
        points: 20,
        explanation: 'At level k, a binary tree can have at most 2^k nodes. At level 3: 2^3 = 8 nodes.'
      },
      {
        id: 'q4',
        question: 'Which operation is NOT typically associated with a stack?',
        options: [
          { id: 'a', text: 'Push', isCorrect: false },
          { id: 'b', text: 'Pop', isCorrect: false },
          { id: 'c', text: 'Peek/Top', isCorrect: false },
          { id: 'd', text: 'Enqueue', isCorrect: true }
        ],
        points: 20,
        explanation: 'Enqueue is a queue operation. Stack operations are push, pop, and peek/top.'
      },
      {
        id: 'q5',
        question: 'What is a linked list?',
        options: [
          { id: 'a', text: 'A collection of nodes where each node contains data and a reference to the next node', isCorrect: true },
          { id: 'b', text: 'A sorted array', isCorrect: false },
          { id: 'c', text: 'A type of tree structure', isCorrect: false },
          { id: 'd', text: 'A hash table', isCorrect: false }
        ],
        points: 20,
        explanation: 'A linked list is a linear data structure where elements are stored in nodes, each pointing to the next.'
      }
    ],
    totalPoints: 100
  },
  {
    id: '5',
    title: 'Array Operations',
    description: 'Evaluate your understanding of array manipulation and operations.',
    difficulty: 'Easy',
    category: 'Arrays',
    questions: [
      {
        id: 'q1',
        question: 'What is the index of the first element in an array?',
        options: [
          { id: 'a', text: '1', isCorrect: false },
          { id: 'b', text: '0', isCorrect: true },
          { id: 'c', text: '-1', isCorrect: false },
          { id: 'd', text: 'Depends on the language', isCorrect: false }
        ],
        points: 25,
        explanation: 'In most programming languages, array indexing starts at 0.'
      },
      {
        id: 'q2',
        question: 'Which operation takes O(n) time for an array?',
        options: [
          { id: 'a', text: 'Accessing an element by index', isCorrect: false },
          { id: 'b', text: 'Finding the maximum element in an unsorted array', isCorrect: true },
          { id: 'c', text: 'Updating an element at a given index', isCorrect: false },
          { id: 'd', text: 'Getting the array length', isCorrect: false }
        ],
        points: 25,
        explanation: 'Finding the maximum requires examining all n elements in the worst case.'
      },
      {
        id: 'q3',
        question: 'What is a two-dimensional array?',
        options: [
          { id: 'a', text: 'An array with two elements', isCorrect: false },
          { id: 'b', text: 'An array of arrays', isCorrect: true },
          { id: 'c', text: 'Two separate arrays', isCorrect: false },
          { id: 'd', text: 'An array sorted in two ways', isCorrect: false }
        ],
        points: 25,
        explanation: 'A 2D array is essentially an array where each element is itself an array, forming a matrix.'
      },
      {
        id: 'q4',
        question: 'What happens when you try to access an array index that is out of bounds?',
        options: [
          { id: 'a', text: 'Returns 0', isCorrect: false },
          { id: 'b', text: 'Returns null', isCorrect: false },
          { id: 'c', text: 'Causes an error/exception', isCorrect: true },
          { id: 'd', text: 'Returns the last element', isCorrect: false }
        ],
        points: 25,
        explanation: 'Accessing an out-of-bounds index typically causes a runtime error or exception.'
      }
    ],
    totalPoints: 100
  },
  {
    id: '6',
    title: 'String Manipulation',
    description: 'Test your knowledge of string operations and algorithms.',
    difficulty: 'Medium',
    category: 'Strings',
    questions: [
      {
        id: 'q1',
        question: 'What is a palindrome?',
        options: [
          { id: 'a', text: 'A string that contains only letters', isCorrect: false },
          { id: 'b', text: 'A string that reads the same forwards and backwards', isCorrect: true },
          { id: 'c', text: 'A string with no spaces', isCorrect: false },
          { id: 'd', text: 'A string in alphabetical order', isCorrect: false }
        ],
        points: 20,
        explanation: 'A palindrome reads the same forwards and backwards, like "racecar" or "madam".'
      },
      {
        id: 'q2',
        question: 'What is the time complexity of comparing two strings of length n?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: false },
          { id: 'b', text: 'O(log n)', isCorrect: false },
          { id: 'c', text: 'O(n)', isCorrect: true },
          { id: 'd', text: 'O(n²)', isCorrect: false }
        ],
        points: 20,
        explanation: 'Comparing strings requires checking each character, which takes O(n) time in the worst case.'
      },
      {
        id: 'q3',
        question: 'Which of the following is an anagram of "listen"?',
        options: [
          { id: 'a', text: 'silent', isCorrect: true },
          { id: 'b', text: 'list', isCorrect: false },
          { id: 'c', text: 'listening', isCorrect: false },
          { id: 'd', text: 'listens', isCorrect: false }
        ],
        points: 20,
        explanation: 'An anagram uses the same letters in a different order. "silent" uses all letters from "listen".'
      },
      {
        id: 'q4',
        question: 'What does string concatenation mean?',
        options: [
          { id: 'a', text: 'Reversing a string', isCorrect: false },
          { id: 'b', text: 'Joining two or more strings together', isCorrect: true },
          { id: 'c', text: 'Removing characters from a string', isCorrect: false },
          { id: 'd', text: 'Converting to uppercase', isCorrect: false }
        ],
        points: 20,
        explanation: 'Concatenation is the operation of joining strings end-to-end to form a new string.'
      },
      {
        id: 'q5',
        question: 'What is a substring?',
        options: [
          { id: 'a', text: 'A string converted to lowercase', isCorrect: false },
          { id: 'b', text: 'A contiguous sequence of characters within a string', isCorrect: true },
          { id: 'c', text: 'The first character of a string', isCorrect: false },
          { id: 'd', text: 'A string with spaces removed', isCorrect: false }
        ],
        points: 20,
        explanation: 'A substring is a contiguous portion of a string, like "ell" in "hello".'
      }
    ],
    totalPoints: 100
  },
  {
    id: '7',
    title: 'Advanced Algorithms',
    description: 'Challenge yourself with complex algorithmic concepts.',
    difficulty: 'Hard',
    category: 'Advanced Topics',
    questions: [
      {
        id: 'q1',
        question: 'What is dynamic programming?',
        options: [
          { id: 'a', text: 'A programming language', isCorrect: false },
          { id: 'b', text: 'An optimization technique that solves problems by breaking them into overlapping subproblems', isCorrect: true },
          { id: 'c', text: 'A type of database', isCorrect: false },
          { id: 'd', text: 'Real-time programming', isCorrect: false }
        ],
        points: 20,
        explanation: 'Dynamic programming optimizes by storing solutions to subproblems to avoid recomputation.'
      },
      {
        id: 'q2',
        question: 'Which algorithm is used to find the shortest path in a weighted graph?',
        options: [
          { id: 'a', text: 'Binary Search', isCorrect: false },
          { id: 'b', text: 'Dijkstra\'s Algorithm', isCorrect: true },
          { id: 'c', text: 'Bubble Sort', isCorrect: false },
          { id: 'd', text: 'Linear Search', isCorrect: false }
        ],
        points: 20,
        explanation: 'Dijkstra\'s algorithm finds the shortest path from a source node to all other nodes in a weighted graph.'
      },
      {
        id: 'q3',
        question: 'What is the principle behind greedy algorithms?',
        options: [
          { id: 'a', text: 'Always choose the global optimum', isCorrect: false },
          { id: 'b', text: 'Make the locally optimal choice at each step', isCorrect: true },
          { id: 'c', text: 'Try all possible solutions', isCorrect: false },
          { id: 'd', text: 'Use recursion exclusively', isCorrect: false }
        ],
        points: 20,
        explanation: 'Greedy algorithms make the best local choice at each step, hoping to find a global optimum.'
      },
      {
        id: 'q4',
        question: 'What is the time complexity of the best known comparison-based sorting algorithm?',
        options: [
          { id: 'a', text: 'O(n)', isCorrect: false },
          { id: 'b', text: 'O(n log n)', isCorrect: true },
          { id: 'c', text: 'O(n²)', isCorrect: false },
          { id: 'd', text: 'O(log n)', isCorrect: false }
        ],
        points: 20,
        explanation: 'Comparison-based sorting algorithms have a lower bound of O(n log n) in the average/best case.'
      },
      {
        id: 'q5',
        question: 'What does NP-Complete mean in computational complexity theory?',
        options: [
          { id: 'a', text: 'Problems that can be solved in polynomial time', isCorrect: false },
          { id: 'b', text: 'Problems for which no solution exists', isCorrect: false },
          { id: 'c', text: 'Problems that are at least as hard as the hardest problems in NP', isCorrect: true },
          { id: 'd', text: 'Problems that are easy to solve', isCorrect: false }
        ],
        points: 20,
        explanation: 'NP-Complete problems are the hardest problems in NP, and a polynomial solution to one would solve all.'
      }
    ],
    totalPoints: 100
  },
  {
    id: '8',
    title: 'Graph Theory Fundamentals',
    description: 'Explore the basics of graph data structures and algorithms.',
    difficulty: 'Hard',
    category: 'Graphs',
    questions: [
      {
        id: 'q1',
        question: 'What is a graph in computer science?',
        options: [
          { id: 'a', text: 'A visual chart or diagram', isCorrect: false },
          { id: 'b', text: 'A data structure consisting of nodes and edges', isCorrect: true },
          { id: 'c', text: 'A type of array', isCorrect: false },
          { id: 'd', text: 'A sorting algorithm', isCorrect: false }
        ],
        points: 20,
        explanation: 'A graph is a non-linear data structure with vertices (nodes) connected by edges.'
      },
      {
        id: 'q2',
        question: 'What is the difference between BFS and DFS?',
        options: [
          { id: 'a', text: 'BFS uses a queue, DFS uses a stack', isCorrect: true },
          { id: 'b', text: 'BFS is faster than DFS', isCorrect: false },
          { id: 'c', text: 'DFS finds shortest paths, BFS does not', isCorrect: false },
          { id: 'd', text: 'They are the same algorithm', isCorrect: false }
        ],
        points: 20,
        explanation: 'BFS explores level by level using a queue, while DFS explores as deep as possible using a stack.'
      },
      {
        id: 'q3',
        question: 'What is a cycle in a graph?',
        options: [
          { id: 'a', text: 'A path that visits every vertex', isCorrect: false },
          { id: 'b', text: 'A path that starts and ends at the same vertex', isCorrect: true },
          { id: 'c', text: 'A graph with no edges', isCorrect: false },
          { id: 'd', text: 'The number of vertices', isCorrect: false }
        ],
        points: 20,
        explanation: 'A cycle is a path in a graph where the starting and ending vertices are the same.'
      },
      {
        id: 'q4',
        question: 'What is a spanning tree of a graph?',
        options: [
          { id: 'a', text: 'A tree that contains all vertices of the graph', isCorrect: true },
          { id: 'b', text: 'The longest path in the graph', isCorrect: false },
          { id: 'c', text: 'A graph with no cycles', isCorrect: false },
          { id: 'd', text: 'A binary tree representation', isCorrect: false }
        ],
        points: 20,
        explanation: 'A spanning tree is a subgraph that includes all vertices with minimum edges and no cycles.'
      },
      {
        id: 'q5',
        question: 'In a directed graph, what is an in-degree of a vertex?',
        options: [
          { id: 'a', text: 'Number of edges going out from the vertex', isCorrect: false },
          { id: 'b', text: 'Number of edges coming into the vertex', isCorrect: true },
          { id: 'c', text: 'Total number of edges', isCorrect: false },
          { id: 'd', text: 'The vertex value', isCorrect: false }
        ],
        points: 20,
        explanation: 'In-degree is the number of edges directed toward a vertex in a directed graph.'
      }
    ],
    totalPoints: 100
  }
];

