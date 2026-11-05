#!/usr/bin/env bash
# Rigenera le appendici A11 (glossario) e A12 (indice simboli) e ne verifica i riferimenti.
set -euo pipefail
cd "$(dirname "$0")"
python3 a12_indice_simboli.py
python3 a11_glossario.py
cd ../..
python3 tools/check-refs.py appendici/A11-glossario.md appendici/A12-indice-simboli.md
