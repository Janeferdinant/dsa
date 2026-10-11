# Implementation Plan: Data Structures Lab Mobile Portal (PCCSL307)

**Goal:** Create a 100% standalone, single-file, mobile-first educational portal (`PCCSL307_Data_Structures_Lab_Portal.html`) for KTU S3 CSE Data Structures Lab (`PCCSL307`) based on `syllabus.pdf`.  
**Architecture:** Liquid Glass UI/UX design system (frosted glassmorphism, iridescent mesh gradients, 3D specular depth), complete 18 experiments with Algorithm, SVG Flowchart, C Code, Output, Live Animated Walkthrough Demo, and Real-Time Application, plus a floating bottom revision dock with Viva Voce Bank, Scored Quiz Engine, and Interactive 3D Knowledge Graph.  
**Deliverables:**
- `PCCSL307_Data_Structures_Lab_Portal.html` (Primary standalone deliverable)
- `index.html` (Mirror for rapid local testing and deployment)
- `tests/validate_portal.js` (Automated verification test script)

---

## Proposed Tasks

### Task 1: Test Verification Harness & Automated Validator
**Files to create:** `tests/validate_portal.js`  
**Description:** Build a Node.js verification script that parses and checks `PCCSL307_Data_Structures_Lab_Portal.html` against all prompt and syllabus requirements:
1. Valid HTML5 syntax and meta tags for mobile viewport (`width=device-width, initial-scale=1, viewport-fit=cover`).
2. Verification of all 18 experiments (No. 1 to 18) present with exact titles matching `syllabus.pdf`.
3. Verification that every experiment possesses all 6 required pillars:
   - Algorithm section (`.algo-section`)
   - SVG Flowchart (`svg.flowchart-svg`)
   - C Source Code with copy button (`pre.code-block code`)
   - Formatted Terminal Output (`pre.terminal-output`)
   - Interactive Demo visualizer with playback controls (`.demo-visualizer`, `.btn-play`, `.btn-step`, `.btn-reset`)
   - Real-Time Applications (`.app-section`)
4. Verification of the Dedicated Bottom Revision Hub:
   - Viva Voce Bank with >= 36 high-yield questions (`.viva-item`).
   - Interactive Quiz Engine with >= 15 graded questions (`.quiz-question-card`).
   - Interactive Knowledge Graph canvas/SVG (`#kg-canvas`).
5. Verification of the exact mentor footer:
   - `"Asst. Prof. Jane Rose"`
   - `"Department of Computer Science & Engineering (CSE)"`
6. Verification that zero external CDN stylesheets or scripts are required.
**Verification:** Run `node tests/validate_portal.js` (initially fails RED, passes GREEN when portal is built).

---

### Task 2: Core Design System & Liquid Glass Shell
**Files to create/modify:** `PCCSL307_Data_Structures_Lab_Portal.html`  
**Description:** Implement the foundational structure and design system:
1. Mobile-first CSS tokens:
   - Deep obsidian background `#060913` with layered radial mesh gradients (cyan, violet, emerald).
   - Glassmorphic panels: `rgba(15, 23, 42, 0.72)` with `backdrop-filter: blur(24px) saturate(180%)`.
   - Specular highlights: `inset 0 1px 0 rgba(255, 255, 255, 0.22)`.
   - 3D card lift and neon glow accents (`#38bdf8`, `#a855f7`, `#34d399`, `#fbbf24`, `#f43f5e`).
   - Daylight / Night theme switcher with persistence.
2. Sticky Glass Header:
   - University accreditation pill: `KTU · PCCSL307 · S3 CSE Data Structures Lab`.
   - Search input for real-time fuzzy filtering.
   - Swipeable category filter pills (`All (18)`, `Linear (Arrays/Stacks)`, `Queues`, `Linked Lists`, `Trees & BST`, `Graphs & Puzzles`, `Sorting & Searching`, `Hashing & Memory`).
3. Floating Liquid Revision Dock (Bottom navigation bar) with icons for:
   - 🧪 Labs (Main Feed)
   - 🎯 Viva Bank
   - ⚡ Quiz Engine
   - 🌐 3D Knowledge Graph
4. Mentor Footer Attribution:
   - Styled glass footer with `"Asst. Prof. Jane Rose"` and `"Department of Computer Science & Engineering (CSE)"`.
**Verification:** Inspect HTML structure and run validator checks for header, dock, and styling tokens.

---

### Task 3: Experiments 1 to 6 (Linear Structures & Linked Lists)
**Files to modify:** `PCCSL307_Data_Structures_Lab_Portal.html`  
**Description:** Implement full data, components, and animations for Experiments 1 through 6:
- **Expt 1:** Sparse Polynomial Addition using Arrays (Coeff, Exp representation).
- **Expt 2:** Sparse Matrix Transpose & Addition (3-Tuple Coordinate list representation).
- **Expt 3:** Infix to Postfix Conversion & Stack Evaluation (Operator precedence, associativity, evaluation stack).
- **Expt 4:** Linear Queue, Deque (Double Ended Queue), & Circular Queue using Arrays (Modulo ring buffer, front/rear wrap).
- **Expt 5:** Web Browser History (Back/Forward) Navigation using Doubly Linked List (Current page pointer, history pruning on new visit).
- **Expt 6:** Polynomial Addition & Multiplication using Singly Linked Lists (Ordered exponent insertion, term merging).
Each experiment must have:
1. Complete, clear, numbered **Algorithm**.
2. Responsive inline vector **SVG Flowchart** with styled decision diamonds, process blocks, and arrows.
3. Clean, compile-ready, idiomatic **C Code** with syntax highlights and one-tap copy button.
4. Verified realistic **Terminal Output** demonstrating standard inputs and outputs.
5. Pre-loaded animated **Interactive Demo** with Play, Step, and Reset buttons + state ticker.
6. Real-time **Industrial Applications** (e.g., graphics shader sparse matrices, call stacks, OS task queues, browser caches, algebraic computer systems).
**Verification:** Run `node tests/validate_portal.js` to ensure experiments 1–6 meet all criteria.

---

### Task 4: Experiments 7 to 12 (Trees, Graphs, Puzzles & Searching)
**Files to modify:** `PCCSL307_Data_Structures_Lab_Portal.html`  
**Description:** Implement full data, components, and animations for Experiments 7 through 12:
- **Expt 7:** Expression Tree for Simple Arithmetic & Prefix/Postfix Traversal (Tree construction using stack of node pointers, recursive traversals).
- **Expt 8:** Word-Meaning Dictionary using Binary Search Tree (BST insertion, search, inorder traversal).
- **Expt 9:** Landmine Maze Shortest Distance (2D Grid BFS, queue of cell coordinates, obstacle collision avoidance).
- **Expt 10:** 3-Container Water Jug State-Space Puzzle (10L, 7L, 4L containers, BFS shortest path sequence to leave 2L in 7L or 4L).
- **Expt 11:** Text Editor Find and Replace (String pattern matching, sliding buffer substitution).
- **Expt 12:** Efficient Searching in Sorted Array (Binary Search with comparison counting & index tracking).
Each experiment must have:
1. Complete, clear, numbered **Algorithm**.
2. Responsive inline vector **SVG Flowchart**.
3. Clean, compile-ready, idiomatic **C Code** with copy button.
4. Verified realistic **Terminal Output**.
5. Pre-loaded animated **Interactive Demo** with Play, Step, and Reset buttons + state ticker.
6. Real-time **Industrial Applications** (e.g., compilers, databases, GPS navigation, robotic planning, word processors).
**Verification:** Run `node tests/validate_portal.js` to ensure experiments 7–12 meet all criteria.

---

### Task 5: Experiments 13 to 18 (Sorting, Priority Queues, Hashing & Memory Management)
**Files to modify:** `PCCSL307_Data_Structures_Lab_Portal.html`  
**Description:** Implement full data, components, and animations for Experiments 13 through 18:
- **Expt 13:** Sorting Algorithms Comparison (Bubble, Insertion, Radix, Quick, Merge Sort with comparative step counter).
- **Expt 14:** General Post Office Priority Queue (Preferential treatment: Differently Abled > Senior Citizen > Defence > Normal person).
- **Expt 15:** Spell Checker with Hash Table Dictionary & Typo Suggestions (Hash table with chaining, edit distance suggestions).
- **Expt 16:** Dynamic Memory Allocator & Garbage Collector Simulation (Doubly linked list free-list, first-fit allocation, coalescing free blocks).
- **Expt 17:** KTU Tech Fest Max Activity Points (Activity array A[i], at most k events -> Greedy max-heap / selection).
- **Expt 18:** Merge K Sorted Lists using Min-Heap (Min-heap of size K tracking smallest element, extract min and insert next).
Each experiment must have:
1. Complete, clear, numbered **Algorithm**.
2. Responsive inline vector **SVG Flowchart**.
3. Clean, compile-ready, idiomatic **C Code** with copy button.
4. Verified realistic **Terminal Output**.
5. Pre-loaded animated **Interactive Demo** with Play, Step, and Reset buttons + state ticker.
6. Real-time **Industrial Applications** (e.g., sorting big data, hospital triage, IDE spell-checkers, OS heap allocators, event planners, multi-way external merges).
**Verification:** Run `node tests/validate_portal.js` to ensure experiments 13–18 meet all criteria.

---

### Task 6: Master Revision Hub (Viva Voce Bank, Quiz Engine & 3D Knowledge Graph)
**Files to modify:** `PCCSL307_Data_Structures_Lab_Portal.html`  
**Description:** Implement the three dedicated revision engines accessible from the floating liquid dock:
1. **Viva Voce Master Bank:**
   - 36+ curated high-yield oral exam questions covering all 18 topics, Bloom's levels (K1–K4), and KTU lab evaluation rubrics (10 marks).
   - Accordion cards with tap-to-reveal answers, key memory tags, and self-assessment status.
2. **Interactive Quiz Engine:**
   - 15 graded multiple-choice questions covering all syllabus modules.
   - Immediate feedback (green for correct, red for incorrect with detailed rationale).
   - Real-time score calculator, performance badge (Distinction / First Class / Needs Revision), and retake option.
3. **Interactive 3D/Canvas Knowledge Graph:**
   - Dynamic interactive node-link visualizer mapping all 18 experiments, core data structure categories, time complexities, and KTU Course Outcomes (CO1–CO4).
   - Touch drag, zoom, and node click to inspect connections and course outcomes.
**Verification:** Run `node tests/validate_portal.js` to assert Viva Bank (>=36 Qs), Quiz (>=15 Qs), and Knowledge Graph are fully implemented and functional.

---

### Task 7: Mirroring, Browser Testing & Final Polish
**Files to create/modify:** `index.html`, `PCCSL307_Data_Structures_Lab_Portal.html`  
**Description:**
1. Copy/mirror `PCCSL307_Data_Structures_Lab_Portal.html` to `index.html` for instant previewing.
2. Run automated validation suite `node tests/validate_portal.js`.
3. Verify responsive layout on mobile viewport (390px, 414px) and desktop.
4. Verify smooth micro-animations, copy buttons, tabs, interactive demos, quiz scoring, and knowledge graph interactions.
**Verification:** Complete test run passing 100%, zero console errors.
