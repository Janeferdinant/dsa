# Specification & Design Document: Data Structures Lab Mobile Portal (PCCSL307)

**Document Date:** October 11, 2026  
**Course:** PCCSL307 &mdash; Data Structures Lab (KTU B.Tech CSE Semester 3)  
**Author / Academic Mentor:** Asst. Prof. Jane Rose, Department of Computer Science & Engineering (CSE)  
**Target Output:** Single Standalone HTML File (`PCCSL307_Data_Structures_Lab_Portal.html`)

---

## 1. Intent and the Why

Engineering students in the APJ Abdul Kalam Technological University (KTU) S3 Computer Science curriculum face intense lab evaluation:
- **Continuous Internal Evaluation (CIE):** 50 marks (Preparation, Viva, Timely records).
- **End Semester Examination (ESE):** 50 marks (Algorithm: 10, Execution/Programming: 15, Output Quality: 10, Viva Voce: 10, Record: 5).

The night before a lab session or viva examination, students often panic while juggling heavy textbooks or scattered PDF manuals on their smartphones. They need a single, ultra-polished, frictionless mobile web portal that allows them to rapidly understand the core logic, visualize the execution step-by-step, review clean copyable C code, test themselves with viva flashcards, and conceptualize how all 18 experiments interconnect.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **100% Standalone Single File:** The entire application (HTML, CSS styling, SVG graphics, JavaScript engines, algorithms, code, demos, quiz, viva bank, and knowledge graph) runs from a single `.html` file with zero required external dependencies or backend servers.
- **Mobile-First Ergonomics:** Designed from the ground up for smartphone screens (viewport widths 360px–480px, responsive up to 4K displays) with thumb-friendly touch targets, smooth scrolling, and collapsible cards.
- **Complete Syllabus Coverage:** All 18 lab experiments specified in `syllabus.pdf` are fully implemented with their official KTU problem statements, Course Outcomes (CO1–CO4), and Bloom's Taxonomy levels.
- **Every Experiment Has 6 Pillars:**
  1. **Algorithm:** Clear, numbered pseudo-code / step-by-step logic.
  2. **Flowchart:** Clean, modern, responsive inline vector SVG diagram.
  3. **Code:** Idiomatic, clean, robust C source code tailored to KTU lab examination standards, with syntax highlighting and 1-tap copy.
  4. **Output:** Formatted realistic terminal execution with sample inputs and verified console outputs.
  5. **Live Interactive Demo:** Pre-loaded animated visual walkthrough with Play/Pause, Step-by-Step, and Reset controls, plus an execution ticker explaining every operation.
  6. **Real-Time Applications:** Authentic real-world engineering use cases (e.g., GPS navigation, CPU schedulers, memory allocators, browser histories).
- **Dedicated Bottom Revision Hub:** A floating liquid glass dock providing instant access to:
  1. **Viva Voce Bank:** High-yield oral questions with tap-to-reveal answers and Bloom's tags (K1–K4).
  2. **Interactive Quiz Engine:** Instant-feedback multiple-choice quiz with score tracking and explanations.
  3. **3D/Canvas Knowledge Graph:** Interactive visual network mapping data structures, algorithms, and course outcomes.
- **Liquid Glass Aesthetic:** Premium glassmorphism (`backdrop-filter: blur(24px)`), iridescent radial mesh gradients, 3D specular highlights, glowing neon accents, and smooth micro-animations.
- **Mentor Attribution:** Official footer:  
  `Asst. Prof. Jane Rose`  
  `Department of Computer Science & Engineering (CSE)`

### Non-Goals
- Requiring an active internet connection to function (the core app must work completely offline).
- Complex backend database authentication (all progress, quiz scores, and settings persist via browser `localStorage`).
- Bulky external UI frameworks (no Tailwind CLI or heavy npm bundles; built with native high-performance Vanilla CSS and JavaScript).

### Anti-Goals
- Forcing mobile students to type complex array inputs or matrix dimensions late at night to see a simulator work (demos must run with pre-loaded, curated walkthroughs).
- Truncating code or presenting incomplete "left as an exercise to the reader" algorithms (every experiment must have a working, full C implementation).
- Cluttered, text-dense desktop layouts that fail to adapt gracefully to handheld screens.

---

## 3. Syllabus Scope: All 18 KTU Experiments

| No. | Experiment Title | Core Structure / Paradigm | KTU Outcomes |
|---|---|---|---|
| **Expt 1** | Sparse Polynomial Addition using Arrays | Array of structs (coeff, exp) | CO1, CO2 (K3) |
| **Expt 2** | Sparse Matrix Transpose & Addition | 3-Tuple (row, col, val) Coordinate List | CO1, CO2 (K3) |
| **Expt 3** | Infix to Postfix Conversion & Stack Evaluation | LIFO Stack (Operator precedence & associativity) | CO1, CO2 (K3) |
| **Expt 4** | Linear Queue, Deque, & Circular Queue | FIFO, Double-Ended & Modulo Ring Buffers | CO1, CO2 (K3) |
| **Expt 5** | Web Browser History (Back/Forward) Navigation | Doubly Linked List (prev, next pointers) | CO1, CO4 (K3) |
| **Expt 6** | Polynomial Addition & Multiplication | Singly Linked Lists with ordered exponent merge | CO1, CO4 (K4) |
| **Expt 7** | Expression Tree & Prefix/Postfix Traversal | Binary Tree, Postfix stack parsing, Recursion | CO1, CO2 (K4) |
| **Expt 8** | Word-Meaning Dictionary using BST | Binary Search Tree (Insert, Search, Inorder) | CO1, CO2 (K4) |
| **Expt 9** | Landmine Maze Shortest Distance | 2D Grid Breadth-First Search (Queue BFS) | CO1, CO3 (K4) |
| **Expt 10** | 3-Container Water Jug State-Space Puzzle (10L, 7L, 4L) | State Graph Search (BFS for minimum pours) | CO1, CO2 (K4) |
| **Expt 11** | Text Editor Find and Replace | String Pattern Matching & Buffer Replacement | CO1, CO3 (K3) |
| **Expt 12** | Efficient Searching in Sorted Array | Binary Search with Iteration & Comparison Count | CO2, CO3 (K4) |
| **Expt 13** | Sorting Algorithms Benchmark (Bubble, Insertion, Radix, Quick, Merge) | Step Counter, Time Complexity Comparison | CO2, CO3 (K4) |
| **Expt 14** | General Post Office Priority Queue | Priority Queue (Special Categories: Differently Abled > Senior > Defence > Normal) | CO1, CO2 (K4) |
| **Expt 15** | Spell Checker with Hash Table & Suggestions | Hash Table with Chaining / Open Addressing, Levenshtein edit distance | CO1, CO2 (K4) |
| **Expt 16** | Dynamic Memory Allocator & Garbage Collector | Doubly Linked List Free-List (malloc/free simulation) | CO1, CO4 (K4) |
| **Expt 17** | KTU Tech Fest Activity Points Maximizer | Greedy / Max-Heap Selection (Top-K events) | CO1, CO3 (K4) |
| **Expt 18** | Merge K Sorted Lists using Min-Heap | Priority Queue / Min-Heap of K head nodes | CO1, CO3 (K4) |

---

## 4. UI/UX Architecture & Liquid Glass System

### Visual Tokens (Dark & Light Glass)
- `--bg-base`: `#060913` (rich deep obsidian).
- `--bg-gradient`: Multi-layer radial mesh gradients in cyan (`rgba(56, 189, 248, 0.16)`), violet (`rgba(168, 85, 247, 0.18)`), and emerald (`rgba(52, 211, 153, 0.12)`).
- `--glass-card`: `rgba(15, 23, 42, 0.72)` with `backdrop-filter: blur(24px) saturate(180%)`.
- `--glass-border`: `rgba(255, 255, 255, 0.14)` with specular top highlight `inset 0 1px 0 rgba(255, 255, 255, 0.25)`.
- `--shadow-3d`: Dynamic 3D depth shadows `0 20px 48px -10px rgba(0, 0, 0, 0.6)`.
- Smooth toggle for Daylight Glass mode if students study in bright rooms.

### Layout Hierarchy
1. **Glass Header & Sticky Search Bar:**
   - University Course Badge: `06PCCSL307 · S3 CSE Data Structures Lab`.
   - Real-time search filter (searches experiment names, algorithms, structures, and keywords).
   - Horizontal swipeable Category Filter Chips: `All (18)`, `Linear (Arrays/Stacks)`, `Queues`, `Linked Lists`, `Trees`, `Graphs & BFS`, `Sorting & Searching`, `Hashing & Memory`.
2. **Experiment "Sprint Deck" Cards:**
   - Expandable liquid glass cards with experiment metadata (Number, Title, KTU CO mapping, Bloom's level).
   - Internal 5-Segment Tab Bar:
     - 📐 **Flowchart & Algorithm** (Side-by-side or stacked on mobile: SVG diagram + numbered steps).
     - 💻 **C Code & Output** (C code with copy button + formatted terminal output block).
     - 🎮 **Live Simulator** (Animated visualizer with Play/Pause, Step Forward, Reset, and narrative ticker).
     - 💡 **Real-Time Applications** (Practical engineering applications).
3. **Floating Liquid Revision Dock (Bottom Navigation):**
   - 🧪 **18 Labs:** Jumps to the top of the experiment feed.
   - 🎯 **Viva Master Bank:** Opens the full slide-up sheet with categorized viva questions and tap-to-reveal answers.
   - ⚡ **Quiz Engine:** Opens the interactive 15-question revision quiz with instant score and answer explanations.
   - 🌐 **3D Knowledge Graph:** Opens the full-screen interactive Canvas/SVG concept network mapping data structures, time complexities, and KTU course outcomes.
4. **Official Footer Attribution:**
   - Prominently styled glass footer with:
     *Asst. Prof. Jane Rose*  
     *Department of Computer Science & Engineering (CSE)*

---

## 5. Technical Implementation Details

- **Single HTML Delivery:** Everything packaged into `PCCSL307_Data_Structures_Lab_Portal.html`.
- **Vanilla JavaScript & CSS:** Zero external package dependencies, ensuring instant mobile loading and 100% offline reliability.
- **Embedded SVG Flowcharts:** Clean, responsive vector graphics with glowing nodes and directional arrows.
- **Embedded Interactive Simulators:** Lightweight JavaScript canvas/DOM animation engines for each experiment with pre-loaded state sequences.
- **Interactive Knowledge Graph:** Canvas-based interactive force-directed node-link visualizer with draggable nodes, category color-coding, and info-sheet on node tap.
- **Viva Revealer:** Accordion cards with tap-to-reveal answers and self-assessment buttons (I knew this / Need review).
- **Quiz System:** Multiple-choice quiz with immediate visual feedback (green for correct, red for incorrect), explanation modal, and score summary badge.

---

## 6. What is Left to the Builder

- Exact SVG coordinates and diagram flows for the 18 flowcharts.
- Specific styling of micro-animations (CSS cubic-bezier transitions for card expansion, button glow effects).
- Curated presets and step counts for the pre-loaded visual walkthroughs.
- Detailed question pool for the viva bank (minimum 36 high-yield questions across all 18 topics) and quiz engine (15 comprehensive questions).
