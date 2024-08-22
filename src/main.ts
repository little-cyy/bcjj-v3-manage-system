import { loadDirectives } from '@/directives'
import { useTheme } from '@/hooks/useTheme'
import { loadPlugins } from '@/plugins'
import '@/router/permission'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import svgIcon from './components/SvgIcon/index.vue'
import router from './router'
import './styles/index.scss'
const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
loadDirectives(app)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.component('SvgIcon', svgIcon)
app.mount('#app')
