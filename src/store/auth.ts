import { loginApi } from '@/api/login'
import { type LoginRequestData } from '@/api/login/type'
import { getMenuApi, getUserInfoApi } from '@/api/userbased'
import { getHomeRoute } from '@/router/staticRoutes'
import {
  getMenu,
  getToken,
  removeMenu,
  removeToken,
  removedViews,
  setMenu,
  setToken
} from '@/utils/cache/local-storage'
import { type TreeNode, transformToTreeData } from '@/utils/tree'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useAuthStore = defineStore('auth', () => {
  //state
  const token = ref<string | null>(getToken() || '')
  const userInfo = ref<Record<string, any>>({})
  const menuList = ref<TreeNode[]>(getMenu() || [])
  //actions
  /** 登录 */
  const login = async (loginFrom: LoginRequestData) => {
    const { data } = await loginApi(loginFrom)
    token.value = data.token
    await setMenuList()
    setToken(data.token)
    window.location.href = '/'
  }

  /** 获取用户详情 */
  const getUserInfo = async () => {
    const { data } = await getUserInfoApi()
    userInfo.value = { ...data.user, ...data.loginInfo }
  }
  /** 获取菜单列表 */
  const setMenuList = async () => {
    const { data } = await getMenuApi()
    menuList.value = [getHomeRoute(), ...transformToTreeData(data, 0)]
    setMenu(menuList.value)
  }
  /** 退出登录 */
  const logout = () => {
    token.value = ''
    window.location.href = '/login'
    removeToken()
    removeMenu()
    removedViews()
    userInfo.value = {}
    menuList.value = []
  }

  //getters
  const getUserInfoTer = computed(() => {
    if (token.value && Object.keys(userInfo.value).length === 0) {
      getUserInfo()
    }
    return userInfo.value
  })

  return {
    token,
    menuList,
    userInfo,
    login,
    logout,
    getUserInfoTer
  }
})
