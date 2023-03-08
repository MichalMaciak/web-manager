import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  env: {
    dir: '.',
    publicPrefix: "PUBLIC_"
  },
  preprocess: vitePreprocess()
};

export default config;