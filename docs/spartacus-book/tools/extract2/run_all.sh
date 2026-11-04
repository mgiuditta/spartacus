#!/usr/bin/env bash
# Rigenera tutte le appendici A03-A08 dal codice sorgente.
set -euo pipefail
cd "$(dirname "$0")"
for s in a03_cms_components.py a04_occ_endpoints.py a05_guards.py a06_interceptors.py a07_events.py a08_outlets.py; do
  python3 "$s"
done
