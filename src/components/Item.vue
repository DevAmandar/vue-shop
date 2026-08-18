<template>
  <div v-if="product" class="">
    <!-- image -->
    <div
      class="mx-auto not-md:w-[250px] not-md:h-[280px] md:w-[250px] md:h-[280px] sm:w-[180px] rounded-lg overflow-hidden"
    >
      <img
        :src="product.images[0]"
        @error="handleonloadImage"
        class="object-contain rounded-lg"
        alt=""
      />
    </div>
    <!-- title -->
    <div class="">
      <h3
        class="font-semibold text-lg max-w-[245px]"
        :class="{ 'text-white': isDarkPinia, 'text-black': !isDarkPinia }"
      >
        {{ product.title }}
      </h3>
      <p class="text-zinc-500 text-xs mt-2">
        {{ product.description.slice(0, 22) }}...
        <span
          class="font-semibold text-xs"
          :class="{ 'text-white': isDarkPinia, 'text-black': !isDarkPinia }"
          >Read More</span
        >
      </p>
    </div>
    <!-- categori -->
    <span
      class="text-xs mt-3 inline-block font-medium py-3 px-3 rounded-3xl border"
      :class="{
        'text-white bg-zinc-800 border-zinc-700': isDarkPinia,
        'text-zinc-900 bg-slate-200 border-zinc-400': !isDarkPinia,
      }"
    >
      {{ product.category.name }}
    </span>
    <!-- price -->
    <div class="flex justify-between items-center mt-3">
      <div>
        <span class="text-zinc-500 text-xs block">price</span>
        <span
          class="block font-semibold"
          :class="{ 'text-white': isDarkPinia, 'text-zinc-700': !isDarkPinia }"
          >$ {{ product.price }}</span
        >
      </div>
      <button class="text-white bg-violet-700 px-3 py-1 rounded-md font-medium">Add To Card</button>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted } from 'vue'
//pinia
import { useModeStore } from '../stores/Mode'
import { storeToRefs } from 'pinia'
const store = useModeStore()
const { isDarkPinia } = storeToRefs(store)
// props
const props = defineProps(['product'])
// function
const handleonloadImage = (e) => {
  e.target.src = '../../public/background/onload.jpg'
}
</script>

<style></style>
