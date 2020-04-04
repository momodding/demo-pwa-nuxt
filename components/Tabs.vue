<template>
  <div class="row no-gutters">
    <div class="col-10 offset-1 col-md-8 offset-md-2">
      <div class="mt-5 mt-md-5 mb-5 mb-md-5">
        <ul class="nav nav-tabs">
          <li
            v-for="(tabSelected, index) in tabReview"
            :key="index"
            class="nav-item"
          >
            <a
              class="nav-link"
              style="color: #1069ca;"
              :class="{ active: tabSelected.aktif }"
              href="Javascript:void(0)"
              @click="pilihTab(tabSelected)"
              >{{ tabSelected.nameTab }}</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabReview: []
    }
  },
  created() {
    this.tabReview = this.$children
  },
  methods: {
    pilihTab(tabSelected) {
      this.tabReview.forEach((tab) => {
        tab.aktif = tab.nameTab === tabSelected.nameTab
      })
    }
  }
}
</script>
