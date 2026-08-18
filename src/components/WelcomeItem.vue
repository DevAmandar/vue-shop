<template>
  <div class="welcome flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl mb-4">Welcome Page</h1>
    <button @click="goToHello" class="border border-red-600 p-6 cursor-pointer">
      Go to Hello World
    </button>
    <router-link to="/" class="mt-4">
      <button class="border border-gray-600 p-4">Back to Home</button>
    </router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHello = () => {
  router.push('/hello')
}
</script>
