<template>
  <BaseContent>
    <client-only>
      <products-in-cart
        v-for="(item, index) in productsInCart"
        :key="item.uniqueId"
        :item="item"
        :index-array="index"
        @emitHapus="hapus"
      ></products-in-cart>

      <div class="row no-gutters">
        <div v-if="totalPay > 0" class="col-8 offset-2 col-md-3 offset-md-5">
          <div class="mt-5 mt-md-5 mb-0 mb-md-5">
            <p>
              <strong>Quantity :</strong>
              {{ totalProductsInCart }}
            </p>
            <p>
              <strong>Total Pay :</strong>
              {{ totalPay | rupiah }}
            </p>
          </div>
        </div>
        <div v-if="totalPay > 0" class="col-8 offset-2 col-md-2 offset-md-0">
          <div class="mt-3 mt-md-5 mb-5 mb-md-5">
            <BaseButton class="btn btn-success" type="button" @click="checkout"
              >Checkout</BaseButton
            >
          </div>
        </div>
        <div v-else class="col-12 col-md-12">
          <div class="d-flex justify-content-center mt-5 mt-md-5 mb-5 mb-md-5">
            <div class="alert alert-warning">
              Cart is Empty
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </BaseContent>
</template>

<script>
import { mapState } from 'vuex'
import { convertToRupiah } from '@/assets/js/Utilities.js'

import ProductsInCart from '@/components/ProductsInCart.vue'

export default {
  components: { ProductsInCart },
  filters: {
    rupiah(price) {
      return convertToRupiah(price)
    }
  },
  data() {
    return {
      totalPay: 0
    }
  },
  computed: {
    metaTitle() {
      return 'Cart'
    },
    metaDesc() {
      return 'Description Cart'
    },
    ...mapState({
      totalProductsInCart: (state) => state.cart.totalProductsInCart,
      productsInCart: (state) => state.cart.productsInCart,
      totalPrice: (state) => state.cart.totalPrice
    })
  },
  watch: {
    totalPrice() {
      this.totalPay = this.totalPrice
    }
  },
  created() {
    this.totalPay = this.totalPrice

    if (process.client) {
      if (localStorage.getItem('productsInCart')) {
        this.$store.dispatch(
          'cart/setTotalPrice',
          JSON.parse(localStorage.getItem('totalPrice'))
        )

        this.$store.dispatch(
          'cart/setProductsInCart',
          JSON.parse(localStorage.getItem('productsInCart'))
        )

        this.$store.dispatch(
          'cart/setTotalProductsInCart',
          JSON.parse(localStorage.getItem('totalProductsInCart'))
        )
      }
    }
  },
  methods: {
    hapus(indexArray) {
      const payload = {
        uniqueId: this.productsInCart[indexArray].uniqueId
      }

      this.$store.dispatch('cart/removeProductFromCart', payload)
    },
    checkout() {
      this.$store.dispatch('cart/setTotalPrice', 0)
      this.$store.dispatch('cart/setProductsInCart', [])
      this.$store.dispatch('cart/setTotalProductsInCart', 0)

      localStorage.removeItem('totalPrice')
      localStorage.removeItem('productsInCart')
      localStorage.removeItem('totalProductsInCart')

      alert('Thank You !!')
    }
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
