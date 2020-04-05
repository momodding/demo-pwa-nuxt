<template>
  <div class="col-6 offset-0 col-md-3 offset-md-0">
    <div class="text-center px-3" :class="{ 'mt-5 mt-md-0': index > 1 }">
      <nuxt-link :to="{ name: 'product-slug', params: { slug: product.id } }">
        <img v-lazy="picture" :alt="name"
      /></nuxt-link>

      <div class="nuxt-link">
        <nuxt-link :to="{ name: 'product-slug', params: { slug: product.id } }">
          {{ name }}
        </nuxt-link>
      </div>
      <div>{{ price | rupiah }}</div>
    </div>
  </div>
</template>

<script>
import { convertToRupiah } from '@/assets/js/Utilities.js'

export default {
  filters: {
    rupiah(price) {
      return convertToRupiah(price)
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    name() {
      return this.product.name
    },
    price() {
      return this.product.varian[0].price
    },
    picture() {
      return require('@/assets' + this.product.varian[0].picture)
    }
  }
}
</script>
