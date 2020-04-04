<template>
  <div class="row no-gutters">
    <div class="col-12 col-md-12">
      <form @submit.prevent="submitReview()">
        <div v-if="$v.review.name.$error" class="row no-gutters mt-1">
          <div class="col-12 col-md-12">
            <p v-if="!$v.review.name.required" class="text-danger">
              Name can not be empty
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="form-group col-12 col-md-8">
            <BaseInput
              v-model="review.name"
              label="Name"
              type="text"
              @blur="$v.review.name.$touch()"
            />
          </div>
        </div>
        <div v-if="$v.review.email.$error" class="row no-gutters mt-1">
          <div class="col-12 col-md-12">
            <p v-if="!$v.review.email.required" class="text-danger">
              Email can not be empty
            </p>
            <p v-if="!$v.review.email.email" class="text-danger">
              Wrong email format
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="form-group col-12 col-md-8">
            <BaseInput
              v-model="review.email"
              label="Email"
              type="text"
              @blur="$v.review.email.$touch()"
            />
          </div>
        </div>
        <div v-if="$v.review.rating.$error" class="row no-gutters mt-1">
          <div class="col-12 col-md-12">
            <p v-if="!$v.review.rating.required" class="text-danger">
              Rating can not be empty
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="form-group col-12 col-md-2">
            <BaseSelect
              v-model="review.rating"
              label="Rating"
              :options="arrayRating"
              @blur="$v.review.rating.$touch()"
            />
          </div>
        </div>
        <div v-if="$v.review.comments.$error" class="row no-gutters mt-1">
          <div class="col-12 col-md-12">
            <p v-if="!$v.review.comments.required" class="text-danger">
              Comments can not be empty
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="form-group col-12 col-md-10">
            <BaseTextArea
              v-model="review.comments"
              label="Comments"
              rows="5"
              @blur="$v.review.comments.$touch()"
            />
          </div>
        </div>
        <div class="row no-gutters mt-2 mb-0">
          <div class="col-12 col-md-12">
            <BaseButton class="btn btn-success" type="submit"
              >Submit</BaseButton
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  props: {
    idProduct: {
      type: [String, Number],
      default: ''
    }
  },
  validations: {
    review: {
      name: { required },
      email: { required, email },
      rating: { required },
      comments: { required }
    }
  },
  data() {
    const arrayRating = []
    for (let i = 1; i <= 3; i++) {
      arrayRating.push(i)
    }
    return {
      arrayRating,
      review: this.createFreshReviewObject()
    }
  },
  methods: {
    createFreshReviewObject() {
      return {
        name: '',
        email: '',
        rating: '',
        comments: ''
      }
    },
    submitReview() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const reviewDiberikan = {
          idProduct: this.idProduct,
          name: this.review.name,
          email: this.review.email,
          rating: this.review.rating,
          comments: this.review.comments
        }

        this.review = this.createFreshReviewObject()

        this.$emit('emitSubmitReview', reviewDiberikan)

        this.$v.$reset()
      }
    }
  }
}
</script>
