<template>
  <BaseModal
    :show-modal="showModal"
    :show-header="false"
    :show-footer="true"
    passed-component="ReviewAdded"
  >
    <div class="row">
      <div class="col-12 col-md-12">
        <p class="text-success">
          Your review has been submited
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>
