<template>
  <transition name="remove-product" mode="out-in">
    <div class="row no-gutters">
      <div class="col-10 offset-1 col-md-2 offset-md-2">
        <div class="mt-5 mt-md-5">
          <img :src="picture" />
        </div>
      </div>
      <div
        class="col-8 offset-2 col-md-3 offset-md-1"
        style="margin-top: auto; margin-bottom: auto;"
      >
        <div class="mt-3 mt-md-5">
          <p class="nuxt-link">
            <nuxt-link
              class="text-success"
              :to="{ name: 'product-slug', params: { slug: item.slug } }"
              >{{ name }}</nuxt-link
            >
          </p>

          <p>
            <strong>SKU :</strong>
            #{{ sku }}
          </p>

          <p>
            <strong>Price :</strong>
            {{ price | rupiah }}
          </p>

          <p>
            <strong>Color :</strong>
            {{ color }}
          </p>
        </div>
      </div>
      <div
        class="col-8 offset-2 col-md-2 offset-md-0"
        style="margin-top: auto; margin-bottom: auto;"
      >
        <div class="mt-3 mt-md-3">
          <BaseButton
            class="btn btn-outline-danger"
            type="button"
            @click="remove"
            >Remove [{{ indexArray }}]</BaseButton
          >
        </div>
      </div>
    </div>
  </transition>
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
    indexArray: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    id() {
      return this.item.id
    },
    name() {
      return this.item.name
    },
    sku() {
      return this.item.sku
    },
    price() {
      return this.item.price
    },
    color() {
      return this.item.color
    },
    colorCode() {
      return this.item.colorCode
    },
    stockLeft() {
      return this.item.stockLeft
    },
    picture() {
      return require('@/assets' + this.item.picture)
    },
    uniqueId() {
      return this.item.uniqueId
    }
  },
  methods: {
    remove() {
      this.$emit('emitRemove', this.indexArray)
    }
  }
}
</script>
