#!/usr/bin/env node
/**
 * Convert ctags JSON output to readable markdown
 */

import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const fileMap = new Map();

// Only include these symbol types (skip noisy local constants/variables)
const INCLUDE_KINDS = new Set([
  'function',
  'class',
  'interface',
  'type',
  'alias',      // TypeScript type aliases
  'method',
  'enum',
  'namespace',
  'module',
]);

rl.on('line', (line) => {
  try {
    const tag = JSON.parse(line);

    // Skip some noisy entries
    if (tag.kind === 'unknown') return;
    if (!INCLUDE_KINDS.has(tag.kind)) return;
    if (tag.path.includes('node_modules')) return;
    if (tag.path.includes('.next')) return;
    if (tag.path.includes('dist')) return;

    const file = tag.path;
    if (!fileMap.has(file)) {
      fileMap.set(file, []);
    }

    fileMap.get(file).push({
      name: tag.name,
      kind: tag.kind,
      line: tag.line || '?'
    });
  } catch (e) {
    // Skip invalid JSON lines
  }
});

rl.on('close', () => {
  console.log('# Codebase Structure Index');
  console.log('*Auto-generated - DO NOT EDIT MANUALLY*\n');

  // Sort files
  const sortedFiles = Array.from(fileMap.keys()).sort();

  // Group by directory
  const backend = sortedFiles.filter((f) => f.startsWith('src/') || f.startsWith('backend/'));
  const frontend = sortedFiles.filter(
    (f) => f.startsWith('app/') || f.startsWith('components/') || f.startsWith('lib/')
  );
  const other = sortedFiles.filter((f) => !backend.includes(f) && !frontend.includes(f));

  if (backend.length > 0) {
    console.log('## Backend\n');
    backend.forEach(printFile);
  }

  if (frontend.length > 0) {
    console.log('\n## Frontend\n');
    frontend.forEach(printFile);
  }

  if (other.length > 0) {
    console.log('\n## Other\n');
    other.forEach(printFile);
  }
});

function printFile(file) {
  const tags = fileMap.get(file);
  console.log(`### ${file}`);
  tags.forEach((tag) => {
    console.log(`- \`${tag.name}\` (${tag.kind}, line ${tag.line})`);
  });
  console.log('');
}
