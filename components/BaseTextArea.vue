<template>
  <div>
    <label v-if="label" :for="label"
      ><strong>{{ label }}</strong></label
    >
    <textarea
      :id="label"
      :value="value"
      v-bind="$attrs"
      class="form-control"
      @input="updateValue"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
