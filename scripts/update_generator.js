const fs = require('fs');
const path = require('path');

console.log('Generating complete single-file Data Structures Lab portal...');

// Load existing data from generate_portal.js and update HTML template to pre-render Viva and Quiz
let fileContent = fs.readFileSync(path.resolve(__dirname, 'generate_portal.js'), 'utf-8');

// Replace drawer-body content in template
const newDrawerHtml = `
      <div class="drawer-content" id="drawer-body">
        <!-- VIVA SECTION (Pre-rendered for instant mobile accessibility) -->
        <div id="viva-section" style="display:none;">
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:14px;">
            Curated high-yield viva voce questions for KTU End Semester Examination (10 Marks). Tap 'Reveal Answer' to test your recall.
          </p>
          <div id="viva-container">
            \${vivaQuestions.map((item, idx) => \`
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
        </div>

        <!-- QUIZ SECTION (Pre-rendered) -->
        <div id="quiz-section" style="display:none;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <span style="font-size:0.85rem; color:var(--acc-cyan); font-weight:700;">Score: <span id="quiz-score">0</span> / \${quizQuestions.length}</span>
            <span style="font-size:0.75rem; color:var(--text-muted);">Instant Feedback & Explanations</span>
          </div>
          <div id="quiz-list">
            \${quizQuestions.map((q, idx) => \`
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
`;

// Also update openDrawer in client JS to show/hide sections
const newClientDrawerJs = `
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
`;

// Let's replace in fileContent
const targetDrawerBodyOld = '<div class="drawer-content" id="drawer-body">\\n        <!-- Injected dynamically: Viva Bank, Quiz Engine, or 3D Graph -->\\n      </div>';
fileContent = fileContent.replace('<div class="drawer-content" id="drawer-body">\n        <!-- Injected dynamically: Viva Bank, Quiz Engine, or 3D Graph -->\n      </div>', newDrawerHtml);

// Replace openDrawer definition
const openDrawerOldPattern = /function openDrawer\(mode\) \{[\s\S]*?renderKnowledgeGraph\(\);\s*\}\s*\}/;
fileContent = fileContent.replace(openDrawerOldPattern, newClientDrawerJs.trim());

// Write updated generate_portal.js
fs.writeFileSync(path.resolve(__dirname, 'generate_portal.js'), fileContent, 'utf-8');
console.log('Updated scripts/generate_portal.js successfully.');
