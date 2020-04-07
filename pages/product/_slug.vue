<template>
  <BaseContent>
    <div class="row no-gutters">
      <div class="col-10 offset-1 col-md-8 offset-md-2">
        <div class="nuxt-link mt-5 mt-md-5" style="float: right;">
          <nuxt-link
            to="/cart"
            :class="totalProductsInCart > 0 ? 'text-success' : 'text-secondary'"
            :style="
              totalProductsInCart > 0
                ? { cursor: 'pointer' }
                : { cursor: 'not-allowed' }
            "
            :event="totalProductsInCart > 0 ? 'click' : ''"
            >Cart ({{ totalProductsInCart }})</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col-10 offset-1 col-md-8 offset-md-2">
        <div class="mt-5 mt-md-5" style="font-size: 24px;">
          <strong>Product : </strong> {{ product.name }}
        </div>
      </div>
    </div>
    <Product v-if="product.id" :product="product" />
    <Tabs>
      <Tab name-tab="Leave Review" :selected="true">
        <LeaveReview
          :id-product="product.id"
          @emitSubmitReview="submitReview"
        />
      </Tab>
      <Tab name-tab="Reviews">
        <Reviews :id-product="product.id" :reviews="reviews" />
      </Tab>
    </Tabs>

    <transition name="fade-modal" mode="out-in">
      <div v-if="showModalProductAddedToCart">
        <ProductAddedToCart
          :show-modal="showModalProductAddedToCart"
          :payload="productAddedToCart"
        />
      </div>
    </transition>

    <transition name="fade-modal" mode="out-in">
      <div v-if="showModalLimitedStock">
        <LimitedStock
          :show-modal="showModalLimitedStock"
          :payload="limitedStock"
        />
      </div>
    </transition>

    <transition name="fade-modal" mode="out-in">
      <div v-if="showModalReviewAdded">
        <ReviewAdded :show-modal="showModalReviewAdded" />
      </div>
    </transition>
  </BaseContent>
</template>

<script>
import { mapState } from 'vuex'

import EventBus from '@/assets/js/EventBus.js'
import Product from '@/components/Product.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import LeaveReview from '@/components/LeaveReview.vue'
import Reviews from '@/components/Reviews.vue'

export default {
  components: {
    Product,
    Tabs,
    Tab,
    LeaveReview,
    Reviews,
    LimitedStock: () => import('@/components/LimitedStock.vue'),
    ReviewAdded: () => import('@/components/ReviewAdded.vue'),
    ProductAddedToCart: () => import('@/components/ProductAddedToCart.vue')
  },
  async fetch({ params, store, error }) {
    try {
      await store.dispatch('product/fetchProduct', params.slug)
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
  data() {
    return {
      showModalReviewAdded: false
    }
  },
  computed: {
    metaTitle() {
      return this.product.name
    },
    metaDesc() {
      return 'Description' + ' ' + this.product.name
    },
    isOnline() {
      return this.$nuxt.isOnline
    },
    showModalProductAddedToCart() {
      return Object.keys(this.productAddedToCart).length > 0
    },
    showModalLimitedStock() {
      return Object.keys(this.limitedStock).length > 0
    },
    ...mapState({
      product: (state) => state.product.product,
      productsInCart: (state) => state.cart.productsInCart,
      totalProductsInCart: (state) => state.cart.totalProductsInCart,
      productAddedToCart: (state) => state.cart.productAddedToCart,
      limitedStock: (state) => state.stock.limitedStock,
      reviews: (state) => state.review.reviews
    })
  },
  created() {
    if (process.client) {
      if (localStorage.getItem('productsInCart')) {
        this.$store.dispatch(
          'cart/setProductsInCart',
          JSON.parse(localStorage.getItem('productsInCart'))
        )

        this.$store.dispatch(
          'cart/setTotalProductsInCart',
          JSON.parse(localStorage.getItem('totalProductsInCart'))
        )
      } else {
        this.$store.dispatch('cart/setTotalProductsInCart', 0)
      }

      if (localStorage.getItem('reviews')) {
        this.$store.dispatch(
          'review/setReviews',
          JSON.parse(localStorage.getItem('reviews'))
        )
      }
    }

    EventBus.$on('closeModalLimitedStock', () => {
      this.$store.dispatch('stock/setLimitedStock', {})
    })

    EventBus.$on('closeModalReviewAdded', () => {
      this.showModalReviewAdded = false
    })
  },
  methods: {
    submitReview(reviewSubmited) {
      this.$store.dispatch('review/addReview', reviewSubmited)
      this.showModalReviewAdded = true
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
