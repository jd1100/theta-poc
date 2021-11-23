import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
//import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
//import { writeFileSync, mkdirSync, existsSync } from 'fs';
import json from "@rollup/plugin-json";
import legacy from "@rollup/plugin-legacy";
import postcss from 'rollup-plugin-postcss';


//import sveltePreprocess from "svelte-preprocess";
//import alias from '@rollup/plugin-alias';

//import "https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js";

//https://d1ktbyo67sh8fw.cloudfront.net/js/videojs-theta-plugin.min.js
//https://d1ktbyo67sh8fw.cloudfront.net/js/theta-hls-plugin.umd.js
//https://d1ktbyo67sh8fw.cloudfront.net/js/theta.umd.js

const production = !process.env.ROLLUP_WATCH;


export default {
	input: 'src/index.ts',
	output: {
		sourcemap: true,
		format: 'umd',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
		//rollupImportMapPlugin('src/import-map.json'),
		postcss({
            extract: "base.css",
			minimize: true,
            modules: true,
            extract: true
        }),
		svelte({
			preprocess: sveltePreprocess({postcss: true}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				customElement: true
			},
		}),
		//css({ output: 'public/build/bundle.css' }),
		legacy({
			"src/thetaWebWidget.js": "ThetaWebWidgets"
		}),
		typescript({ sourceMap: !production }),

		// we'll extract any component CSS out into
		// a separate file - better for performance
		json(),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			exportConditions: ["default", "module", "import", "node"],
			extensions: ['.mjs', '.js', '.cjs', '.json', '.node'],
			browser: true
		}),
		
		commonjs({
			include: [".cjs", ".js"]
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

