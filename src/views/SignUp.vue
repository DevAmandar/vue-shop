<template>
  <div class="relative">
    <div
      v-if="!loading"
      class="poppinsM w-[70%] h-[450px] py-16 mx-auto mt-8 flex flex-col items-center justify-between rounded-md text-center"
      :class="{ 'bg-zinc-800': isDarkPinia, 'bg-slate-300': !isDarkPinia }"
    >
      <h1 class="text-violet-700 text-2xl">Sign Up</h1>
      <!-- inputs -->
      <div class="flex flex-col justify-start w-[40%] my-2">
        <label class="text-left" :class="{ 'text-white': isDarkPinia }" for="emi"
          >Email Address</label
        >
        <input
          class="outline-0 border border-zinc-500 rounded-sm h-[40px] pl-2"
          :class="{ 'text-white': isDarkPinia, 'text-zinc-800': !isDarkPinia }"
          id="emi"
          type="email"
          v-model="emailUser"
        />
      </div>
      <span class="text-red-600 text-xs poppinsL" :class="{ 'hidden ': emailUser.length > 0 }"
        >required</span
      >
      <div class="flex flex-col justify-start w-[40%] my-2">
        <label class="text-left" :class="{ 'text-white': isDarkPinia }" for="name">Yuor Name</label>
        <input
          class="outline-0 border border-zinc-500 rounded-sm h-[40px] pl-2"
          :class="{ 'text-white': isDarkPinia, 'text-zinc-800': !isDarkPinia }"
          id="name"
          type="email"
          v-model="nameUser"
        />
      </div>
      <span class="text-red-600 text-xs poppinsL" :class="{ 'hidden ': nameUser.length > 0 }"
        >required</span
      >
      <div class="flex flex-col w-[40%] my-2">
        <label class="text-left" :class="{ 'text-white': isDarkPinia }" for="ps">Password</label>
        <input
          class="outline-0 border border-zinc-500 rounded-sm h-[40px] pl-2"
          :class="{ 'text-white': isDarkPinia, 'text-zinc-800': !isDarkPinia }"
          type="password"
          id="ps"
          v-model="passwordUser"
        />
      </div>
      <span class="text-red-600 text-xs poppinsL" :class="{ 'hidden ': passwordUser.length > 0 }"
        >required</span
      >
      <!-- buttons -->
      <div class="my-2 flex justify-center items-center gap-2.5">
        <button
          class="px-3 py-2 bg-violet-700 rounded-sm text-white cursor-pointer"
          @click="handleSignUp"
        >
          Sign Up
        </button>
        <button
          class="px-3 py-2 bg-zinc-700 rounded-sm text-white cursor-pointer"
          @click="gotoLogin"
        >
          Login
        </button>
      </div>
    </div>
    <div
      v-if="loading"
      class="w-[70%] h-[420px] py-12 mx-auto mt-8 flex items-center justify-center flex-col text-center"
    >
      <div class="loader"></div>
      <h4 class="text-violet-700 poppinsM mt-2 animate-pulse text-center">{{ texLoad }}</h4>
    </div>
    <Transition
      class="absolute w-[30%] py-5 mx-auto top-20 left-[35%] flex justify-center items-center flex-col border border-red-700 bg-red-400 rounded-md"
    >
      <div v-if="errorSign" class="gap-2 flex justify-center items-center flex-col">
        <XCircleIcon class="size-10 text-white" />
        <p class="text-white text-center poppinsM">Failed to SignUp</p>
        <button
          class="px-2 py-1 text-center bg-white text-red-500 rounded-xl poppinsM cursor-pointer"
          @click="errorSign = !errorSign"
        >
          ok
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import axios from 'axios'
import router from '../router/index.ts'
import { computed, ref } from 'vue'
// ******************************** data
const errorSign = ref(false)
const loading = ref(false)
const loadSignUp = ref(false)
const texLoad = computed(() => {
  return loadSignUp.value ? 'Loading profile' : 'Registering'
})
//v-model
const emailUser = defineModel('emailUser', { default: '' })
const passwordUser = defineModel('passwordUser', { default: '' })
const nameUser = defineModel('nameUser', { default: '' })
//pinia
import { useModeStore } from '../stores/Mode'
import { storeToRefs } from 'pinia'
const store = useModeStore()
const { isDarkPinia, isLogin, accessToken, refreshToken, loginTextInApp } = storeToRefs(store)
//function
function gotoLogin() {
  router.push('/Login')
}
async function handleSignUp() {
  if (emailUser.value.length > 0 && nameUser.value.length > 0 && passwordUser.value.length > 0) {
    loading.value = true
    try {
      const respone = await axios.post('https://api.escuelajs.co/api/v1/users/', {
        name: nameUser.value,
        email: emailUser.value,
        password: passwordUser.value,
        avatar: 'https://picsum.photos/800',
      })
      console.log(respone.data)
      await new Promise((resolve) => setTimeout(resolve, 10000))
      Login()
      loadSignUp.value = true
    } catch (err) {
      errorSign.value = true
      loading.value = false
    } finally {
    }
  }
}
async function Login() {
  console.log('loading login')
  console.log(emailUser.value)
  console.log(passwordUser.value)
  try {
    const response = await axios.post('/api/auth/login', {
      email: emailUser.value,
      password: passwordUser.value,
    })
    store.accessToken = response.data.access_token
    store.refreshToken = response.data.refresh_token
    store.isLogin = true
    //storage
    localStorage.setItem('accessToken', response.data.access_token)
    localStorage.setItem('isLogin', true)
    store.loginTextInApp = 'Logout'
    router.push('/profile')
  } catch (error) {
    // store.isLogin = false
    // errorLogin.value = true
    console.log(error)
    errorSign.value = true
  } finally {
  }
  loading.value = false
}
</script>

<style>
.v-enter-active {
  animation: added 1s;
}
.v-leave-active {
  animation: added 1s reverse;
}
@keyframes added {
  from {
    opacity: 0;
    translate: -100px 0;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}
.loader {
  height: 80px;
  aspect-ratio: 1;
  padding: 10px;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  mask:
    conic-gradient(#000 0 0) content-box exclude,
    conic-gradient(#000 0 0);
  filter: blur(12px);
}
.loader:before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(#0000 0 5%, #7008e7, #0000 20% 50%);
  animation: l2 1.5s linear infinite;
}
@keyframes l2 {
  to {
    rotate: 1turn;
  }
}
</style>
