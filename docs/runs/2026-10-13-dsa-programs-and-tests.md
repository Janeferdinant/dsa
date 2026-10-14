# Run log 2026-10-13: dsa

Compiler: portable GCC (WinLibs MinGW-w64 build, no system gcc was installed): gcc.exe (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r2) 16.2.0
Node: v22.20.0. Playwright 1.59.1 (Chromium) run from a separate folder, not added to this repo.

## node scripts/run_programs.js
(gcc -Wall -Wextra -std=c11 -pedantic; any warning fails the script)
```
ok   exp01  1 output lines
ok   exp02  61 output lines
ok   exp03  59 output lines
ok   exp04  48 output lines
ok   exp05  8 output lines
ok   exp06  33 output lines
ok   exp07  57 output lines
ok   exp08  1 output lines
ok   exp09  5 output lines
ok   exp10  27 output lines
ok   exp11  2 output lines
ok   exp12  1 output lines
ok   exp13  52 output lines
ok   exp14  5 output lines
ok   exp15  1 output lines
ok   exp16  56 output lines
ok   exp17  1 output lines
ok   exp18  1 output lines
Compiler: gcc (MinGW-W64 x86_64-ucrt-posix-seh, built by Brecht Sanders, r2) 16.2.0
Wrote program_output.json for 18 programs.
```

## Extra static analysis: gcc -Wall -Wextra -std=c11 -pedantic -fanalyzer -c
16 of 18 programs report 0 warnings. exp05 and exp08 were not changed (they were correct for their task) and report a missing NULL check after malloc and no final free. Listed as a follow-up.

## node scripts/generate_portal.js, then node tests/validate_portal.js
```
Mirrored to: index.html
Build completed successfully!

Results: 45 passed, 0 failed
ALL VERIFICATION CHECKS PASSED PERFECTLY!
```

## Playwright (390 px and 1280 px, served with python -m http.server)
```
PASS [390 px] experiment cards render
PASS [390 px] no horizontal overflow (0px)
PASS [390 px] 36 viva items in the DOM
PASS [390 px] 15 quiz cards in the DOM
PASS [390 px] 18 terminal output panels
PASS [390 px] exp10 panel shows the BFS path the program prints
PASS [390 px] exp10 code is displayed
PASS [390 px] exp10 demo advances to step 3
PASS [390 px] exp10 demo reaches the goal
PASS [390 px] viva answer reveals
PASS [390 px] quiz drawer lists 15 questions
PASS [390 px] no console or page errors []
PASS [390 px] no external requests []
PASS [1280 px] experiment cards render
PASS [1280 px] no horizontal overflow (0px)
PASS [1280 px] 36 viva items in the DOM
PASS [1280 px] 15 quiz cards in the DOM
PASS [1280 px] 18 terminal output panels
PASS [1280 px] exp10 panel shows the BFS path the program prints
PASS [1280 px] exp10 code is displayed
PASS [1280 px] exp10 demo advances to step 3
PASS [1280 px] exp10 demo reaches the goal
PASS [1280 px] viva answer reveals
PASS [1280 px] quiz drawer lists 15 questions
PASS [1280 px] no console or page errors []
PASS [1280 px] no external requests []

ALL PASSED
```
