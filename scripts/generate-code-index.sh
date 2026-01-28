#!/bin/bash
# Generate code index from ctags

set -e

OUTPUT_FILE="CODE_INDEX.md"

echo "Generating code index..."

# Generate ctags JSON and convert to markdown
ctags \
  --output-format=json \
  --fields=+n \
  -R \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=dist \
  --exclude=build \
  --exclude=__pycache__ \
  --exclude=venv \
  --exclude=.git \
  . 2>/dev/null | node scripts/ctags-to-markdown.js > "$OUTPUT_FILE"

echo "✓ Code index generated: $OUTPUT_FILE"
echo "  Lines: $(wc -l < $OUTPUT_FILE)"