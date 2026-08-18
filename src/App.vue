<template>
  <div>
    <!-- Logout -->
    <Transition
      class="absolute left-[34%] top-[120px] h-[25%] w-[40%] px-7 bg-red-500 z-1 flex justify-center items-center gap-3 flex-col rounded-md"
      ref="confirmationLogin"
    >
      <div v-if="showLogout">
        <p class="text-white poppinsM">Are you sure you want to leave?</p>
        <div class="flex justify-center items-center gap-2.5">
          <button
            class="px-2 py-1 text-red-500 bg-white rounded-md cursor-pointer"
            @click="noLogout"
          >
            no
          </button>
          <button
            class="px-2 py-1 text-red-500 bg-white rounded-md cursor-pointer"
            @click="yesLogout"
          >
            yes
          </button>
        </div>
      </div>
    </Transition>
    <!-- --------------------hamburger bar -->
    <div
      class="absolute -left-[1000px] h-full w-[45%] bg-zinc-400 z-1 xl:hidden flex justify-center items-center flex-col gap-7"
      ref="hamburgerButton"
      @click="hiddenHamburgerBar"
    >
      <span class="absolute left-3 top-3 border-2 border-white p-1 rounded-md">
        <XMarkIcon class="size-6 fill-white stroke-3" />
      </span>
      <router-link to="/" class="text-2xl text-white">
        <span>Home</span>
      </router-link>
      <router-link to="/product" class="text-2xl text-white">
        <span>Product</span>
      </router-link>
      <router-link to="/profile" class="text-2xl text-white">
        <span>Profile</span>
      </router-link>
    </div>
    <!-- --------------------navbar -->
    <nav
      class="flex justify-between ld:justify-around items-center sm:px-20 py-5 border-b-2 border-b-black relative"
      :class="{ 'bg-black/80': isDark }"
    >
      <!-- background -->
      <img
        class="absolute left-0 top-0 w-full h-full object-cover -z-1"
        src="../public/background/AbstractDesign.svg"
        alt=""
      />
      <!-- hamburger button -->
      <span
        class="xl:hidden stroke-3 absolute left-3.5 border-2 p-1 rounded-md cursor-pointer"
        @click="show"
        :class="{ 'text-violet-700 border-violet-700': isDark, 'border-black': !isDark }"
      >
        <Bars3CenterLeftIcon class="size-6" />
      </span>
      <h2
        class="lg:text-5xl sm:text-3xl text-xl poppinsM font-bold pb-2.5 ml-14 sm:m-0"
        :class="{ 'text-white': isDark }"
      >
        Vue Shop
      </h2>
      <!-- center -->
      <div
        class="hidden xl:flex justify-between items-center w-[480px] px-10 py-2.5 text-xl font-normal border border-gray-400 rounded-[100px]"
        :class="{ 'bg-black/80 text-white': isDark, 'bg-white': !isDark }"
      >
        <router-link to="/">
          <span>Home</span>
        </router-link>
        <router-link to="/product">
          <span>Product</span>
        </router-link>
        <router-link to="/profile">
          <span>Profile</span>
        </router-link>
      </div>
      <!-- end -->
      <div class="flex justify-around items-center gap-1.5 sm:gap-3.5 text-xl font-medium">
        <!-- login btn -->
        <button
          class="flex items-center gap-0.5 border border-gray-600 rounded-md px-2.5 py-1 cursor-pointer"
          :class="{ 'bg-black/80': isDark, 'bg-white': !isDark }"
        >
          <ArrowRightEndOnRectangleIcon
            class="md:size-6 size-4"
            :class="{ 'text-white': isDark }"
          />
          <span
            @click="gotoLoginSign"
            class="text-sm md:text-xl"
            :class="{ 'text-white': isDark }"
            >{{ loginTextInApp }}</span
          >
        </button>
        <!-- add btn -->
        <button
          class="items-center gap-0.5 border border-gray-600 rounded-md px-2.5 py-1 cursor-pointer"
          :class="{ 'bg-black/80': isDark, 'bg-white': !isDark, flex: !isLogin, hidden: isLogin }"
        >
          <UserPlusIcon
            class="md:size-6 size-4 stroke-black stroke-[1.5]"
            :class="{ 'text-white stroke-white stroke-0': isDark, '': !isDark }"
          />
          <span @click="gotoLoginSign" class="text-sm md:text-xl" :class="{ 'text-white': isDark }"
            >Sign Up</span
          >
        </button>
        <!-- sun/moon btn -->
        <button
          class="border border-gray-600 rounded-md px-2.5 py-1 cursor-pointer"
          :class="{ 'bg-black/80': isDark, 'bg-white': !isDark }"
          @click="toggleMode"
          ref="toggleModeBtn"
        >
          <SunIcon
            class="hidden md:size-6 size-4 text-white stroke-cyan-300 stroke-1"
            ref="sunIcon"
          />
          <MoonIcon
            class="md:size-6 size-4 text-cyan-800 stroke-cyan-300 stroke-1"
            ref="moonIcon"
          />
        </button>
      </div>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script setup>
import router from './router/index.ts'

import {
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
  SunIcon,
  XMarkIcon,
  MoonIcon,
  Bars3CenterLeftIcon,
} from '@heroicons/vue/24/solid'
import { ref, onMounted } from 'vue'
//data
const hamburgerButton = ref(null)
const sunIcon = ref()
const moonIcon = ref()
const showLogout = ref(false)
//pinia
import { useModeStore } from './stores/Mode'
import { storeToRefs } from 'pinia'
const store = useModeStore()
const { isDarkPinia, isLogin, accessToken, loginTextInApp } = storeToRefs(store)
// toggle
const isDark = ref(true)
const confirmationLogin = ref()
const signUpButton = ref()
// mounted
onMounted(() => {
  if (hamburgerButton.value) {
    hamburgerButton.value.style.transition = 'left 0.3s ease-in-out'
  }
  //
  bodyColor()
  storageLogin()
})
// methods
function show() {
  hamburgerButton.value.style.left = '0'
}
function hiddenHamburgerBar() {
  hamburgerButton.value.style.left = '-1000px'
}
function toggleMode() {
  //dark
  if (moonIcon.value.classList.contains('hidden')) {
    isDark.value = true
    store.isDarkPinia = true
    document.body.style.backgroundColor = '#18181b'
    moonIcon.value.classList.remove('hidden')
    sunIcon.value.classList.add('hidden')
  } else {
    isDark.value = false
    store.isDarkPinia = false
    document.body.style.backgroundColor = 'rgb(241 245 249)'
    moonIcon.value.classList.add('hidden')
    sunIcon.value.classList.remove('hidden')
  }
}
function bodyColor() {
  if (store.isDarkPinia) {
    document.body.style.backgroundColor = '#18181b'
  } else {
    document.body.style.backgroundColor = 'rgb(241 245 249)'
  }
}
function gotoLoginSign(e) {
  if (e.target.innerHTML == 'Login') {
    router.push('/login')
  } else if (e.target.innerHTML == 'Logout') {
    // confirmationLogin.value.classList.remove('hidden')
    showLogout.value = true
  } else {
    router.push('/sign-up')
  }
}
function noLogout() {
  // confirmationLogin.value.classList.add('hidden')
  console.log('ok')
  showLogout.value = false
}
function yesLogout() {
  store.isLogin = false
  localStorage.clear()
  router.push('/')
  store.loginTextInApp = 'Login'
  // confirmationLogin.value.classList.add('hidden')
  showLogout.value = false
}
//storage
function storageLogin() {
  store.isLogin = localStorage.getItem('isLogin')
  if (store.isLogin) {
    store.accessToken = localStorage.getItem('accessToken')
    store.loginTextInApp = 'Logout'
  } else {
    store.loginTextInApp = 'Login'
  }
}
</script>

<style>
.v-enter-from {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-to {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
</style>
