import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import autoPreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import json from "@rollup/plugin-json";
//import alias from '@rollup/plugin-alias';
import { Theta, Events }  from "@thetalabs/theta-js";
import { ThetaWalletConnect } from "@thetalabs/theta-wallet-connect";
//import "https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js";

//https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js
//https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.js
//https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js

const production = !process.env.ROLLUP_WATCH;


function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/index.ts',
	//external: ["ThetaWebWidgets"],
	output: {
		/*
		globals: {
			"ThetaWebWidgets": "ThetaWebWidgets_cjs",
			"ThetaWalletConnect": "ThetaWalletConnect_cjs"
		},
		*/
		sourcemap: true,
		format: 'umd',
		name: 'app',
		file: 'public/build/bundle.js',
		paths: {
			"ThetaWebWidgets": "https://theta-web-widgets.thetatoken.org/js/ThetaWebWidgets.js"
		}
	},
	plugins: [
		svelte({
			preprocess: autoPreprocess(), 
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				customElement: true
			},

		}),
		typescript({ sourceMap: !production }),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({
			output(styles) {
				if (!existsSync(`public/build`)) mkdirSync(`public/build`);
					writeFileSync(
					`public/build/bundle.css`,
					production ? new CleanCSS().minify(styles).styles : styles,
				);
			},
		}),
		json(),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			extensions: ['.mjs', '.js', '.cjs', '.json', '.node'],
			browser: true,
			dedupe: ['svelte', '@thetalabs/theta-wallet-connect', '@thetalabs/theta-js']
		}),
		
		commonjs({
			/*
			dynamicRequireTargets: [
				"node_modules/@thetalabs/theta-js/dist/*.js", 
				"!node_modules/@thetalabs/theta-js/dist/thetajs.cjs.js",
				"node_modules/@thetalabs/theta-wallet-connect/dist/*.js", 
				"!node_modules/@thetalabs/theta-js/dist/theta-wallet-connect.cjs.js"
			],
			*/
		}),
		
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
export { Theta, ThetaWalletConnect, Events };