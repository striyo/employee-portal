<template>
  <transition name="fade">
    <div :class="{'notifmessage': true, 'error': message.error, 'regular': !message.error}" v-if="show" @click="deleteMessage" style="cursor:pointer">
      <p>{{message.message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification Message',
  props: ['message'],
  created() {
    this.show = true;
    this.firstTimer = setTimeout(() => {
      this.show = false;
      this.secondTimer = setTimeout(() => {
        this.$emit('delete-message', this.message.id);
      }, 1000);
    }, 10000);
  },
  data() {
    return {
      show: false,
      firstTimer: null,
      secondTimer: null,
    };
  },
  methods: {
    deleteMessage() {
      this.show = false;
      clearTimeout(this.firstTimer);
      clearTimeout(this.secondTimer);
      this.$emit('delete-message', this.message.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.notifmessage{
  width: 300px;
  padding: 10px;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  color:white;
}

.regular{
  background-color: #3ec742;
}

.error{
  background-color: #d45050;
}

</style>
