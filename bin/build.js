#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const tsconfigWatch = path.join(projectRoot, 'tsconfig.watch.json');
const tsconfig = path.join(projectRoot, 'tsconfig.json');

try {
  // Copy tsconfig.watch.json if it exists
  if (fs.existsSync(tsconfigWatch)) {
    fs.copyFileSync(tsconfigWatch, tsconfig);
    console.log('Copied tsconfig.watch.json -> tsconfig.json');
  }

  // Run 10up-toolkit build
  execSync('10up-toolkit build', { stdio: 'inherit' });
} finally {
  // Remove tsconfig.json after build
  if (fs.existsSync(tsconfig)) {
    fs.unlinkSync(tsconfig);
    console.log('Removed tsconfig.json after build');
  }
}
