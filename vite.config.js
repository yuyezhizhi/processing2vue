import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      name: 'Processing2Vue',
      fileName: 'processing2vue',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      // 确保外部依赖不被打包
      external: ['p5'],
      output: {
        globals: {
          p5: 'p5'
        }
      }
    }
  }
})
