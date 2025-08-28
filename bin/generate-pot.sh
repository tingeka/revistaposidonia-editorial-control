#!/usr/bin/env bash
set -e

# plugin_root/bin/generate-pot.sh — minimal, container-only
PLUGIN="revistaposidonia-editorial-control"
PLUGIN_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

mkdir -p "$PLUGIN_ROOT/languages"
TMP_POT="$(mktemp)"

# single recursive scan (php + js/ts)
wp i18n make-pot "$PLUGIN_ROOT" "$TMP_POT" \
  --domain="$PLUGIN" \
  --package-name="Revista Posidonia Editorial Control" \
  --headers='{"Report-Msgid-Bugs-To":"https://github.com/tingeka/revistaposidonia-editorial-control/issues"}'

mv -f "$TMP_POT" "$PLUGIN_ROOT/languages/${PLUGIN}.pot"
echo "POT generated: $PLUGIN_ROOT/languages/${PLUGIN}.pot"
