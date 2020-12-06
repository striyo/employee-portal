<template>
  <div class="profile">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>Profile</h2>
      <div class="line"></div>
    </div>
    <div class="profile-main">
      <div class="profile-picture" @click="edit = !edit">
        <img :src="`${$store.state.user.profile_picture == null ? 'https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png' : `/api/users/picture/${$store.state.user.profile_picture}`}`" alt="">
        <i class="fas fa-edit" style="z-index: 0"></i>
      </div>
      <div class="profile-info">
        <form @submit.prevent="savePicture" v-if="edit" style="max-width:300px; margin-bottom: 20px;" id="pictureForm">
          <div class="form-group">
            <input type="file" id="picture">
          </div>
          <button>Save</button>
        </form>
        <h3>{{name}}</h3>
        <p>{{email}}</p>
        <p>{{phone}}</p>
        <p>${{`${rate}${salaried == 0 ? '/hr' : ' salary'}`}}</p>
        <button class="submit-btn" @click="changepassword" style="margin-top: 20px;">Change Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      phone: this.$store.state.user.phone,
      rate: this.$store.state.user.rate,
      salaried: this.$store.state.user.salaried,
      edit: false,
      loading: false,
    };
  },
  methods: {
    savePicture() {
      this.loading = true;
      let body = new FormData();
      body.append('picture', document.getElementById('picture').files[0]);
      body.append('user_id', this.$store.state.user.user_id);
      body.append('name', this.$store.state.user.name);
      body.append('email', this.$store.state.user.email);
      body.append('phone', this.$store.state.user.phone);
      body.append('salaried', this.$store.state.user.salaried);
      body.append('is_admin', this.$store.state.user.is_admin);
      body.append('is_active', this.$store.state.user.is_active);
      body.append('rate', this.$store.state.user.rate);

      axios.put('/api/users/picture', body, { headers: { 'content-type': 'multipart/form-data' } }).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);
        this.$store.state.user.profile_picture = res.data.picture;
        document.getElementById('pictureForm').reset();
        this.edit = false;
      }).catch((err) => {
        this.loading = false;
        let message = {
          message: err.response.data.message,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
    changepassword() {
      this.loading = true;
      let body = {
        email: this.$store.state.user.email,
      };

      axios.post('/api/users/forgotpassword', body).then((res) => {
        console.log(res.data.message);
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);

        message = {
          message: 'You will be logged out of your session in 5 seconds',
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        setTimeout(() => {
          axios.post('/api/users/logout').then(() => {
            this.$store.dispatch('deleteUser');
            this.$router.push('/');
          });
        }, 5000);
      }).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);
        this.$store.dispatch('deleteUser');
        this.$router.push('/');
      }).catch((err) => {
        this.loading = false;
        let message = {
          message: err.response.data.message,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  .profile-main{
    display:grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .profile-picture{
    max-width:300px;
    position:relative;
    cursor: pointer;
    &:hover{
      i{
        opacity: 1;
        color:darkgreen;
      }
    }
    img{
      max-width:300px;
    }
    i{
      position: absolute;
      z-index: 2;
      bottom: 0;
      right:0;
      font-size: 1.25em;
      background-color:white;
      padding: 2px;
      transition: all 0.3s ease;
    }
  }
}

@media(min-width:1500px){
  .profile{
    .profile-main{
      grid-template-columns: 1fr 1fr;
    }

    .profile-picture{
      max-width: 400px;
      img{
        max-width: 400px;
      }
    }

    .profile-info{
      display:flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }
  }
}

</style>
