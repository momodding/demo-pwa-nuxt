<template>
  <div class="row no-gutters">
    <div v-show="filteredReviews.length === 0" class="col-12 col-md-12">
      <p>No reviews yet ...</p>
    </div>
    <div v-show="filteredReviews.length > 0" class="col-12 col-md-12">
      <div v-for="(review, index) in filteredReviews" :key="index">
        <p>
          <strong>Name :</strong>
          {{ review.name }}
        </p>
        <p>
          <strong>Rating :</strong>
          {{ review.rating }}
        </p>
        <p>
          <strong>Comments :</strong>
          {{ review.comments }}
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idProduct: {
      type: [String, Number],
      default: ''
    },
    reviews: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter(
        (filteredReviews) => filteredReviews.idProduct === this.idProduct
      )
    }
  }
}
</script>
