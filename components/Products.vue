<template>
  <div class="col-10 offset-1 col-md-3 offset-md-0">
    <div class="text-center mt-0 mt-md-5 mb-5 mb-md-5">
      <nuxt-link
        class="text-success"
        :to="{ name: 'product-slug', params: { slug: product.id } }"
      >
        <img v-lazy="picture" :alt="name"
      /></nuxt-link>

      <div class="nuxt-link">
        <nuxt-link
          class="text-success"
          :to="{ name: 'product-slug', params: { slug: product.id } }"
        >
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
