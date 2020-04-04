<template>
  <div>
    <div class="modal" :style="{ display: css }">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div v-if="showHeader" class="modal-header">
            <slot name="header">
              <BaseButton class="close" type="button" @click="close"
                >x</BaseButton
              >
            </slot>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div v-if="showFooter" class="modal-footer">
            <slot name="footer">
              <BaseButton class="btn btn-success" type="button" @click="close"
                >Close</BaseButton
              >
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop show"></div>
  </div>
</template>

<script>
import EventBus from '@/assets/js/EventBus.js'

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    showHeader: {
      type: Boolean,
      default: false,
      required: true
    },
    showFooter: {
      type: Boolean,
      default: false,
      required: true
    },
    passedComponent: {
      type: String,
      required: true
    }
  },
  computed: {
    css() {
      return this.showModal ? 'block' : 'none'
    }
  },
  methods: {
    close() {
      EventBus.$emit('closeModal' + this.passedComponent)
    }
  }
}
</script>
