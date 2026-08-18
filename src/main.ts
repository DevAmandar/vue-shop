import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import WelcomeItem from './components/WelcomeItem.vue'
import HelloWorld from './components/HelloWorld.vue'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import Items from './components/Layout/Items.vue'
import Item from './components/Item.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'


const app = createApp(App)
app.component('welcome-item', WelcomeItem)
app.component('hello-word', HelloWorld)
app.component('home', Home)
app.component('product', Product)
app.component('items', Items)
app.component('item', Item)
app.component('profile', Profile)
app.component('login', Login)
app.component('sign-up', SignUp)
app.use(createPinia())
app.use(router)

app.mount('#app')
