<template>
  <BaseModal
    :show-modal="showModal"
    :show-header="false"
    :show-footer="false"
    passed-component="ProductAddedToCart"
  >
    <div class="row no-gutters">
      <div class="col-4 col-md-5">
        <img :src="payload.picture" />
      </div>
      <div class="col-7 offset-1 col-md-6 offset-md-1">
        <p>
          <strong>{{ payload.name }}</strong>
        </p>
        <p>
          <strong>SKU :</strong>
          #{{ payload.sku }}
        </p>
        <p>
          <strong>Color :</strong>
          {{ payload.color }}
        </p>
        <p>
          <strong>Price :</strong>
          {{ parseInt(payload.price) | rupiah }}
        </p>
        <p class="text-success">Product added to cart !!</p>
      </div>
    </div>
  </BaseModal>
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
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    payload: {
      type: Object,
      required: true
    }
  }
}
</script>
