# Data Structures & Algorithms (DSA) — KTU Academic Learning Portal

Comprehensive educational suite for APJ Abdul Kalam Technological University (KTU) B.Tech Computer Science & Engineering (CSE) curriculum:
- **PCCSL307** &mdash; Data Structures Lab (S3 CSE)
- **06PCCST303** &mdash; Data Structures and Algorithms Theory Scheme

Academic Mentor: **Asst. Prof. Jane Rose**, Department of Computer Science & Engineering (CSE)

---

## 📁 Repository Structure

```text
├── PCCSL307_Data_Structures_Lab_Portal.html   # Primary standalone mobile-first lab portal (All 18 experiments)
├── index.html                                 # Web entrypoint (Mirrors PCCSL307 portal)
├── PCCST303_DSA_KTU_Solved_Scheme_Quiz_...html# Solved exam scheme, quiz, and knowledge graph for theory
├── syllabus.pdf                               # Official KTU PCCSL307 Lab syllabus source
├── syllabus_extracted.txt                     # Plaintext curriculum reference
├── docs/                                      # Superpowers specifications and execution plans
│   └── superpowers/
│       ├── specs/2026-10-11-dsa-lab-portal-design.md
│       └── plans/2026-10-11-dsa-lab-portal-implementation.md
├── scripts/                                   # Portal generator and build tooling
│   └── generate_portal.js                     # 100% self-contained portal compiler
└── tests/                                     # Automated test validation suite
    └── validate_portal.js                     # 38-assertion regression and completeness test
```

---

## ⚡ Core Features (PCCSL307 Lab Portal)

1. **Mobile-First Liquid Glass UI/UX:**
   - Designed for smartphones (`viewport-fit=cover`, smooth thumb scrolling, category chips, real-time search).
   - Glassmorphic panels (`backdrop-filter: blur(24px)`), ambient iridescent radial mesh gradients, 3D card tilt, specular highlights, and Daylight/Night theme switcher.
2. **All 18 Lab Experiments Covered:**
   Each experiment provides all 6 core pillars:
   - 📐 **Structured Algorithm:** Numbered step-by-step logic.
   - 📊 **Vector SVG Flowchart:** Clean, modern inline vector diagram.
   - 💻 **Complete C Code:** Compile-ready, KTU exam-compliant C source with 1-tap copy.
   - 🖥️ **Terminal Output:** Verified standard console input/output with return codes.
   - 🎮 **Live Interactive Demo:** Pre-loaded animated walkthrough with Play/Pause, Step-by-Step, Reset, and narrative ticker.
   - 💡 **Real-World Applications:** Authentic engineering use cases (compilers, schedulers, GPS, memory allocators).
3. **Floating Liquid Revision Dock (Bottom Bar):**
   - 🎯 **Viva Voce Master Bank:** 37 high-yield oral exam questions with tap-to-reveal answers and Bloom's taxonomy tags (K1&ndash;K4).
   - ⚡ **Interactive Quiz Engine:** 16-question graded quiz with instant visual feedback and rationale explanations.
   - 🌐 **Interactive 3D Knowledge Graph:** Force-directed interactive canvas connecting data structures, course outcomes (CO1&ndash;CO4), and experiments.
4. **100% Standalone & Offline Ready:**
   - Single HTML file with zero external script or stylesheet dependencies.

---

## 🛠️ Verification & Development

### Run Test Suite
```bash
node tests/validate_portal.js
```
*Validates HTML5 syntax, all 18 experiments, 18 algorithms, 18 SVG flowcharts, 18 C codes, 18 outputs, 18 demos, 18 real-world apps, viva bank (>=36 Qs), quiz (>=15 Qs), knowledge graph, and mentor attribution.*

### Rebuild Portal
```bash
node scripts/generate_portal.js
```

---

## 👤 Academic Attribution

**Asst. Prof. Jane Rose**  
Department of Computer Science & Engineering (CSE)
