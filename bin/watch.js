/**
 * External dependencies
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Internal dependencies
 */
const {
	hasArgInCLI,
	fromConfigRoot,
	fromProjectRoot,
	displayWebpackStats,
} = require('10up-toolkit/utils');

// --- TypeScript watch ---
const projectRoot = path.resolve(__dirname, '..');
const tsconfigWatch = path.join(projectRoot, 'tsconfig.watch.json');
let tscProcess = null;

function startTscWatch() {
	if (fs.existsSync(tsconfigWatch)) {
		console.log('Found tsconfig.watch.json, starting TypeScript watch...');
		tscProcess = spawn(
			'tsc',
			['--watch', '--project', tsconfigWatch, '--pretty', '--preserveWatchOutput'],
			{ shell: true }
		);

		tscProcess.stdout.on('data', (data) => {
			process.stdout.write(`[TS] ${data}`);
		});

		tscProcess.stderr.on('data', (data) => {
			process.stderr.write(`[TS ERROR] ${data}`);
		});
	} else {
		console.log('No tsconfig.watch.json found, skipping TypeScript watch.');
	}
}

// --- Webpack stuff ---
if (hasArgInCLI('--webpack-no-externals')) {
	process.env.TENUP_NO_EXTERNALS = true;
}

let configs = require(fromProjectRoot('webpack.config.js'));
configs = Array.isArray(configs) ? configs : [configs];

const mainConfig = configs[0];
const otherConfigs = configs.slice(1);

let server;
const compilers = [];

const startMainCompiler = () => {
	const compiler = webpack(mainConfig);
	compilers.push(compiler);

	const { devServer } = mainConfig;

	if (devServer) {
		const devServerOptions = { ...devServer, open: false };
		server = new WebpackDevServer(devServerOptions, compiler);
		server.start();
	} else {
		compiler.watch({ aggregateTimeout: 600 }, displayWebpackStats);
	}
};

const watchOtherConfigs = () => {
	otherConfigs.forEach((config) => {
		const compiler = webpack(config);
		compilers.push(compiler);
		compiler.watch({ aggregateTimeout: 600 }, displayWebpackStats);
	});
};

const hot = hasArgInCLI('--hot');

if (hot) {
	const frConfig = require(fromConfigRoot('webpack-fast-refresh.config.js'));
	const frCompiler = webpack(frConfig);

	frCompiler.run((err, stats) => {
		displayWebpackStats(err, stats);
		frCompiler.close((closedErr) => {
			if (closedErr) console.error(closedErr);
			else {
				startMainCompiler();
				watchOtherConfigs();
			}
		});
	});
} else {
	startMainCompiler();
	watchOtherConfigs();
}

// --- Start tsc watch alongside webpack ---
startTscWatch();

// --- Clean shutdown ---
process.on('SIGINT', () => {
	if (server) server.close(() => {});
	compilers.forEach((c) => c.close());
	if (tscProcess) tscProcess.kill();
});
