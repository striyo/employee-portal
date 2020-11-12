<template>
  <div class="login">
    <img src="@/assets/logo.png" alt="">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <button>Log In</button>
      </form>
      <router-link to='/forgotpassword'>Forgot Password</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      // create request body
      let body = {
        email: this.email,
        password: this.password,
      };

      axios.post('/api/users/login', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);
        this.$store.dispatch('setUser', res.data.user);
        this.$router.push('/dashboard');
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
.login{
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
