<template>
  <div id="app" class="container">
    <MainMenu />
    <SecondaryMenu v-if="this.$route.name">{{
      this.$route.name
    }}</SecondaryMenu>
    <transition name="fade-page" mode="out-in">
      <nuxt />
    </transition>
    <Footer />
    <Notification />
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue'
import SecondaryMenu from '@/components/SecondaryMenu.vue'
import Notification from '@/components/Notification.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    MainMenu,
    Notification,
    SecondaryMenu,
    Footer
  },
  head() {
    return {
      bodyAttrs: {
        style: 'background: #B4B4B8;'
      }
    }
  }
}
</script>

<style>
* {
  border-radius: 0 !important;
}

img {
  max-width: 100%;
}

li {
  margin: 10px 0;
  padding: 0;
}

.nuxt-link a {
  font-weight: bold;
}

.nuxt-link a:hover {
  text-decoration: none;
}

.nuxt-link a.nuxt-link-exact-active {
  text-decoration: none;
}

.alert {
  margin-bottom: 0 !important;
}

/** Transitions fade-page **/

.fade-page-enter {
  opacity: 0;
}

.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.275s ease-in-out;
}

.fade-page-leave-to {
  opacity: 0;
}

/** Transitions fade-modal **/

.fade-modal-enter {
  opacity: 0;
}

.fade-modal-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-modal-leave-active {
  transition: opacity 0.75s ease-in-out;
}

.fade-modal-leave-to {
  opacity: 0;
}

/** Transitions fade-tab **/

.fade-tab-enter {
  transform: translateY(50px);
  opacity: 0;
}

.fade-tab-enter-active {
  transition: all 0.5s ease;
}

.fade-tab-leave-active {
  transition: all 0s ease;
}

.fade-tab-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}

/** Transitions cart-empty **/

.cart-empty-leave-active {
  transition: opacity 0.555s ease-in-out;
}

.cart-empty-leave-to {
  opacity: 0;
}

/** Transitions remove-product **/

.remove-product-enter {
  opacity: 0;
}

.remove-product-enter-active,
.remove-product-leave-active {
  transition: opacity 0.555s ease-in-out;
}

.remove-product-leave-to {
  opacity: 0;
}

/** Transitions slide-fade **/

.slide-fade {
  transform: translateX(-200px);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 5s ease;
}

.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
