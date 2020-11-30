<template>
  <form @submit.prevent="purchase">
    <div class="form-group">
      <h3>Department <span class="required">*</span></h3>
      <input type="text" v-model="department">
    </div>
    <div class="form-group">
      <h3>Items, quantities, and prices <span class="required">*</span></h3>
      <textarea v-model="items"></textarea>
    </div>
    <div class="form-group">
      <h3>Purpose <span class="required">*</span></h3>
      <textarea v-model="purpose"></textarea>
    </div>
    <div class="form-group">
      <h3>Estimated Total Price <span class="required">*</span></h3>
      <input type="number" v-model="total">
    </div>
    <button>Send</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Purchase',
  data() {
    return {
      department: '',
      items: '',
      purpose: '',
      total: '',
    };
  },
  methods: {
    purchase() {
      let body = {
        department: this.department,
        items: this.items,
        purpose: this.purpose,
        total: this.total,
      };

      axios.post('/api/resources/purchase', body).then((res) => {
        this.$emit('loading');
        let message = {
          message: res.data.message,
          error: false,
        };

        this.department = '';
        this.items = '';
        this.purpose = '';
        this.total = '';

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

<style>

</style>
