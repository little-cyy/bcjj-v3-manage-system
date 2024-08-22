import { DEFAULT_THEME_NAME, type ThemeName } from '@/types/theme'
import { getActiveThemeName, setActiveThemeName } from '@/utils/cache/local-storage'
import { ref, watchEffect } from 'vue'

interface ThemeList {
  title: string
  name: ThemeName
}

/** 主题列表 */
const themeList: ThemeList[] = [
  {
    title: '默认',
    name: DEFAULT_THEME_NAME
  },
  {
    title: '黑暗',
    name: 'dark'
  },
  {
    title: '深蓝',
    name: 'dark-blue'
  }
]

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

/** 设置主题 */
const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

/** 在 html 根元素上挂载 class */
const setHtmlRootClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

/** 初始化 */
const initTheme = () => {
  // watchEffect 来收集副作用
  watchEffect(() => {
    const value = activeThemeName.value
    setHtmlRootClassName(value)
    setActiveThemeName(value)
  })
}

/** 主题 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
