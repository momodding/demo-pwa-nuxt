<template>
  <div>
    <label v-if="label" :for="label"
      ><strong>{{ label }}</strong></label
    >
    <select
      :id="label"
      :value="value"
      v-bind="$attrs"
      class="custom-select"
      @change="updateValue"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option == value"
        >{{ option }}</option
      >
    </select>
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
    options: {
      type: Array,
      required: true
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

<style lang="scss" scoped></style>
