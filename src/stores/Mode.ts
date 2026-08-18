import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModeStore = defineStore('Mode', () => {
  const isDarkPinia = ref(true)
  //Login
  const isLogin = ref(false)
  const accessToken = ref()
  const refreshToken = ref()
  const loginTextInApp = ref()
  return { isDarkPinia, isLogin, accessToken, refreshToken, loginTextInApp }
})
