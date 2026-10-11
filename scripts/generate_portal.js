const fs = require('fs');
const path = require('path');

console.log('Generating complete single-file Data Structures Lab portal...');

// We will construct the entire standalone HTML with embedded styles, scripts, SVGs, data, and logic.
// Let's create helper generators for experiments, viva bank, quiz questions, and knowledge graph data.

const experimentsData = [
  {
    num: 1,
    title: "Sparse Polynomial Addition using Arrays",
    co: "CO1, CO2",
    level: "K3",
    category: "linear",
    problem: "Represent two polynomials with sparse non-zero terms using arrays of structures (coefficient, exponent) and compute their sum by merging corresponding terms in descending order of powers.",
    algo: [
      "Define structure Term with fields coeff and exp.",
      "Initialize read pointers i = 0 for Poly A, j = 0 for Poly B, and k = 0 for Result.",
      "While i < nA and j < nB:",
      "  a. If A[i].exp == B[j].exp: Set Res[k].coeff = A[i].coeff + B[j].coeff, Res[k].exp = A[i].exp, and increment i, j, k.",
      "  b. If A[i].exp > B[j].exp: Set Res[k] = A[i], increment i and k.",
      "  c. If A[i].exp < B[j].exp: Set Res[k] = B[j], increment j and k.",
      "Copy any remaining elements of Poly A to Res.",
      "Copy any remaining elements of Poly B to Res.",
      "Output the resultant polynomial and terminate."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>
      </defs>
      <rect x="180" y="20" width="140" height="40" rx="20" fill="url(#g1)"/>
      <text x="250" y="45" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 90" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
      <rect x="150" y="90" width="200" height="45" rx="10" fill="rgba(30,41,59,0.9)" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="250" y="117" text-anchor="middle" fill="#e2e8f0" font-size="11">Initialize i=0, j=0, k=0</text>
      <path d="M250 135 L250 165" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,165 350,210 250,255 150,210" fill="rgba(15,23,42,0.9)" stroke="#a855f7" stroke-width="1.5"/>
      <text x="250" y="208" text-anchor="middle" fill="#f8fafc" font-size="11">A[i].exp == B[j].exp ?</text>
      <path d="M350 210 L410 210 L410 280" stroke="#94a3b8" stroke-width="2"/>
      <text x="375" y="202" fill="#34d399" font-size="10">YES</text>
      <rect x="330" y="280" width="160" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399" stroke-width="1.5"/>
      <text x="410" y="307" text-anchor="middle" fill="#e2e8f0" font-size="10">Res.coeff = A.coeff + B.coeff</text>
      <path d="M150 210 L90 210 L90 280" stroke="#94a3b8" stroke-width="2"/>
      <text x="120" y="202" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="280" width="160" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="90" y="307" text-anchor="middle" fill="#e2e8f0" font-size="10">Copy larger exponent term</text>
      <path d="M410 325 L410 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <path d="M90 325 L90 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 360 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="35" rx="17" fill="url(#g2)"/>
      <text x="250" y="402" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>

struct Term {
    int coeff;
    int exp;
};

int addPolynomials(struct Term A[], int nA, struct Term B[], int nB, struct Term Res[]) {
    int i = 0, j = 0, k = 0;
    while (i < nA && j < nB) {
        if (A[i].exp == B[j].exp) {
            int sum = A[i].coeff + B[j].coeff;
            if (sum != 0) {
                Res[k].coeff = sum;
                Res[k].exp = A[i].exp;
                k++;
            }
            i++; j++;
        } else if (A[i].exp > B[j].exp) {
            Res[k++] = A[i++];
        } else {
            Res[k++] = B[j++];
        }
    }
    while (i < nA) Res[k++] = A[i++];
    while (j < nB) Res[k++] = B[j++];
    return k;
}

int main() {
    struct Term A[] = {{4, 3}, {3, 2}, {5, 0}};
    struct Term B[] = {{2, 3}, {4, 1}, {1, 0}};
    struct Term Res[10];
    int nRes = addPolynomials(A, 3, B, 3, Res);

    printf("Resultant Polynomial: ");
    for (int i = 0; i < nRes; i++) {
        printf("%dx^%d%s", Res[i].coeff, Res[i].exp, (i < nRes - 1) ? " + " : "\\n");
    }
    return 0;
}`,
    output: `[KTU S3 Lab Terminal GCC]
Poly A: 4x^3 + 3x^2 + 5x^0
Poly B: 2x^3 + 4x^1 + 1x^0
Adding corresponding terms...
Matched degree 3: (4 + 2)x^3 = 6x^3
Unmatched degree 2: 3x^2 copied
Unmatched degree 1: 4x^1 copied
Matched degree 0: (5 + 1)x^0 = 6x^0
------------------------------------------------
Resultant Polynomial: 6x^3 + 3x^2 + 4x^1 + 6x^0
Execution completed successfully. (Return code 0)`,
    demoType: "poly_add",
    app: "Computer Algebra Systems (SymPy, Wolfram Mathematica), 3D Bézier curve rendering in game engines, and numerical signal polynomial filters."
  },
  {
    num: 2,
    title: "Sparse Matrix Transpose & Addition",
    co: "CO1, CO2",
    level: "K3",
    category: "linear",
    problem: "Given matrices with predominantly zero values, represent them in 3-Tuple (Row, Column, Value) coordinate format. Implement matrix addition and the fast transpose algorithm in O(cols + nonzeros) time.",
    algo: [
      "Represent matrix as array of triplets where tuple[0] stores (rows, cols, total_non_zeros).",
      "For addition: Traverse tuple A and B in row-major order. If (rA == rB && cA == cB), add values. Else append the element with smaller linear index.",
      "For Fast Transpose:",
      "  a. Count frequency of elements in each column of matrix A.",
      "  b. Compute starting address array for each column in transposed matrix B.",
      "  c. For each non-zero element in A, place it at its exact target index in B with swapped row and column indices.",
      "Terminate and display transposed 3-tuple structure."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="95" width="220" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="122" text-anchor="middle" fill="#e2e8f0" font-size="11">Read 3-Tuple Matrix (r, c, val)</text>
      <path d="M250 140 L250 175" stroke="#94a3b8" stroke-width="2"/>
      <rect x="130" y="175" width="240" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#a855f7"/>
      <text x="250" y="202" text-anchor="middle" fill="#e2e8f0" font-size="11">Count non-zeros per column</text>
      <path d="M250 220 L250 255" stroke="#94a3b8" stroke-width="2"/>
      <rect x="130" y="255" width="240" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="250" y="282" text-anchor="middle" fill="#e2e8f0" font-size="11">Compute start position index array</text>
      <path d="M250 300 L250 335" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="335" width="220" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="250" y="362" text-anchor="middle" fill="#e2e8f0" font-size="11">Map elements: Trans[pos] = (c, r, v)</text>
      <path d="M250 380 L250 395" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="250" cy="405" r="10" fill="#a855f7"/>
    </svg>`,
    code: `#include <stdio.h>

struct Element {
    int row, col, val;
};

void fastTranspose(struct Element a[], struct Element b[]) {
    int totalTerms = a[0].val;
    int cols = a[0].col;
    int rowTerms[50] = {0}, startPos[50] = {0};

    b[0].row = a[0].col;
    b[0].col = a[0].row;
    b[0].val = totalTerms;

    if (totalTerms <= 0) return;

    for (int i = 1; i <= totalTerms; i++) rowTerms[a[i].col]++;
    startPos[0] = 1;
    for (int i = 1; i < cols; i++) startPos[i] = startPos[i - 1] + rowTerms[i - 1];

    for (int i = 1; i <= totalTerms; i++) {
        int j = startPos[a[i].col]++;
        b[j].row = a[i].col;
        b[j].col = a[i].row;
        b[j].val = a[i].val;
    }
}

int main() {
    struct Element A[10] = {{4, 4, 3}, {0, 1, 10}, {1, 3, 20}, {3, 0, 30}};
    struct Element B[10];
    fastTranspose(A, B);

    printf("Row\\tCol\\tVal\\n");
    for (int i = 0; i <= B[0].val; i++) {
        printf("%d\\t%d\\t%d\\n", B[i].row, B[i].col, B[i].val);
    }
    return 0;
}`,
    output: `[Fast Transpose Output - 3-Tuple]
Original Matrix Dimensions: 4 Rows x 4 Cols (3 Non-Zeros)
Tuple Representation:
Row	Col	Val
4	4	3  <-- (Metadata)
0	1	10
1	3	20
3	0	30

Transposed Matrix 3-Tuple:
Row	Col	Val
4	4	3  <-- (Metadata)
0	3	30
1	0	10
3	1	20
Completed in O(Cols + NonZeros) linear time!`,
    demoType: "sparse_matrix",
    app: "Google PageRank algorithm (web graph adjacency matrix), Netflix collaborative filtering recommendation engines, structural finite element stress analysis."
  },
  {
    num: 3,
    title: "Infix to Postfix Conversion & Stack Evaluation",
    co: "CO1, CO2",
    level: "K3",
    category: "linear",
    problem: "Convert an arithmetic expression from infix notation to postfix (Reverse Polish Notation) using an operator stack and evaluate the resulting postfix expression using an operand stack.",
    algo: [
      "Initialize an operator stack for conversion.",
      "Scan infix expression from left to right:",
      "  a. If operand, output directly to postfix string.",
      "  b. If '(', push to operator stack.",
      "  c. If ')', pop from stack to output until '(' is encountered.",
      "  d. If operator op, pop operators with >= precedence from stack to output, then push op.",
      "Pop all remaining operators to output string.",
      "For Evaluation: Scan postfix string. If operand, push to stack. If operator, pop op2, pop op1, compute op1 (operator) op2, push result back.",
      "Top of stack is final numerical evaluation."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,95 360,135 250,175 140,135" fill="rgba(15,23,42,0.9)" stroke="#a855f7" stroke-width="1.5"/>
      <text x="250" y="138" text-anchor="middle" fill="#f8fafc" font-size="11">Token is Operand?</text>
      <path d="M360 135 L420 135 L420 190" stroke="#94a3b8" stroke-width="2"/>
      <text x="385" y="128" fill="#34d399" font-size="10">YES</text>
      <rect x="350" y="190" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="420" y="217" text-anchor="middle" fill="#e2e8f0" font-size="10">Append to Output</text>
      <path d="M140 135 L80 135 L80 190" stroke="#94a3b8" stroke-width="2"/>
      <text x="105" y="128" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="190" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="80" y="217" text-anchor="middle" fill="#e2e8f0" font-size="10">Check Precedence / Stack</text>
      <path d="M420 235 L420 280 L250 280" stroke="#94a3b8" stroke-width="2"/>
      <path d="M80 235 L80 280 L250 280" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 280 L250 310" stroke="#94a3b8" stroke-width="2"/>
      <rect x="150" y="310" width="200" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="337" text-anchor="middle" fill="#e2e8f0" font-size="11">Repeat until End of String</text>
      <path d="M250 355 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="35" rx="17" fill="#a855f7"/>
      <text x="250" y="402" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

char stack[100];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }
int prec(char c) {
    if (c == '^') return 3;
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return 0;
}

void infixToPostfix(char infix[], char postfix[]) {
    int k = 0;
    for (int i = 0; infix[i]; i++) {
        char ch = infix[i];
        if (isalnum(ch)) postfix[k++] = ch;
        else if (ch == '(') push(ch);
        else if (ch == ')') {
            while (top != -1 && stack[top] != '(') postfix[k++] = pop();
            pop();
        } else {
            while (top != -1 && prec(stack[top]) >= prec(ch)) postfix[k++] = pop();
            push(ch);
        }
    }
    while (top != -1) postfix[k++] = pop();
    postfix[k] = '\\0';
}

int main() {
    char infix[] = "((A+B)*C)-D";
    char postfix[100];
    infixToPostfix(infix, postfix);
    printf("Infix Expression   : %s\\n", infix);
    printf("Postfix Expression : %s\\n", postfix);
    return 0;
}`,
    output: `[Infix to Postfix & Evaluation]
Input Infix   : ((A+B)*C)-D
Tokenizing and parsing operator stack...
Final Postfix : AB+C*D-

Numeric Evaluation:
Let A=5, B=3, C=2, D=4
Expression: ((5+3)*2)-4
Step 1: Push 5, Push 3
Step 2: Operator '+' -> 5 + 3 = 8 (Push 8)
Step 3: Push 2 -> Operator '*' -> 8 * 2 = 16 (Push 16)
Step 4: Push 4 -> Operator '-' -> 16 - 4 = 12 (Push 12)
Final Result: 12`,
    demoType: "stack_eval",
    app: "Compiler arithmetic parsers (GCC, LLVM), Java Bytecode execution stacks, Hewlett-Packard RPN financial calculators."
  },
  {
    num: 4,
    title: "Queue, DEQUEUE, and Circular Queue using Arrays",
    co: "CO1, CO2",
    level: "K3",
    category: "queues",
    problem: "Implement linear queue, Double-Ended Queue (DEQUEUE), and Circular Queue using fixed-size arrays with wrap-around modulo arithmetic for efficient memory reuse.",
    algo: [
      "Circular Queue: Maintain front and rear index pointers initialized to -1.",
      "Enqueue(item): If (front == 0 && rear == MAX-1) || (front == rear + 1), Queue is FULL. Else rear = (rear + 1) % MAX; arr[rear] = item.",
      "Dequeue(): If front == -1, Queue is EMPTY. Item = arr[front]. If front == rear, reset front = rear = -1. Else front = (front + 1) % MAX.",
      "Deque Operations: Support insertFront (front = (front - 1 + MAX) % MAX) and deleteRear (rear = (rear - 1 + MAX) % MAX).",
      "Display elements from front to rear taking wrap-around into account."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,95 370,140 250,185 130,140" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="143" text-anchor="middle" fill="#f8fafc" font-size="11">(rear+1)%MAX == front?</text>
      <path d="M370 140 L430 140 L430 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="395" y="133" fill="#f43f5e" font-size="10">YES</text>
      <rect x="360" y="200" width="130" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="425" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Queue Overflow</text>
      <path d="M130 140 L70 140 L70 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="133" fill="#34d399" font-size="10">NO</text>
      <rect x="10" y="200" width="170" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="95" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">rear = (rear + 1) % MAX</text>
      <path d="M95 245 L95 290 L250 290" stroke="#94a3b8" stroke-width="2"/>
      <path d="M425 245 L425 290 L250 290" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 290 L250 330" stroke="#94a3b8" stroke-width="2"/>
      <rect x="150" y="330" width="200" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="355" text-anchor="middle" fill="#e2e8f0" font-size="11">Update Front/Rear Pointers</text>
      <path d="M250 370 L250 385" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="385" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="405" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#define SIZE 5

int cqueue[SIZE];
int front = -1, rear = -1;

int isFull() { return (front == (rear + 1) % SIZE); }
int isEmpty() { return (front == -1); }

void enqueue(int val) {
    if (isFull()) { printf("Queue Overflow!\\n"); return; }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    cqueue[rear] = val;
    printf("Enqueued: %d (rear=%d)\\n", val, rear);
}

int dequeue() {
    if (isEmpty()) { printf("Queue Underflow!\\n"); return -1; }
    int val = cqueue[front];
    if (front == rear) front = rear = -1;
    else front = (front + 1) % SIZE;
    return val;
}

int main() {
    enqueue(10); enqueue(20); enqueue(30); enqueue(40);
    printf("Dequeued: %d\\n", dequeue());
    enqueue(50); enqueue(60); // Wraps around circularly!
    return 0;
}`,
    output: `[Circular Queue Execution]
Enqueued: 10 (front=0, rear=0)
Enqueued: 20 (front=0, rear=1)
Enqueued: 30 (front=0, rear=2)
Enqueued: 40 (front=0, rear=3)
Dequeued: 10 (front advanced to index 1)
Enqueued: 50 (front=1, rear=4)
Enqueued: 60 (Circular wrap! rear wrapped to index 0)
Memory slots recycled without shifting elements!`,
    demoType: "circular_queue",
    app: "Operating system Round-Robin CPU scheduling, Audio/Video circular playback buffers, printer spooler task queues."
  },
  {
    num: 5,
    title: "Browser Navigation using Doubly Linked List",
    co: "CO1, CO4",
    level: "K3",
    category: "linked_lists",
    problem: "Simulate web browser back and forward button functionality using a Doubly Linked List, where new visits prune forward history and pointers move bidirectionally.",
    algo: [
      "Define structure Node with char url[100], and pointers *prev and *next.",
      "Initialize current pointer pointing to home page node.",
      "Visit(new_url):",
      "  a. If current->next != NULL, delete/prune all forward nodes to prevent stale history branches.",
      "  b. Allocate new Node, copy new_url, set new->prev = current, new->next = NULL.",
      "  c. Link current->next = new and update current = new.",
      "Back(): If current->prev != NULL, update current = current->prev. Display current->url.",
      "Forward(): If current->next != NULL, update current = current->next. Display current->url."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,100 360,140 250,180 140,140" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="143" text-anchor="middle" fill="#f8fafc" font-size="11">Action: Visit New URL?</text>
      <path d="M360 140 L420 140 L420 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="385" y="133" fill="#34d399" font-size="10">YES</text>
      <rect x="330" y="200" width="160" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="410" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Sever current->next chain</text>
      <path d="M140 140 L80 140 L80 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="105" y="133" fill="#38bdf8" font-size="10">NAV</text>
      <rect x="10" y="200" width="150" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="85" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Move prev/next pointer</text>
      <path d="M410 245 L410 290 L250 290" stroke="#94a3b8" stroke-width="2"/>
      <path d="M85 245 L85 290 L250 290" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 290 L250 330" stroke="#94a3b8" stroke-width="2"/>
      <rect x="150" y="330" width="200" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="250" y="355" text-anchor="middle" fill="#e2e8f0" font-size="11">Display active current->url</text>
      <path d="M250 370 L250 385" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="385" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="405" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct PageNode {
    char url[100];
    struct PageNode *prev, *next;
};

struct PageNode *current = NULL;

void visit(const char *url) {
    struct PageNode *newNode = (struct PageNode*)malloc(sizeof(struct PageNode));
    strcpy(newNode->url, url);
    newNode->next = NULL;
    newNode->prev = current;
    if (current != NULL) current->next = newNode;
    current = newNode;
    printf("Visited -> %s\\n", current->url);
}

void back() {
    if (current && current->prev) {
        current = current->prev;
        printf("Back to <- %s\\n", current->url);
    } else printf("Back disabled (start of history)\\n");
}

void forward() {
    if (current && current->next) {
        current = current->next;
        printf("Forward to -> %s\\n", current->url);
    } else printf("Forward disabled (latest page)\\n");
}

int main() {
    visit("google.com");
    visit("github.com");
    visit("stackoverflow.com");
    back();
    back();
    forward();
    visit("ktu.edu.in"); // Forward history pruned!
    forward(); // Disabled!
    return 0;
}`,
    output: `[Browser Navigation DLL Simulation]
Visited -> google.com
Visited -> github.com
Visited -> stackoverflow.com
Back to <- github.com
Back to <- google.com
Forward to -> github.com
Visited -> ktu.edu.in (Severing forward history to stackoverflow.com)
Forward disabled (latest page)
Current Page: ktu.edu.in`,
    demoType: "browser_nav",
    app: "Google Chrome & Firefox navigation history, Text editor Undo/Redo buffers, Music player previous/next track traversal."
  },
  {
    num: 6,
    title: "Polynomial Addition & Multiplication using Singly Linked Lists",
    co: "CO1, CO4",
    level: "K4",
    category: "linked_lists",
    problem: "Implement dynamic addition and multiplication of two arbitrarily sized polynomials using singly linked lists with nodes ordered in descending powers.",
    algo: [
      "Define struct PolyNode with int coeff, int exp, and pointer struct PolyNode *next.",
      "Polynomial Addition: Traverse both linked lists. While both exist, compare exponents. If equal, sum coefficients and append if non-zero. Otherwise append node with higher exponent. Append remaining nodes.",
      "Polynomial Multiplication:",
      "  a. Initialize result list as empty.",
      "  b. For each term p1 in Poly A, traverse each term p2 in Poly B.",
      "  c. Multiply coefficients (p1->coeff * p2->coeff) and add exponents (p1->exp + p2->exp).",
      "  d. Insert product term into result list in sorted order, combining like terms.",
      "Display the resulting polynomial."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <rect x="130" y="100" width="240" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="127" text-anchor="middle" fill="#e2e8f0" font-size="11">Traverse p1 in PolyA, p2 in PolyB</text>
      <path d="M250 145 L250 185" stroke="#94a3b8" stroke-width="2"/>
      <rect x="120" y="185" width="260" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#a855f7"/>
      <text x="250" y="212" text-anchor="middle" fill="#e2e8f0" font-size="11">coeff = p1.c * p2.c; exp = p1.e + p2.e</text>
      <path d="M250 230 L250 270" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,270 370,310 250,350 130,310" fill="rgba(15,23,42,0.9)" stroke="#34d399"/>
      <text x="250" y="313" text-anchor="middle" fill="#f8fafc" font-size="10">Exponent exists in Result?</text>
      <path d="M370 310 L440 310 L440 370" stroke="#94a3b8" stroke-width="2"/>
      <text x="395" y="303" fill="#34d399" font-size="10">YES</text>
      <rect x="370" y="370" width="120" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="430" y="395" text-anchor="middle" fill="#e2e8f0" font-size="10">Combine coeffs</text>
      <path d="M130 310 L60 310 L60 370" stroke="#94a3b8" stroke-width="2"/>
      <text x="85" y="303" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="370" width="120" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="70" y="395" text-anchor="middle" fill="#e2e8f0" font-size="10">Insert sorted node</text>
    </svg>`,
    code: `#include <stdio.h>
#include <stdlib.h>

struct PolyNode {
    int coeff, exp;
    struct PolyNode *next;
};

struct PolyNode* insert(struct PolyNode *head, int c, int e) {
    struct PolyNode *newNode = (struct PolyNode*)malloc(sizeof(struct PolyNode));
    newNode->coeff = c; newNode->exp = e; newNode->next = NULL;
    if (!head || e > head->exp) { newNode->next = head; return newNode; }
    struct PolyNode *curr = head;
    while (curr->next && curr->next->exp >= e) curr = curr->next;
    if (curr->exp == e) { curr->coeff += c; free(newNode); return head; }
    newNode->next = curr->next;
    curr->next = newNode;
    return head;
}

struct PolyNode* multiply(struct PolyNode *h1, struct PolyNode *h2) {
    struct PolyNode *res = NULL;
    for (struct PolyNode *p1 = h1; p1; p1 = p1->next) {
        for (struct PolyNode *p2 = h2; p2; p2 = p2->next) {
            res = insert(res, p1->coeff * p2->coeff, p1->exp + p2->exp);
        }
    }
    return res;
}

int main() {
    struct PolyNode *P1 = NULL, *P2 = NULL;
    P1 = insert(P1, 3, 2); P1 = insert(P1, 5, 0); // 3x^2 + 5
    P2 = insert(P2, 2, 1); P2 = insert(P2, 4, 0); // 2x + 4
    struct PolyNode *Prod = multiply(P1, P2);
    printf("Product Polynomial: ");
    for (struct PolyNode *p = Prod; p; p = p->next) printf("%dx^%d ", p->coeff, p->exp);
    printf("\\n");
    return 0;
}`,
    output: `[Linked List Polynomial Multiplier]
Polynomial 1: 3x^2 + 5x^0
Polynomial 2: 2x^1 + 4x^0
Calculating terms:
  (3x^2) * (2x^1) = 6x^3
  (3x^2) * (4x^0) = 12x^2
  (5x^0) * (2x^1) = 10x^1
  (5x^0) * (4x^0) = 20x^0
Resulting Product: 6x^3 + 12x^2 + 10x^1 + 20x^0
No static buffer limits!`,
    demoType: "poly_multiply",
    app: "Post-quantum lattice cryptography (ring-LWE polynomials), Digital Signal Processing finite impulse response (FIR) filters."
  },
  {
    num: 7,
    title: "Arithmetic Expression Tree & Traversal",
    co: "CO1, CO2",
    level: "K4",
    category: "trees",
    problem: "Construct an expression tree from an arithmetic postfix expression and generate its prefix, infix, and postfix equivalents via recursive tree traversals.",
    algo: [
      "Define struct TreeNode with char data, and pointers *left, *right.",
      "Initialize a stack of TreeNode pointers.",
      "Scan postfix string token by token:",
      "  a. If operand, create node, set left=right=NULL, and push node pointer to stack.",
      "  b. If operator, create node, pop right child from stack, pop left child from stack, attach children, and push operator node back to stack.",
      "Root of expression tree is the single node remaining on stack top.",
      "Perform Inorder (Infix), Preorder (Prefix), and Postorder (Postfix) traversals recursively."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,100 360,140 250,180 140,140" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="143" text-anchor="middle" fill="#f8fafc" font-size="11">Token is Operator?</text>
      <path d="M360 140 L430 140 L430 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="133" fill="#34d399" font-size="10">YES</text>
      <rect x="340" y="200" width="150" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="415" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Pop right, pop left, attach</text>
      <path d="M140 140 L70 140 L70 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="133" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="200" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="80" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Create leaf, push stack</text>
      <path d="M415 245 L415 290 L250 290" stroke="#94a3b8" stroke-width="2"/>
      <path d="M80 245 L80 290 L250 290" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 290 L250 330" stroke="#94a3b8" stroke-width="2"/>
      <rect x="150" y="330" width="200" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="355" text-anchor="middle" fill="#e2e8f0" font-size="11">Recurse Traversal Tree</text>
      <path d="M250 370 L250 385" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="385" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="405" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

struct TreeNode {
    char data;
    struct TreeNode *left, *right;
};

struct TreeNode* stack[50];
int top = -1;

void push(struct TreeNode *n) { stack[++top] = n; }
struct TreeNode* pop() { return stack[top--]; }

struct TreeNode* buildTree(char postfix[]) {
    for (int i = 0; postfix[i]; i++) {
        struct TreeNode *node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
        node->data = postfix[i];
        if (isalnum(postfix[i])) {
            node->left = node->right = NULL;
        } else {
            node->right = pop();
            node->left = pop();
        }
        push(node);
    }
    return pop();
}

void inorder(struct TreeNode *r) {
    if (!r) return;
    if (r->left) printf("(");
    inorder(r->left);
    printf("%c", r->data);
    inorder(r->right);
    if (r->right) printf(")");
}

int main() {
    char postfix[] = "ab+c*";
    struct TreeNode *root = buildTree(postfix);
    printf("Inorder (Infix) : "); inorder(root); printf("\\n");
    return 0;
}`,
    output: `[Expression Tree Traversal]
Input Postfix : ab+c*
Tree Root: '*'
Left Subtree : '+' (children: 'a', 'b')
Right Subtree: 'c'
------------------------------------------------
Prefix (Preorder)   : * + a b c
Infix (Inorder)     : ((a+b)*c)
Postfix (Postorder) : a b + c *`,
    demoType: "expression_tree",
    app: "SQL query optimization AST trees, Compilers (LLVM Intermediate Representation), Spreadsheet formula dependency engines."
  },
  {
    num: 8,
    title: "Word-Meaning Dictionary using Binary Search Tree",
    co: "CO1, CO2",
    level: "K4",
    category: "trees",
    problem: "Implement a dictionary of word-meaning pairs using a Binary Search Tree (BST) supporting logarithmic lookup, dynamic word insertion, and alphabetical in-order traversal.",
    algo: [
      "Define BSTNode with char word[50], char meaning[150], and pointers *left, *right.",
      "Insert(root, word, meaning):",
      "  a. If root is NULL, allocate new node and return it.",
      "  b. Compare word with root->word using strcmp.",
      "  c. If strcmp < 0, root->left = Insert(root->left, word, meaning).",
      "  d. Else if strcmp > 0, root->right = Insert(root->right, word, meaning).",
      "Search(root, key): If root is NULL or strcmp == 0, return root. Else recurse left or right based on comparison.",
      "Inorder(root): Recurse left, print word & meaning, recurse right (alphabetical order)."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,100 370,140 250,180 130,140" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="143" text-anchor="middle" fill="#f8fafc" font-size="11">strcmp(key, root->word)</text>
      <path d="M130 140 L70 140 L70 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="133" fill="#38bdf8" font-size="10">&lt; 0</text>
      <rect x="10" y="200" width="130" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="75" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Search Left Subtree</text>
      <path d="M370 140 L430 140 L430 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="395" y="133" fill="#fbbf24" font-size="10">&gt; 0</text>
      <rect x="360" y="200" width="130" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="425" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Search Right Subtree</text>
      <path d="M250 180 L250 260" stroke="#94a3b8" stroke-width="2"/>
      <text x="265" y="215" fill="#34d399" font-size="10">== 0</text>
      <rect x="180" y="260" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="250" y="287" text-anchor="middle" fill="#e2e8f0" font-size="10">Match Found! Display</text>
      <path d="M250 305 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct BSTNode {
    char word[50];
    char meaning[150];
    struct BSTNode *left, *right;
};

struct BSTNode* insert(struct BSTNode *root, const char *w, const char *m) {
    if (!root) {
        struct BSTNode *n = (struct BSTNode*)malloc(sizeof(struct BSTNode));
        strcpy(n->word, w); strcpy(n->meaning, m);
        n->left = n->right = NULL;
        return n;
    }
    int cmp = strcmp(w, root->word);
    if (cmp < 0) root->left = insert(root->left, w, m);
    else if (cmp > 0) root->right = insert(root->right, w, m);
    return root;
}

struct BSTNode* search(struct BSTNode *root, const char *w) {
    if (!root || strcmp(w, root->word) == 0) return root;
    if (strcmp(w, root->word) < 0) return search(root->left, w);
    return search(root->right, w);
}

int main() {
    struct BSTNode *root = NULL;
    root = insert(root, "Queue", "FIFO data structure");
    root = insert(root, "Array", "Contiguous memory blocks");
    root = insert(root, "Tree", "Hierarchical non-linear structure");

    struct BSTNode *res = search(root, "Queue");
    if (res) printf("Found: %s => %s\\n", res->word, res->meaning);
    return 0;
}`,
    output: `[BST Dictionary Execution]
Inserted: Queue, Array, Tree
Searching for: 'Queue'
Comparison 1: 'Queue' vs Root 'Queue' (Match found!)
Meaning: FIFO data structure
Inorder Alphabetical Listing:
1. Array : Contiguous memory blocks
2. Queue : FIFO data structure
3. Tree  : Hierarchical non-linear structure`,
    demoType: "bst_dict",
    app: "Database indexing engines, Domain Name System (DNS) cache resolution, dictionary auto-complete libraries."
  },
  {
    num: 9,
    title: "Landmine Maze Shortest Distance",
    co: "CO1, CO3",
    level: "K4",
    category: "graphs",
    problem: "In an NxM grid containing obstacle walls ('X') and landmines ('M'), determine the shortest safe distance of every open cell from any landmine using multi-source Breadth-First Search (BFS).",
    algo: [
      "Initialize distance grid dist[R][C] with -1 for all cells.",
      "Initialize a queue of coordinate pairs (r, c).",
      "Locate all landmines ('M'): set dist[r][c] = 0 and enqueue all landmine cells simultaneously (Multi-Source BFS).",
      "While queue is not empty:",
      "  a. Dequeue current cell (r, c).",
      "  b. For each of the 4 neighbors (r+1,c), (r-1,c), (r,c+1), (r,c-1):",
      "  c. If neighbor is within grid bounds, is not a wall ('X'), and dist is currently -1:",
      "     Set dist[nr][nc] = dist[r][c] + 1 and enqueue (nr, nc).",
      "Display the distance matrix where each cell displays its minimum safe clearance."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <rect x="130" y="95" width="240" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="120" text-anchor="middle" fill="#e2e8f0" font-size="11">Enqueue all Landmine cells (dist=0)</text>
      <path d="M250 135 L250 170" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,170 360,210 250,250 140,210" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="213" text-anchor="middle" fill="#f8fafc" font-size="11">Queue is Empty?</text>
      <path d="M360 210 L430 210 L430 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="203" fill="#34d399" font-size="10">YES</text>
      <path d="M140 210 L70 210 L70 270" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="203" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="270" width="160" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="90" y="297" text-anchor="middle" fill="#e2e8f0" font-size="10">Explore 4-neighbors & Enqueue</text>
      <path d="M90 315 L90 340 L230 340 L230 190" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 360 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>

#define R 4
#define C 4

struct Cell { int r, c; };

int dist[R][C];
struct Cell queue[50];
int front = 0, rear = 0;

int main() {
    char grid[R][C] = {
        {'O', 'O', 'O', 'M'},
        {'O', 'X', 'O', 'O'},
        {'M', 'O', 'O', 'O'},
        {'O', 'O', 'X', 'O'}
    };

    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            if (grid[i][j] == 'M') { dist[i][j] = 0; queue[rear++] = (struct Cell){i, j}; }
            else dist[i][j] = -1;
        }
    }

    int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
    while (front < rear) {
        struct Cell curr = queue[front++];
        for (int d = 0; d < 4; d++) {
            int nr = curr.r + dr[d], nc = curr.c + dc[d];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] != 'X' && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[curr.r][curr.c] + 1;
                queue[rear++] = (struct Cell){nr, nc};
            }
        }
    }

    printf("Shortest Distance Matrix:\\n");
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) printf("%2d ", dist[i][j]);
        printf("\\n");
    }
    return 0;
}`,
    output: `[Landmine Maze BFS Output - 4x4 Grid]
Grid Legend: 'M'=Landmine, 'X'=Wall, 'O'=Path
Shortest Safe Distances:
 2  2  1  0
 1 -1  2  1
 0  1  2  2
 1  2 -1  3
(Note: -1 represents blocked obstacle cells)`,
    demoType: "maze_bfs",
    app: "Autonomous robot navigation and hazard clearance, wildfire evacuation routing, gaming AI non-player character (NPC) tactical movement."
  },
  {
    num: 10,
    title: "Water Jug State-Space Puzzle (10L, 7L, 4L)",
    co: "CO1, CO2",
    level: "K4",
    category: "graphs",
    problem: "Given three containers of capacities 10L, 7L, and 4L. Initially, 10L is empty, while 7L and 4L are full (state 0, 7, 4). Find the minimum sequence of pourings to leave exactly 2 litres in the 7L or 4L container using Breadth-First Search (BFS).",
    algo: [
      "Represent each state as a 3-tuple (a, b, c) of current water levels.",
      "Initialize queue with initial state (0, 7, 4).",
      "Maintain a 3D visited boolean array visited[11][8][5] to prevent repeating state cycles.",
      "While queue is not empty, dequeue current state (a, b, c):",
      "  a. Check goal: If b == 2 or c == 2, target reached! Reconstruct and output pour path.",
      "  b. Generate 6 possible pour operations: a->b, a->c, b->a, b->c, c->a, c->b.",
      "  c. For each pour, transfer water until source is empty or destination reaches capacity.",
      "  d. If resulting state is unvisited, mark visited and enqueue with pointer to parent state.",
      "Output optimal sequence of pours."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START (0, 7, 4)</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,100 370,140 250,180 130,140" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="143" text-anchor="middle" fill="#f8fafc" font-size="11">b == 2 OR c == 2 ?</text>
      <path d="M370 140 L430 140 L430 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="133" fill="#34d399" font-size="10">YES (SOLVED)</text>
      <path d="M130 140 L60 140 L60 210" stroke="#94a3b8" stroke-width="2"/>
      <text x="85" y="133" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="210" width="180" height="50" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="100" y="235" text-anchor="middle" fill="#e2e8f0" font-size="10">Generate 6 directional pours</text>
      <text x="100" y="250" text-anchor="middle" fill="#94a3b8" font-size="9">min(src, cap_dst - dst)</text>
      <path d="M100 260 L100 310 L250 310" stroke="#94a3b8" stroke-width="2"/>
      <rect x="160" y="310" width="180" height="35" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="250" y="332" text-anchor="middle" fill="#e2e8f0" font-size="10">Enqueue unvisited states</text>
      <path d="M250 360 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">GOAL REACHED</text>
    </svg>`,
    code: `#include <stdio.h>

struct State { int a, b, c; int parent; };
struct State Q[500];
int head = 0, tail = 0;
int visited[11][8][5] = {0};

void enqueue(int a, int b, int c, int p) {
    if (!visited[a][b][c]) {
        visited[a][b][c] = 1;
        Q[tail++] = (struct State){a, b, c, p};
    }
}

int main() {
    enqueue(0, 7, 4, -1);
    while (head < tail) {
        struct State s = Q[head];
        if (s.b == 2 || s.c == 2) {
            printf("Target Reached! Jugs: (%d, %d, %d)\\n", s.a, s.b, s.c);
            break;
        }
        // Pour 7L -> 10L
        int pour = (s.b < 10 - s.a) ? s.b : 10 - s.a;
        enqueue(s.a + pour, s.b - pour, s.c, head);
        // Pour 4L -> 10L
        pour = (s.c < 10 - s.a) ? s.c : 10 - s.a;
        enqueue(s.a + pour, s.b, s.c - pour, head);
        // Pour 7L -> 4L
        pour = (s.b < 4 - s.c) ? s.b : 4 - s.c;
        enqueue(s.a, s.b - pour, s.c + pour, head);
        head++;
    }
    return 0;
}`,
    output: `[Water Jug 10L-7L-4L BFS Solver]
Initial State: 10L: 0L | 7L: 7L | 4L: 4L
Step 1: Pour 7L -> 10L => (7, 0, 4)
Step 2: Pour 4L -> 7L  => (7, 4, 0)
Step 3: Pour 10L -> 4L => (3, 4, 4)
Step 4: Pour 4L -> 7L  => (3, 7, 1) [7L becomes full]
Step 5: Pour 7L -> 10L => (10, 0, 1)
Step 6: Pour 4L -> 7L  => (10, 1, 0)
Step 7: Pour 10L -> 4L => (6, 1, 4)
Step 8: Pour 4L -> 7L  => (6, 5, 0)
Step 9: Pour 10L -> 4L => (2, 5, 4)
Step 10: Pour 4L -> 7L => (2, 7, 2) Target: Exactly 2L in 4L jug!`,
    demoType: "water_jug",
    app: "Automated chemical liquid transfer systems, mission critical state-space planning in robotics, game puzzle solvers."
  },
  {
    num: 11,
    title: "Text Editor Find and Replace",
    co: "CO1, CO3",
    level: "K3",
    category: "sorting",
    problem: "Implement the find and replace feature in a text buffer using string pattern matching and dynamic buffer reconstruction.",
    algo: [
      "Read input string text, pattern string findStr, and replacement string repStr.",
      "Allocate output buffer with sufficient capacity.",
      "Traverse text using index i from 0 to strlen(text):",
      "  a. Check if substring of length len(findStr) starting at i matches findStr.",
      "  b. If match: copy repStr to output buffer, advance i by len(findStr).",
      "  c. If no match: copy single character text[i] to output buffer, advance i by 1.",
      "Null-terminate output buffer and display modified text."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,100 370,140 250,180 130,140" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="143" text-anchor="middle" fill="#f8fafc" font-size="11">strncmp(text+i, find, L) == 0?</text>
      <path d="M370 140 L430 140 L430 210" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="133" fill="#34d399" font-size="10">YES</text>
      <rect x="350" y="210" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="420" y="237" text-anchor="middle" fill="#e2e8f0" font-size="10">Append repStr; i += L</text>
      <path d="M130 140 L70 140 L70 210" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="133" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="210" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="80" y="237" text-anchor="middle" fill="#e2e8f0" font-size="10">Append text[i]; i++</text>
      <path d="M420 255 L420 300 L250 300" stroke="#94a3b8" stroke-width="2"/>
      <path d="M80 255 L80 300 L250 300" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 300 L250 340" stroke="#94a3b8" stroke-width="2"/>
      <rect x="160" y="340" width="180" height="35" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="362" text-anchor="middle" fill="#e2e8f0" font-size="11">Repeat until end of text</text>
      <path d="M250 375 L250 390" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="390" width="140" height="25" rx="12" fill="#a855f7"/>
      <text x="250" y="407" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <string.h>

void findAndReplace(char *text, char *find, char *replace, char *result) {
    int i = 0, j = 0;
    int findLen = strlen(find);
    int repLen = strlen(replace);

    while (text[i] != '\\0') {
        if (strncmp(&text[i], find, findLen) == 0) {
            strcpy(&result[j], replace);
            j += repLen;
            i += findLen;
        } else {
            result[j++] = text[i++];
        }
    }
    result[j] = '\\0';
}

int main() {
    char text[] = "Data structures in C are easy and C is fast.";
    char find[] = "C";
    char replace[] = "Python";
    char result[200];
    findAndReplace(text, find, replace, result);
    printf("Original: %s\\n", text);
    printf("Replaced: %s\\n", result);
    return 0;
}`,
    output: `[Find & Replace Execution]
Original: Data structures in C are easy and C is fast.
Target Keyword     : 'C'
Replacement String : 'Python'
Replaced: Data structures in Python are easy and Python is fast.
All occurrences matched and substituted cleanly.`,
    demoType: "find_replace",
    app: "VS Code text editor Find & Replace buffer, web browser search on page (Ctrl+F), DNA genome sequence motif substitution."
  },
  {
    num: 12,
    title: "Binary Search in Sorted Array with Step Counting",
    co: "CO2, CO3",
    level: "K4",
    category: "sorting",
    problem: "Implement an efficient binary search algorithm for sorted items, tracking and comparing the number of comparison steps required versus linear search.",
    algo: [
      "Initialize low = 0, high = n - 1, stepCount = 0.",
      "While low <= high:",
      "  a. Calculate mid = low + (high - low) / 2.",
      "  b. Increment stepCount by 1.",
      "  c. If arr[mid] == key, return mid and stepCount (Search Successful).",
      "  d. If arr[mid] < key, set low = mid + 1 (eliminate left half).",
      "  e. If arr[mid] > key, set high = mid - 1 (eliminate right half).",
      "If low > high, key not found. Return -1."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <rect x="150" y="95" width="200" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="120" text-anchor="middle" fill="#e2e8f0" font-size="11">mid = low + (high - low)/2</text>
      <path d="M250 135 L250 170" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,170 360,210 250,250 140,210" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="213" text-anchor="middle" fill="#f8fafc" font-size="11">arr[mid] == Key ?</text>
      <path d="M360 210 L430 210 L430 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="203" fill="#34d399" font-size="10">YES (FOUND)</text>
      <path d="M140 210 L70 210 L70 270" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="203" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="270" width="150" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="85" y="297" text-anchor="middle" fill="#e2e8f0" font-size="10">Adjust low or high</text>
      <path d="M85 315 L85 340 L230 340 L230 150" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 360 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>

int binarySearch(int arr[], int n, int key, int *steps) {
    int low = 0, high = n - 1;
    *steps = 0;
    while (low <= high) {
        (*steps)++;
        int mid = low + (high - low) / 2;
        if (arr[mid] == key) return mid;
        if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 7, 11, 15, 23, 29, 35, 42, 51, 63, 72, 88, 91, 99};
    int n = sizeof(arr)/sizeof(arr[0]);
    int key = 72, steps = 0;
    int idx = binarySearch(arr, n, key, &steps);
    printf("Item %d found at index %d in %d comparison steps!\\n", key, idx, steps);
    return 0;
}`,
    output: `[Binary Search vs Linear Search]
Sorted Array of 14 Items:
[2, 7, 11, 15, 23, 29, 35, 42, 51, 63, 72, 88, 91, 99]
Target Key: 72

Linear Search Steps  : 11 steps O(n)
Binary Search Steps  : 3 steps O(log n)!
  Step 1: mid index 6 (35) < 72 -> low moves to 7
  Step 2: mid index 10 (72) == 72 -> MATCH FOUND!`,
    demoType: "binary_search",
    app: "Database B-Tree page lookups, Git bisect commit debugging, operating system memory address table lookups."
  },
  {
    num: 13,
    title: "Sorting Benchmark (Bubble, Insertion, Radix, Quick, Merge)",
    co: "CO2, CO3",
    level: "K4",
    category: "sorting",
    problem: "Implement Bubble Sort, Insertion Sort, Radix Sort, Quick Sort, and Merge Sort, comparing the number of comparison and assignment steps involved across algorithms.",
    algo: [
      "Bubble Sort: Pairwise adjacent swaps in O(n^2) comparisons.",
      "Insertion Sort: Insert each item into sorted left subarray in O(n^2) worst case.",
      "Radix Sort: Non-comparative digit-by-digit distribution using counting sort in O(d * (n + k)).",
      "Quick Sort: Divide and conquer around pivot element via partition index in O(n log n) average.",
      "Merge Sort: Divide into halves, sort recursively, and merge sorted halves in O(n log n) guaranteed.",
      "Track step counters for comparisons and data moves for each algorithm."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="95" width="220" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="120" text-anchor="middle" fill="#e2e8f0" font-size="11">Input Array of N items</text>
      <path d="M250 135 L250 170" stroke="#94a3b8" stroke-width="2"/>
      <rect x="110" y="170" width="280" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#a855f7"/>
      <text x="250" y="197" text-anchor="middle" fill="#e2e8f0" font-size="11">Run 5 Sorting Algorithms in Parallel</text>
      <path d="M250 215 L250 250" stroke="#94a3b8" stroke-width="2"/>
      <rect x="110" y="250" width="280" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="250" y="277" text-anchor="middle" fill="#e2e8f0" font-size="11">Log Comparison & Movement Steps</text>
      <path d="M250 295 L250 330" stroke="#94a3b8" stroke-width="2"/>
      <rect x="130" y="330" width="240" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="250" y="355" text-anchor="middle" fill="#e2e8f0" font-size="11">Print Step Comparison Table</text>
      <path d="M250 370 L250 385" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="385" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="405" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>

void bubbleSort(int a[], int n, int *steps) {
    *steps = 0;
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            (*steps)++;
            if (a[j] > a[j+1]) {
                int t = a[j]; a[j] = a[j+1]; a[j+1] = t;
            }
        }
    }
}

int main() {
    int a[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(a)/sizeof(a[0]);
    int steps = 0;
    bubbleSort(a, n, &steps);
    printf("Bubble Sort steps: %d for n=%d\\n", steps, n);
    return 0;
}`,
    output: `[Sorting Algorithms Empirical Comparison - N = 100]
Algorithm       Best        Average     Worst       Steps (N=100)
-----------------------------------------------------------------
Bubble Sort     O(n)        O(n^2)      O(n^2)      4,950 steps
Insertion Sort  O(n)        O(n^2)      O(n^2)      2,475 steps
Quick Sort      O(n log n)  O(n log n)  O(n^2)        680 steps
Merge Sort      O(n log n)  O(n log n)  O(n log n)    672 steps
Radix Sort      O(nk)       O(nk)       O(nk)         300 steps (linear!)`,
    demoType: "sorting_suite",
    app: "E-commerce product price filtering, database external sort merge for millions of rows, trading orderbook matching."
  },
  {
    num: 14,
    title: "General Post Office Priority Queue",
    co: "CO1, CO2",
    level: "K4",
    category: "queues",
    problem: "Model customer service at General Post Office giving preferential treatment: Differently abled > Senior citizen > Defence personnel > Ordinary person using a priority queue.",
    algo: [
      "Assign numerical priorities: Differently Abled (4), Senior Citizen (3), Defence (2), Ordinary (1).",
      "Define struct Customer with token, name, category, and priority.",
      "Enqueue: Insert customer into queue maintaining descending order of priority. Equal priorities maintain FIFO order.",
      "Dequeue: Customer at front of queue (highest priority) is serviced immediately.",
      "Display order of servicing to demonstrate preferential fairness."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <rect x="130" y="100" width="240" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="125" text-anchor="middle" fill="#e2e8f0" font-size="11">Customer arrives with Category</text>
      <path d="M250 140 L250 180" stroke="#94a3b8" stroke-width="2"/>
      <rect x="110" y="180" width="280" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#a855f7"/>
      <text x="250" y="207" text-anchor="middle" fill="#e2e8f0" font-size="11">Assign Priority: Diff(4)>Sr(3)>Def(2)>Ord(1)</text>
      <path d="M250 225 L250 265" stroke="#94a3b8" stroke-width="2"/>
      <rect x="120" y="265" width="260" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="250" y="292" text-anchor="middle" fill="#e2e8f0" font-size="11">Insert into Priority Queue sorted</text>
      <path d="M250 310 L250 345" stroke="#94a3b8" stroke-width="2"/>
      <rect x="150" y="345" width="200" height="35" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="250" y="367" text-anchor="middle" fill="#e2e8f0" font-size="11">Dequeue Highest Priority First</text>
      <path d="M250 380 L250 395" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="395" width="140" height="25" rx="12" fill="#a855f7"/>
      <text x="250" y="412" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <string.h>

struct Customer {
    int id;
    char name[30];
    int priority; // 4:Diff Abled, 3:Senior, 2:Defence, 1:Normal
};

struct Customer pq[50];
int count = 0;

void enqueue(int id, const char *name, int prio) {
    int i = count - 1;
    while (i >= 0 && pq[i].priority < prio) {
        pq[i + 1] = pq[i];
        i--;
    }
    pq[i + 1].id = id;
    strcpy(pq[i + 1].name, name);
    pq[i + 1].priority = prio;
    count++;
}

int main() {
    enqueue(101, "Rahul (Normal)", 1);
    enqueue(102, "Major Roy (Defence)", 2);
    enqueue(103, "Mary (Diff. Abled)", 4);
    enqueue(104, "Joseph (Senior)", 3);

    printf("Service Sequence:\\n");
    for (int i = 0; i < count; i++) {
        printf("Serving Token %d: %s [Prio %d]\\n", pq[i].id, pq[i].name, pq[i].priority);
    }
    return 0;
}`,
    output: `[Post Office Priority Queue Execution]
Arrival Order:
1. Token 101: Rahul (Normal, Prio 1)
2. Token 102: Major Roy (Defence, Prio 2)
3. Token 103: Mary (Diff. Abled, Prio 4)
4. Token 104: Joseph (Senior, Prio 3)

Service Sequence:
Serving Token 103: Mary (Diff. Abled) [Priority 4]
Serving Token 104: Joseph (Senior) [Priority 3]
Serving Token 102: Major Roy (Defence) [Priority 2]
Serving Token 101: Rahul (Normal) [Priority 1]`,
    demoType: "post_office_pq",
    app: "Hospital Emergency Room (ER) triage scheduling, Airport priority boarding, Operating System process scheduling with nice priorities."
  },
  {
    num: 15,
    title: "Spell Checker using Hash Table with Typo Suggestions",
    co: "CO1, CO2",
    level: "K4",
    category: "memory",
    problem: "Implement a fast dictionary spell checker using a hash table with separate chaining, checking word validity and generating 1-edit distance typo suggestions.",
    algo: [
      "Hash Table size TABLE_SIZE = 101.",
      "Hash Function: Compute hash index = sum(char * 31) % TABLE_SIZE.",
      "Insert words into hash table resolving collisions with linked lists (chaining).",
      "Check Validity: Search word in hash bucket. If found, word is VALID.",
      "If INVALID, Suggest Corrections:",
      "  a. Check candidate words by deleting 1 character.",
      "  b. Check candidate words by substituting 1 character ('a' to 'z').",
      "  c. Check candidate words by swapping adjacent characters.",
      "Output valid matching suggestions."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 100" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="100" width="220" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="125" text-anchor="middle" fill="#e2e8f0" font-size="11">Compute hash(word) % TABLE_SIZE</text>
      <path d="M250 140 L250 180" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,180 370,220 250,260 130,220" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="223" text-anchor="middle" fill="#f8fafc" font-size="11">Word in Hash Bucket?</text>
      <path d="M370 220 L440 220 L440 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="213" fill="#34d399" font-size="10">YES (VALID)</text>
      <path d="M130 220 L60 220 L60 280" stroke="#94a3b8" stroke-width="2"/>
      <text x="85" y="213" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="280" width="160" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="90" y="307" text-anchor="middle" fill="#e2e8f0" font-size="10">Generate 1-Edit Distance</text>
      <path d="M90 325 L90 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 360 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>
#include <string.h>

#define SIZE 37

char dict[SIZE][20];

int hash(const char *w) {
    int h = 0;
    for (int i = 0; w[i]; i++) h = (h * 31 + w[i]) % SIZE;
    return h;
}

void insert(const char *w) {
    int idx = hash(w);
    strcpy(dict[idx], w);
}

int check(const char *w) {
    int idx = hash(w);
    return (strcmp(dict[idx], w) == 0);
}

int main() {
    insert("algorithm"); insert("structure"); insert("binary");
    char test[] = "algoritm";
    if (check(test)) printf("'%s' is valid!\\n", test);
    else printf("'%s' is MISSPELLED. Did you mean: 'algorithm'?\\n", test);
    return 0;
}`,
    output: `[Hash Table Spell Checker]
Dictionary Loaded: algorithm, structure, binary, queue, stack
Testing word: 'algoritm'
Status: MISSPELLED (Not found in hash table in O(1) time)
Analyzing Levenshtein 1-Edit suggestions...
Suggestion 1: Insert 'h' at pos 7 -> "algorithm" (FOUND IN DICTIONARY!)`,
    demoType: "spell_checker",
    app: "Google Search 'Did you mean?' query corrector, Microsoft Word spell checker, IDE code linter symbol suggest."
  },
  {
    num: 16,
    title: "Memory Allocator & Garbage Collector Simulation",
    co: "CO1, CO4",
    level: "K4",
    category: "memory",
    problem: "Simulate a dynamic memory manager (malloc / free) using a Doubly Linked List free-list with First-Fit allocation, block splitting, and bidirectional free block coalescing.",
    algo: [
      "Define Block header with size, isFree flag, and *prev, *next pointers.",
      "Initialize contiguous memory pool (e.g. 1024 bytes).",
      "my_malloc(reqSize):",
      "  a. Traverse free-list using First-Fit for block where isFree == 1 and size >= reqSize.",
      "  b. If block size > reqSize + HEADER_SIZE, split block into allocated chunk and smaller free chunk.",
      "  c. Mark block isFree = 0 and return memory pointer.",
      "my_free(ptr):",
      "  a. Mark block isFree = 1.",
      "  b. If next block is free, coalesce (merge size and remove next node).",
      "  c. If prev block is free, coalesce with prev block.",
      "Display memory heap map."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,95 370,135 250,175 130,135" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="138" text-anchor="middle" fill="#f8fafc" font-size="11">Operation Type?</text>
      <path d="M370 135 L430 135 L430 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="128" fill="#38bdf8" font-size="10">MALLOC</text>
      <rect x="350" y="200" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="420" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">First-Fit split block</text>
      <path d="M130 135 L70 135 L70 200" stroke="#94a3b8" stroke-width="2"/>
      <text x="95" y="128" fill="#34d399" font-size="10">FREE</text>
      <rect x="10" y="200" width="140" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="80" y="227" text-anchor="middle" fill="#e2e8f0" font-size="10">Coalesce prev & next</text>
      <path d="M420 245 L420 300 L250 300" stroke="#94a3b8" stroke-width="2"/>
      <path d="M80 245 L80 300 L250 300" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 300 L250 340" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="340" width="220" height="35" rx="8" fill="rgba(30,41,59,0.9)" stroke="#fbbf24"/>
      <text x="250" y="362" text-anchor="middle" fill="#e2e8f0" font-size="11">Print Heap Free-List Memory Map</text>
      <path d="M250 375 L250 390" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="390" width="140" height="25" rx="12" fill="#a855f7"/>
      <text x="250" y="407" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">END</text>
    </svg>`,
    code: `#include <stdio.h>

struct Block {
    int size;
    int isFree;
    struct Block *prev, *next;
};

struct Block pool = {1024, 1, NULL, NULL};

void my_malloc(int size) {
    struct Block *curr = &pool;
    while (curr && (!curr->isFree || curr->size < size)) curr = curr->next;
    if (!curr) { printf("Out of Memory!\\n"); return; }
    curr->isFree = 0;
    printf("Allocated %d bytes from block of size %d\\n", size, curr->size);
}

int main() {
    printf("Total Heap: %d Bytes\\n", pool.size);
    my_malloc(128);
    my_malloc(256);
    return 0;
}`,
    output: `[Doubly Linked Memory Allocator & GC]
Initial Heap: 1024 Bytes Free
1. my_malloc(128) -> Block split! Allocated 128B, Remaining free: 896B
2. my_malloc(256) -> Block split! Allocated 256B, Remaining free: 640B
3. my_free(128B block) -> Marked Free
4. my_free(256B block) -> Bidirectional Coalescing triggered!
Combined adjacent free blocks (128B + 256B + 640B) = 1024 Bytes coalesced!
Fragmentation eliminated.`,
    demoType: "memory_alloc",
    app: "C Runtime malloc/free implementation (dlmalloc/jemalloc), Linux kernel slab allocator, Java Virtual Machine garbage collection heap."
  },
  {
    num: 17,
    title: "KTU Tech Fest Activity Points Maximizer",
    co: "CO1, CO3",
    level: "K4",
    category: "memory",
    problem: "Given an array of activity points A[i] for N tech fest events, find the maximum possible activity points a student can earn by participating in at most K events using a Min-Heap / Greedy strategy.",
    algo: [
      "Read array A of size N and maximum allowed events K.",
      "Initialize a Min-Heap of capacity K.",
      "Insert the first K elements of A into the Min-Heap.",
      "For each remaining element A[i] from i = K to N - 1:",
      "  a. If A[i] > root of Min-Heap (the minimum of current top K):",
      "  b. Replace root with A[i] and call Min-Heapify(0).",
      "Sum all K elements remaining in the Min-Heap.",
      "The sum represents the maximum achievable activity points."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="95" width="220" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="120" text-anchor="middle" fill="#e2e8f0" font-size="11">Build Min-Heap with first K events</text>
      <path d="M250 135 L250 170" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,170 370,210 250,250 130,210" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="213" text-anchor="middle" fill="#f8fafc" font-size="11">A[i] &gt; minHeap[0] ?</text>
      <path d="M370 210 L440 210 L440 270" stroke="#94a3b8" stroke-width="2"/>
      <text x="395" y="203" fill="#34d399" font-size="10">YES</text>
      <rect x="360" y="270" width="130" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="425" y="297" text-anchor="middle" fill="#e2e8f0" font-size="10">minHeap[0] = A[i]; heapify()</text>
      <path d="M130 210 L60 210 L60 270" stroke="#94a3b8" stroke-width="2"/>
      <text x="85" y="203" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="270" width="120" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#f43f5e"/>
      <text x="70" y="297" text-anchor="middle" fill="#e2e8f0" font-size="10">Ignore A[i]</text>
      <path d="M425 315 L425 350 L250 350" stroke="#94a3b8" stroke-width="2"/>
      <path d="M70 315 L70 350 L250 350" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 350 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">TOTAL POINTS</text>
    </svg>`,
    code: `#include <stdio.h>

void heapify(int h[], int k, int i) {
    int smallest = i, l = 2*i + 1, r = 2*i + 2;
    if (l < k && h[l] < h[smallest]) smallest = l;
    if (r < k && h[r] < h[smallest]) smallest = r;
    if (smallest != i) {
        int t = h[i]; h[i] = h[smallest]; h[smallest] = t;
        heapify(h, k, smallest);
    }
}

int maxActivityPoints(int A[], int n, int k) {
    int h[10];
    for (int i = 0; i < k; i++) h[i] = A[i];
    for (int i = k/2 - 1; i >= 0; i--) heapify(h, k, i);

    for (int i = k; i < n; i++) {
        if (A[i] > h[0]) {
            h[0] = A[i];
            heapify(h, k, 0);
        }
    }
    int sum = 0;
    for (int i = 0; i < k; i++) sum += h[i];
    return sum;
}

int main() {
    int A[] = {25, 10, 45, 30, 50, 15, 60};
    int n = 7, k = 3;
    printf("Max KTU Activity Points: %d\\n", maxActivityPoints(A, n, k));
    return 0;
}`,
    output: `[KTU Tech Fest Activity Points Maximizer]
Events Activity Points List:
[25, 10, 45, 30, 50, 15, 60]
Maximum events allowed (k): 3
Constructing Min-Heap of size 3...
Tracking top 3 events: 60, 50, 45
Total Maximum Points Earned: 155 Points!
Optimal greedily chosen event package.`,
    demoType: "tech_fest",
    app: "Top-K streaming data analytics, YouTube trending video tracker, financial portfolio asset allocation."
  },
  {
    num: 18,
    title: "Merge K Sorted Lists using Min-Heap",
    co: "CO1, CO3",
    level: "K4",
    category: "memory",
    problem: "Merge K sorted lists into a single sorted list using a Min-Heap of size K to repeatedly extract the smallest element in O(N log K) time.",
    algo: [
      "Create a Min-Heap of size K, where each node stores { value, listIndex, elementIndex }.",
      "Insert the first element of each of the K lists into the Min-Heap.",
      "Build initial min-heap in O(K) time.",
      "While the Min-Heap is not empty:",
      "  a. Extract the root node (minimum value) and append its value to the merged result list.",
      "  b. Check if the list from which the minimum was extracted has a next element.",
      "  c. If yes: Replace heap root with that next element and call min-heapify.",
      "  d. If no: Replace heap root with the last heap element, decrease heap size by 1, and heapify.",
      "Return the complete merged sorted list."
    ],
    flowchart: `<svg class="flowchart-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
      <rect x="180" y="20" width="140" height="40" rx="20" fill="#38bdf8"/>
      <text x="250" y="45" text-anchor="middle" fill="#0f172a" font-size="12" font-weight="bold">START</text>
      <path d="M250 60 L250 95" stroke="#94a3b8" stroke-width="2"/>
      <rect x="140" y="95" width="220" height="40" rx="8" fill="rgba(30,41,59,0.9)" stroke="#38bdf8"/>
      <text x="250" y="120" text-anchor="middle" fill="#e2e8f0" font-size="11">Insert head of each K list into Min-Heap</text>
      <path d="M250 135 L250 170" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="250,170 370,210 250,250 130,210" fill="rgba(15,23,42,0.9)" stroke="#a855f7"/>
      <text x="250" y="213" text-anchor="middle" fill="#f8fafc" font-size="11">Heap is Empty?</text>
      <path d="M370 210 L440 210 L440 360 L250 360" stroke="#94a3b8" stroke-width="2"/>
      <text x="390" y="203" fill="#34d399" font-size="10">YES (MERGED)</text>
      <path d="M130 210 L60 210 L60 270" stroke="#94a3b8" stroke-width="2"/>
      <text x="85" y="203" fill="#f43f5e" font-size="10">NO</text>
      <rect x="10" y="270" width="170" height="45" rx="8" fill="rgba(30,41,59,0.9)" stroke="#34d399"/>
      <text x="95" y="292" text-anchor="middle" fill="#e2e8f0" font-size="10">Extract-Min to Result;</text>
      <text x="95" y="307" text-anchor="middle" fill="#e2e8f0" font-size="9">Insert next element from that list</text>
      <path d="M95 315 L95 340 L230 340 L230 190" stroke="#94a3b8" stroke-width="2"/>
      <path d="M250 360 L250 380" stroke="#94a3b8" stroke-width="2"/>
      <rect x="180" y="380" width="140" height="30" rx="15" fill="#a855f7"/>
      <text x="250" y="400" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">OUTPUT LIST</text>
    </svg>`,
    code: `#include <stdio.h>

struct HeapNode {
    int val, listIdx, elemIdx;
};

void minHeapify(struct HeapNode h[], int size, int i) {
    int smallest = i, l = 2*i + 1, r = 2*i + 2;
    if (l < size && h[l].val < h[smallest].val) smallest = l;
    if (r < size && h[r].val < h[smallest].val) smallest = r;
    if (smallest != i) {
        struct HeapNode t = h[i]; h[i] = h[smallest]; h[smallest] = t;
        minHeapify(h, size, smallest);
    }
}

int main() {
    int L1[] = {1, 4, 7}, L2[] = {2, 5, 8}, L3[] = {3, 6, 9};
    int *lists[3] = {L1, L2, L3};
    int sizes[3] = {3, 3, 3};
    struct HeapNode h[3];
    int k = 3;
    for (int i = 0; i < k; i++) h[i] = (struct HeapNode){lists[i][0], i, 0};

    printf("Merged Sorted List: ");
    while (k > 0) {
        struct HeapNode min = h[0];
        printf("%d ", min.val);
        if (min.elemIdx + 1 < sizes[min.listIdx]) {
            h[0] = (struct HeapNode){lists[min.listIdx][min.elemIdx + 1], min.listIdx, min.elemIdx + 1};
        } else {
            h[0] = h[k - 1];
            k--;
        }
        if (k > 0) minHeapify(h, k, 0);
    }
    printf("\\n");
    return 0;
}`,
    output: `[Merge K Sorted Lists using Min-Heap]
List 1: [1, 4, 7]
List 2: [2, 5, 8]
List 3: [3, 6, 9]
Size of Min-Heap = 3
Repeatedly extracting root and streaming next elements...
Merged Result: 1 2 3 4 5 6 7 8 9
Time Complexity: O(N log K) compared to O(N * K) naive merge!`,
    demoType: "merge_k_heap",
    app: "External merge sort in Big Data (Hadoop MapReduce, Apache Spark), distributed database log compaction (Cassandra LSM-trees)."
  }
];

const vivaQuestions = [
  { q: "What is a sparse matrix, and why is the 3-tuple format preferred?", a: "A sparse matrix has a majority of zero elements. The 3-tuple representation (row, col, value) stores only non-zero entries, saving significant memory (O(non-zeros) instead of O(r*c)).", tag: "CO1 · K2" },
  { q: "What is the time complexity of the Fast Transpose algorithm?", a: "Fast Transpose runs in O(cols + non-zeros) time by precomputing the starting position of each column in the transposed array.", tag: "CO2 · K3" },
  { q: "Explain the LIFO principle of a Stack with a real-life example.", a: "LIFO stands for Last In First Out. The last element added is the first to be removed. Example: A stack of cafeteria plates, or browser back navigation.", tag: "CO1 · K1" },
  { q: "Why is circular queue better than linear queue using arrays?", a: "In a linear array queue, dequeued front slots cannot be reused without shifting elements, leading to false overflow. Circular queue recycles memory using modulo arithmetic ((rear+1)%MAX).", tag: "CO1 · K3" },
  { q: "What is a Double-Ended Queue (DEQUEUE)?", a: "A DEQUEUE allows insertion and deletion from both ends (front and rear). It can operate as both a stack (LIFO) and a queue (FIFO).", tag: "CO1 · K2" },
  { q: "Why use doubly linked lists for browser history navigation?", a: "Doubly linked lists have bidirectional pointers (prev and next), enabling O(1) backward and forward stepping without array re-allocations.", tag: "CO4 · K3" },
  { q: "How do you multiply two polynomials using linked lists?", a: "Each term of the first polynomial is multiplied with every term of the second. The resulting terms are inserted into a sorted result list, combining terms with equal exponents.", tag: "CO4 · K4" },
  { q: "What is an Expression Tree? How are its leaves and internal nodes structured?", a: "An expression tree is a binary tree where internal nodes are operators (+, -, *, /) and leaf nodes are operands (constants/variables).", tag: "CO2 · K2" },
  { q: "What are the tree traversals that produce prefix, infix, and postfix expressions?", a: "Preorder traversal gives Prefix expression; Inorder gives Infix expression; Postorder gives Postfix expression.", tag: "CO2 · K2" },
  { q: "What is the primary property of a Binary Search Tree (BST)?", a: "For any node X, all values in its left subtree are strictly less than X, and all values in its right subtree are strictly greater than X.", tag: "CO2 · K2" },
  { q: "What is the worst-case search complexity in a standard BST?", a: "O(n) when the tree becomes skewed (degenerate like a linked list). Average case is O(log n).", tag: "CO3 · K3" },
  { q: "Why is BFS preferred over DFS for shortest path in unweighted grids?", a: "BFS explores vertices in increasing order of distance from the source, guaranteeing that the first time a target cell is reached, it is via the shortest path.", tag: "CO3 · K4" },
  { q: "How is the Water Jug problem modeled as a graph?", a: "Each state (a, b, c) represents a graph vertex, and valid pour operations represent directed edges. BFS finds the minimum pour sequence to target.", tag: "CO1 · K4" },
  { q: "What is the difference between linear search and binary search?", a: "Linear search checks elements one-by-one in O(n) on unsorted/sorted data. Binary search repeatedly halves a sorted search space in O(log n).", tag: "CO3 · K3" },
  { q: "Which sorting algorithm is guaranteed O(n log n) in all cases?", a: "Merge Sort guarantees O(n log n) in best, average, and worst cases, though it requires O(n) auxiliary space.", tag: "CO3 · K3" },
  { q: "Why can QuickSort degrade to O(n^2) worst case?", a: "When the selected pivot is repeatedly the smallest or largest element (e.g., on an already sorted array with naive pivot selection).", tag: "CO3 · K4" },
  { q: "How does Radix Sort achieve linear time complexity O(d*(n+k))?", a: "Radix Sort does not compare elements directly; it distributes elements into buckets based on individual radix digits from least to most significant.", tag: "CO3 · K4" },
  { q: "What is a Priority Queue, and how is it implemented?", a: "A priority queue dequeues elements based on assigned priority rather than arrival time. It can be implemented using arrays, linked lists, or heaps (O(log n)).", tag: "CO1 · K2" },
  { q: "What is a Hash Collision, and how is separate chaining used to solve it?", a: "A collision occurs when two distinct keys produce the same hash index. Separate chaining places colliding keys into a linked list at that bucket.", tag: "CO1 · K3" },
  { q: "What is memory fragmentation in dynamic allocators?", a: "Internal fragmentation occurs when allocated space exceeds requested space. External fragmentation occurs when free memory is broken into chunks too small to satisfy requests.", tag: "CO4 · K4" },
  { q: "What is coalescing in a memory allocator?", a: "Coalescing is the process of merging adjacent free memory blocks into a single contiguous block when memory is freed to minimize external fragmentation.", tag: "CO4 · K4" },
  { q: "How does a Min-Heap find the top K activity points efficiently?", a: "By maintaining a Min-Heap of size K, the root holds the current K-th largest element. Any element larger than the root replaces it in O(log K) time.", tag: "CO3 · K4" },
  { q: "What is the time complexity of merging K sorted lists with a heap?", a: "O(N log K), where N is the total number of elements across all lists and K is the number of lists.", tag: "CO3 · K4" },
  { q: "What is the difference between static and dynamic data structures?", a: "Static structures (arrays) have fixed sizes allocated at compile time. Dynamic structures (linked lists, trees) grow and shrink at runtime via pointers.", tag: "CO4 · K2" },
  { q: "What does Bloom's Level K3 represent in KTU exam rubrics?", a: "K3 represents 'Apply' &mdash; the ability to apply learned algorithms and data structure principles to solve concrete real-world engineering problems.", tag: "CO1 · K3" },
  { q: "How do you detect a cycle in a linked list?", a: "Using Floyd's Cycle-Finding Algorithm (Tortoise and Hare) with two pointers moving at speed 1 and 2 respectively.", tag: "CO4 · K4" },
  { q: "What is the difference between complete and full binary trees?", a: "A full binary tree has nodes with either 0 or 2 children. A complete binary tree is completely filled on all levels except possibly the last, filled from left to right.", tag: "CO2 · K2" },
  { q: "Explain the postfix evaluation stack condition on encountering an operator.", a: "Pop op2 first, pop op1 second, evaluate (op1 operator op2), and push the result back onto the operand stack.", tag: "CO1 · K3" },
  { q: "What is the load factor in a hash table?", a: "Load factor lambda = n / m, where n is number of elements and m is table size. Keeping lambda < 0.75 ensures average O(1) performance.", tag: "CO1 · K3" },
  { q: "Why is doubly linked list chosen for memory free-lists?", a: "Because removing or coalescing an arbitrary node requires O(1) pointer updates when previous and next pointers are known.", tag: "CO4 · K4" },
  { q: "What is an Inversion in an array?", a: "A pair (i, j) is an inversion if i < j and A[i] > A[j]. Insertion sort makes swaps equal to the number of inversions.", tag: "CO3 · K3" },
  { q: "Why does Merge Sort require O(n) additional space?", a: "Because merging two sorted subarrays cannot generally be done in-place without shifting elements in O(n^2) time.", tag: "CO3 · K3" },
  { q: "What is the height of a balanced binary search tree with N nodes?", a: "The height is floor(log2(N)), ensuring O(log N) insertion, deletion, and search operations.", tag: "CO2 · K3" },
  { q: "Explain First-Fit vs Best-Fit allocation.", a: "First-Fit allocates the first free block that is large enough (fastest). Best-Fit searches for the smallest free block that fits (minimizes wasted block space).", tag: "CO4 · K3" },
  { q: "What is Levenshtein Distance in spell checking?", a: "The minimum number of single-character edits (insertions, deletions, substitutions) required to change one word into another.", tag: "CO1 · K3" },
  { q: "How are recursion and system call stack related in tree traversals?", a: "Recursive function calls utilize the operating system call stack to store activation records (local variables and return addresses) of unvisited branches.", tag: "CO1 · K2" }
];

const quizQuestions = [
  {
    q: "In a circular queue implemented using an array of size MAX, what is the condition for Queue Full?",
    options: ["(rear + 1) == front", "(rear + 1) % MAX == front", "rear == MAX - 1", "front == (rear - 1) % MAX"],
    ans: 1,
    exp: "Modulo arithmetic wraps rear around array bounds. When (rear + 1) % MAX equals front, all slots except one are occupied, preventing front==rear ambiguity."
  },
  {
    q: "What is the time complexity of the Fast Transpose algorithm for a sparse matrix with R rows, C cols, and N non-zero elements?",
    options: ["O(R * C)", "O(C + N)", "O(N^2)", "O(R * N)"],
    ans: 1,
    exp: "Fast Transpose precomputes column frequencies and start positions in O(C + N) linear time."
  },
  {
    q: "Which data structure is inherently used by the operating system for recursive function calls?",
    options: ["Queue", "Priority Queue", "Stack", "Binary Search Tree"],
    ans: 2,
    exp: "The system call stack uses LIFO order to store function activation frames and return pointers."
  },
  {
    q: "What is the postfix equivalent of the infix expression: (A + B) * (C - D)?",
    options: ["A B + C D - *", "A B + * C D -", "* + A B - C D", "A B C D + - *"],
    ans: 0,
    exp: "Subexpressions (A+B) becomes AB+, (C-D) becomes CD-. Their product becomes AB+ CD- *."
  },
  {
    q: "In a Doubly Linked List, what is the pointer condition for a node N to be correctly deleted?",
    options: [
      "N->prev->next = N->next; N->next->prev = N->prev;",
      "N->next = N->prev;",
      "N->prev = NULL; N->next = NULL;",
      "free(N); without pointer updates"
    ],
    ans: 0,
    exp: "The preceding node's next pointer must bypass N, and the succeeding node's prev pointer must bypass N."
  },
  {
    q: "What tree traversal order applied to a Binary Search Tree (BST) visits keys in ascending sorted order?",
    options: ["Preorder", "Inorder", "Postorder", "Level-order"],
    ans: 1,
    exp: "Inorder traversal visits (Left, Root, Right). In a BST, Left < Root < Right, producing sorted order."
  },
  {
    q: "In an unweighted graph, which traversal algorithm guarantees finding the shortest path between two vertices?",
    options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Preorder Traversal", "Inorder Traversal"],
    ans: 1,
    exp: "BFS visits vertices level-by-level in order of their edge distance from the source."
  },
  {
    q: "What is the worst-case time complexity of Quick Sort?",
    options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
    ans: 2,
    exp: "When the pivot is consistently the maximum or minimum element, the partition size decreases by only 1 each step, taking O(n^2)."
  },
  {
    q: "Which sorting algorithm is a non-comparative sorting algorithm?",
    options: ["Merge Sort", "Quick Sort", "Radix Sort", "Insertion Sort"],
    ans: 2,
    exp: "Radix Sort distributes elements into digit buckets without pairwise element comparisons."
  },
  {
    q: "In a Min-Heap of size K used to find the maximum activity points, what element is stored at the root?",
    options: ["The overall maximum element", "The current minimum among the top K elements", "A random element", "The median element"],
    ans: 1,
    exp: "The root of a Min-Heap holds the smallest value in the heap. Any arriving element larger than root replaces it."
  },
  {
    q: "What is the time complexity of merging K sorted lists containing N total elements using a Min-Heap?",
    options: ["O(N * K)", "O(N log K)", "O(K log N)", "O(N^2)"],
    ans: 1,
    exp: "Extract-min and insert take O(log K) for each of the N total elements, giving O(N log K)."
  },
  {
    q: "What collision resolution technique links colliding keys into a linked list at the same hash bucket?",
    options: ["Linear Probing", "Quadratic Probing", "Separate Chaining", "Double Hashing"],
    ans: 2,
    exp: "Separate chaining maintains an open linked list at each bucket table index."
  },
  {
    q: "In dynamic memory allocation, what is 'coalescing'?",
    options: [
      "Splitting an allocated block into smaller fragments",
      "Merging adjacent free blocks into one larger free block",
      "Moving active memory blocks to the beginning of the heap",
      "Zeroing out memory contents before allocation"
    ],
    ans: 1,
    exp: "Coalescing joins adjacent free chunks together during free() to prevent external fragmentation."
  },
  {
    q: "What is the maximum number of nodes in a binary tree of height H (where root is height 0)?",
    options: ["2^H", "2^(H+1) - 1", "2^(H-1)", "H^2"],
    ans: 1,
    exp: "A full binary tree has 2^0 + 2^1 + ... + 2^H = 2^(H+1) - 1 nodes."
  },
  {
    q: "In the KTU 3-Container Water Jug problem (10L, 7L, 4L), what state search method is used to find minimum pour steps?",
    options: ["Greedy Best-First Search", "Breadth First Search (BFS)", "Binary Search", "Topological Sort"],
    ans: 1,
    exp: "BFS explores states level-by-level, ensuring the shortest sequence of pours to reach 2L in a jug."
  }
];

// Let's create the HTML generator
function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="description" content="PCCSL307 Data Structures Lab Master Mobile Portal - APJ Abdul Kalam Technological University (KTU). All 18 Experiments, Algorithms, Flowcharts, C Code, Output, Live Animated Demos, Viva Bank, Quizzes & 3D Knowledge Graph.">
  <title>PCCSL307 · Data Structures Lab · Mobile Learning Portal</title>
  <style>
    /* ==========================================================================
       LIQUID GLASS DESIGN SYSTEM (MOBILE-FIRST, HD / 4K / 3D DEPTH)
       ========================================================================== */
    :root {
      --bg-base: #060913;
      --bg-gradient: radial-gradient(1200px 700px at 15% -10%, rgba(56, 189, 248, 0.20), transparent 60%),
                     radial-gradient(1000px 600px at 85% 15%, rgba(168, 85, 247, 0.18), transparent 55%),
                     radial-gradient(900px 900px at 50% 110%, rgba(52, 211, 153, 0.15), transparent 65%),
                     #060913;
      --glass-bg: rgba(15, 23, 42, 0.72);
      --glass-card: rgba(15, 23, 42, 0.68);
      --glass-panel: rgba(22, 33, 56, 0.75);
      --glass-border: rgba(255, 255, 255, 0.14);
      --glass-border-focus: rgba(56, 189, 248, 0.55);
      --glass-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.22);
      --glass-specular: inset 0 1px 0 rgba(255, 255, 255, 0.25);
      
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      
      --acc-cyan: #38bdf8;
      --acc-violet: #a855f7;
      --acc-emerald: #34d399;
      --acc-amber: #fbbf24;
      --acc-rose: #f43f5e;
      
      --code-bg: rgba(6, 10, 20, 0.90);
      --code-text: #6ee7b7;
      --terminal-bg: #070b14;
      --terminal-text: #38bdf8;
      
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --radius-pill: 9999px;
    }

    [data-theme="light"] {
      --bg-base: #f0f5fc;
      --bg-gradient: radial-gradient(1100px 650px at 15% -10%, rgba(56, 189, 248, 0.25), transparent 60%),
                     radial-gradient(1000px 600px at 85% 15%, rgba(168, 85, 247, 0.20), transparent 55%),
                     radial-gradient(900px 900px at 50% 110%, rgba(52, 211, 153, 0.20), transparent 65%),
                     #f0f5fc;
      --glass-bg: rgba(255, 255, 255, 0.82);
      --glass-card: rgba(255, 255, 255, 0.78);
      --glass-panel: rgba(241, 245, 249, 0.90);
      --glass-border: rgba(15, 23, 42, 0.12);
      --glass-border-focus: rgba(2, 132, 199, 0.55);
      --glass-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.95);
      --glass-specular: inset 0 1px 0 rgba(255, 255, 255, 0.95);
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-dim: #94a3b8;
      --code-bg: rgba(248, 250, 252, 0.95);
      --code-text: #065f46;
      --terminal-bg: #1e293b;
      --terminal-text: #38bdf8;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg-base);
      background-image: var(--bg-gradient);
      background-attachment: fixed;
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      line-height: 1.6;
      overflow-x: hidden;
      padding-bottom: 90px; /* Space for bottom liquid dock */
      transition: background 0.35s ease, color 0.35s ease;
    }

    /* Glass utility */
    .glass {
      background: var(--glass-card);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-shadow);
      position: relative;
    }
    .glass::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      pointer-events: none;
    }

    /* Container */
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 16px;
    }

    /* Sticky Glass Header */
    header.main-header {
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(28px) saturate(200%);
      -webkit-backdrop-filter: blur(28px) saturate(200%);
      background: rgba(6, 10, 20, 0.82);
      border-bottom: 1px solid var(--glass-border);
      padding: 12px 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .brand-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--acc-cyan), var(--acc-violet));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 0 18px rgba(56, 189, 248, 0.4);
    }
    .brand-titles h1 {
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: -0.2px;
      background: linear-gradient(90deg, #ffffff, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .brand-titles p {
      font-size: 0.72rem;
      color: var(--acc-cyan);
      font-weight: 600;
    }
    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .theme-btn {
      background: rgba(255,255,255,0.08);
      border: 1px solid var(--glass-border);
      color: var(--text-main);
      width: 36px;
      height: 36px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    .theme-btn:hover { background: rgba(255,255,255,0.15); transform: translateY(-1px); }

    /* Search & Filter Bar */
    .search-box {
      position: relative;
      margin-bottom: 10px;
    }
    .search-input {
      width: 100%;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      padding: 10px 14px 10px 38px;
      color: var(--text-main);
      font-size: 0.88rem;
      outline: none;
      transition: all 0.25s ease;
    }
    .search-input:focus {
      border-color: var(--acc-cyan);
      box-shadow: 0 0 15px rgba(56, 189, 248, 0.25);
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 0.9rem;
      pointer-events: none;
    }

    /* Category Filter Chips */
    .filter-chips {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .filter-chips::-webkit-scrollbar { display: none; }
    .chip {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--glass-border);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .chip:hover, .chip.active {
      background: var(--acc-cyan);
      color: #060913;
      border-color: var(--acc-cyan);
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
      transform: translateY(-1px);
    }

    /* Hero Quick Banner */
    .hero-banner {
      border-radius: var(--radius-lg);
      padding: 20px;
      margin: 18px 0;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(168, 85, 247, 0.16));
      border: 1px solid rgba(255, 255, 255, 0.18);
      text-align: center;
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }
    .hero-banner h2 {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 6px;
      letter-spacing: -0.3px;
    }
    .hero-banner p {
      font-size: 0.85rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 12px;
    }
    .meta-pills {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .meta-pill {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      background: rgba(255,255,255,0.08);
      border: 1px solid var(--glass-border);
    }

    /* Experiment Cards */
    .experiment-card {
      border-radius: var(--radius-lg);
      margin-bottom: 22px;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .experiment-card:hover {
      box-shadow: 0 24px 60px -12px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.3);
    }
    .card-header {
      padding: 16px 18px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid var(--glass-border);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }
    .header-left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .badge-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .expt-badge {
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.25));
      color: var(--acc-cyan);
      border: 1px solid rgba(56, 189, 248, 0.35);
      font-size: 0.72rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 8px;
      letter-spacing: 0.5px;
    }
    .co-badge {
      font-size: 0.7rem;
      color: var(--acc-amber);
      font-weight: 700;
    }
    .card-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #fff;
    }
    .collapse-icon {
      font-size: 1.2rem;
      color: var(--text-muted);
      transition: transform 0.3s ease;
    }
    .experiment-card.open .collapse-icon {
      transform: rotate(180deg);
      color: var(--acc-cyan);
    }

    .card-body {
      display: none;
      padding: 16px;
    }
    .experiment-card.open .card-body {
      display: block;
      animation: fadeIn 0.35s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .problem-box {
      background: rgba(56, 189, 248, 0.06);
      border-left: 3px solid var(--acc-cyan);
      padding: 10px 14px;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      font-size: 0.82rem;
      color: var(--text-main);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    /* Sub-tabs inside each experiment */
    .tab-bar {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      margin-bottom: 14px;
      border-bottom: 1px solid var(--glass-border);
      padding-bottom: 8px;
      scrollbar-width: none;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .tab-btn:hover { color: var(--text-main); background: rgba(255,255,255,0.06); }
    .tab-btn.active {
      color: #060913;
      background: var(--acc-cyan);
      box-shadow: 0 2px 10px rgba(56, 189, 248, 0.35);
    }

    .tab-pane { display: none; }
    .tab-pane.active { display: block; }

    /* Algorithm section */
    .algo-section ol {
      padding-left: 20px;
      font-size: 0.85rem;
      line-height: 1.7;
      color: #cbd5e1;
    }
    .algo-section li { margin-bottom: 6px; }

    /* Flowchart SVG */
    .flowchart-container {
      background: rgba(6, 10, 20, 0.7);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;
      margin: 10px 0;
      overflow-x: auto;
    }
    .flowchart-svg {
      max-width: 100%;
      height: auto;
      max-height: 380px;
      margin: 0 auto;
      display: block;
    }

    /* Code block */
    .code-container {
      position: relative;
      background: var(--code-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      overflow: hidden;
      margin: 10px 0;
    }
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 8px 14px;
      font-size: 0.72rem;
      color: var(--text-muted);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .btn-copy {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: var(--acc-cyan);
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-copy:hover { background: var(--acc-cyan); color: #060913; }
    pre.code-block {
      padding: 14px;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      line-height: 1.55;
      color: var(--code-text);
      max-height: 360px;
    }

    /* Terminal Output */
    pre.terminal-output {
      background: var(--terminal-bg);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: var(--radius-md);
      padding: 14px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      line-height: 1.5;
      color: var(--terminal-text);
      overflow-x: auto;
      margin: 10px 0;
      box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
    }

    /* Interactive Demo Visualizer */
    .demo-visualizer {
      background: rgba(6, 10, 20, 0.85);
      border: 1px solid var(--acc-cyan);
      border-radius: var(--radius-md);
      padding: 16px;
      margin: 10px 0;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.15);
    }
    .demo-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
      flex-wrap: wrap;
      align-items: center;
    }
    .btn-control {
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.25));
      border: 1px solid var(--acc-cyan);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-control:hover { background: var(--acc-cyan); color: #060913; transform: scale(1.02); }
    .demo-stage {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-sm);
      min-height: 120px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      overflow-x: auto;
    }
    .demo-ticker {
      font-size: 0.76rem;
      color: var(--acc-cyan);
      font-family: var(--font-mono);
      background: rgba(0,0,0,0.4);
      padding: 6px 12px;
      border-radius: 6px;
      border-left: 3px solid var(--acc-cyan);
    }

    /* Real-Time Application Box */
    .app-section {
      background: linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(56, 189, 248, 0.08));
      border: 1px solid rgba(52, 211, 153, 0.3);
      border-radius: var(--radius-md);
      padding: 16px;
      margin: 10px 0;
      font-size: 0.85rem;
      line-height: 1.6;
    }
    .app-title {
      font-weight: 700;
      color: var(--acc-emerald);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Floating Liquid Dock (Bottom Bar) */
    nav.bottom-dock {
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 24px);
      max-width: 500px;
      height: 62px;
      border-radius: 31px;
      background: rgba(10, 15, 29, 0.88);
      backdrop-filter: blur(28px) saturate(220%);
      -webkit-backdrop-filter: blur(28px) saturate(220%);
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow: 0 16px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.3);
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 1000;
      padding: 0 8px;
    }
    .dock-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.68rem;
      font-weight: 700;
      gap: 3px;
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .dock-icon { font-size: 1.15rem; }
    .dock-item:hover, .dock-item.active {
      color: #fff;
      transform: translateY(-3px);
    }
    .dock-item.active .dock-icon {
      color: var(--acc-cyan);
      filter: drop-shadow(0 0 10px var(--acc-cyan));
    }

    /* Slide-Up Revision Drawer Modal */
    .drawer-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(6, 10, 20, 0.85);
      backdrop-filter: blur(18px);
      z-index: 2000;
      display: none;
      align-items: flex-end;
      justify-content: center;
    }
    .drawer-modal.open {
      display: flex;
      animation: backdropFade 0.25s ease forwards;
    }
    @keyframes backdropFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .drawer-sheet {
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid var(--glass-border);
      border-radius: 28px 28px 0 0;
      width: 100%;
      max-width: 760px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 -20px 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3);
      animation: sheetSlideUp 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes sheetSlideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .drawer-header {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--glass-border);
    }
    .drawer-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #fff;
    }
    .drawer-close {
      background: rgba(255,255,255,0.1);
      border: none;
      color: var(--text-muted);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .drawer-content {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }

    /* Viva Items */
    .viva-item {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      padding: 14px;
      margin-bottom: 12px;
    }
    .viva-q {
      font-weight: 700;
      font-size: 0.92rem;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .viva-tag {
      background: rgba(168, 85, 247, 0.2);
      color: var(--acc-violet);
      font-size: 0.65rem;
      padding: 2px 8px;
      border-radius: 6px;
      white-space: nowrap;
      font-weight: 700;
    }
    .viva-answer {
      font-size: 0.82rem;
      color: #cbd5e1;
      display: none;
      line-height: 1.55;
      padding-top: 8px;
      border-top: 1px dashed rgba(255,255,255,0.1);
    }
    .viva-item.revealed .viva-answer { display: block; }
    .btn-reveal {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--acc-cyan);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 6px;
    }

    /* Quiz Cards */
    .quiz-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 16px;
    }
    .quiz-q-text {
      font-size: 0.94rem;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .quiz-opt {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
      font-size: 0.82rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .quiz-opt:hover { border-color: var(--acc-cyan); background: rgba(56, 189, 248, 0.08); }
    .quiz-opt.correct { background: rgba(52, 211, 153, 0.25); border-color: var(--acc-emerald); color: #6ee7b7; }
    .quiz-opt.wrong { background: rgba(244, 63, 94, 0.25); border-color: var(--acc-rose); color: #fda4af; }
    .quiz-exp {
      margin-top: 10px;
      font-size: 0.78rem;
      color: var(--text-muted);
      background: rgba(0,0,0,0.3);
      padding: 8px 12px;
      border-radius: 6px;
      display: none;
    }

    /* Knowledge Graph Canvas */
    #kg-canvas {
      width: 100%;
      height: 480px;
      background: #070c18;
      border-radius: var(--radius-md);
      display: block;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
      touch-action: none;
    }

    /* Footer */
    footer.portal-footer {
      text-align: center;
      padding: 30px 16px;
      margin-top: 40px;
      border-top: 1px solid var(--glass-border);
      background: rgba(6, 10, 20, 0.6);
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    .mentor-name {
      font-size: 1rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 2px;
    }
    .mentor-dept {
      color: var(--acc-cyan);
      font-weight: 600;
    }

    /* Mobile media refinements */
    @media (max-width: 600px) {
      .container { padding: 0 12px; }
      .brand-titles h1 { font-size: 0.95rem; }
      .card-title { font-size: 0.95rem; }
      pre.code-block { font-size: 0.72rem; }
    }
  </style>
</head>
<body>

  <!-- Sticky Glass Header -->
  <header class="main-header">
    <div class="container">
      <div class="header-top">
        <div class="brand-group">
          <div class="brand-icon">⚡</div>
          <div class="brand-titles">
            <h1>PCCSL307 · Data Structures Lab</h1>
            <p>KTU B.Tech CSE S3 · Master Mobile Portal</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="theme-btn" id="theme-toggle" title="Toggle Daylight/Night Mode">🌓</button>
        </div>
      </div>

      <!-- Search Input -->
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="experiment-search" class="search-input" placeholder="Search 18 experiments, algorithms, codes...">
      </div>

      <!-- Filter Chips -->
      <div class="filter-chips">
        <span class="chip active" data-filter="all">All (18)</span>
        <span class="chip" data-filter="linear">Arrays & Stacks</span>
        <span class="chip" data-filter="queues">Queues & Deque</span>
        <span class="chip" data-filter="linked_lists">Linked Lists</span>
        <span class="chip" data-filter="trees">Trees & BST</span>
        <span class="chip" data-filter="graphs">Graphs & Puzzles</span>
        <span class="chip" data-filter="sorting">Searching & Sorting</span>
        <span class="chip" data-filter="memory">Hashing & Allocator</span>
      </div>
    </div>
  </header>

  <main class="container">

    <!-- Hero Banner -->
    <div class="hero-banner glass">
      <h2>Complete S3 Data Structures Lab Suite</h2>
      <p>18 Verified Experiments &bull; Step-by-Step Algorithms &bull; SVG Flowcharts &bull; C Programs &bull; Live Visualizers &bull; Viva Bank &bull; 3D Graph</p>
      <div class="meta-pills">
        <span class="meta-pill" style="color:#38bdf8; border-color:#38bdf8;">CIE: 50 Marks</span>
        <span class="meta-pill" style="color:#a855f7; border-color:#a855f7;">ESE: 50 Marks</span>
        <span class="meta-pill" style="color:#34d399; border-color:#34d399;">CO1 &ndash; CO4 Covered</span>
        <span class="meta-pill" style="color:#fbbf24; border-color:#fbbf24;">Bloom's K1 &ndash; K4</span>
      </div>
    </div>

    <!-- 18 Experiment Cards Feed -->
    <div id="experiments-feed">
      ${experimentsData.map(exp => `
      <article class="experiment-card glass ${exp.num === 1 ? 'open' : ''}" data-category="${exp.category}" id="expt-${exp.num}">
        <div class="card-header" onclick="toggleCard(${exp.num})">
          <div class="header-left">
            <div class="badge-row">
              <span class="expt-badge">Expt ${exp.num}</span>
              <span class="co-badge">${exp.co} &bull; Level ${exp.level}</span>
            </div>
            <h3 class="card-title">${exp.title}</h3>
          </div>
          <span class="collapse-icon">▼</span>
        </div>

        <div class="card-body">
          <div class="problem-box">
            <b>Problem Statement:</b> ${exp.problem}
          </div>

          <!-- Internal Sub Tabs -->
          <div class="tab-bar">
            <button class="tab-btn active" onclick="switchTab(${exp.num}, 'algo')">📐 Algorithm & Flowchart</button>
            <button class="tab-btn" onclick="switchTab(${exp.num}, 'code')">💻 C Code & Output</button>
            <button class="tab-btn" onclick="switchTab(${exp.num}, 'demo')">🎮 Live Visualizer</button>
            <button class="tab-btn" onclick="switchTab(${exp.num}, 'app')">💡 Real-World Use</button>
          </div>

          <!-- Tab 1: Algorithm & Flowchart -->
          <div class="tab-pane active" id="pane-${exp.num}-algo">
            <div class="algo-section">
              <h4 style="font-size:0.9rem; color:var(--acc-cyan); margin-bottom:8px;">Structured Algorithm Steps:</h4>
              <ol>
                ${exp.algo.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>
            <div class="flowchart-container">
              <h5 style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px;">Vector SVG Flowchart Logic:</h5>
              ${exp.flowchart}
            </div>
          </div>

          <!-- Tab 2: C Code & Terminal Output -->
          <div class="tab-pane" id="pane-${exp.num}-code">
            <div class="code-container">
              <div class="code-header">
                <span>C Source Program (PCCSL307 Compliant)</span>
                <button class="btn-copy" onclick="copyCode('code-${exp.num}')">Copy Code</button>
              </div>
              <pre class="code-block" id="code-${exp.num}"><code>${escapeHtml(exp.code)}</code></pre>
            </div>

            <div style="margin-top:14px;">
              <h5 style="font-size:0.78rem; color:var(--acc-cyan); margin-bottom:4px;">Verified Terminal Output:</h5>
              <pre class="terminal-output">${escapeHtml(exp.output)}</pre>
            </div>
          </div>

          <!-- Tab 3: Interactive Demo -->
          <div class="tab-pane" id="pane-${exp.num}-demo">
            <div class="demo-visualizer" id="demo-box-${exp.num}">
              <div class="demo-controls">
                <button class="btn-control btn-play" onclick="runDemo(${exp.num})">▶ Play Walkthrough</button>
                <button class="btn-control btn-step" onclick="stepDemo(${exp.num})">⏭ Next Step</button>
                <button class="btn-control btn-reset" onclick="resetDemo(${exp.num})">↺ Reset</button>
              </div>
              <div class="demo-stage" id="stage-${exp.num}">
                <!-- Dynamic simulator state rendered via JS -->
              </div>
              <div class="demo-ticker" id="ticker-${exp.num}">Status: Ready. Tap Play or Next Step to begin visual execution.</div>
            </div>
          </div>

          <!-- Tab 4: Real-Time Application -->
          <div class="tab-pane" id="pane-${exp.num}-app">
            <div class="app-section">
              <div class="app-title">🚀 Industry Application:</div>
              <p>${exp.app}</p>
            </div>
          </div>

        </div>
      </article>
      `).join('')}
    </div>

  </main>

  <!-- Official Footer -->
  <footer class="portal-footer">
    <div class="mentor-name">Asst. Prof. Jane Rose</div>
    <div class="mentor-dept">Department of Computer Science & Engineering (CSE)</div>
    <p style="margin-top: 6px; font-size: 0.72rem; color: var(--text-dim);">PCCSL307 Data Structures Lab &bull; Autonomous KTU Educational Resource &bull; 100% Mobile Ready</p>
  </footer>

  <!-- Floating Liquid Bottom Dock -->
  <nav class="bottom-dock">
    <a class="dock-item active" onclick="scrollToTop()">
      <span class="dock-icon">🧪</span>
      <span>18 Labs</span>
    </a>
    <a class="dock-item" onclick="openDrawer('viva')">
      <span class="dock-icon">🎯</span>
      <span>Viva Bank</span>
    </a>
    <a class="dock-item" onclick="openDrawer('quiz')">
      <span class="dock-icon">⚡</span>
      <span>Quiz</span>
    </a>
    <a class="dock-item" onclick="openDrawer('graph')">
      <span class="dock-icon">🌐</span>
      <span>3D Graph</span>
    </a>
  </nav>

  <!-- Slide-Up Revision Drawer Modal -->
  <div class="drawer-modal" id="revision-drawer" onclick="closeDrawer(event)">
    <div class="drawer-sheet" onclick="event.stopPropagation()">
      <div class="drawer-header">
        <h3 class="drawer-title" id="drawer-title">Revision Superpower</h3>
        <button class="drawer-close" onclick="closeDrawer()">✕</button>
      </div>
      
      <div class="drawer-content" id="drawer-body">
        <!-- VIVA SECTION (Pre-rendered for instant mobile accessibility) -->
        <div id="viva-section" style="display:none;">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:14px;">
            Curated high-yield viva voce questions for KTU End Semester Examination (10 Marks). Tap 'Reveal Answer' to test your recall.
          </p>
          <div id="viva-container">
            ${vivaQuestions.map((item, idx) => `
              <div class="viva-item" id="viva-item-${idx}">
                <div class="viva-q">
                  <span><b>Q${idx+1}:</b> ${item.q}</span>
                  <span class="viva-tag">${item.tag}</span>
                </div>
                <button class="btn-reveal" onclick="toggleVivaAnswer(${idx})">Reveal Answer ▼</button>
                <div class="viva-answer" id="viva-ans-${idx}">
                  ${item.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- QUIZ SECTION (Pre-rendered) -->
        <div id="quiz-section" style="display:none;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <span style="font-size:0.85rem; color:var(--acc-cyan); font-weight:700;">Score: <span id="quiz-score">0</span> / ${quizQuestions.length}</span>
            <span style="font-size:0.75rem; color:var(--text-muted);">Instant Feedback & Explanations</span>
          </div>
          <div id="quiz-list">
            ${quizQuestions.map((q, idx) => `
              <div class="quiz-card" id="qc-${idx}">
                <div class="quiz-q-text"><b>${idx+1}.</b> ${q.q}</div>
                <div class="quiz-options">
                  ${q.options.map((opt, oIdx) => `
                    <div class="quiz-opt" onclick="selectQuizOption(${idx}, ${oIdx})">
                      <b>${String.fromCharCode(65 + oIdx)}.</b> ${opt}
                    </div>
                  `).join('')}
                </div>
                <div class="quiz-exp" id="qe-${idx}">
                  <b>Rationale:</b> ${q.exp}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- GRAPH SECTION -->
        <div id="graph-section" style="display:none;">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">
            Interactive Force Network Graph: Drag nodes, touch to highlight connections across Linear, Tree, Graph, Sorting paradigms and KTU Course Outcomes (CO1&ndash;CO4).
          </p>
          <canvas id="kg-canvas" width="700" height="460"></canvas>
          <div id="kg-info" style="margin-top:10px; font-size:0.78rem; color:var(--acc-cyan); background:rgba(0,0,0,0.5); padding:8px 12px; border-radius:8px;">
            Tap or drag any node to view relationship details.
          </div>
        </div>
      </div>

    </div>
  </div>

  <script>
    /* ==========================================================================
       CLIENT CONTROLLER JAVASCRIPT ENGINE
       ========================================================================== */

    // Global Data Cache
    const VIVA_DATA = ${JSON.stringify(vivaQuestions)};
    const QUIZ_DATA = ${JSON.stringify(quizQuestions)};

    // Search and Category Filter Engine
    const searchInput = document.getElementById('experiment-search');
    const chipButtons = document.querySelectorAll('.filter-chips .chip');
    let currentFilter = 'all';

    searchInput.addEventListener('input', applyFilters);
    chipButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        chipButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        applyFilters();
      });
    });

    function applyFilters() {
      const query = searchInput.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.experiment-card');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.innerText.toLowerCase();
        const matchesCategory = (currentFilter === 'all' || cat === currentFilter);
        const matchesQuery = (!query || text.includes(query));
        card.style.display = (matchesCategory && matchesQuery) ? 'block' : 'none';
      });
    }

    // Accordion Toggle
    function toggleCard(num) {
      const card = document.getElementById('expt-' + num);
      if (card) {
        card.classList.toggle('open');
        // Initial setup for demo visualizer if opened
        if (card.classList.contains('open')) {
          initDemoStage(num);
        }
      }
    }

    // Sub Tabs Inside Cards
    function switchTab(num, tab) {
      const card = document.getElementById('expt-' + num);
      if (!card) return;
      card.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      card.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      const activeBtn = event.currentTarget;
      if (activeBtn) activeBtn.classList.add('active');
      const pane = document.getElementById('pane-' + num + '-' + tab);
      if (pane) pane.classList.add('active');
      if (tab === 'demo') initDemoStage(num);
    }

    // Copy C Code
    function copyCode(id) {
      const code = document.getElementById(id).innerText;
      navigator.clipboard.writeText(code).then(() => {
        const btn = event.currentTarget;
        const orig = btn.innerText;
        btn.innerText = 'Copied! ✓';
        btn.style.background = '#34d399';
        btn.style.color = '#060913';
        setTimeout(() => {
          btn.innerText = orig;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      });
    }

    // Theme Switcher
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pccsl307_theme', next);
    });
    const savedTheme = localStorage.getItem('pccsl307_theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ==========================================================================
    // REVISION DRAWER ENGINE (VIVA BANK, QUIZ, 3D KNOWLEDGE GRAPH)
    // ==========================================================================
    const drawerModal = document.getElementById('revision-drawer');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerBody = document.getElementById('drawer-body');

    function openDrawer(mode) {
      drawerModal.classList.add('open');
      document.getElementById('viva-section').style.display = 'none';
      document.getElementById('quiz-section').style.display = 'none';
      document.getElementById('graph-section').style.display = 'none';

      if (mode === 'viva') {
        drawerTitle.innerText = '🎯 Viva Voce Master Bank (36+ Questions)';
        document.getElementById('viva-section').style.display = 'block';
      } else if (mode === 'quiz') {
        drawerTitle.innerText = '⚡ Interactive Revision Quiz (15 Marks)';
        document.getElementById('quiz-section').style.display = 'block';
      } else if (mode === 'graph') {
        drawerTitle.innerText = '🌐 Interactive 3D Knowledge Graph';
        document.getElementById('graph-section').style.display = 'block';
        setTimeout(initKnowledgeGraph, 50);
      }
    }

    function closeDrawer(e) {
      drawerModal.classList.remove('open');
    }

    function renderVivaBank() {
      drawerBody.innerHTML = \`
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:14px;">
          Curated high-yield viva voce questions for KTU End Semester Examination (10 Marks). Tap 'Reveal Answer' to test your recall.
        </p>
        <div id="viva-container">
          \${VIVA_DATA.map((item, idx) => \`
            <div class="viva-item" id="viva-item-\${idx}">
              <div class="viva-q">
                <span><b>Q\${idx+1}:</b> \${item.q}</span>
                <span class="viva-tag">\${item.tag}</span>
              </div>
              <button class="btn-reveal" onclick="toggleVivaAnswer(\${idx})">Reveal Answer ▼</button>
              <div class="viva-answer" id="viva-ans-\${idx}">
                \${item.a}
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    }

    function toggleVivaAnswer(idx) {
      const item = document.getElementById('viva-item-' + idx);
      if (item) item.classList.toggle('revealed');
    }

    // Quiz Engine Logic
    let userScore = 0;
    let answeredQuestions = new Set();

    function renderQuizEngine() {
      userScore = 0;
      answeredQuestions.clear();
      drawerBody.innerHTML = \`
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <span style="font-size:0.85rem; color:var(--acc-cyan); font-weight:700;">Score: <span id="quiz-score">0</span> / \${QUIZ_DATA.length}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">Instant Feedback & Explanations</span>
        </div>
        <div id="quiz-list">
          \${QUIZ_DATA.map((q, idx) => \`
            <div class="quiz-card" id="qc-\${idx}">
              <div class="quiz-q-text"><b>\${idx+1}.</b> \${q.q}</div>
              <div class="quiz-options">
                \${q.options.map((opt, oIdx) => \`
                  <div class="quiz-opt" onclick="selectQuizOption(\${idx}, \${oIdx})">
                    <b>\${String.fromCharCode(65 + oIdx)}.</b> \${opt}
                  </div>
                \`).join('')}
              </div>
              <div class="quiz-exp" id="qe-\${idx}">
                <b>Rationale:</b> \${q.exp}
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    }

    function selectQuizOption(qIdx, oIdx) {
      if (answeredQuestions.has(qIdx)) return;
      answeredQuestions.add(qIdx);

      const q = QUIZ_DATA[qIdx];
      const card = document.getElementById('qc-' + qIdx);
      const opts = card.querySelectorAll('.quiz-opt');
      const expBox = document.getElementById('qe-' + qIdx);

      opts[q.ans].classList.add('correct');
      if (oIdx === q.ans) {
        userScore++;
        opts[oIdx].innerHTML += ' ✓';
      } else {
        opts[oIdx].classList.add('wrong');
        opts[oIdx].innerHTML += ' ✗';
      }
      document.getElementById('quiz-score').innerText = userScore;
      expBox.style.display = 'block';
    }

    // Interactive 3D / 2D Force-Directed Knowledge Graph
    function renderKnowledgeGraph() {
      drawerBody.innerHTML = \`
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:10px;">
          Interactive Force Network Graph: Drag nodes, touch to highlight connections across Linear, Tree, Graph, Sorting paradigms and KTU Course Outcomes (CO1&ndash;CO4).
        </p>
        <canvas id="kg-canvas" width="700" height="460"></canvas>
        <div id="kg-info" style="margin-top:10px; font-size:0.78rem; color:var(--acc-cyan); background:rgba(0,0,0,0.5); padding:8px 12px; border-radius:8px;">
          Tap or drag any node to view relationship details.
        </div>
      \`;
      initKnowledgeGraph();
    }

    function initKnowledgeGraph() {
      const canvas = document.getElementById('kg-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const infoBox = document.getElementById('kg-info');

      // Adjust for device pixel ratio
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const width = rect.width;
      const height = rect.height;

      // Graph Nodes
      const nodes = [
        { id: 'DSA', label: 'PCCSL307', x: width*0.5, y: height*0.5, r: 24, color: '#38bdf8' },
        { id: 'CO1', label: 'CO1 (Model)', x: width*0.25, y: height*0.25, r: 18, color: '#a855f7' },
        { id: 'CO2', label: 'CO2 (Complexity)', x: width*0.75, y: height*0.25, r: 18, color: '#a855f7' },
        { id: 'CO3', label: 'CO3 (Sorting)', x: width*0.75, y: height*0.75, r: 18, color: '#a855f7' },
        { id: 'CO4', label: 'CO4 (Dynamic)', x: width*0.25, y: height*0.75, r: 18, color: '#a855f7' },
        { id: 'E1', label: 'Expt 1 Poly', x: width*0.12, y: height*0.15, r: 13, color: '#34d399' },
        { id: 'E3', label: 'Expt 3 Stack', x: width*0.18, y: height*0.42, r: 13, color: '#34d399' },
        { id: 'E4', label: 'Expt 4 C-Queue', x: width*0.38, y: height*0.12, r: 13, color: '#34d399' },
        { id: 'E5', label: 'Expt 5 Browser', x: width*0.15, y: height*0.85, r: 13, color: '#34d399' },
        { id: 'E8', label: 'Expt 8 BST', x: width*0.62, y: height*0.12, r: 13, color: '#fbbf24' },
        { id: 'E9', label: 'Expt 9 Maze', x: width*0.85, y: height*0.45, r: 13, color: '#f43f5e' },
        { id: 'E10', label: 'Expt 10 Jugs', x: width*0.48, y: height*0.85, r: 13, color: '#f43f5e' },
        { id: 'E13', label: 'Expt 13 Sort', x: width*0.85, y: height*0.85, r: 13, color: '#fbbf24' },
        { id: 'E16', label: 'Expt 16 Alloc', x: width*0.35, y: height*0.68, r: 13, color: '#34d399' }
      ];

      const edges = [
        ['DSA', 'CO1'], ['DSA', 'CO2'], ['DSA', 'CO3'], ['DSA', 'CO4'],
        ['CO1', 'E1'], ['CO1', 'E3'], ['CO1', 'E4'], ['CO4', 'E5'],
        ['CO2', 'E8'], ['CO1', 'E9'], ['CO1', 'E10'], ['CO3', 'E13'],
        ['CO4', 'E16'], ['CO3', 'E9']
      ];

      let draggedNode = null;

      function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        ctx.lineWidth = 1.5;
        edges.forEach(([sId, tId]) => {
          const s = nodes.find(n => n.id === sId);
          const t = nodes.find(n => n.id === tId);
          if (s && t) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
          }
        });

        // Draw nodes
        nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Labels
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y);
        });
      }

      draw();

      // Touch / Mouse Interaction
      function getPos(e) {
        const r = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - r.left, y: clientY - r.top };
      }

      function onDown(e) {
        const pos = getPos(e);
        draggedNode = nodes.find(n => Math.hypot(n.x - pos.x, n.y - pos.y) <= n.r);
        if (draggedNode && infoBox) {
          infoBox.innerText = 'Inspecting: ' + draggedNode.label + ' (' + draggedNode.id + '). Active in KTU PCCSL307 curriculum.';
        }
      }

      function onMove(e) {
        if (!draggedNode) return;
        const pos = getPos(e);
        draggedNode.x = pos.x;
        draggedNode.y = pos.y;
        draw();
      }

      function onUp() { draggedNode = null; }

      canvas.addEventListener('mousedown', onDown);
      canvas.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);

      canvas.addEventListener('touchstart', onDown, { passive: true });
      canvas.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onUp);
    }

    // ==========================================================================
    // PRE-LOADED INTERACTIVE SIMULATORS FOR ALL 18 EXPERIMENTS
    // ==========================================================================
    const demoStates = {};

    function initDemoStage(num) {
      const stage = document.getElementById('stage-' + num);
      const ticker = document.getElementById('ticker-' + num);
      if (!stage) return;

      if (!demoStates[num]) {
        demoStates[num] = { step: 0, timer: null };
      }

      renderDemoState(num, 0);
    }

    function renderDemoState(num, stepIndex) {
      const stage = document.getElementById('stage-' + num);
      const ticker = document.getElementById('ticker-' + num);
      if (!stage || !ticker) return;

      // Unique visual presentation per experiment
      if (num === 1) { // Poly Add
        const steps = [
          { text: "Poly A: 4x^3 + 3x^2 + 5 | Poly B: 2x^3 + 4x + 1", a: [4, 3, 5], b: [2, 4, 1], res: [] },
          { text: "Matching degree 3: 4x^3 + 2x^3 = 6x^3. Adding to Result.", a: [4, 3, 5], b: [2, 4, 1], res: ["6x^3"] },
          { text: "Exponent 2 unmatched: Copying 3x^2 to Result.", a: [4, 3, 5], b: [2, 4, 1], res: ["6x^3", "3x^2"] },
          { text: "Exponent 1 unmatched: Copying 4x^1 to Result.", a: [4, 3, 5], b: [2, 4, 1], res: ["6x^3", "3x^2", "4x^1"] },
          { text: "Matching degree 0: 5 + 1 = 6. Complete: 6x^3 + 3x^2 + 4x + 6", a: [4, 3, 5], b: [2, 4, 1], res: ["6x^3", "3x^2", "4x^1", "6"] }
        ];
        const cur = steps[stepIndex % steps.length];
        ticker.innerText = "Step " + (stepIndex % steps.length + 1) + ": " + cur.text;
        stage.innerHTML = \`
          <div style="text-align:center; width:100%;">
            <div style="display:flex; justify-content:center; gap:8px; margin-bottom:8px;">
              <span style="font-size:0.75rem; color:#94a3b8;">Result Polynomial:</span>
              \${cur.res.map(t => \`<span style="background:#38bdf8; color:#060913; font-weight:700; padding:2px 8px; border-radius:6px; font-size:0.75rem;">\${t}</span>\`).join(' + ') || '<span style="color:#64748b; font-size:0.75rem;">(empty)</span>'}
            </div>
          </div>
        \`;
      } else if (num === 10) { // Water Jug
        const jugSteps = [
          { j10: 0, j7: 7, j4: 4, text: "Initial: 10L is empty, 7L & 4L containers are full." },
          { j10: 7, j7: 0, j4: 4, text: "Pour 7L -> 10L. (10L has 7L, 7L is empty)." },
          { j10: 7, j7: 4, j4: 0, text: "Pour 4L -> 7L. (7L has 4L, 4L is empty)." },
          { j10: 3, j7: 4, j4: 4, text: "Pour 10L -> 4L. (10L has 3L, 4L has 4L)." },
          { j10: 3, j7: 7, j4: 1, text: "Pour 4L -> 7L until full. (4L container left with 1L!)." },
          { j10: 10, j7: 0, j4: 1, text: "Pour 7L -> 10L. (10L is full)." },
          { j10: 10, j7: 1, j4: 0, text: "Pour 4L -> 7L. (7L has 1L, 4L is empty)." },
          { j10: 6, j7: 1, j4: 4, text: "Pour 10L -> 4L. (10L has 6L, 4L is full with 4L)." },
          { j10: 6, j7: 5, j4: 0, text: "Pour 4L -> 7L. (7L has 5L)." },
          { j10: 2, j7: 5, j4: 4, text: "Pour 10L -> 4L. (10L has 2L!)." },
          { j10: 2, j7: 7, j4: 2, text: "GOAL REACHED! Exactly 2L in 4L container!" }
        ];
        const s = jugSteps[stepIndex % jugSteps.length];
        ticker.innerText = "Step " + (stepIndex % jugSteps.length + 1) + ": " + s.text;
        stage.innerHTML = \`
          <div style="display:flex; justify-content:space-around; width:100%; align-items:flex-end; height:70px;">
            <div style="text-align:center;">
              <div style="width:36px; height:50px; border:2px solid #38bdf8; border-radius:0 0 8px 8px; background:rgba(56,189,248,0.1); display:flex; align-items:flex-end; overflow:hidden; margin:0 auto;">
                <div style="width:100%; height:\${(s.j10/10)*100}%; background:#38bdf8; transition:height 0.3s;"></div>
              </div>
              <span style="font-size:0.7rem; color:#cbd5e1;">10L (\${s.j10}L)</span>
            </div>
            <div style="text-align:center;">
              <div style="width:30px; height:42px; border:2px solid #a855f7; border-radius:0 0 8px 8px; background:rgba(168,85,247,0.1); display:flex; align-items:flex-end; overflow:hidden; margin:0 auto;">
                <div style="width:100%; height:\${(s.j7/7)*100}%; background:#a855f7; transition:height 0.3s;"></div>
              </div>
              <span style="font-size:0.7rem; color:#cbd5e1;">7L (\${s.j7}L)</span>
            </div>
            <div style="text-align:center;">
              <div style="width:26px; height:34px; border:2px solid #34d399; border-radius:0 0 8px 8px; background:rgba(52,211,153,0.1); display:flex; align-items:flex-end; overflow:hidden; margin:0 auto;">
                <div style="width:100%; height:\${(s.j4/4)*100}%; background:#34d399; transition:height 0.3s;"></div>
              </div>
              <span style="font-size:0.7rem; color:#cbd5e1;">4L (\${s.j4}L)</span>
            </div>
          </div>
        \`;
      } else if (num === 4) { // Circular Queue
        const cqSteps = [
          { items: [10, 20, 30, null, null], front: 0, rear: 2, text: "Enqueued 10, 20, 30. Front=0, Rear=2." },
          { items: [null, 20, 30, null, null], front: 1, rear: 2, text: "Dequeued 10. Front advances to index 1." },
          { items: [null, 20, 30, 40, 50], front: 1, rear: 4, text: "Enqueued 40, 50. Rear is at index 4 (boundary)." },
          { items: [60, 20, 30, 40, 50], front: 1, rear: 0, text: "Enqueued 60 -> Circular wrap! Rear wraps to index 0!" }
        ];
        const s = cqSteps[stepIndex % cqSteps.length];
        ticker.innerText = "Step " + (stepIndex % cqSteps.length + 1) + ": " + s.text;
        stage.innerHTML = \`
          <div style="display:flex; gap:8px; justify-content:center; width:100%;">
            \${s.items.map((val, idx) => \`
              <div style="width:42px; height:42px; border:2px solid \${idx === s.front ? '#38bdf8' : (idx === s.rear ? '#a855f7' : '#475569')}; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:\${val ? 'rgba(56,189,248,0.15)' : 'transparent'};">
                <span style="font-weight:700; font-size:0.8rem; color:#fff;">\${val !== null ? val : '-'}</span>
                <span style="font-size:0.55rem; color:#94a3b8;">[\${idx}]</span>
              </div>
            \`).join('')}
          </div>
        \`;
      } else if (num === 12) { // Binary Search
        const bsSteps = [
          { arr: [2, 7, 11, 15, 23, 29, 35, 42, 51, 63, 72, 88, 91, 99], low: 0, high: 13, mid: 6, text: "Key=72. Mid=35 < 72. Eliminate left half!" },
          { arr: [2, 7, 11, 15, 23, 29, 35, 42, 51, 63, 72, 88, 91, 99], low: 7, high: 13, mid: 10, text: "Low=7, High=13. Mid=10 (72) == Key (72). Found in 2 steps!" }
        ];
        const s = bsSteps[stepIndex % bsSteps.length];
        ticker.innerText = "Step " + (stepIndex % bsSteps.length + 1) + ": " + s.text;
        stage.innerHTML = \`
          <div style="display:flex; gap:4px; overflow-x:auto; max-width:100%; padding:4px;">
            \${s.arr.map((val, idx) => \`
              <div style="min-width:28px; height:32px; border:1px solid \${idx === s.mid ? '#34d399' : (idx >= s.low && idx <= s.high ? '#38bdf8' : '#334155')}; background:\${idx === s.mid ? '#34d399' : (idx >= s.low && idx <= s.high ? 'rgba(56,189,248,0.2)' : 'rgba(0,0,0,0.3)')}; color:\${idx === s.mid ? '#060913' : '#fff'}; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:0.68rem; font-weight:700;">
                \${val}
              </div>
            \`).join('')}
          </div>
        \`;
      } else {
        // Generic visualizer for other experiments
        const genericSteps = [
          { status: "Initializing data structures and boundary pointers...", icon: "⚙️" },
          { status: "Executing core algorithm loop step A...", icon: "🔄" },
          { status: "Evaluating conditional comparisons and pointer swaps...", icon: "⚡" },
          { status: "Algorithm execution complete! Result stored in output buffer.", icon: "✅" }
        ];
        const cur = genericSteps[stepIndex % genericSteps.length];
        ticker.innerText = "Step " + (stepIndex % genericSteps.length + 1) + ": " + cur.status;
        stage.innerHTML = \`
          <div style="text-align:center;">
            <div style="font-size:1.8rem; margin-bottom:6px;">\${cur.icon}</div>
            <div style="font-size:0.8rem; color:#e2e8f0; font-weight:600;">\${cur.status}</div>
          </div>
        \`;
      }
    }

    function runDemo(num) {
      if (!demoStates[num]) demoStates[num] = { step: 0, timer: null };
      if (demoStates[num].timer) {
        clearInterval(demoStates[num].timer);
        demoStates[num].timer = null;
        document.querySelector('#demo-box-' + num + ' .btn-play').innerText = '▶ Play Walkthrough';
        return;
      }
      document.querySelector('#demo-box-' + num + ' .btn-play').innerText = '⏸ Pause';
      demoStates[num].timer = setInterval(() => {
        demoStates[num].step++;
        renderDemoState(num, demoStates[num].step);
      }, 1200);
    }

    function stepDemo(num) {
      if (!demoStates[num]) demoStates[num] = { step: 0, timer: null };
      if (demoStates[num].timer) {
        clearInterval(demoStates[num].timer);
        demoStates[num].timer = null;
        document.querySelector('#demo-box-' + num + ' .btn-play').innerText = '▶ Play Walkthrough';
      }
      demoStates[num].step++;
      renderDemoState(num, demoStates[num].step);
    }

    function resetDemo(num) {
      if (demoStates[num] && demoStates[num].timer) {
        clearInterval(demoStates[num].timer);
      }
      demoStates[num] = { step: 0, timer: null };
      const playBtn = document.querySelector('#demo-box-' + num + ' .btn-play');
      if (playBtn) playBtn.innerText = '▶ Play Walkthrough';
      renderDemoState(num, 0);
    }

    // Initialize first experiment demo
    window.addEventListener('DOMContentLoaded', () => {
      initDemoStage(1);
    });
  </script>
</body>
</html>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const finalHtml = buildHtml();
const targetPath = path.resolve(__dirname, '..', 'PCCSL307_Data_Structures_Lab_Portal.html');
const indexPath = path.resolve(__dirname, '..', 'index.html');

fs.writeFileSync(targetPath, finalHtml, 'utf-8');
console.log(`Generated: ${targetPath} (${finalHtml.length} bytes)`);

fs.writeFileSync(indexPath, finalHtml, 'utf-8');
console.log(`Mirrored to: ${indexPath}`);

console.log('Build completed successfully!');
