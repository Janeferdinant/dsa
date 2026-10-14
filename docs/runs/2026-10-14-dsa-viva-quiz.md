# Viva and quiz additions, 2026-10-14

One viva question and one quiz question were added to `scripts/generate_portal.js` (the single source), so the banks hold 37 viva and 16 quiz questions.

## New questions

Viva (CO4, K3): "In the mark-and-sweep garbage collector of Experiment 16, what do the mark and sweep phases do, and why are the mark bits cleared before each collection?" It covers the collector in Experiment 16 (the `gc()` function), which no other viva question covers.

Quiz: "A hash table of size 10 uses h(k) = k mod 10 with linear probing. After inserting 15, 25 and 35 in that order into an empty table, at which index is 35 stored?" Options 5, 6, 7, 8; correct answer 7 (15 goes to 5, 25 probes to 6, 35 probes to 7). Linear probing appeared before only as a wrong option, so this does not repeat an existing question.

Both were compared with all existing questions by topic and wording: 37 distinct viva texts and 16 distinct quiz texts.

## Commands and results

```
node scripts/generate_portal.js          Build completed successfully!
node tests/validate_portal.js            Results: 45 passed, 0 failed
python -m http.server 8765
node tests/e2e_portal.js x http://localhost:8765/ <shots>   ALL PASSED (26 checks, 390 px and 1280 px)
```

The counts expected by `tests/validate_portal.js` and `tests/e2e_portal.js` are now 37 and 16. The drawer titles in the generated page now read "37 Questions" and "16 Questions" (they said "36+" and "15 Marks").

A separate Playwright check at both widths revealed the last viva answer and clicked option 7 on the last quiz card: the answer showed as correct, the explanation appeared, and there was no horizontal overflow.
