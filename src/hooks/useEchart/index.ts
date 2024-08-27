//封装一个useEchart的hook，用于在vue组件中方便地使用echarts
import echarts from '@/plugins/echarts'
import type { ECOption } from '@/types/echarts'
import { markRaw, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { useTheme } from '../useTheme'
import customTheme from './customTheme'

const { activeThemeName } = useTheme()
echarts.registerTheme('dark', customTheme)
echarts.registerTheme('dark-blue', customTheme)
export function useEchart(dom: Ref<HTMLElement>, options: Ref<ECOption>) {
  const chart = ref<echarts.EChartsType>()
  const resize = () => {
    chart.value?.resize()
  }
  watch(activeThemeName, (themeName) => {
    // 重置主题
    chart.value?.dispose()
    chart.value = markRaw(echarts.init(dom.value, themeName))
    chart.value.setOption(options.value) //设置echarts配置项
  })
  onMounted(() => {
    /** 这里使用markRaw
     *  是因为echarts实例在vue组件中可能会被多次创建
     *  echarts为ref响应式对象导致resize不生效
     */
    chart.value = markRaw(echarts.init(dom.value, activeThemeName.value)) //初始化echarts实例
    chart.value.setOption(options.value) //设置echarts配置项
    setTimeout(() => {
      chart.value?.resize()
    }, 0)
    window.addEventListener('resize', resize) //监听窗口大小变化
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resize) //移除窗口大小变化监听
    chart.value?.dispose() //销毁echarts实例
  })
  watch(
    options,
    (newOptions) => {
      chart.value?.setOption(newOptions) //监听options变化，更新echarts配置项
    },
    { deep: true }
  )
  return chart
}
