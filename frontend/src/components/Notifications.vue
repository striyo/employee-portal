<template>
  <div class="notifications">
    <NotificationMessage v-for="message in $store.state.notifications" :key="`message_${message.id}`" :message="message" v-on:delete-message="deleteMessage" />
  </div>
</template>

<script>
import NotificationMessage from '@/components/NotificationMessage.vue';

export default {
  name: 'Notifications',
  components: {
    NotificationMessage,
  },
  methods: {
    deleteMessage(id) {
      this.$store.dispatch('deleteNotifications', id);
    },
  },
};
</script>

<style style="scss" scoped>
.notifications{
  position:fixed;
  z-index: 3;
  right: 20px;
  top: 5vh;
}
</style>
