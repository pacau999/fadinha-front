import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsConfigPaths(),
    envCompatible({ prefix: 'REACT_APP' }),
  ],
});
