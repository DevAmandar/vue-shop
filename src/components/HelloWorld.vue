<template>
  <div class="hello flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl mb-4">Hello World!</h1>
    <router-link to="/welcome">
      <button class="border border-red-600 p-6 cursor-pointer">Go to Welcome</button>
    </router-link>
    <router-link to="/" class="mt-4">
      <button class="border border-gray-600 p-4">Back to Home</button>
    </router-link>
  </div>
</template>

<script setup>
// منطق صفحه Hello
</script>
