// Compile and run every C program embedded in generate_portal.js, and record
// what each one really prints in scripts/program_output.json.
//
// generate_portal.js reads that file to fill the "Terminal Output" panels, so
// nothing shown on the portal is typed by hand. Each entry stores a SHA-256 of
// the program source; the generator refuses to build if a program was edited
// and this script was not re-run.
//
// Usage:   node scripts/run_programs.js
// Needs:   gcc on PATH (or set the GCC environment variable to its full path).
// Flags:   gcc -Wall -Wextra -std=c11 -pedantic   (any warning is an error here)

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { experimentsData } = require('./generate_portal.js');

const gcc = process.env.GCC || 'gcc';
const flags = ['-Wall', '-Wextra', '-std=c11', '-pedantic'];
const outFile = path.join(__dirname, 'program_output.json');

const ver = spawnSync(gcc, ['--version'], { encoding: 'utf8' });
if (ver.error || ver.status !== 0) {
  console.error(`Cannot run "${gcc}". Install GCC or set the GCC environment variable.`);
  process.exit(1);
}
const gccVersion = ver.stdout.split('\n')[0].trim();
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'dsa-programs-'));
const programs = {};
let failures = 0;

for (const exp of experimentsData) {
  const nn = String(exp.num).padStart(2, '0');
  const src = path.join(work, `exp${nn}.c`);
  const exe = path.join(work, `exp${nn}${process.platform === 'win32' ? '.exe' : ''}`);
  fs.writeFileSync(src, exp.code + '\n');

  const build = spawnSync(gcc, [...flags, '-o', exe, src], { encoding: 'utf8' });
  const diagnostics = (build.stderr || '').trim();
  if (build.status !== 0 || diagnostics) {
    console.error(`FAIL exp${nn}: compile produced ${build.status !== 0 ? 'errors' : 'warnings'}\n${diagnostics}`);
    failures++;
    continue;
  }
  const run = spawnSync(exe, [], { encoding: 'utf8', timeout: 10000, input: '' });
  if (run.status !== 0) {
    console.error(`FAIL exp${nn}: exit status ${run.status} ${run.error ? run.error.message : ''}`);
    failures++;
    continue;
  }
  const output = run.stdout.replace(/\r\n/g, '\n').replace(/\n+$/, '');
  if (!output) {
    console.error(`FAIL exp${nn}: program printed nothing`);
    failures++;
    continue;
  }
  programs[exp.num] = {
    sha256: crypto.createHash('sha256').update(exp.code).digest('hex'),
    exitCode: run.status,
    output,
  };
  console.log(`ok   exp${nn}  ${output.split('\n').length} output lines`);
}

fs.rmSync(work, { recursive: true, force: true });
if (failures) {
  console.error(`${failures} program(s) failed; ${path.basename(outFile)} was not updated.`);
  process.exit(1);
}
fs.writeFileSync(outFile, JSON.stringify({ compiler: gccVersion, flags: flags.join(' '), programs }, null, 2) + '\n');
console.log(`Compiler: ${gccVersion}`);
console.log(`Wrote ${path.basename(outFile)} for ${Object.keys(programs).length} programs.`);
