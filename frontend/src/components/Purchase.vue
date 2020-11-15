<template>
  <form @submit.prevent="purchase">
    <div class="form-group">
      <h3>Department</h3>
      <input type="text" v-model="department">
    </div>
    <div class="form-group">
      <h3>Items, quantities, and prices</h3>
      <textarea v-model="items"></textarea>
    </div>
    <div class="form-group">
      <h3>Purpose</h3>
      <textarea v-model="purpose"></textarea>
    </div>
    <div class="form-group">
      <h3>Estimated Total Price</h3>
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
        let message = {
          message: res.data.message,
          error: false,
        };

        this.department = '';
        this.items = '';
        this.purpose = '';
        this.total = '';

        this.$store.dispatch('pushNotifications', message);
      }).catch((err) => {
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
