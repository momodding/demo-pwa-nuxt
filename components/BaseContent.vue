<template>
  <div class="my-custom">
    <div v-if="isOnline">
      <slot />
    </div>
    <div v-else class="row no-gutters">
      <div class="col-12 col-md-12">
        <div class="d-flex justify-content-center mt-5 mt-md-5 mb-5 mb-md-5">
          <div class="alert alert-danger">
            Looks like you lost your connection
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isOnline() {
      return this.$nuxt.isOnline
    }
  }
}
</script>

<style scoped>
.my-custom {
  background-color: white;
}
</style>
