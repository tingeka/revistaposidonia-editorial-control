#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const tsconfigWatch = path.join(projectRoot, 'tsconfig.watch.json');

// Helper to spawn a process and merge its output
function runCommandMerged(command, args, name) {
	const proc = spawn(command, args, { shell: true });

	proc.stdout.on('data', (data) => {
		process.stdout.write(`[${name}] ${data}`);
	});

	proc.stderr.on('data', (data) => {
		process.stderr.write(`[${name} ERROR] ${data}`);
	});

	proc.on('exit', (code) => {
		if (code !== 0) process.exit(code);
	});

	return proc;
}

// Start 10up-toolkit watch
console.log('Starting 10up-toolkit watch...');
const toolkitProcess = runCommandMerged('10up-toolkit', ['watch', '--port=5010', '--hot'], 'Webpack');

// Start tsc watch if tsconfig.watch.json exists
let tscProcess = null;
if (fs.existsSync(tsconfigWatch)) {
	console.log('Found tsconfig.watch.json, starting TypeScript watch...');
	tscProcess = runCommandMerged('tsc', ['--watch', '--project', tsconfigWatch, '--pretty', '--preserveWatchOutput'], 'TS');
} else {
	console.log('No tsconfig.watch.json found, skipping TypeScript watch.');
}

// Graceful exit on Ctrl+C
process.on('SIGINT', () => {
	console.log('\nShutting down...');
	toolkitProcess.kill();
	if (tscProcess) tscProcess.kill();
	process.exit();
});
