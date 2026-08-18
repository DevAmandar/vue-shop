<template>
  <div class="px-12 py-8">
    <!-- serch -->
    <div class="relative">
      <input
        class="pl-12 border focus:border-violet-700 h-12 w-[300px] outline-0 rounded-sm px-3"
        :class="{
          'text-white border-zinc-800': isDarkPinia,
          'text-slate-500 border-slate-300': !isDarkPinia,
        }"
        type="text"
        placeholder="Serch..."
      />
      <MagnifyingGlassCircleIcon class="size-8 absolute left-3 top-2 text-violet-700" />
    </div>
    <!-- container -->
    <div class="pt-10 flex gap-5 not-lg:flex-col">
      <!-- items -->
      <items class="flex-1 not-lg:order-2" :products="products" v-if="!loadPage"></items>
      <div v-if="loadPage" class="flex-1 flex justify-center items-center not-lg:order-2">
        <div class="loader"></div>
      </div>
      <!-- filter -->
      <div
        class="lg:w-[200px] not-lg:grow max-h-[340px] border rounded-md py-4 not-lg:order-1"
        :class="{ 'border-zinc-800': isDarkPinia, 'border-slate-500': !isDarkPinia }"
      >
        <!-- title -->
        <div class="flex justify-start items-center pl-4 gap-2">
          <SquaresPlusIcon class="size-8 text-violet-700" />
          <span
            class="font-semibold"
            :class="{ 'text-white': isDarkPinia, 'text-black': !isDarkPinia }"
            >Categories:</span
          >
        </div>
        <!-- categori -->
        <div class="relative flex flex-col gap-3.5 mt-5" v-if="!loadCate">
          <!-- <div
            class="pl-2 cursor-pointer bg-linear-to-r"
            :class="{
              'text-zinc-100 from-white/10 to-zinc-900': isDarkPinia,
              'text-zinc-800 from-zinc-400/60 to-zinc-100': !isDarkPinia,
            }"
            @click="handelActiveCategori(0)"
          >
            All
          </div> -->
          <div
            class="pl-2 cursor-pointer bg-linear-to-r"
            :class="{
              'text-zinc-100 from-white/10 to-zinc-900': isDarkPinia,
              'text-zinc-800 from-zinc-400/60 to-zinc-100': !isDarkPinia,
            }"
            v-for="(cate, index) in categoiesShow"
            @click="handelActiveCategori(cate, index)"
          >
            {{ cate }}
          </div>
          <div
            class="absolute w-[2px] h-[24px] rounded-[25px] bg-violet-700 transition transition-all duration-300 ease-in-out"
            ref="activeCate"
          ></div>
        </div>
        <!-- animation load -->
        <div class="mt-5 flex justify-center items-center gap-1.5" v-if="loadCate">
          <span
            class="size-2 rounded-full"
            style="animation: loadFilterAnimation 1.5s ease-in infinite"
            :class="{ 'bg-violet-700': isDarkPinia, 'bg-slate-500': !isDarkPinia }"
          ></span>
          <span
            class="size-2 rounded-full"
            style="animation: loadFilterAnimation 1.5s ease-in 0.2s infinite"
            :class="{ 'bg-violet-700': isDarkPinia, 'bg-slate-500': !isDarkPinia }"
          ></span>
          <span
            class="size-2 rounded-full"
            style="animation: loadFilterAnimation 1.5s ease-in 0.4s infinite"
            :class="{ 'bg-violet-700': isDarkPinia, 'bg-slate-500': !isDarkPinia }"
          ></span>
        </div>
        <!-- more filter -->
        <div
          class="mt-4 py-1.5 cursor-pointer w-[120px] mx-auto text-white font-semibold text-sm text-center bg-violet-700 rounded-sm"
        >
          filter more...
        </div>
      </div>
    </div>
    <!-- number of page -->
    <div class="mt-5 mx-auto max-w-[500px] flex justify-center items-center flex-wrap gap-3.5">
      <div
        class="px-[13px] py-[3px] rounded-full bg-violet-700 inline-block text-white text-center cursor-pointer"
        :class="{ 'scale-110 bg-violet-900': index == activePage }"
        @click="changePage"
        v-for="(number, index) in arrNumberOfPage"
      >
        {{ number }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassCircleIcon, SquaresPlusIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
//pinia
import { useModeStore } from '../stores/Mode'
import { storeToRefs } from 'pinia'
const store = useModeStore()
const { isDarkPinia } = storeToRefs(store)
//************data
// categories
const categories = ref([])
const categoiesShow = ref(['All', 'Clothes', 'Furniture', 'Electronics', 'Shoes', 'Miscellaneous'])
const loadCate = ref(false)
const erorCate = ref(false)
const activeCate = ref()
// products
const products = ref([])
const allProductWithFillter = ref([])
// handel page index
const activePage = ref(0)
const numberOfPage = ref()
const arrNumberOfPage = ref([])
const loadPage = ref(false)
// handle fillter
const activeFillter = ref(false)
// mounted
onMounted(() => {
  fetchCategories()
  fetchAllProducts2()
  handleNumberOfPage(false)
})
// function
async function fetchCategories() {
  loadCate.value = true
  try {
    const { data } = await axios.get('https://api.escuelajs.co/api/v1/categories')
    data.forEach((cate) => {
      categories.value.push(cate.name)
    })
  } catch (err) {
    console.log('error=', err)
    erorCate.value = true
  } finally {
    loadCate.value = false
  }
}
async function fetchAllProducts() {
  try {
    products.value = []
    for (let i = 1; i <= 5; i++) {
      const { data } = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${i}`)
      data.forEach((cate) => {
        products.value.push(cate)
      })
    }
    console.log(products.value)
  } catch {
    console.log('error')
  } finally {
  }
}
async function handleNumberOfPage(fillter) {
  let respone
  try {
    if (!fillter) {
      respone = await axios.get(`https://api.escuelajs.co/api/v1/products`)
    } else {
      respone = await axios.get(`https://api.escuelajs.co/api/v1/products/?categorySlug=${fillter}`)
    }
    const data = respone.data
    numberOfPage.value = Math.floor(data.length / 6) + 1
  } catch {
    console.log('error')
  } finally {
    arrNumberOfPage.value = []
    for (let i = 0; i < numberOfPage.value; i++) {
      arrNumberOfPage.value.push(i + 1)
    }
  }
}
async function fetchAllProducts2(fillter) {
  loadPage.value = true
  if (!fillter) {
    try {
      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${activePage.value}&limit=6`,
      )
      products.value = data
    } catch {
      console.log('error')
    } finally {
    }
  } // active fillter
  else {
    try {
      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?categorySlug=${fillter}`,
      )
      allProductWithFillter.value = data
      console.log(allProductWithFillter.value)
      products.value = allProductWithFillter.value.slice(0, 6)
      activePage.value = 0
    } catch (err) {
      console.log(err)
    } finally {
    }
  }
  loadPage.value = false
}
function handelActiveCategori(cate, index) {
  //14 24
  // animation
  const bottom = index * (14 + 24)
  activeCate.value.style.top = `${bottom}px`
  // logic categori && fillter
  if (cate.toLowerCase() == 'all') {
    activeFillter.value = false
    fetchAllProducts2()
    handleNumberOfPage()
  } else {
    activeFillter.value = true
    fetchAllProducts2(cate.toLowerCase())
    handleNumberOfPage(cate.toLowerCase())
  }
}
function changePage(e) {
  //*************************************** */
  if (!activeFillter.value) {
    activePage.value = (+e.target.innerHTML - 1) * 6
    fetchAllProducts2()
    //
    // handel active number page
    activePage.value = +e.target.innerHTML - 1
  } // active fillter
  else {
    activePage.value = e.target.innerHTML - 1
    const param1 = activePage.value * 6
    const param2 = (activePage.value + 1) * 6
    products.value = allProductWithFillter.value.slice(param1, param2)
  }
}
</script>

<style>
@keyframes loadFilterAnimation {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.5);
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
