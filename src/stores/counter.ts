import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const myName=ref('mahmood')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function $reset(){
    myName.value='none'
  }
  return { count, myName, doubleCount, increment }
})
