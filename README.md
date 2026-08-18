# Vue Shop (Modern E-commerce App)

> A modern, responsive, and dark-mode ready e-commerce web application built with Vue 3, Pinia, and Tailwind CSS.

![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)
![Pinia](https://img.shields.io/badge/Pinia-State%20Management-yellow)

## 🚀 Demo & Overview
Vue Shop is a fully functional e-commerce frontend that connects to the Platzi Fake Store API. It features a beautiful UI with smooth transitions, advanced filtering, and a complete user authentication flow (Login/Signup).

## ✨ Key Features

- **🌗 Dark/Light Mode:** Seamless theme switching with persistent state using Pinia.
- **🔐 User Authentication:** Complete Login & Sign-Up flow with JWT token storage (localStorage).
- **📦 Product Catalog:** Browse products with pagination, search, and category filters.
- **👤 User Profile:** View user information and avatar (fetched via protected API routes).
- **📱 Fully Responsive:** Optimized for all screen sizes (Mobile, Tablet, Desktop) using Tailwind CSS.
- **⚡ Smooth Transitions:** Using Vue's built-in `<Transition>` and `TransitionGroup` for page and component animations.

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API + `<script setup>`)
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS (via `@tailwindcss/vite`)
- **Icons:** Heroicons (`@heroicons/vue`)
- **HTTP Client:** Axios (with proxy configuration for API calls)
- **Build Tool:** Vite

## 📂 Project Structure (Key Highlights)

```text
src/
├── assets/           # Global styles & images
├── components/       # Reusable UI components (Item, Items, Navbar)
├── views/            # Main pages (Home, Product, Profile, Login, SignUp)
├── stores/           # Pinia stores (Mode.ts, counter.ts)
├── router/           # Vue Router configuration
├── App.vue           # Main layout & navigation
└── main.ts           # App entry point"# vue-shop" 
