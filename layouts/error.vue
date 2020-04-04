<template>
  <BaseContent>
    <div class="row no-gutters">
      <div class="col-12 col-md-12">
        <div
          class="d-flex justify-content-center align-items-center"
          style="min-height: 240px;"
        >
          <div class="alert alert-danger" style="text-align: center">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </BaseContent>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return this.error.statusCode
    },
    message() {
      if (this.error.message === 'Network Error') {
        return this.error.message + ' - ' + 'please refresh your browser page '
      }

      return this.error.message
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex'
        }
      ]
    }
  }
}
</script>
