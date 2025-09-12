#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# Script: Scope.sh
# Purpose: Scoped vendor build using PHP-Scoper, for CI/CD workflows
# Notes: Modular, step-based logging with prefixed log lines for easy CI parsing
# =============================================================================

# === Configuration ===
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$ROOT_DIR/.tmp-scope"
DIST_DIR="$ROOT_DIR/vendor-scoped"
SCOPER_CONFIG="$ROOT_DIR/scoper.inc.php"
PHP_SCOPER_BIN="$ROOT_DIR/vendor/bin/php-scoper"

IDENTIFIER="SCOPING"

# -----------------------------------------------------------------------------
# Generic logging function
# Arguments:
#   $1 = message
#   $2 = step number or special keyword "DONE"
# -----------------------------------------------------------------------------
log() {
  local msg="$1"
  local status="${2:-}"

  if [[ "$status" == "DONE" ]]; then
    echo
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] [$IDENTIFIER] [$status] ✓ $msg"
    echo "----------------------------------------------------------------------------"
  else
    echo
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] [$IDENTIFIER] [$status] $msg"
    echo "----------------------------------------------------------------------------"
  fi
}

# -----------------------------------------------------------------------------
# Steps
# -----------------------------------------------------------------------------
prepare_dirs() {
  log "Preparing directories" "1/6"
  rm -rf "$TMP_DIR" "$DIST_DIR"
  mkdir -p "$TMP_DIR" "$DIST_DIR"
}

copy_sources() {
  log "Copying composer files and sources" "2/6"
  cp "$ROOT_DIR/composer.json" "$ROOT_DIR/composer.lock" "$TMP_DIR/"
  cp -r "$ROOT_DIR/src" "$TMP_DIR/"
}

install_deps() {
  log "Installing dependencies (composer install)" "3/6"
  composer install --no-dev --prefer-dist --working-dir="$TMP_DIR"
}

run_scoper() {
  log "Running PHP-Scoper" "4/6"
  "$PHP_SCOPER_BIN" add-prefix \
    --config="$SCOPER_CONFIG" \
    --output-dir="$TMP_DIR/scoped/vendor" \
    --force \
    --working-dir="$TMP_DIR"
}

finalize_output() {
  log "Finalizing output (copying files + dump-autoload)" "5/6"
  cp "$TMP_DIR/composer.json" "$TMP_DIR/composer.lock" "$TMP_DIR/scoped/"
  cp -r "$TMP_DIR/src" "$TMP_DIR/scoped/"
  composer dump-autoload --classmap-authoritative --working-dir="$TMP_DIR/scoped"
  cp -r "$TMP_DIR/scoped/vendor/"* "$DIST_DIR/"
}

cleanup() {
  log "Cleaning up temporary files" "6/6"
  rm -rf "$TMP_DIR"
}

# -----------------------------------------------------------------------------
# Main workflow
# -----------------------------------------------------------------------------
main() {
  log "Starting scoping process" "START"

  prepare_dirs
  copy_sources
  install_deps
  run_scoper
  finalize_output
  cleanup

  # Final completion message
  log "Scoped vendor ready at $DIST_DIR" "DONE"
}

main "$@"
