<template>
  <div class="forgotpassword">
    <img src="@/assets/logo.png" alt="">
    <div class="login-box">
      <h1>Password Recovery</h1>
      <form @submit.prevent="forgotpassword">
        <p style="margin-bottom: 10px">Please enter your email and we will email you a link to reset your password</p>
        <div class="form-group">
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <button>Send Email</button>
      </form>
      <router-link to='/'>Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Forgot Password',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    forgotpassword() {
      // create request body
      let body = {
        email: this.email,
      };

      axios.post('/api/users/forgotpassword', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.email = '';
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

<style lang="scss" scoped>
.forgotpassword{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width:100%;
  img{
    width: 70%;
    max-width:400px;
  }

  .login-box{
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    padding: 20px;
    width: 90%;
    max-width: 500px;
    background-color:white;
    h1{
      text-align: center;
      margin-bottom: 20px;
    }

    a{
      text-align: center;
      display:block;
      margin-top: 10px;
      color:#333;
    }
  }
}
</style>
