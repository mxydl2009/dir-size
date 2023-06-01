import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { bannerInfo } from './banner.cjs';
import { getBabelConfig } from './babel.config.cjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    banner: bannerInfo
  },
  plugins: [commonjs(), nodeResolve(), getBabelConfig()]
}