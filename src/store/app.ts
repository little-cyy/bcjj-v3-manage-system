import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

/**侧边栏状态 */
interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

/** 设备类型 */
enum DeviceEnum {
  Mobile,
  Desktop
}

export const useAppStore = defineStore('app', () => {
  //state
  /** 侧边栏状态 */
  const sidebar: Sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Desktop)

  //actions
  /** 切换侧边栏 */
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 关闭侧边栏 */
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 切换设备类型 */
  const toggleDevice = (value: DeviceEnum) => {
    device.value = value
  }

  return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice }
})
