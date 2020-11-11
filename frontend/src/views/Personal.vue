<template>
  <div class="personal page">
    <div class="profile">
      <div class="title">
        <h2>Profile</h2>
        <div class="line"></div>
      </div>
      <img src="https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png" alt="">
      <p>{{$store.state.user.name}}</p>
      <p>{{$store.state.user.email}}</p>
      <p>{{$store.state.user.phone}}</p>
      <button class="submit-btn" @click="changepassword">Change Password</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Personal',
  methods: {
    changepassword() {
      let body = {
        email: this.$store.state.user.email,
      };

      axios.post('/api/users/forgotpassword', body).then((res) => {
        console.log(res.data.message);
        console.log('You will be logged out of your session in 5 seconds');
        setTimeout(() => axios.post('/api/users/logout'), 5000);
      }).then(() => {
        this.$store.dispatch('deleteUser');
        this.$router.push('/');
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile{
  padding: 20px;
  background-color:white;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);

  img{
    max-width:300px;
  }
}
</style>
