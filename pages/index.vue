<template>
  <BaseContent>
    <div class="row no-gutters py-5">
      <Products
        v-for="(product, index) in products"
        :key="index"
        :index="index"
        :product="product"
      ></Products>
    </div>
  </BaseContent>
</template>

<script>
import { mapState } from 'vuex'

import Products from '@/components/Products.vue'

export default {
  components: { Products },
  async fetch({ store, error }) {
    try {
      await store.dispatch('product/fetchProducts')
    } catch (e) {
      const notification = {
        type: 'error',
        pesan: e.message
      }

      store.dispatch('notification/addNotification', notification)

      error({
        statusCode: 503,
        message: e.message
      })
    }
  },
  computed: {
    metaTitle() {
      return 'Index'
    },
    metaDesc() {
      return 'Description Index'
    },
    ...mapState({
      products: (state) => state.product.products
    })
  },
  head() {
    return {
      title: this.metaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDesc
        }
      ]
    }
  }
}
</script>
