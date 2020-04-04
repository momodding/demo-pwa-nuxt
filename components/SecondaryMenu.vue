<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="alert alert-success custom">
          Current Route : <strong><slot /></strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom {
  text-align: center;
  margin-bottom: 0;
}
</style>
