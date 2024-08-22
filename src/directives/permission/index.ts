import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { type Directive, watchEffect, type WatchStopHandle } from 'vue'

/** 权限指令,判断是否有权限访问该页面*/
export const permission: Directive = {
  mounted(el, binding) {
    const { value: permissionRoles } = binding
    const authStore = useAuthStore()
    const { userInfo } = storeToRefs(authStore)
    let stopWtach: WatchStopHandle = () => {}
    stopWtach = watchEffect(() => {
      if (userInfo.value.role) {
        if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
          if (!permissionRoles.includes(userInfo.value.role)) {
            const div = document.createElement('div')
            div.innerHTML = '<span style="font-size:20px;">无权限访问该页面<span/>'
            div.setAttribute('class', 'flex-center-center h100')
            div.setAttribute('style', 'background-color: var(--el-bg-color);')
            el.parentElement?.replaceChild(div, el)
          }
        }
        stopWtach()
      }
    })
  }
}
