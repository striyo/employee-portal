<template>
  <form @submit.prevent="timeoff">
    <div class="form-group">
      <h3>Start Date <span class="required">*</span></h3>
      <input type="date" v-model="startDate">
    </div>
    <div class="form-group">
      <h3>End Date <span class="required">*</span></h3>
      <input type="date" v-model="endDate">
    </div>
    <div class="form-group">
      <h3>Reason <span class="required">*</span></h3>
      <textarea v-model="reason"></textarea>
    </div>
    <button>Send</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Time Off',
  data() {
    return {
      startDate: null,
      endDate: null,
      reason: '',
    };
  },
  methods: {
    timeoff() {
      this.$emit('loading');
      let body = {
        startDate: this.startDate,
        endDate: this.endDate,
        reason: this.reason,
      };

      axios.post('/api/resources/timeoff', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.startDate = null;
        this.endDate = null;
        this.reason = '';

        this.$store.dispatch('pushNotifications', message);
        this.$emit('finished');
      }).catch((err) => {
        this.$emit('finished');
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  form{
    position: relative;
  }
</style>
