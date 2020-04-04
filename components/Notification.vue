<template>
  <div class="notification">
    <notifications
      v-for="(notification, index) in notifications"
      :key="index"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Notifications from '@/components/Notifications.vue'

export default {
  components: {
    Notifications
  },
  computed: mapState({
    notifications: (state) => state.notification.notifications
  })
}
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
</style>
