import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
        entry: ["./src/index.ts", "./src/chat.ts"]
    },
    minify: false,
  }
})