<template>
  <p class="notifications" :class="classNotifications">
    {{ notification.pesan }}
  </p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      interval: null
    }
  },
  computed: {
    classNotifications() {
      if (this.notification.type === 'error') {
        return 'text-danger'
      }
      return 'text-success'
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.removeNotification(this.notification)
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions({
      removeNotification: 'notification/removeNotification'
    })
  }
}
</script>

<style scoped>
.notifications {
  margin: 1em 0;
}
</style>
