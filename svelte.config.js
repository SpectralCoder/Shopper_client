import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		alias:{
			$lib: './src/lib',
			$components: './src/components',
			$routes: './src/routes',
			$stores: './src/lib/store',
			$utils: './src/lib/utils',
			$api: './src/lib/api',
			$models: './src/lib/models',
			$styles: './src/styles',
			$assets: './src/assets',
			$static: './static'
		},
	},
};

export default config;
