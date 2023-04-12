import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		autoImport({
			imports: ['vue', 'vue-router']
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, 'src')
		}
  	}
})
