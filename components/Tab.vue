<template>
  <transition name="fade-tab" mode="out-in">
    <div v-show="aktif" class="mt-4 mt-md-5">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    nameTab: {
      type: String,
      required: true
    },
    selected: { type: Boolean, default: false }
  },
  data() {
    return {
      aktif: false
    }
  },
  mounted() {
    this.aktif = this.selected
  }
}
</script>
