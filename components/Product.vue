<template>
  <div class="row no-gutters">
    <div class="col-10 offset-1 col-md-4 offset-md-2">
      <div class="mt-4 mt-md-4">
        <img :src="picture" :alt="name" />
      </div>
    </div>
    <div class="col-10 offset-1 col-md-4 offset-md-1">
      <div class="mt-4 mt-md-5">
        <p>
          <strong>SKU :</strong>
          #{{ sku }}
        </p>

        <p>
          <strong>Stock :</strong>

          <span v-if="stockLeft > 5">Ready {{ stockLeft }} pcs</span>
          <span v-else-if="stockLeft > 0 && stockLeft <= 5"
            >Only {{ stockLeft }} pcs Left</span
          >
          <span v-else>Out of stock</span>
        </p>

        <p>
          <strong>Price :</strong>
          {{ price | rupiah }}
        </p>

        <p>
          <strong>Colors :</strong>
          {{ color }}
        </p>

        <ul class="list-group list-group-horizontal">
          <li
            v-for="(kodeHex, index) in colorOptions"
            :key="index"
            :style="{ backgroundColor: kodeHex }"
            :class="kodeHex == colorCode ? classColor : ''"
            class="list-group list-group-flush pilihan-color"
            @click="selectVarianProduct(index)"
          ></li>
        </ul>

        <BaseButton
          class="btn btn-success mt-4 mt-md-5"
          type="button"
          :disabled="!availableStock"
          :style="
            availableStock ? { cursor: 'pointer' } : { cursor: 'not-allowed' }
          "
          @click="beli"
          >Add to Cart</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  data() {
    return {
      name: '',
      slug: '',
      sku: '',
      stockLeft: 0,
      price: 0,
      color: '',
      colorCode: '',
      picture: '',

      colorOptions: [],
      varianSelected: {},

      classColor: 'border border-3'
    }
  },
  computed: {
    availableStock() {
      if (this.stockLeft > 0) {
        return true
      }

      return false
    },
    ...mapState({
      productsInCart: (state) => state.cart.productsInCart
    })
  },
  created() {
    this.slug = this.product.id
    this.name = this.product.name
    this.sku = this.product.varian[0].sku
    this.stockLeft = this.product.varian[0].stockLeft
    this.price = this.product.varian[0].price
    this.color = this.product.varian[0].color
    this.colorCode = this.product.varian[0].colorCode
    this.picture = require('@/assets' + this.product.varian[0].picture)

    for (let i = 0; i < this.product.varian.length; i++) {
      this.colorOptions.push(this.product.varian[i].colorCode)
    }

    this.setVarianSelected(this.product.varian[0])
  },
  methods: {
    setVarianSelected(product) {
      this.varianSelected = {
        slug: this.slug,
        name: this.name,
        sku: product.sku,
        stockLeft: product.stockLeft,
        price: product.price,
        color: product.color,
        colorCode: product.colorCode,
        picture: product.picture
      }
    },
    selectVarianProduct(index) {
      this.sku = this.product.varian[index].sku
      this.stockLeft = this.product.varian[index].stockLeft
      this.price = this.product.varian[index].price
      this.color = this.product.varian[index].color
      this.colorCode = this.product.varian[index].colorCode
      this.picture = require('@/assets' + this.product.varian[index].picture)

      this.setVarianSelected(this.product.varian[index])
    },
    beli() {
      let length = 0

      if (process.client) {
        if (localStorage.getItem('productsInCart')) {
          const productsInCart = JSON.parse(
            localStorage.getItem('productsInCart')
          )

          const filteredProductsInCart = productsInCart.filter(
            (productsInCart) => productsInCart.sku === this.varianSelected.sku
          )

          length = filteredProductsInCart.length
        }
      }

      if (length < this.varianSelected.stockLeft) {
        this.$store.dispatch('cart/addProductToCart', this.varianSelected)

        const productAddedToCart = {
          name: this.varianSelected.name,
          sku: this.varianSelected.sku,
          stockLeft: this.varianSelected.stockLeft,
          price: this.varianSelected.price,
          color: this.varianSelected.color,
          colorCode: this.varianSelected.colorCode,
          picture: require('@/assets' + this.varianSelected.picture)
        }

        this.$store.dispatch('cart/setProductAddedToCart', productAddedToCart)

        setTimeout(
          () => this.$store.dispatch('cart/setProductAddedToCart', []),
          1500
        )
      } else {
        const limitedStock = {
          name: this.varianSelected.name,
          sku: this.varianSelected.sku,
          stockLeft: this.varianSelected.stockLeft,
          price: this.varianSelected.price,
          color: this.varianSelected.color,
          colorCode: this.varianSelected.colorCode,
          picture: require('@/assets' + this.varianSelected.picture)
        }

        this.$store.dispatch('stock/setLimitedStock', limitedStock)
      }
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 28px;
  margin-bottom: 20px;
}
img {
  max-width: 100%;
  max-height: 100%;
}
li {
  cursor: pointer;
  display: inline-block;
}
.pilihan-color {
  padding: 20px;
  margin-right: 15px;
}
.border-3 {
  border-width: 3px !important;
  border-style: double !important;
}
</style>
