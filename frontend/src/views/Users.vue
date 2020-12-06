<template>
  <div class="users page">
    <div class="container">
      <div class="register-form">
        <div class="loading" v-if="loading">
          <div class="circle">
          </div>
        </div>
        <div class="title">
          <h2>Register Employee</h2>
          <div class="line"></div>
        </div>
        <form @submit.prevent="register">
          <div class="form-group">
            <input type="text" placeholder="Full Name" v-model="name">
          </div>
          <div class="form-group">
            <input type="email" placeholder="Email" v-model="email">
          </div>
          <div class="form-group">
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone 111-111-1111" v-model="phone">
          </div>
          <div class="form-group">
            <input type="number" placeholder="Rate" v-model="rate">
          </div>
          <div class="form-checkbox">
            <input type="checkbox" v-model="salaried"> <label>Salaried Employee</label>
          </div>
          <div class="form-checkbox">
            <input type="checkbox" v-model="is_admin"> <label>Portal Admin</label>
          </div>
          <button>Register</button>
        </form>
      </div>

      <ManageEmployees/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ManageEmployees from '@/components/ManageEmployees.vue';

export default {
  name: 'Users',
  components: {
    ManageEmployees,
  },
  data() {
    return {
      name: '',
      email: '',
      phone: null,
      rate: 0,
      salaried: false,
      is_admin: false,
      response: '',
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      // create reqest body
      let body = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        rate: this.rate,
        salaried: this.salaried,
        is_admin: this.is_admin,
      };

      axios.post('/api/users/register', body).then((res) => {
        this.loading = false;
        console.log(res);
        this.response = res.data.message;

        // clear input fields on success
        this.name = '';
        this.email = '';
        this.phone = null;
        this.rate = 0;
        this.salaried = false;
        this.is_admin = false;
      }).catch((err) => {
        this.loading = false;
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data);
        this.response = err.response.data.message;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.users{
  .container{
    display:grid;
    grid-template-columns: 1fr;
    gap: 20px;

    .register-form{
      background-color:white;
      padding: 20px;
      box-shadow: 0 4px 4px rgba(0,0,0,0.1);
      position: relative;
    }
  }
}

@media(min-width:1200px){
  .users{
    .container{
      grid-template-columns: 1fr 1fr;
    }
  }
}

</style>
