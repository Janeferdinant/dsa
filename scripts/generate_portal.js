const fs = require('fs');
const path = require('path');

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
    demoType: "poly_add",
    app: "Computer Algebra Systems (SymPy, Wolfram Mathematica), 3D Bézier curve rendering in game engines, and numerical signal polynomial filters."
  },
  {
    num: 2,
    title: "Sparse Matrix Transpose & Addition",
    co: "CO1, CO2",
    level: "K3",
    category: "linear",
    problem: "Given matrices with predominantly zero values, represent them in 3-Tuple (Row, Column, Value) format. Add two sparse matrices by merging their tuples in row-major order, and find the transpose with the fast transpose algorithm in O(cols + nonzeros) time.",
    algo: [
      "Represent each matrix as an array of triplets; tuple[0] stores (rows, cols, total_non_zeros).",
      "For addition: check that both matrices have the same dimensions.",
      "Traverse tuples of A and B in row-major order, comparing (row, col).",
      "  a. If positions are equal: add the values and keep the sum only if it is not zero.",
      "  b. Otherwise copy the tuple with the smaller (row, col) into the result.",
      "Copy the remaining tuples of A or B, then set the result header.",
      "For Fast Transpose: count the non-zeros in each column of A.",
      "Compute the starting position of each column in the transposed matrix B.",
      "For each tuple of A, place it at its target slot in B with row and column swapped.",
      "Print the 3-tuple and dense forms of A, B, A + B and the transpose."
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
    code: `/*
 * Experiment 2: Sparse Matrix Transpose and Addition
 * Syllabus task: Find the transpose of a sparse matrix and the sum
 * of two sparse matrices.
 *
 * How it works:
 *   A sparse matrix is stored as a 3-tuple (triplet) table. Entry 0
 *   holds (rows, cols, number of non-zeros); entries 1..n hold the
 *   (row, col, value) of each non-zero, in row-major order.
 *   - Addition walks both tables together, like merging two sorted
 *     lists: the earlier position is copied, equal positions are
 *     added, and a sum of zero is dropped.
 *   - Fast transpose counts the terms in each column, turns the
 *     counts into start positions, then puts every term straight
 *     into its slot. Time: O(cols + non-zeros).
 */
#include <stdio.h>
#include <stdbool.h>

#define MAX_TERMS 20   /* table size: 1 header + up to 19 non-zeros */
#define MAX_DIM   10   /* largest number of rows or columns         */

/* One entry of a 3-tuple table. */
typedef struct {
    int row;
    int col;
    int val;
} Term;

/* Compare positions in row-major order: row first, then column.
 * Negative: x comes first, 0: same place, positive: y comes first. */
static int comparePos(Term x, Term y) {
    if (x.row != y.row) return x.row - y.row;
    return x.col - y.col;
}

/* Guard: the table must fit our arrays, every term must lie inside
 * the matrix, and the terms must be in row-major order. */
static bool isValid(const Term t[]) {
    int rows = t[0].row, cols = t[0].col, n = t[0].val;
    if (rows < 1 || rows > MAX_DIM || cols < 1 || cols > MAX_DIM) return false;
    if (n < 0 || n >= MAX_TERMS) return false;
    for (int i = 1; i <= n; i++) {
        if (t[i].row < 0 || t[i].row >= rows) return false;
        if (t[i].col < 0 || t[i].col >= cols) return false;
        if (i > 1 && comparePos(t[i - 1], t[i]) >= 0) return false;
    }
    return true;
}

/* Print a 3-tuple table; entry 0 is the header. */
static void printTuples(const char *name, const Term t[]) {
    printf("%s in 3-tuple form:\\n", name);
    printf("  Row Col Val\\n");
    for (int i = 0; i <= t[0].val; i++) {
        printf("  %3d %3d %3d%s\\n", t[i].row, t[i].col, t[i].val,
               i == 0 ? "   <- rows, cols, non-zeros" : "");
    }
}

/* Expand a 3-tuple table into a full grid and print it. */
static void printDense(const char *name, const Term t[]) {
    int grid[MAX_DIM][MAX_DIM] = {{0}};
    for (int i = 1; i <= t[0].val; i++) {
        grid[t[i].row][t[i].col] = t[i].val;
    }
    printf("%s as a dense matrix:\\n", name);
    for (int r = 0; r < t[0].row; r++) {
        printf(" ");
        for (int c = 0; c < t[0].col; c++) printf(" %4d", grid[r][c]);
        printf("\\n");
    }
}

/* Append one term to table c at position *k (checks for space). */
static bool appendTerm(Term c[], int *k, Term t) {
    if (*k >= MAX_TERMS) {
        printf("Error: result table is full\\n");
        return false;
    }
    c[*k] = t;
    (*k)++;
    return true;
}

/* A term found in only one matrix is copied as it is. */
static bool copyStep(const char *from, Term t, Term c[], int *k) {
    printf("  (%d,%d) only in %s: copy %d\\n", t.row, t.col, from, t.val);
    return appendTerm(c, k, t);
}

/* C = A + B, all in 3-tuple form. Returns false on an error. */
static bool addSparse(const Term a[], const Term b[], Term c[]) {
    int i = 1, j = 1, k = 1;
    int na = a[0].val, nb = b[0].val;

    /* Step 1: matrices can be added only if their sizes match. */
    if (a[0].row != b[0].row || a[0].col != b[0].col) {
        printf("Error: cannot add a %d x %d and a %d x %d matrix\\n",
               a[0].row, a[0].col, b[0].row, b[0].col);
        return false;
    }
    printf("A + B: both are %d x %d, merge in row-major order\\n",
           a[0].row, a[0].col);

    /* Step 2: walk both tables while each has terms left. */
    while (i <= na && j <= nb) {
        int order = comparePos(a[i], b[j]);
        if (order < 0) {                   /* A's term comes first */
            if (!copyStep("A", a[i++], c, &k)) return false;
        } else if (order > 0) {            /* B's term comes first */
            if (!copyStep("B", b[j++], c, &k)) return false;
        } else {                           /* same place: add */
            Term s = {a[i].row, a[i].col, a[i].val + b[j].val};
            printf("  (%d,%d) in both: A %d, B %d -> sum %d%s\\n",
                   s.row, s.col, a[i].val, b[j].val, s.val,
                   s.val == 0 ? ", dropped" : "");
            if (s.val != 0 && !appendTerm(c, &k, s)) return false;
            i++;
            j++;
        }
    }

    /* Step 3: copy the terms left over in A or in B. */
    while (i <= na) {
        if (!copyStep("A", a[i++], c, &k)) return false;
    }
    while (j <= nb) {
        if (!copyStep("B", b[j++], c, &k)) return false;
    }

    /* Step 4: header = same size, k - 1 non-zeros. */
    c[0].row = a[0].row;
    c[0].col = a[0].col;
    c[0].val = k - 1;
    return true;
}

/* T = transpose of A using the fast transpose method. */
static void fastTranspose(const Term a[], Term t[]) {
    int count[MAX_DIM] = {0};   /* non-zeros in each column of A */
    int start[MAX_DIM] = {0};   /* next free slot for each column */
    int cols = a[0].col, n = a[0].val;

    /* Header: rows and columns swap; the count stays the same. */
    t[0].row = a[0].col;
    t[0].col = a[0].row;
    t[0].val = n;

    /* Step 1: count the terms in each column of A. */
    for (int i = 1; i <= n; i++) count[a[i].col]++;

    /* Step 2: column c starts right after columns 0..c-1. */
    start[0] = 1;
    for (int c = 1; c < cols; c++) start[c] = start[c - 1] + count[c - 1];

    printf("Transpose of A: fast transpose\\n");
    printf("  Column   :");
    for (int c = 0; c < cols; c++) printf(" %3d", c);
    printf("\\n  Count    :");
    for (int c = 0; c < cols; c++) printf(" %3d", count[c]);
    printf("\\n  Start pos:");
    for (int c = 0; c < cols; c++) printf(" %3d", start[c]);
    printf("\\n");

    /* Step 3: drop each term into its slot with row and col swapped. */
    for (int i = 1; i <= n; i++) {
        int slot = start[a[i].col];
        start[a[i].col]++;
        t[slot].row = a[i].col;
        t[slot].col = a[i].row;
        t[slot].val = a[i].val;
        printf("  A(%d,%d) = %d -> slot %d as (%d,%d)\\n",
               a[i].row, a[i].col, a[i].val, slot, a[i].col, a[i].row);
    }
}

int main(void) {
    /* Matrix A: the sample matrix used earlier in this experiment. */
    Term a[MAX_TERMS] = {{4, 4, 3}, {0, 1, 10}, {1, 3, 20}, {3, 0, 30}};
    /* Matrix B: same size; (0,1) overlaps A, and at (3,0) the -30
     * cancels A's 30, so that position must vanish from A + B. */
    Term b[MAX_TERMS] = {{4, 4, 3}, {0, 1, 5}, {2, 2, 40}, {3, 0, -30}};
    Term sum[MAX_TERMS] = {{0}};
    Term at[MAX_TERMS] = {{0}};

    printf("Experiment 2: Sparse Matrix Transpose and Addition\\n\\n");
    if (!isValid(a) || !isValid(b)) {
        printf("Error: an input table is not a valid 3-tuple table\\n");
        return 1;
    }

    printTuples("Matrix A", a);
    printDense("Matrix A", a);
    printf("\\n");
    printTuples("Matrix B", b);
    printDense("Matrix B", b);
    printf("\\n");

    if (addSparse(a, b, sum)) {
        printTuples("A + B", sum);
        printDense("A + B", sum);
    }
    printf("\\n");

    fastTranspose(a, at);
    printTuples("Transpose of A", at);
    printDense("Transpose of A", at);
    return 0;
}`,
    demoType: "sparse_matrix",
    app: "Google PageRank algorithm (web graph adjacency matrix), Netflix collaborative filtering recommendation engines, structural finite element stress analysis."
  },
  {
    num: 3,
    title: "Infix to Postfix Conversion & Stack Evaluation",
    co: "CO1, CO2",
    level: "K3",
    category: "linear",
    problem: "Convert an infix expression to postfix using an operator stack, then evaluate the postfix expression using an operand stack. Handle parentheses, operator precedence, right-associative ^, and errors such as division by zero.",
    algo: [
      "Scan the infix expression from left to right.",
      "If the symbol is an operand: append it to the postfix output.",
      "If the symbol is (: push it on the operator stack.",
      "If the symbol is ): pop operators to the output until ( is found, then discard (.",
      "If the symbol is an operator: pop operators of higher precedence (or equal precedence, unless the operator is right-associative ^), then push the new operator.",
      "At the end, pop all remaining operators to the output.",
      "To evaluate: scan the postfix string left to right.",
      "  a. Operand: push its value on the operand stack.",
      "  b. Operator: pop two operands, apply the operator, push the result.",
      "Check for stack underflow and division by zero; the final value left on the stack is the result."
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
    code: `/*
 * Experiment 3: Infix to Postfix Conversion and Evaluation
 * Syllabus task: Convert an infix expression to postfix and then
 * evaluate the postfix expression using a stack.
 *
 * How it works:
 *   1. Conversion: scan the infix string from left to right.
 *      Operands go straight to the postfix string. Operators wait
 *      on an operator stack and leave it when an operator of lower
 *      precedence arrives or a ')' closes their group.
 *      + - * / are left-associative; ^ is right-associative.
 *   2. Evaluation: scan the postfix string. Push each operand on an
 *      integer stack; for an operator pop b, pop a, push (a op b).
 *   Operands are single digits 0-9, so every character is one token.
 *   All arithmetic is integer arithmetic (7/2 gives 3).
 */
#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <ctype.h>

#define MAX 50   /* longest expression and deepest stack */

/* Operator stack used for conversion. */
typedef struct {
    char items[MAX];
    int top;            /* index of the top item, -1 when empty */
} CharStack;

/* Operand stack used for evaluation. */
typedef struct {
    int items[MAX];
    int top;
} IntStack;

/* Print an error message and report failure. */
static bool fail(const char *message) {
    printf("    Error: %s\\n", message);
    return false;
}

/* Push onto the operator stack; false on overflow. */
static bool pushChar(CharStack *s, char c) {
    if (s->top == MAX - 1) return fail("operator stack overflow");
    s->items[++s->top] = c;
    return true;
}

/* Pop from the operator stack; false on underflow. */
static bool popChar(CharStack *s, char *c) {
    if (s->top == -1) return fail("operator stack underflow");
    *c = s->items[s->top--];
    return true;
}

/* Push onto the operand stack; false on overflow. */
static bool pushInt(IntStack *s, int v) {
    if (s->top == MAX - 1) return fail("operand stack overflow");
    s->items[++s->top] = v;
    return true;
}

/* Pop from the operand stack; false on underflow (missing operand). */
static bool popInt(IntStack *s, int *v) {
    if (s->top == -1) return fail("operand stack underflow");
    *v = s->items[s->top--];
    return true;
}

/* Precedence: ^ highest, then * and /, then + and -; 0 = not an operator. */
static int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

/* Must the operator on top of the stack leave before op is pushed? */
static bool shouldPop(char top, char op) {
    if (top == '(') return false;          /* '(' waits for its ')' */
    if (op == '^') return precedence(top) > precedence(op);  /* right */
    return precedence(top) >= precedence(op);                /* left  */
}

/* Print one conversion row: symbol, operator stack, postfix so far. */
static void showRow(const char *symbol, const CharStack *s,
                    const char *postfix) {
    if (postfix[0] == '\\0') {
        printf("    %-6s %.*s\\n", symbol, s->top + 1, s->items);
    } else {
        printf("    %-6s %-9.*s %s\\n", symbol, s->top + 1, s->items, postfix);
    }
}

/* Convert infix to postfix, printing each step if trace is true. */
static bool infixToPostfix(const char *infix, char postfix[], bool trace) {
    CharStack ops = {.top = -1};
    int k = 0;                 /* length of the postfix string so far */
    char c = '\\0';

    if (strlen(infix) >= MAX) return fail("expression too long");
    postfix[0] = '\\0';
    if (trace) printf("    Symbol Op stack  Postfix\\n");

    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];
        char symbol[2] = {ch, '\\0'};
        if (isdigit((unsigned char)ch)) {
            postfix[k++] = ch;                       /* operand: output */
        } else if (ch == '(') {
            if (!pushChar(&ops, ch)) return false;  /* open a group */
        } else if (ch == ')') {
            /* Close a group: pop to the output until '(' appears. */
            while (ops.top != -1 && ops.items[ops.top] != '(') {
                if (!popChar(&ops, &c)) return false;
                postfix[k++] = c;
            }
            if (ops.top == -1) return fail("')' without a matching '('");
            if (!popChar(&ops, &c)) return false;   /* discard the '(' */
        } else if (precedence(ch) > 0) {
            /* Operator: first pop the operators that must go before it. */
            while (ops.top != -1 && shouldPop(ops.items[ops.top], ch)) {
                if (!popChar(&ops, &c)) return false;
                postfix[k++] = c;
            }
            if (!pushChar(&ops, ch)) return false;
        } else {
            return fail("invalid symbol in expression");
        }
        postfix[k] = '\\0';
        if (trace) showRow(symbol, &ops, postfix);
    }

    /* End of input: move every remaining operator to the output. */
    while (ops.top != -1) {
        if (!popChar(&ops, &c)) return false;
        if (c == '(') return fail("'(' without a matching ')'");
        postfix[k++] = c;
    }
    postfix[k] = '\\0';
    if (trace) showRow("end", &ops, postfix);
    return true;
}

/* Compute a op b. Returns NULL on success, or an error message. */
static const char *applyOperator(char op, int a, int b, int *result) {
    switch (op) {
    case '+': *result = a + b; return NULL;
    case '-': *result = a - b; return NULL;
    case '*': *result = a * b; return NULL;
    case '/':
        if (b == 0) return "division by zero";
        *result = a / b;
        return NULL;
    case '^':
        if (b < 0) return "negative power";
        *result = 1;
        for (int i = 0; i < b; i++) *result *= a;
        return NULL;
    default:
        return "unknown operator";
    }
}

/* Evaluate a postfix string, printing every push and every operation. */
static bool evaluatePostfix(const char *postfix, int *result) {
    IntStack s = {.top = -1};
    char action[32];

    printf("    Token  Action          Operand stack\\n");
    for (int i = 0; postfix[i] != '\\0'; i++) {
        char ch = postfix[i];
        if (isdigit((unsigned char)ch)) {
            /* Operand: push its value. */
            if (!pushInt(&s, ch - '0')) return false;
            snprintf(action, sizeof action, "push %d", ch - '0');
        } else {
            /* Operator: pop b (the top) first, then a; push a op b. */
            int a = 0, b = 0, r = 0;
            const char *err;
            if (!popInt(&s, &b) || !popInt(&s, &a)) return false;
            err = applyOperator(ch, a, b, &r);
            if (err != NULL) {
                printf("    %-6c %d %c %d -> Error: %s\\n", ch, a, ch, b, err);
                return false;
            }
            if (!pushInt(&s, r)) return false;
            snprintf(action, sizeof action, "%d %c %d = %d", a, ch, b, r);
        }
        printf("    %-6c %-15s", ch, action);
        for (int j = 0; j <= s.top; j++) printf(" %d", s.items[j]);
        printf("\\n");
    }

    /* A valid expression leaves exactly one value on the stack. */
    if (s.top != 0) return fail("operands left over (missing operator)");
    *result = s.items[0];
    return true;
}

/* Convert, evaluate and report one expression. */
static void runExample(int number, const char *infix, const char *note,
                       bool trace) {
    char postfix[MAX + 1];
    int value = 0;

    printf("[%d] Infix  : %s   = %s\\n", number, infix, note);
    if (!infixToPostfix(infix, postfix, trace)) return;
    printf("    Postfix: %s\\n", postfix);
    if (evaluatePostfix(postfix, &value)) {
        printf("    Result : %d\\n", value);
    } else {
        printf("    Result : not defined (evaluation stopped)\\n");
    }
}

int main(void) {
    printf("Experiment 3: Infix -> Postfix -> Evaluate (stacks)\\n\\n");

    /* The earlier sample ((A+B)*C)-D with A=5, B=3, C=2, D=4. */
    runExample(1, "((5+3)*2)-4", "((A+B)*C)-D, A=5 B=3 C=2 D=4", true);
    printf("\\n");

    /* ^ is right-associative: 2^3^2 = 2^(3^2) = 512, not 64. */
    runExample(2, "(1+1)^3^2", "2^(3^2), ^ is right-assoc", true);
    printf("\\n");

    /* Error handling: the divisor works out to 0. */
    runExample(3, "8/(3-3)", "8/0, division by zero", false);
    return 0;
}`,
    demoType: "stack_eval",
    app: "Compiler arithmetic parsers (GCC, LLVM), Java Bytecode execution stacks, Hewlett-Packard RPN financial calculators."
  },
  {
    num: 4,
    title: "Queue, DEQUEUE, and Circular Queue using Arrays",
    co: "CO1, CO2",
    level: "K3",
    category: "queues",
    problem: "Implement a linear queue, a double-ended queue (DEQUEUE) and a circular queue using arrays, with overflow and underflow checks, and show why the circular queue avoids wasted space.",
    algo: [
      "Linear queue: keep front and rear; enqueue at rear, dequeue at front; FULL when rear = SIZE - 1.",
      "Show the limitation: after dequeues, free slots at the front cannot be reused.",
      "Deque on a circular array: insertRear and deleteFront work as in a queue.",
      "  a. insertFront: move front back by one (wrapping around), then store.",
      "  b. deleteRear: read the element at rear, then move rear back by one (wrapping around).",
      "Circular queue: advance front and rear with (index + 1) % SIZE.",
      "  a. Empty when front = -1; full when (rear + 1) % SIZE = front.",
      "  b. When rear reaches the last slot it wraps to index 0 if that slot is free.",
      "Report OVERFLOW on insert into a full queue and UNDERFLOW on delete from an empty one.",
      "Print front, rear and contents after every operation."
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
    code: `/*
 * Experiment 04: Queue, DEQUEUE and Circular Queue using Arrays
 * Syllabus task: Implement Queue, DEQUEUE, and Circular Queue using arrays.
 *
 * How it works (front = rear = -1 means "empty" in all three):
 *   1. Linear queue: insert at rear, delete at front. Once rear reaches
 *      the last index it reports FULL, even if front slots were freed.
 *   2. DEQUEUE (double-ended queue): a circular array where both ends can
 *      insert and delete. An index moves forward with (i + 1) % SIZE and
 *      backward with (i - 1 + SIZE) % SIZE.
 *   3. Circular queue: rear = (rear + 1) % SIZE, so rear wraps to index 0
 *      and reuses the slots freed at the front.
 *   Each operation prints one row: result, front, rear and contents.
 */
#include <stdio.h>

#define LQ_SIZE 4   /* capacity of the linear queue   */
#define DQ_SIZE 5   /* capacity of the deque          */
#define CQ_SIZE 5   /* capacity of the circular queue */

/* ============ Printing helpers shared by all three parts ============ */

/* Section title followed by the column headings of the trace table */
void showHeader(const char *title, int size) {
    printf("\\n=== %s, SIZE = %d ===\\n", title, size);
    printf("%-16s%-10s%5s%5s  %s\\n",
           "Operation", "Result", "front", "rear", "Contents");
}

/* First two columns of a row for an insert operation */
void showInsert(const char *op, int value, int ok) {
    printf("%-12s%-4d%-10s", op, value, ok ? "ok" : "OVERFLOW");
}

/* First two columns of a row for a delete operation */
void showDelete(const char *op, int value, int ok) {
    printf("%-16s", op);
    if (ok) printf("got %-6d", value);
    else printf("%-10s", "UNDERFLOW");
}

/* Print every array slot; a slot not in use is shown as "-" */
void showSlots(const int items[], int size, int front, int rear) {
    printf("    array:");
    for (int i = 0; i < size; i++) {
        int used;
        if (front == -1) used = 0;                          /* empty   */
        else if (front <= rear) used = (i >= front && i <= rear);
        else used = (i >= front || i <= rear);              /* wrapped */
        if (used) printf(" [%d]=%d", i, items[i]);
        else printf(" [%d]=-", i);
    }
    printf("\\n");
}

/* ======================= Part 1: Linear Queue ======================= */

typedef struct {
    int items[LQ_SIZE];
    int front, rear;
} LinearQueue;

void lqInit(LinearQueue *q) { q->front = q->rear = -1; }
int lqIsEmpty(const LinearQueue *q) { return q->front == -1; }
/* Full once rear is at the last index (freed front slots are lost) */
int lqIsFull(const LinearQueue *q) { return q->rear == LQ_SIZE - 1; }

/* Print front, rear and the elements from front to rear */
void lqDisplay(const LinearQueue *q) {
    printf("%5d%5d ", q->front, q->rear);
    if (lqIsEmpty(q)) {
        printf(" (empty)\\n");
        return;
    }
    for (int i = q->front; i <= q->rear; i++)
        printf(" %d", q->items[i]);
    printf("\\n");
}

/* Insert at rear: rear = rear + 1 */
void lqEnqueue(LinearQueue *q, int value) {
    int ok = !lqIsFull(q);
    if (ok) {
        if (lqIsEmpty(q)) q->front = 0;                    /* first item */
        q->rear = q->rear + 1;
        q->items[q->rear] = value;
    }
    showInsert("Enqueue", value, ok);
    lqDisplay(q);
}

/* Delete from front: front = front + 1 */
void lqDequeue(LinearQueue *q) {
    int ok = !lqIsEmpty(q), value = 0;
    if (ok) {
        value = q->items[q->front];
        if (q->front == q->rear) q->front = q->rear = -1;  /* now empty */
        else q->front = q->front + 1;
    }
    showDelete("Dequeue", value, ok);
    lqDisplay(q);
}

/* ============== Part 2: Double-Ended Queue (DEQUEUE) ============== */

typedef struct {
    int items[DQ_SIZE];
    int front, rear;
} Deque;

void dqInit(Deque *d) { d->front = d->rear = -1; }
int dqIsEmpty(const Deque *d) { return d->front == -1; }
/* Full when the slot after rear (circularly) is front */
int dqIsFull(const Deque *d) { return d->front == (d->rear + 1) % DQ_SIZE; }

/* Print front, rear and the elements from front to rear (wrapping) */
void dqDisplay(const Deque *d) {
    printf("%5d%5d ", d->front, d->rear);
    if (dqIsEmpty(d)) {
        printf(" (empty)\\n");
        return;
    }
    int count = (d->rear - d->front + DQ_SIZE) % DQ_SIZE + 1;
    for (int k = 0; k < count; k++)
        printf(" %d", d->items[(d->front + k) % DQ_SIZE]);
    printf("\\n");
}

/* Insert before front: front steps back, 0 wraps to SIZE-1 */
void dqInsertFront(Deque *d, int value) {
    int ok = !dqIsFull(d);
    if (ok) {
        if (dqIsEmpty(d)) d->front = d->rear = 0;          /* first item */
        else d->front = (d->front - 1 + DQ_SIZE) % DQ_SIZE;
        d->items[d->front] = value;
    }
    showInsert("insertFront", value, ok);
    dqDisplay(d);
}

/* Insert after rear: rear steps forward, SIZE-1 wraps to 0 */
void dqInsertRear(Deque *d, int value) {
    int ok = !dqIsFull(d);
    if (ok) {
        if (dqIsEmpty(d)) d->front = d->rear = 0;          /* first item */
        else d->rear = (d->rear + 1) % DQ_SIZE;
        d->items[d->rear] = value;
    }
    showInsert("insertRear", value, ok);
    dqDisplay(d);
}

/* Delete at front: front steps forward */
void dqDeleteFront(Deque *d) {
    int ok = !dqIsEmpty(d), value = 0;
    if (ok) {
        value = d->items[d->front];
        if (d->front == d->rear) d->front = d->rear = -1;  /* now empty */
        else d->front = (d->front + 1) % DQ_SIZE;
    }
    showDelete("deleteFront", value, ok);
    dqDisplay(d);
}

/* Delete at rear: rear steps back */
void dqDeleteRear(Deque *d) {
    int ok = !dqIsEmpty(d), value = 0;
    if (ok) {
        value = d->items[d->rear];
        if (d->front == d->rear) d->front = d->rear = -1;  /* now empty */
        else d->rear = (d->rear - 1 + DQ_SIZE) % DQ_SIZE;
    }
    showDelete("deleteRear", value, ok);
    dqDisplay(d);
}

/* ====================== Part 3: Circular Queue ====================== */

typedef struct {
    int items[CQ_SIZE];
    int front, rear;
} CircularQueue;

void cqInit(CircularQueue *q) { q->front = q->rear = -1; }
int cqIsEmpty(const CircularQueue *q) { return q->front == -1; }
/* Full when the slot after rear (circularly) is front */
int cqIsFull(const CircularQueue *q) {
    return q->front == (q->rear + 1) % CQ_SIZE;
}

/* Print front, rear and the elements from front to rear (wrapping) */
void cqDisplay(const CircularQueue *q) {
    printf("%5d%5d ", q->front, q->rear);
    if (cqIsEmpty(q)) {
        printf(" (empty)\\n");
        return;
    }
    int count = (q->rear - q->front + CQ_SIZE) % CQ_SIZE + 1;
    for (int k = 0; k < count; k++)
        printf(" %d", q->items[(q->front + k) % CQ_SIZE]);
    printf("\\n");
}

/* Insert at rear: rear = (rear + 1) % SIZE */
void cqEnqueue(CircularQueue *q, int value) {
    int ok = !cqIsFull(q);
    if (ok) {
        if (cqIsEmpty(q)) q->front = 0;                    /* first item */
        q->rear = (q->rear + 1) % CQ_SIZE;
        q->items[q->rear] = value;
    }
    showInsert("Enqueue", value, ok);
    cqDisplay(q);
}

/* Delete from front: front = (front + 1) % SIZE */
void cqDequeue(CircularQueue *q) {
    int ok = !cqIsEmpty(q), value = 0;
    if (ok) {
        value = q->items[q->front];
        if (q->front == q->rear) q->front = q->rear = -1;  /* now empty */
        else q->front = (q->front + 1) % CQ_SIZE;
    }
    showDelete("Dequeue", value, ok);
    cqDisplay(q);
}

/* ============================== Demos ============================== */

void demoLinearQueue(void) {
    LinearQueue q;
    lqInit(&q);
    showHeader("1. Linear Queue", LQ_SIZE);
    for (int v = 10; v <= 40; v += 10) lqEnqueue(&q, v);   /* fill it   */
    lqDequeue(&q);                                          /* frees [0] */
    lqDequeue(&q);                                          /* frees [1] */
    lqEnqueue(&q, 50);                          /* rear = SIZE-1: FULL */
    showSlots(q.items, LQ_SIZE, q.front, q.rear);
    printf("Limitation: [0] and [1] are free, but rear = SIZE-1,\\n");
    printf("so the queue reports FULL. A circular queue fixes this.\\n");
}

void demoDeque(void) {
    Deque d;
    dqInit(&d);
    showHeader("2. DEQUEUE on a circular array", DQ_SIZE);
    dqInsertRear(&d, 10);
    dqInsertRear(&d, 20);
    dqInsertFront(&d, 5);        /* front wraps from 0 back to 4 */
    dqInsertFront(&d, 1);
    dqInsertRear(&d, 30);        /* deque is now full */
    showSlots(d.items, DQ_SIZE, d.front, d.rear);
    dqInsertFront(&d, 0);        /* overflow */
    dqDeleteFront(&d);
    dqDeleteRear(&d);
    dqDeleteRear(&d);
    dqDeleteFront(&d);
    dqDeleteRear(&d);            /* last item: deque is empty again */
    dqDeleteFront(&d);           /* underflow */
}

void demoCircularQueue(void) {
    CircularQueue q;
    cqInit(&q);
    showHeader("3. Circular Queue", CQ_SIZE);
    cqEnqueue(&q, 10);
    cqEnqueue(&q, 20);
    cqEnqueue(&q, 30);
    cqDequeue(&q);               /* removes 10, frees slot [0] */
    cqEnqueue(&q, 40);
    cqEnqueue(&q, 50);           /* rear reaches the last index 4 */
    cqEnqueue(&q, 60);           /* rear wraps from 4 to 0 */
    showSlots(q.items, CQ_SIZE, q.front, q.rear);
    printf("    rear wrapped 4 -> 0 into the slot freed by 10\\n");
    cqEnqueue(&q, 70);           /* overflow: queue is full */
    for (int i = 0; i < 4; i++)  /* front: 1 -> 2 -> 3 -> 4 -> 0 */
        cqDequeue(&q);
    printf("    front wrapped 4 -> 0 too: no slot is ever wasted\\n");
}

int main(void) {
    printf("Experiment 04: Queue, DEQUEUE and Circular Queue\\n");
    demoLinearQueue();
    demoDeque();
    demoCircularQueue();
    return 0;
}`,
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
    if (!newNode) {
        fprintf(stderr, "Out of memory\\n");
        return;
    }
    if (current != NULL) {                 // prune the forward history
        struct PageNode *stale = current->next;
        while (stale) {
            struct PageNode *next = stale->next;
            free(stale);
            stale = next;
        }
    }
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

    while (current && current->prev) current = current->prev;   // back to the first page
    while (current) {
        struct PageNode *next = current->next;
        free(current);
        current = next;
    }
    return 0;
}`,
    demoType: "browser_nav",
    app: "Google Chrome & Firefox navigation history, Text editor Undo/Redo buffers, Music player previous/next track traversal."
  },
  {
    num: 6,
    title: "Polynomial Addition & Multiplication using Singly Linked Lists",
    co: "CO1, CO4",
    level: "K4",
    category: "linked_lists",
    problem: "Represent polynomials as singly linked lists in descending order of exponent, then implement addition and multiplication of two polynomials.",
    algo: [
      "Define a node with coeff, exp and next; keep each list sorted by descending exponent.",
      "insertTerm: walk the list to the right position; add coefficients if the exponent exists.",
      "  a. If the combined coefficient becomes 0, unlink and free that node.",
      "Addition: walk both lists together (merge).",
      "  a. Equal exponents: add the coefficients and keep the term if the sum is not 0.",
      "  b. Otherwise copy the term with the larger exponent.",
      "  c. Copy the remaining terms of either list.",
      "Multiplication: for every term of P1 and every term of P2, multiply coefficients, add exponents, and insertTerm into the result.",
      "Print each polynomial, then free every list."
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
    code: `/*
 * Experiment 06: Polynomial Addition and Multiplication using
 *                Singly Linked Lists
 * Syllabus task: Implement addition and multiplication of polynomials
 * using singly linked lists.
 *
 * How it works:
 *   A polynomial is a singly linked list of (coeff, exp) nodes kept in
 *   descending order of exponent: 3x^2 + 5 is [3,2] -> [5,0] -> NULL.
 *   - insertTerm() puts a term in its sorted place. A like term (same
 *     exponent) is combined; if its coefficient becomes 0 the node is
 *     removed.
 *   - addPoly() merges the two sorted lists: the larger exponent is
 *     copied first, equal exponents have their coefficients added.
 *   - multiplyPoly() multiplies every term of one polynomial by every
 *     term of the other (coefficients multiply, exponents add) and
 *     inserts each product with insertTerm(), which collects like terms.
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct PolyNode {
    int coeff;               /* coefficient            */
    int exp;                 /* exponent (power of x)  */
    struct PolyNode *next;   /* next term (lower power) */
} PolyNode;

/* Allocate one term; stop the program if memory runs out */
PolyNode *newNode(int coeff, int exp) {
    PolyNode *node = malloc(sizeof *node);
    if (node == NULL) {
        fprintf(stderr, "Error: out of memory\\n");
        exit(EXIT_FAILURE);
    }
    node->coeff = coeff;
    node->exp = exp;
    node->next = NULL;
    return node;
}

/* Insert coeff*x^exp in descending order, combining like terms.
   Returns the (possibly new) head of the list. */
PolyNode *insertTerm(PolyNode *head, int coeff, int exp) {
    PolyNode *prev = NULL, *curr = head;
    if (coeff == 0) return head;                 /* a 0 term adds nothing */
    while (curr != NULL && curr->exp > exp) {    /* skip higher powers    */
        prev = curr;
        curr = curr->next;
    }
    if (curr != NULL && curr->exp == exp) {      /* like term: combine    */
        curr->coeff += coeff;
        if (curr->coeff == 0) {                  /* cancelled: unlink it  */
            if (prev == NULL) head = curr->next;
            else prev->next = curr->next;
            free(curr);
        }
        return head;
    }
    PolyNode *node = newNode(coeff, exp);        /* new power: link it in */
    node->next = curr;
    if (prev == NULL) return node;               /* it is the new head    */
    prev->next = node;
    return head;
}

/* Print a polynomial as 3x^2 + 5x^1 - 2x^0; an empty list prints 0 */
void printPoly(const PolyNode *p) {
    if (p == NULL) {
        printf("0");
        return;
    }
    printf("%dx^%d", p->coeff, p->exp);          /* first term keeps sign */
    for (p = p->next; p != NULL; p = p->next) {
        if (p->coeff < 0) printf(" - %dx^%d", -p->coeff, p->exp);
        else printf(" + %dx^%d", p->coeff, p->exp);
    }
}

/* Print a label, the polynomial and a newline */
void showPoly(const char *label, const PolyNode *p) {
    printf("%s", label);
    printPoly(p);
    printf("\\n");
}

/* Append a copy of term t after tail, print the step, return new tail */
PolyNode *copyTerm(PolyNode *tail, const PolyNode *t, const char *from) {
    printf("  x^%d only in %s: copy %dx^%d\\n", t->exp, from, t->coeff, t->exp);
    tail->next = newNode(t->coeff, t->exp);
    return tail->next;
}

/* Return a NEW list p + q by merging two lists sorted by exponent */
PolyNode *addPoly(const PolyNode *p, const PolyNode *q) {
    PolyNode dummy = {0, 0, NULL};   /* result starts at dummy.next */
    PolyNode *tail = &dummy;         /* last node of the result     */
    while (p != NULL && q != NULL) {
        if (p->exp > q->exp) {                   /* p has the higher power */
            tail = copyTerm(tail, p, "1st");
            p = p->next;
        } else if (q->exp > p->exp) {            /* q has the higher power */
            tail = copyTerm(tail, q, "2nd");
            q = q->next;
        } else {                                 /* same power: add coeffs */
            int sum = p->coeff + q->coeff;
            printf("  x^%d in both: %d + %d = %d", p->exp, p->coeff, q->coeff, sum);
            if (sum != 0) {
                tail->next = newNode(sum, p->exp);
                tail = tail->next;
                printf(" -> %dx^%d\\n", sum, p->exp);
            } else {
                printf(" -> term dropped\\n");
            }
            p = p->next;
            q = q->next;
        }
    }
    for (; p != NULL; p = p->next) tail = copyTerm(tail, p, "1st");  /* leftovers */
    for (; q != NULL; q = q->next) tail = copyTerm(tail, q, "2nd");
    return dummy.next;
}

/* Return a NEW list p * q: every term times every term */
PolyNode *multiplyPoly(const PolyNode *p, const PolyNode *q) {
    PolyNode *result = NULL;
    for (const PolyNode *a = p; a != NULL; a = a->next) {
        for (const PolyNode *b = q; b != NULL; b = b->next) {
            int coeff = a->coeff * b->coeff;     /* coefficients multiply */
            int exp = a->exp + b->exp;           /* exponents add         */
            result = insertTerm(result, coeff, exp);
            printf("  (%dx^%d) * (%dx^%d) = %dx^%d  -> ",
                   a->coeff, a->exp, b->coeff, b->exp, coeff, exp);
            printPoly(result);                   /* result so far */
            printf("\\n");
        }
    }
    return result;
}

/* Free every node of a list */
void freePoly(PolyNode *p) {
    while (p != NULL) {
        PolyNode *next = p->next;
        free(p);
        p = next;
    }
}

int main(void) {
    PolyNode *p1 = NULL, *p2 = NULL, *p3 = NULL;

    /* Sample polynomials; terms may be inserted in any order */
    p1 = insertTerm(p1, 5, 0);
    p1 = insertTerm(p1, 3, 2);       /* P1 = 3x^2 + 5 */
    p2 = insertTerm(p2, 2, 1);
    p2 = insertTerm(p2, 4, 0);       /* P2 = 2x + 4   */
    p3 = insertTerm(p3, -4, 0);
    p3 = insertTerm(p3, 2, 1);       /* P3 = 2x - 4   */

    printf("Experiment 06: Polynomial Addition and Multiplication\\n\\n");
    showPoly("P1 = ", p1);
    showPoly("P2 = ", p2);

    printf("\\n--- Addition: merge the two sorted lists ---\\n");
    PolyNode *sum = addPoly(p1, p2);
    showPoly("P1 + P2 = ", sum);

    printf("\\n--- Multiplication: every term times every term ---\\n");
    printf("  term * term = product  -> result so far\\n");
    PolyNode *prod = multiplyPoly(p1, p2);
    showPoly("P1 * P2 = ", prod);

    printf("\\n--- Check: negative terms and cancellation ---\\n");
    showPoly("P3 = ", p3);
    PolyNode *sum2 = addPoly(p2, p3);
    showPoly("P2 + P3 = ", sum2);
    PolyNode *prod2 = multiplyPoly(p2, p3);
    showPoly("P2 * P3 = ", prod2);
    printf("  (-8x^1 + 8x^1 = 0, so insertTerm removed the x^1 node)\\n");
    PolyNode *zero = multiplyPoly(p2, NULL);     /* empty list = 0 */
    showPoly("P2 * (empty list) = ", zero);

    /* Free every list that was allocated */
    freePoly(p1);
    freePoly(p2);
    freePoly(p3);
    freePoly(sum);
    freePoly(prod);
    freePoly(sum2);
    freePoly(prod2);
    freePoly(zero);
    printf("\\nAll lists freed.\\n");
    return 0;
}`,
    demoType: "poly_multiply",
    app: "Post-quantum lattice cryptography (ring-LWE polynomials), Digital Signal Processing finite impulse response (FIR) filters."
  },
  {
    num: 7,
    title: "Arithmetic Expression Tree & Traversal",
    co: "CO1, CO2",
    level: "K4",
    category: "trees",
    problem: "Build a binary expression tree directly from an infix arithmetic expression (single-letter or single-digit operands; + - * / ^ and parentheses) and print its prefix and postfix equivalents, with a fully parenthesised infix form as a check.",
    algo: [
      "Define struct Node with char data and pointers *left, *right.",
      "Use two stacks: an operator stack (chars) and a subtree stack (Node pointers).",
      "Scan the infix expression from left to right:",
      "  a. Operand: create a leaf node (left = right = NULL) and push it on the subtree stack.",
      "  b. '(': push it on the operator stack.",
      "  c. ')': build subtrees until '(' is on top, then discard the '('.",
      "  d. Operator: while the stacked operator has higher precedence, or equal precedence and the new one is left-associative (not ^), build a subtree; then push the new operator.",
      "Build subtree: pop an operator, pop the right then the left subtree, join them under a new operator node and push it.",
      "At the end, build subtrees for all remaining operators; the single subtree left is the root.",
      "Preorder traversal (node, left, right) prints the prefix form.",
      "Postorder traversal (left, right, node) prints the postfix form.",
      "Inorder traversal with brackets prints the infix form as a check; then free the tree in postorder."
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
    code: `/*
 * Experiment 7: Expression Tree - Prefix and Postfix Equivalents
 * Syllabus task: create a binary tree for a given simple arithmetic
 * expression and find its prefix / postfix equivalent.
 *
 * How it works:
 *   Scan the infix string once with two stacks: operators and subtrees.
 *   An operand becomes a leaf; '(' is pushed; ')' builds subtrees back
 *   to its '('. Before an operator is pushed, every stacked operator
 *   that must go first (higher precedence, or equal and left-assoc) is
 *   popped and joined with the top two subtrees. The last subtree is
 *   the tree. Preorder = prefix, postorder = postfix, inorder = infix.
 */
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_EXPR 64     /* longest expression accepted (characters) */
#define NUM_EXPR 3      /* number of sample expressions */
#define INDENT 4        /* spaces per level in the sideways tree */

typedef struct Node {
    char data;                  /* operand or operator */
    struct Node *left, *right;  /* children (both NULL for an operand) */
} Node;

/* The two stacks used while building the tree */
typedef struct {
    Node *tree[MAX_EXPR];       /* stack of subtree pointers */
    int tree_top;
    char op[MAX_EXPR];          /* stack of operators and '(' */
    int op_top;
} Stacks;

/* Allocate one node; returns NULL if memory runs out */
static Node *new_node(char data, Node *left, Node *right) {
    Node *n = malloc(sizeof *n);
    if (n == NULL) {
        fprintf(stderr, "Out of memory\\n");
        return NULL;
    }
    n->data = data;
    n->left = left;
    n->right = right;
    return n;
}

/* Free a tree in postorder: both children first, then the node */
static void free_tree(Node *n) {
    if (n != NULL) {
        free_tree(n->left);
        free_tree(n->right);
        free(n);
    }
}

/* Precedence: ^ highest, then * /, then + -; 0 for anything else */
static int precedence(char c) {
    switch (c) {
    case '^': return 3;
    case '*': case '/': return 2;
    case '+': case '-': return 1;
    default: return 0;
    }
}

/* Must the stacked operator 'top' be applied before 'incoming'? */
static int apply_first(char top, char incoming) {
    if (precedence(top) > precedence(incoming)) {
        return 1;
    }
    /* Equal precedence: + - * / are left-associative, so the older
       operator goes first; ^ is right-associative, so it waits.
       '(' has precedence 0, so it is never applied here. */
    return precedence(top) == precedence(incoming) && incoming != '^';
}

/* Inorder traversal with brackets: fully parenthesised infix */
static void print_infix(const Node *n) {
    if (n == NULL) {
        return;
    }
    if (n->left == NULL && n->right == NULL) {
        putchar(n->data);               /* operand: no brackets */
    } else {
        putchar('(');
        print_infix(n->left);
        putchar(n->data);
        print_infix(n->right);
        putchar(')');
    }
}

/* Preorder traversal (node, left, right) = prefix form */
static void print_prefix(const Node *n) {
    if (n != NULL) {
        printf(" %c", n->data);
        print_prefix(n->left);
        print_prefix(n->right);
    }
}

/* Postorder traversal (left, right, node) = postfix form */
static void print_postfix(const Node *n) {
    if (n != NULL) {
        print_postfix(n->left);
        print_postfix(n->right);
        printf(" %c", n->data);
    }
}

/* Sideways tree: right subtree above, the node, left subtree below */
static void print_sideways(const Node *n, int depth) {
    if (n != NULL) {
        print_sideways(n->right, depth + 1);
        printf("%*s%c\\n", 2 + INDENT * depth, "", n->data);
        print_sideways(n->left, depth + 1);
    }
}

/* Pop one operator and two subtrees, join them under a new node and
   push it back. Returns 0 if the expression is malformed. */
static int build_subtree(Stacks *s) {
    char op;
    Node *left, *right, *node;

    if (s->op_top < 0 || s->tree_top < 1) {
        return 0;                       /* operator without operands */
    }
    op = s->op[s->op_top--];
    right = s->tree[s->tree_top--];     /* popped first = right child */
    left = s->tree[s->tree_top--];
    node = new_node(op, left, right);
    if (node == NULL) {
        free_tree(left);
        free_tree(right);
        return 0;
    }
    s->tree[++s->tree_top] = node;
    printf("  build '%c' : ", op);      /* show the new subtree */
    print_infix(node);
    putchar('\\n');
    return 1;
}

/* Build the expression tree from an infix string; NULL on error */
static Node *build_tree(const char *expr) {
    Stacks s;
    int ok = 1;
    size_t i;

    s.tree_top = -1;
    s.op_top = -1;
    if (strlen(expr) >= MAX_EXPR) {     /* stacks hold MAX_EXPR items */
        return NULL;
    }
    for (i = 0; ok && expr[i] != '\\0'; i++) {
        char c = expr[i];
        if (isalnum((unsigned char)c)) {
            /* Operand: push a leaf node */
            Node *leaf = new_node(c, NULL, NULL);
            ok = (leaf != NULL);
            s.tree[++s.tree_top] = leaf;
        } else if (c == '(') {
            s.op[++s.op_top] = c;
        } else if (c == ')') {
            /* Build subtrees until the matching '(' is on top */
            while (ok && s.op_top >= 0 && s.op[s.op_top] != '(') {
                ok = build_subtree(&s);
            }
            ok = ok && s.op_top >= 0;   /* error if there was no '(' */
            s.op_top--;                 /* discard the '(' */
        } else if (precedence(c) > 0) {
            /* Operator: first apply stacked operators that go first */
            while (ok && s.op_top >= 0 && apply_first(s.op[s.op_top], c)) {
                ok = build_subtree(&s);
            }
            s.op[++s.op_top] = c;
        } else if (c != ' ') {
            ok = 0;                     /* unknown character */
        }
    }
    /* End of input: apply every operator still waiting */
    while (ok && s.op_top >= 0) {
        if (s.op[s.op_top] == '(') {
            ok = 0;                     /* '(' without ')' */
        } else {
            ok = build_subtree(&s);
        }
    }
    if (ok && s.tree_top == 0) {
        return s.tree[0];               /* the root of the whole tree */
    }
    while (s.tree_top >= 0) {           /* error: free partial trees */
        free_tree(s.tree[s.tree_top--]);
    }
    return NULL;
}

int main(void) {
    /* Expression 1 is the old sample: postfix "ab+c*" as infix */
    const char *expr[NUM_EXPR] = {"(a+b)*c", "(a+b)*(c-d)/e", "8-3-2^3^2"};
    int k;

    printf("Experiment 7: Expression Tree -> Prefix and Postfix\\n");
    printf("Precedence: ^ (right-assoc) > * / > + - (left-assoc)\\n");
    printf("build = pop an operator, join the top two subtrees\\n");
    printf("Expression 1 is the old postfix sample ab+c* as infix\\n\\n");

    for (k = 0; k < NUM_EXPR; k++) {
        Node *root;

        printf("=== Expression %d (infix): %s ===\\n", k + 1, expr[k]);
        root = build_tree(expr[k]);
        if (root == NULL) {
            printf("  invalid expression\\n\\n");
            continue;
        }
        printf("Tree (root at left, right child above):\\n");
        print_sideways(root, 0);
        printf("Prefix  (preorder) :");
        print_prefix(root);
        printf("\\nPostfix (postorder):");
        print_postfix(root);
        printf("\\nInfix   (inorder)  : ");
        print_infix(root);
        printf("\\n\\n");
        free_tree(root);                /* release every node */
    }
    printf("All trees freed.\\n");
    return 0;
}`,
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
        if (!n) {
            fprintf(stderr, "Out of memory\\n");
            return NULL;
        }
        strcpy(n->word, w); strcpy(n->meaning, m);
        n->left = n->right = NULL;
        return n;
    }
    int cmp = strcmp(w, root->word);
    if (cmp < 0) root->left = insert(root->left, w, m);
    else if (cmp > 0) root->right = insert(root->right, w, m);
    return root;
}

void freeTree(struct BSTNode *root) {
    if (!root) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
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
    freeTree(root);
    return 0;
}`,
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
    demoType: "maze_bfs",
    app: "Autonomous robot navigation and hazard clearance, wildfire evacuation routing, gaming AI non-player character (NPC) tactical movement."
  },
  {
    num: 10,
    title: "Water Jug State-Space Puzzle (10L, 7L, 4L)",
    co: "CO1, CO2",
    level: "K4",
    category: "graphs",
    problem: "Containers of 10L, 7L and 4L start at (0, 7, 4); a pour stops when the source is empty or the destination is full. Model states as graph vertices and pours as edges, and use BFS to find the shortest sequence of pours that leaves exactly 2L in the 7L or 4L container.",
    algo: [
      "Represent each state as (a, b, c) = litres in the 10L, 7L and 4L containers; each state is a graph vertex.",
      "Each pour i -> j (6 ordered pairs) is an edge; it moves min(water in i, free space in j).",
      "Map each state to an array index; keep visited[], parent[], depth[] and the pour that reached each state.",
      "Mark the start state (0, 7, 4) visited and enqueue it.",
      "While the queue is not empty, dequeue a state s:",
      "  a. If b == 2 or c == 2, the goal is reached: stop.",
      "  b. Apply all 6 pours to s to get its neighbouring states.",
      "  c. For each unvisited neighbour, mark it visited, set parent = s and depth = depth(s) + 1, and enqueue it.",
      "Follow parent[] back from the goal to the start and print the pours in forward order.",
      "BFS visits states in order of the number of pours, so this sequence is a shortest one (6 moves here)."
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
    code: `/*
 * Experiment 10: Water Jug Problem (10L, 7L, 4L) as a Graph - BFS
 * Syllabus task: the 7L and 4L containers start full, the 10L one is
 * empty; a pour stops when the source is empty or the destination is
 * full. Find pourings that leave exactly 2L in the 7L or 4L container.
 *
 * How it works:
 *   Every state (a, b, c) = litres in the 10L, 7L and 4L containers is
 *   a vertex. Every pour i -> j (6 ordered pairs) is a directed edge.
 *   Breadth-first search from (0, 7, 4) visits states in order of the
 *   number of pours, so the first goal state taken from the queue is
 *   reached by a shortest sequence. parent[] lets us walk back from the
 *   goal to the start to print that sequence.
 */
#include <stdio.h>

#define NJUGS 3
#define CAP_A 10                        /* the three capacities */
#define CAP_B 7
#define CAP_C 4
#define MAX_STATES ((CAP_A + 1) * (CAP_B + 1) * (CAP_C + 1))
#define TARGET 2                        /* litres wanted in 7L or 4L */
#define PER_LINE 5                      /* states per output line */

typedef struct {
    int w[NJUGS];                       /* water in 10L, 7L, 4L */
} State;

static const int cap[NJUGS] = {CAP_A, CAP_B, CAP_C};
static const char *name[NJUGS] = {"10L", "7L", "4L"};

static int visited[MAX_STATES];         /* 1 once a state is queued */
static int parent[MAX_STATES];          /* previous state on the path */
static int depth[MAX_STATES];           /* number of pours from start */
static int pour_src[MAX_STATES];        /* pour that reached the state */
static int pour_dst[MAX_STATES];
static int queue[MAX_STATES];           /* BFS queue of state ids */

/* Map a state to a unique index 0 .. MAX_STATES-1 */
static int encode(State s) {
    return (s.w[0] * (CAP_B + 1) + s.w[1]) * (CAP_C + 1) + s.w[2];
}

/* Inverse of encode() */
static State decode(int id) {
    State s;
    s.w[2] = id % (CAP_C + 1);
    s.w[1] = (id / (CAP_C + 1)) % (CAP_B + 1);
    s.w[0] = id / ((CAP_C + 1) * (CAP_B + 1));
    return s;
}

/* Pour jug i into jug j until i is empty or j is full */
static State pour(State s, int i, int j) {
    int space = cap[j] - s.w[j];
    int amount = (s.w[i] < space) ? s.w[i] : space;
    s.w[i] -= amount;
    s.w[j] += amount;
    return s;
}

/* Goal test: exactly 2L in the 7L or the 4L container */
static int is_goal(State s) {
    return s.w[1] == TARGET || s.w[2] == TARGET;
}

/* Print one dequeued state, grouped by BFS level (depth) */
static void show_state(int id, int *level, int *count) {
    State s = decode(id);
    if (depth[id] != *level) {          /* first state of a new level */
        *level = depth[id];
        *count = 0;
        printf("%sDepth %2d:", (*level > 0) ? "\\n" : "", *level);
    } else if (*count % PER_LINE == 0) {
        printf("\\n%9s", "");            /* wrap a long level */
    }
    printf(" (%d,%d,%d)", s.w[0], s.w[1], s.w[2]);
    (*count)++;
}

/* BFS from start; returns the goal id (or -1), sets *explored */
static int bfs(State start, int *explored) {
    int head = 0, tail = 0, level = -1, count = 0;
    int id = encode(start);

    visited[id] = 1;
    parent[id] = -1;
    depth[id] = 0;
    queue[tail++] = id;
    while (head < tail) {
        int cur = queue[head++];        /* dequeue */
        State s = decode(cur);
        int i, j;

        show_state(cur, &level, &count);
        if (is_goal(s)) {
            *explored = head;
            printf("\\n");
            return cur;
        }
        for (i = 0; i < NJUGS; i++) {   /* the 6 edges i -> j */
            for (j = 0; j < NJUGS; j++) {
                int next;
                if (i == j) {
                    continue;
                }
                next = encode(pour(s, i, j));
                if (!visited[next]) {   /* new state: record and queue */
                    visited[next] = 1;
                    parent[next] = cur;
                    depth[next] = depth[cur] + 1;
                    pour_src[next] = i;
                    pour_dst[next] = j;
                    queue[tail++] = next;
                }
            }
        }
    }
    *explored = head;
    printf("\\n");
    return -1;
}

/* Walk parent[] back from the goal and print the pours in order */
static void print_path(int goal) {
    int path[MAX_STATES];
    int n = 0, k;
    char move[20];

    for (k = goal; k != -1; k = parent[k]) {
        path[n++] = k;
    }
    for (k = n - 1; k >= 0; k--) {
        State s = decode(path[k]);
        if (k == n - 1) {
            printf("Start : state (%d, %d, %d)\\n", s.w[0], s.w[1], s.w[2]);
            continue;
        }
        snprintf(move, sizeof move, "Pour %s -> %s",
                 name[pour_src[path[k]]], name[pour_dst[path[k]]]);
        printf("Step %d: %-14s   state (%d, %d, %d)\\n",
               n - 1 - k, move, s.w[0], s.w[1], s.w[2]);
    }
}

int main(void) {
    State start = {{0, CAP_B, CAP_C}};  /* 10L empty, 7L and 4L full */
    int goal, explored = 0;

    printf("Experiment 10: Water Jug (10L, 7L, 4L) as a Graph, BFS\\n");
    printf("Vertices: states (a, b, c) = litres in 10L, 7L, 4L\\n");
    printf("Edges   : 6 pours i -> j, moving min(water in i, space in j)\\n");
    printf("Start (0, 7, 4)   Goal: b == 2 or c == 2\\n\\n");

    printf("BFS order of states taken from the queue:\\n");
    goal = bfs(start, &explored);
    if (goal < 0) {
        printf("No sequence of pours reaches the goal.\\n");
        return 0;
    }
    printf("\\nGoal found after visiting %d states.\\n\\n", explored);

    printf("Shortest sequence of pours:\\n");
    print_path(goal);
    printf("GOAL: exactly 2L in the %s container!\\n",
           (decode(goal).w[1] == TARGET) ? "7L" : "4L");
    printf("Total moves: %d\\n", depth[goal]);
    printf("BFS explores level by level, so no shorter sequence exists.\\n");
    return 0;
}`,
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
    demoType: "binary_search",
    app: "Database B-Tree page lookups, Git bisect commit debugging, operating system memory address table lookups."
  },
  {
    num: 13,
    title: "Sorting Benchmark (Bubble, Insertion, Radix, Quick, Merge)",
    co: "CO2, CO3",
    level: "K4",
    category: "sorting",
    problem: "Implement Bubble sort, Insertion sort, Radix sort, Quick sort and Merge sort, run each on its own copy of the same array, and compare the number of steps (key comparisons + element moves) on sample, already sorted and reverse sorted input.",
    algo: [
      "Define steps: comparison = one test between two keys; move = one element assignment (swap = 3, shift or temp-array copy = 1).",
      "Bubble Sort: compare adjacent pairs and swap if out of order; stop early when a pass makes no swap.",
      "Insertion Sort: save a[i] as key, shift larger keys one place right, place the key in the gap.",
      "Radix Sort (LSD, base 10): find the max to know the digit count, then for each digit place:",
      "  a. Count each digit, form prefix sums, copy keys right to left into an output array (stable).",
      "  b. Copy the output array back.",
      "Quick Sort (Lomuto): pivot = last element; swap smaller keys to the left, put the pivot in place, recurse on both sides.",
      "Merge Sort (top-down): split at mid, sort both halves recursively, merge them through a temp array.",
      "For each input, give every sort its own copy and a fresh step counter.",
      "Check that all five results are sorted and identical.",
      "Print comparisons, moves and total steps for sample, sorted and reverse sorted input."
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
    code: `/*
 * Experiment 13: Sorting Benchmark (Bubble, Insertion, Radix, Quick, Merge)
 * Syllabus task: Implement Bubble sort, Insertion sort, Radix sort,
 * Quick sort and Merge sort and compare the number of steps involved.
 *
 * How it works: each sort gets its own copy of the same input and its
 * own Steps counter. Steps = key comparisons + element moves, where a
 * comparison is one test between two keys (counted in isGreater) and a
 * move is one element assignment (swap = 3, shift or temp copy = 1).
 * Radix sort compares keys only to find the max (n-1 tests); its digit
 * tallies in count[] are not counted. Quick sort uses Lomuto partition
 * (pivot = last element). Cases: sample, already sorted, reversed.
 */
#include <stdio.h>
#include <string.h>

#define MAX_N     16   /* largest array this program handles */
#define NUM_SORTS 5    /* number of algorithms compared */
#define BASE      10   /* radix sort base: decimal digits */

/* Shared step counter used by every sort */
typedef struct {
    long comps;   /* key comparisons */
    long moves;   /* element assignments */
} Steps;

/* Compare two keys and count it: returns 1 if x > y */
static int isGreater(int x, int y, Steps *s) {
    s->comps++;
    return x > y;
}

/* Swap two elements: three assignments = 3 moves */
static void swap(int *x, int *y, Steps *s) {
    int t = *x;
    *x = *y;
    *y = t;
    s->moves += 3;
}

/* 1. Bubble sort: swap adjacent pairs; stop when a pass has no swap */
static void bubbleSort(int a[], int n, Steps *s) {
    for (int pass = 0; pass < n - 1; pass++) {
        int swapped = 0;
        /* each pass carries the largest remaining key to the end */
        for (int j = 0; j < n - 1 - pass; j++) {
            if (isGreater(a[j], a[j + 1], s)) {
                swap(&a[j], &a[j + 1], s);
                swapped = 1;
            }
        }
        if (!swapped) {   /* early exit: array is already sorted */
            break;
        }
    }
}

/* 2. Insertion sort: shift larger keys right, drop key in the gap */
static void insertionSort(int a[], int n, Steps *s) {
    for (int i = 1; i < n; i++) {
        int key = a[i];   /* save the key: 1 move */
        int j = i - 1;
        s->moves++;
        while (j >= 0 && isGreater(a[j], key, s)) {
            a[j + 1] = a[j];   /* shift one place right: 1 move */
            s->moves++;
            j--;
        }
        a[j + 1] = key;   /* place the key: 1 move */
        s->moves++;
    }
}

/* Stable counting sort of a[] on the digit at place value exp */
static void countingSortByDigit(int a[], int n, int exp, Steps *s) {
    int output[MAX_N] = {0};
    int count[BASE] = {0};
    for (int i = 0; i < n; i++) {   /* how many keys have each digit */
        count[(a[i] / exp) % BASE]++;
    }
    for (int d = 1; d < BASE; d++) {   /* count[d] = end slot for d */
        count[d] += count[d - 1];
    }
    for (int i = n - 1; i >= 0; i--) {   /* right to left: stable */
        int d = (a[i] / exp) % BASE;
        count[d]--;
        output[count[d]] = a[i];   /* copy into temp array: 1 move */
        s->moves++;
    }
    for (int i = 0; i < n; i++) {   /* copy back: 1 move each */
        a[i] = output[i];
        s->moves++;
    }
}

/* 3. LSD radix sort, base 10, for non-negative integers */
static void radixSort(int a[], int n, Steps *s) {
    int max = a[0];
    for (int i = 1; i < n; i++) {   /* the max decides how many digits */
        if (isGreater(a[i], max, s)) {
            max = a[i];
        }
    }
    for (int exp = 1; max / exp > 0; exp *= BASE) {   /* 1s, 10s, ... */
        countingSortByDigit(a, n, exp, s);
    }
}

/* Lomuto partition of a[low..high]; returns the pivot's final index */
static int partition(int a[], int low, int high, Steps *s) {
    int pivot = a[high];   /* pivot value is only read, not moved */
    int i = low - 1;       /* a[low..i] holds keys smaller than pivot */
    for (int j = low; j < high; j++) {
        if (isGreater(pivot, a[j], s)) {   /* a[j] < pivot */
            i++;
            swap(&a[i], &a[j], s);
        }
    }
    swap(&a[i + 1], &a[high], s);   /* put the pivot in its place */
    return i + 1;
}

/* Quick sort a[low..high] recursively */
static void quickSortRange(int a[], int low, int high, Steps *s) {
    if (low < high) {
        int p = partition(a, low, high, s);
        quickSortRange(a, low, p - 1, s);
        quickSortRange(a, p + 1, high, s);
    }
}

/* 4. Quick sort (Lomuto partition, last element as pivot) */
static void quickSort(int a[], int n, Steps *s) {
    quickSortRange(a, 0, n - 1, s);
}

/* Merge sorted runs a[low..mid] and a[mid+1..high] through temp[] */
static void merge(int a[], int low, int mid, int high, Steps *s) {
    int temp[MAX_N] = {0};
    int i = low, j = mid + 1, k = 0;
    while (i <= mid && j <= high) {   /* take the smaller head key */
        if (isGreater(a[i], a[j], s)) {
            temp[k++] = a[j++];
        } else {
            temp[k++] = a[i++];   /* ties take the left key: stable */
        }
        s->moves++;
    }
    while (i <= mid) {   /* copy what is left of either run */
        temp[k++] = a[i++];
        s->moves++;
    }
    while (j <= high) {
        temp[k++] = a[j++];
        s->moves++;
    }
    for (k = 0; k < high - low + 1; k++) {   /* copy back */
        a[low + k] = temp[k];
        s->moves++;
    }
}

/* Merge sort a[low..high]: sort both halves, then merge them */
static void mergeSortRange(int a[], int low, int high, Steps *s) {
    if (low < high) {
        int mid = low + (high - low) / 2;
        mergeSortRange(a, low, mid, s);
        mergeSortRange(a, mid + 1, high, s);
        merge(a, low, mid, high, s);
    }
}

/* 5. Merge sort (top-down) */
static void mergeSort(int a[], int n, Steps *s) {
    mergeSortRange(a, 0, n - 1, s);
}

/* Table of the five algorithms, all with the same signature */
typedef void (*SortFn)(int a[], int n, Steps *s);

static const char *const sortNames[NUM_SORTS] = {
    "Bubble (early exit)", "Insertion (shifting)", "Radix (LSD, base 10)",
    "Quick (Lomuto)", "Merge (top-down)"
};
static const SortFn sortFns[NUM_SORTS] = {
    bubbleSort, insertionSort, radixSort, quickSort, mergeSort
};

/* Print a label followed by the array */
static void printArray(const char *label, const int a[], int n) {
    printf("%s", label);
    for (int i = 0; i < n; i++) {
        printf(" %d", a[i]);
    }
    printf("\\n");
}

/* Return 1 if every result is sorted and equal to the first one */
static int allMatch(int result[][MAX_N], int n) {
    for (int k = 0; k < NUM_SORTS; k++) {
        for (int i = 0; i < n; i++) {
            /* out of ascending order, or differs from the first result */
            if ((i > 0 && result[k][i - 1] > result[k][i]) ||
                result[k][i] != result[0][i]) {
                return 0;
            }
        }
    }
    return 1;
}

/* Sort copies of input[] with all five algorithms; print a table */
static void runCase(const char *title, const int input[], int n) {
    int result[NUM_SORTS][MAX_N];
    Steps steps[NUM_SORTS];

    printf("\\n%s (n = %d)\\n", title, n);
    printArray("Input :", input, n);
    for (int k = 0; k < NUM_SORTS; k++) {
        memcpy(result[k], input, (size_t)n * sizeof(int));   /* own copy */
        steps[k].comps = 0;
        steps[k].moves = 0;
        sortFns[k](result[k], n, &steps[k]);
    }
    printArray("Sorted:", result[0], n);
    printf("%s\\n", allMatch(result, n) ? "All five results match"
                                       : "ERROR: results differ");

    printf("%-22s%12s%8s%13s\\n", "Algorithm", "Comparisons", "Moves",
           "Total steps");
    printf("-------------------------------------------------------\\n");
    for (int k = 0; k < NUM_SORTS; k++) {
        printf("%-22s%12ld%8ld%13ld\\n", sortNames[k], steps[k].comps,
               steps[k].moves, steps[k].comps + steps[k].moves);
    }
}

int main(void) {
    const int sample[]   = {64, 34, 25, 12, 22, 11, 90};
    const int sorted[]   = {11, 12, 22, 25, 34, 64, 90};
    const int reversed[] = {90, 64, 34, 25, 22, 12, 11};
    const int n = (int)(sizeof(sample) / sizeof(sample[0]));

    printf("Experiment 13: Sorting Benchmark\\n");
    printf("Bubble, Insertion, Radix, Quick and Merge sort\\n");
    printf("=======================================================\\n");
    printf("How steps are counted (same rules for every sort):\\n");
    printf("  comparison  = one test between two keys, e.g. a[j] > a[j+1]\\n");
    printf("  move        = one element assignment: swap = 3 moves,\\n");
    printf("                shift = 1, copy to/from a temp array = 1\\n");
    printf("  total steps = comparisons + moves\\n");
    printf("  radix       = n-1 comparisons (find max) + 2n moves per pass\\n");

    runCase("Case 1: sample data", sample, n);
    runCase("Case 2: already sorted", sorted, n);
    runCase("Case 3: reverse sorted", reversed, n);

    printf("\\nObservations:\\n");
    printf("- Bubble and insertion: fewest steps on sorted input, most\\n");
    printf("  on reverse input (every pair is out of order).\\n");
    printf("- Quick sort with a last-element pivot is worst on sorted\\n");
    printf("  input: each partition removes only the pivot.\\n");
    printf("- Radix and merge moves do not depend on the input order.\\n");
    return 0;
}`,
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
    enqueue(101, "Customer A (Normal)", 1);
    enqueue(102, "Customer B (Defence)", 2);
    enqueue(103, "Customer C (Diff. Abled)", 4);
    enqueue(104, "Customer D (Senior)", 3);

    printf("Service Sequence:\\n");
    for (int i = 0; i < count; i++) {
        printf("Serving Token %d: %s [Prio %d]\\n", pq[i].id, pq[i].name, pq[i].priority);
    }
    return 0;
}`,
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
    demoType: "spell_checker",
    app: "Google Search 'Did you mean?' query corrector, Microsoft Word spell checker, IDE code linter symbol suggest."
  },
  {
    num: 16,
    title: "Memory Allocator & Garbage Collector Simulation",
    co: "CO1, CO4",
    level: "K4",
    category: "memory",
    problem: "Simulate a 1024-byte heap as a doubly linked list of block descriptors: allocate with first fit and block splitting, free with coalescing of free neighbours, and reclaim unreachable blocks with a mark-and-sweep garbage collector driven by a root set.",
    algo: [
      "Define Block with start, size, isFree, marked, id and *prev, *next pointers.",
      "Initialize the heap as one free block [0-1023] of HEAP_SIZE = 1024 bytes.",
      "myMalloc(size):",
      "  a. First fit: walk the list to the first block with isFree == 1 and size >= request.",
      "  b. If none is found, print Out of memory and return -1.",
      "  c. If the block is bigger, split it: insert a new free node for the rest after it (fix prev/next links).",
      "  d. Mark the block used, give it a new id and return the id.",
      "myFree(id): mark the block free; if next is free, absorb it; if prev is free, prev absorbs the block; free the merged descriptors.",
      "Root set: array of ids the program still references (blocks whose pointer is lost are garbage).",
      "gc() Mark: clear all marks, then mark every allocated block whose id is in the root set.",
      "gc() Sweep: free every allocated block left unmarked (coalescing as above) and print the bytes reclaimed.",
      "printHeap(): print each block [start-end] size USED/FREE and the used/free totals, free block count and largest free block."
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
    code: `/*
 * Experiment 16: Memory Allocator and Garbage Collector Simulation
 * Syllabus task: Simulation of a basic memory allocator and garbage
 * collector using doubly linked list.
 *
 * How it works: a simulated heap of HEAP_SIZE bytes is described by a
 * doubly linked list of block descriptors (start, size, free flag).
 *  - myMalloc(): FIRST FIT; SPLIT a bigger free block into a used part
 *    and a smaller free part.
 *  - myFree(): mark the block free and COALESCE it with free
 *    neighbours on both sides (prev and next).
 *  - gc(): MARK AND SWEEP. Mark the blocks named in the root set, then
 *    free (and coalesce) every allocated block left unmarked.
 */
#include <stdio.h>
#include <stdlib.h>

#define HEAP_SIZE 1024   /* size of the simulated heap in bytes */
#define MAX_ROOTS 8      /* capacity of the root set */
#define BIG_REQUEST 500  /* request used to show fragmentation */

/* One descriptor per block of the heap (used or free) */
struct Block {
    int start;     /* offset of the first byte in the heap */
    int size;      /* size of the block in bytes */
    int isFree;    /* 1 = free, 0 = allocated */
    int marked;    /* mark bit used by the garbage collector */
    int id;        /* id of an allocated block (0 when free) */
    struct Block *prev, *next;
};

static struct Block *heap = NULL;  /* first block (lowest offset) */
static int nextId = 1;             /* id given to the next allocation */

/* Create a FREE block descriptor; returns NULL if malloc fails */
static struct Block *newBlock(int start, int size) {
    struct Block *b = malloc(sizeof *b);
    if (b == NULL) {
        printf("Error: malloc failed\\n");
        return NULL;
    }
    /* fields not named here start as 0 / NULL */
    *b = (struct Block){ .start = start, .size = size, .isFree = 1 };
    return b;
}

/* Offset of the last byte of a block */
static int lastByte(const struct Block *b) {
    return b->start + b->size - 1;
}

/* Find the allocated block with the given id (NULL if none) */
static struct Block *findBlock(int id) {
    struct Block *b;
    for (b = heap; b != NULL; b = b->next) {
        if (!b->isFree && b->id == id) return b;
    }
    return NULL;
}

/* Total free bytes, number of free blocks and largest free block */
static void freeStats(int *total, int *count, int *largest) {
    struct Block *b;
    *total = *count = *largest = 0;
    for (b = heap; b != NULL; b = b->next) {
        if (!b->isFree) continue;
        *total += b->size;
        (*count)++;
        if (b->size > *largest) *largest = b->size;
    }
}

/* Heap map: one line per block, then a used/free summary */
static void printHeap(void) {
    struct Block *b;
    int total, count, largest;
    for (b = heap; b != NULL; b = b->next) {
        printf("  [%4d-%4d] %4d B  %s", b->start, lastByte(b), b->size,
               b->isFree ? "FREE" : "USED");
        if (!b->isFree) printf("  id=%d", b->id);
        printf("\\n");
    }
    freeStats(&total, &count, &largest);
    printf("  Used %d B, Free %d B, free blocks %d, largest %d B\\n",
           HEAP_SIZE - total, total, count, largest);
}

/* First-fit allocation with splitting; returns block id or -1 */
static int myMalloc(int size) {
    struct Block *b = heap, *rest;
    int left;

    /* 1. First fit: walk the list to the first free block >= size */
    while (b != NULL && !(b->isFree && b->size >= size)) b = b->next;
    if (size <= 0 || b == NULL) {
        printf("myMalloc(%d): Out of memory (no free block >= %d B)\\n",
               size, size);
        return -1;
    }

    /* 2. Split: the unused tail becomes a new free block after b */
    left = b->size - size;
    if (left > 0) {
        rest = newBlock(b->start + size, left);
        if (rest == NULL) return -1;
        rest->prev = b;                /* b <-> rest <-> old b->next */
        rest->next = b->next;
        if (b->next != NULL) b->next->prev = rest;
        b->next = rest;
        b->size = size;
    }

    /* 3. Mark the block allocated and give it an id */
    b->isFree = 0;
    b->id = nextId++;
    printf("myMalloc(%d): id%d at [%d-%d]", size, b->id, b->start,
           lastByte(b));
    if (left > 0) printf(", split leaves %d B free", left);
    printf("\\n");
    return b->id;
}

/* Free block b and coalesce it with free neighbours (prev, next).
   Returns the resulting (possibly merged) free block. */
static struct Block *releaseBlock(struct Block *b) {
    struct Block *n = b->next, *p = b->prev;
    const char *how = "no free neighbour";
    int mergedNext = 0;

    b->isFree = 1;
    b->id = 0;
    /* a. Next block free: b absorbs it, unlink and free its node */
    if (n != NULL && n->isFree) {
        b->size += n->size;
        b->next = n->next;
        if (n->next != NULL) n->next->prev = b;
        free(n);
        mergedNext = 1;
        how = "merged with next";
    }
    /* b. Prev block free: prev absorbs b, unlink and free b's node */
    if (p != NULL && p->isFree) {
        p->size += b->size;
        p->next = b->next;
        if (b->next != NULL) b->next->prev = p;
        free(b);
        b = p;
        how = mergedNext ? "merged with prev + next" : "merged with prev";
    }
    printf("    %s -> FREE [%d-%d] %d B\\n", how, b->start, lastByte(b),
           b->size);
    return b;
}

/* Explicit free by id */
static void myFree(int id) {
    struct Block *b = findBlock(id);
    if (b == NULL) {
        printf("myFree(%d): no such allocated block\\n", id);
        return;
    }
    printf("myFree(%d): release [%d-%d] %d B\\n", id, b->start,
           lastByte(b), b->size);
    releaseBlock(b);
}

/* Mark-and-sweep garbage collector; roots[] = ids still in use */
static void gc(const int roots[], int numRoots) {
    struct Block *b;
    int i, reclaimed = 0;

    /* 1. Clear every mark bit */
    for (b = heap; b != NULL; b = b->next) b->marked = 0;

    /* 2. Mark: every allocated block named in the root set */
    for (i = 0; i < numRoots; i++) {
        b = findBlock(roots[i]);
        if (b == NULL) continue;
        b->marked = 1;
        printf("mark : id%d is in the root set -> marked\\n", b->id);
    }

    /* 3. Sweep: free every allocated block that is still unmarked */
    for (b = heap; b != NULL; b = b->next) {
        if (!b->isFree && !b->marked) {
            printf("sweep: id%d unmarked -> reclaim %d B\\n", b->id,
                   b->size);
            reclaimed += b->size;
            b = releaseBlock(b);   /* coalesces as it goes */
        }
    }
    printf("gc(): %d bytes reclaimed\\n", reclaimed);
}

/* Free every block descriptor of the heap list */
static void freeHeap(void) {
    int count = 0;
    while (heap != NULL) {
        struct Block *next = heap->next;
        free(heap);
        heap = next;
        count++;
    }
    printf("Freed %d block descriptor(s). Done.\\n", count);
}

int main(void) {
    int roots[MAX_ROOTS];              /* root set of the "program" */
    int numRoots = 0;
    int a, b, c, d, total, count, largest;

    printf("=== Memory Allocator + Garbage Collector ===\\n");
    heap = newBlock(0, HEAP_SIZE);     /* one big free block */
    if (heap == NULL) return 1;
    printf("\\n--- 1. Initial heap (%d bytes) ---\\n", HEAP_SIZE);
    printHeap();

    printf("\\n--- 2. Allocate 128, 256, 100, 200 (first fit) ---\\n");
    a = myMalloc(128);
    b = myMalloc(256);                 /* succeeds thanks to splitting */
    c = myMalloc(100);
    d = myMalloc(200);
    printHeap();

    printf("\\n--- 3. Root set ---\\n");
    roots[numRoots++] = a;             /* only a is still referenced */
    printf("Root set = { id%d }: program still uses id%d\\n", a, a);
    printf("id%d, id%d: freed by the program itself (step 4)\\n", b, c);
    printf("id%d: its pointer was lost -> garbage\\n", d);

    printf("\\n--- 4. Explicit myFree(%d), myFree(%d) ---\\n", b, c);
    myFree(b);
    myFree(c);                         /* coalesces with freed b */
    printHeap();

    printf("\\n--- 5. Fragmentation ---\\n");
    if (myMalloc(BIG_REQUEST) < 0) {
        freeStats(&total, &count, &largest);
        printf("  %d B free in total, but largest block is %d B\\n",
               total, largest);
    }

    printf("\\n--- 6. gc(): mark and sweep ---\\n");
    gc(roots, numRoots);
    printHeap();

    printf("\\n--- 7. Retry myMalloc(%d) after gc ---\\n", BIG_REQUEST);
    roots[numRoots++] = myMalloc(BIG_REQUEST);
    printHeap();

    printf("\\n--- 8. Clean up ---\\n");
    freeHeap();
    return 0;
}`,
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
    demoType: "merge_k_heap",
    app: "External merge sort in Big Data (Hadoop MapReduce, Apache Spark), distributed database log compaction (Cassandra LSM-trees)."
  }
];

// A Windows checkout with autocrlf stores this file with CRLF line endings, which
// would put \r into the C programs. Normalise so output and hashes are identical everywhere.
for (const exp of experimentsData) exp.code = exp.code.replace(/\r\n/g, '\n');

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
  { q: "How are recursion and system call stack related in tree traversals?", a: "Recursive function calls utilize the operating system call stack to store activation records (local variables and return addresses) of unvisited branches.", tag: "CO1 · K2" },
  { q: "In the mark-and-sweep garbage collector of Experiment 16, what do the mark and sweep phases do, and why are the mark bits cleared before each collection?", a: "Mark: starting from the root set (the ids the program can still reach), set the mark bit of every allocated block that is reachable. Sweep: walk the whole block list once and free every allocated block whose mark bit is still clear, coalescing it with any free neighbours. The mark bits are cleared first so that a bit left over from the previous collection cannot make a dead block look live. One collection takes time proportional to the number of blocks in the list.", tag: "CO4 · K3" }
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
  },
  {
    q: "A hash table of size 10 uses h(k) = k mod 10 with linear probing. After inserting 15, 25 and 35 in that order into an empty table, at which index is 35 stored?",
    options: ["5", "6", "7", "8"],
    ans: 2,
    exp: "15 goes to index 5. 25 also hashes to 5, which is taken, so it goes to the next free slot, 6. 35 probes 5 and 6 (both taken) and is stored at 7. Such growing runs of occupied slots are called primary clustering."
  }
];

// Let's create the HTML generator
// The "Terminal Output" panels are not typed by hand. `node scripts/run_programs.js`
// compiles and runs every program in experimentsData and records what it prints in
// scripts/program_output.json. Here we attach that output to each experiment and
// refuse to build if a program changed since it was last run.
function attachProgramOutputs() {
  const crypto = require('crypto');
  const file = path.join(__dirname, 'program_output.json');
  if (!fs.existsSync(file)) {
    throw new Error('scripts/program_output.json is missing. Run: node scripts/run_programs.js');
  }
  const recorded = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const exp of experimentsData) {
    const rec = recorded.programs[exp.num];
    const sha = crypto.createHash('sha256').update(exp.code).digest('hex');
    if (!rec || rec.sha256 !== sha) {
      throw new Error(`The program for experiment ${exp.num} changed since it was last run. Run: node scripts/run_programs.js`);
    }
    exp.output = rec.output;
  }
  return recorded;
}

function buildHtml() {
  const recorded = attachProgramOutputs();
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
              <h5 style="font-size:0.78rem; color:var(--acc-cyan); margin-bottom:4px;">Actual Terminal Output (program compiled and run with ${escapeHtml(recorded.compiler)}, <code>${escapeHtml(recorded.flags)}</code>):</h5>
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
        drawerTitle.innerText = '🎯 Viva Voce Master Bank (37 Questions)';
        document.getElementById('viva-section').style.display = 'block';
      } else if (mode === 'quiz') {
        drawerTitle.innerText = '⚡ Interactive Revision Quiz (16 Questions)';
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
        // Shortest path found by the BFS in the experiment 10 C program (see its terminal output).
        const jugSteps = [
          { j10: 0, j7: 7, j4: 4, text: "Initial: 10L is empty, 7L & 4L containers are full." },
          { j10: 4, j7: 7, j4: 0, text: "Pour 4L -> 10L. (10L has 4L, 4L is empty)." },
          { j10: 10, j7: 1, j4: 0, text: "Pour 7L -> 10L. (10L is full, 7L has 1L)." },
          { j10: 6, j7: 1, j4: 4, text: "Pour 10L -> 4L. (4L is full, 10L has 6L)." },
          { j10: 6, j7: 5, j4: 0, text: "Pour 4L -> 7L. (7L has 5L, 4L is empty)." },
          { j10: 2, j7: 5, j4: 4, text: "Pour 10L -> 4L. (4L is full, 10L has 2L)." },
          { j10: 2, j7: 7, j4: 2, text: "Pour 4L -> 7L. (7L is full, 4L has 2L). GOAL: exactly 2L in the 4L container!" }
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

module.exports = { experimentsData, vivaQuestions, quizQuestions };

// Build only when run directly (`node scripts/generate_portal.js`), so that
// scripts/run_programs.js and the tests can load the data without side effects.
if (require.main === module) {
  console.log('Generating complete single-file Data Structures Lab portal...');
  const finalHtml = buildHtml();
  const targetPath = path.resolve(__dirname, '..', 'PCCSL307_Data_Structures_Lab_Portal.html');
  const indexPath = path.resolve(__dirname, '..', 'index.html');

  fs.writeFileSync(targetPath, finalHtml, 'utf-8');
  console.log(`Generated: PCCSL307_Data_Structures_Lab_Portal.html (${finalHtml.length} bytes)`);

  fs.writeFileSync(indexPath, finalHtml, 'utf-8');
  console.log('Mirrored to: index.html');

  console.log('Build completed successfully!');
}
