import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { defineConfig } from 'vite'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        // 指定要缓存的文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定symbolId格式
        symbolId: 'icon-[name]'
      }),
      lazyImport({
        resolvers: [
          VxeResolver({
            libraryName: 'vxe-table'
          })
        ]
      }),
      topLevelAwait()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // 配置代理请求头
          bypass: (req, res, proxyOptions) => {
            req.headers['x-forwarded-for'] = req.connection.remoteAddress
          }
        }
      }
    },
    esbuild:
      mode === 'development'
        ? undefined
        : {
            /** 打包时移除 console.log */
            pure: ['console.log'],
            /** 打包时移除 debugger */
            drop: ['debugger'],
            /** 打包时移除所有注释 */
            legalComments: 'none'
          }
  }
})
