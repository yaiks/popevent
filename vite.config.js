import { resolve } from 'path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import fse from 'fs-extra'

const r = path => resolve(__dirname, path)

const getEntryFileNames = chunkName => {
  if (chunkName === 'background' || chunkName === 'content') return `[name].js`;

  return `assets/[name].js`;
}

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  build: {
    outDir: r('extension'),
    assetsDir: '.',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: r('src/popup/index.html'),
        background: r('src/background'),
        content: r('src/content'),
      },
      output: {
        entryFileNames: chunkInfo => getEntryFileNames(chunkInfo.name),
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
  },
  plugins: [
    preact(),
    {
      name: 'rollup-plugin-copy-assets',
      buildEnd() {
        fse.copy('src/manifest.json', 'extension/manifest.json', err => {
          if (err) throw err;
          console.log('Manifest file copied sucessfuly!')
        })

        fse.copy('src/images', 'extension/images', err => {
          if (err) throw err;
          console.log('Images folder copied sucessfuly!')
        })
      }
    }
  ],
})
