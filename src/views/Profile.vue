<template>
  <div v-if="isLogin && !loading" class="flex flex-col justify-center items-center">
    <div v-if="complateFetch" class="flex flex-col justify-center items-center">
      <div
        class="relative mt-4 w-[170px] h-[170px] rounded-full overflow-hidden bg-violet-500 shadow-lg shadow-violet-700/50"
      >
        <img :src="dataUser.avatar" class="object-cover w-full h-full" alt="" />
        <PencilIcon
          class="absolute bottom-[12px] right-[33px] size-7 p-2 bg-zinc-800 text-white rounded-full cursor-pointer"
        />
      </div>
      <div class="mt-8 flex not-sm:flex-col justify-center items-center gap-4 text-white poppinsM">
        <h1
          class="bg-violet-700 shadow-lg shadow-violet-700/50 border-violet-500 border px-4 py-2 rounded-3xl"
        >
          Name: {{ dataUser.name }}
        </h1>
        <h1
          class="bg-violet-700 shadow-lg shadow-violet-700/50 border-violet-500 border px-4 py-2 rounded-3xl"
        >
          Email: {{ dataUser.email }}
        </h1>
        <h1
          class="bg-violet-700 shadow-lg shadow-violet-700/50 border-violet-500 border px-4 py-2 rounded-3xl"
        >
          Role: {{ dataUser.role }}
        </h1>
      </div>
    </div>
  </div>
  <div v-if="!isLogin && !loading" class="flex flex-col justify-center items-center mt-16">
    <div class="w-[40%] py-16 flex flex-col justify-center items-center bg-zinc-800 rounded-md">
      <h3 class="poppinsM text-white mb-7">Please login</h3>
      <button @click="gotoLogin" class="px-3 py-2 bg-violet-600 text-white rounded-md">
        Login
      </button>
    </div>
  </div>
  <div
    v-if="loading"
    class="w-[70%] h-[420px] py-12 mx-auto mt-8 flex items-center justify-center text-center"
  >
    <div class="loader"></div>
  </div>
</template>

<script setup>
const complateFetch = ref(false)
const dataUser = ref()
const loading = ref(false)
//icon
import { PencilIcon } from '@heroicons/vue/24/solid'
//pinia
import { onMounted, ref } from 'vue'
import router from '../router/index.ts'
import { useModeStore } from '../stores/Mode'
import { storeToRefs } from 'pinia'
import axios from 'axios'
const store = useModeStore()
const { isDarkPinia, isLogin, accessToken, refreshToken } = storeToRefs(store)
// mounted
onMounted(() => {
  if (store.isLogin) {
    fetchInformation()
  }
})
//function
function gotoLogin() {
  router.push('/login')
}
async function fetchInformation() {
  loading.value = true
  try {
    const respone = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${store.accessToken}`,
      },
    })
    console.log(respone.data)
    complateFetch.value = true
    dataUser.value = respone.data
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>

<style>
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
  background: repeating-conic-gradient(#0000 0 5%, #1447e6, #0000 20% 50%);
  animation: l2 1.5s linear infinite;
}
@keyframes l2 {
  to {
    rotate: 1turn;
  }
}
</style>
