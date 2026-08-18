<template>
  <!-- container -->
  <div class="flex flex-wrap items-center justify-center gap-10 not-md:gap-2.5 p-2.5">
    <item
      class="border p-5 not-md:p-2 rounded-lg"
      :class="{ 'border-zinc-700': isDarkPinia, 'border-slate-300': !isDarkPinia }"
      v-for="product in products"
      :product="product"
    ></item>
  </div>
</template>

<script setup>
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
//pinia
import { useModeStore } from '../../stores/Mode'
import { storeToRefs } from 'pinia'
const store = useModeStore()
const { isDarkPinia } = storeToRefs(store)
// props
const props = defineProps(['products'])
// mounted
onMounted(() => {})
// watch
watch(
  () => props.products,
  (newval) => {
    if (newval) {
      // console.log('props items=', newval)
    }
  },
  { immediate: true, deep: true },
)
// function
</script>

<style></style>
