#!/bin/bash
# commit + push dei soli file del libro
cd /home/user/spartacus || exit 1
git add docs/spartacus-book
git diff --cached --quiet && exit 0
git commit -qm "docs(book): ${1:-avanzamento}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_013hx3JERDrFb7kxKo5mx449"
for i in 2 4 8 16; do git push -q -u origin claude/spartacus-book 2>/dev/null && exit 0; sleep $i; done
echo "push fallito"
