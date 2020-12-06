<template>
  <div class="changepassword">
    <img src="@/assets/logo.png" alt="">
    <div class="login-box">
      <div class="loading" v-if="loading">
        <div class="circle">
        </div>
      </div>
      <h1>Password Recovery</h1>
      <form @submit.prevent="changepassword">
        <p style="margin-bottom: 10px">Please enter your new password</p>
        <div class="form-group">
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="form-group">
          <input type="password" placeholder="Re-enter your password" v-model="password2">
        </div>
        <button>Change Password</button>
      </form>
      <router-link to='/'>Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Change Password',
  data() {
    return {
      password: '',
      password2: '',
      loading: false,
    };
  },
  methods: {
    changepassword() {
      this.loading = true;
      // create request body
      let body = {
        user_id: this.$route.params.user_id,
        token: this.$route.params.token,
        password: this.password,
        password2: this.password2,
      };

      axios.post('/api/users/changepassword', body).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.password = '';
        this.password2 = '';
        this.$router.push('/');
      }).catch((err) => {
        this.loading = false;
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
.changepassword{
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
    position: relative;
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
