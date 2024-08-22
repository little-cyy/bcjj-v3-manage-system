const DEFAULT_THEME_NAME = 'normal'
type DefaultThemeName = typeof DEFAULT_THEME_NAME

/** 注册的主题名称, 其中 DefaultThemeName 是必填的 */
type ThemeName = DefaultThemeName | 'dark' | 'dark-blue'

export { DEFAULT_THEME_NAME, type ThemeName }
