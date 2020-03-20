import resolve from '@rollup/plugin-node-resolve';
import jsx from 'acorn-jsx';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/index.js',
      format: 'commonjs',
      preferConst: true,
      sourcemap: true
    }
  ],
  acornInjectPlugins: [jsx()],
  external: (id) => !/^(\.|\/)/.test(id),
  plugins: [
    resolve({ extensions: ['.tsx', '.js', '.json', '.ts', '.jsx']}),
    sourcemaps()
  ]
};
