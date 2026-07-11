import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// base は GitHub Pages (https://eggplanck.github.io/QTTT/) 用。
// dev サーバーではルート直下で配信する。
// (command ではなく mode で判定する: `vite preview` も command は 'serve' で
//  渡ってくるため、command 判定だと preview がビルド済みの /QTTT/ パスと食い違う)
export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/QTTT/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
}))
