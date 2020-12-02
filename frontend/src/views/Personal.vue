<template>
  <div class="personal page">
    <div class="left">
      <Profile />
    </div>
    <div class="right">
      <Todos />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Todos from '../components/Todos.vue';
import Profile from '../components/Profile.vue';

export default {
  name: 'Personal',
  components: {
    Todos,
    Profile,
  },
  data() {
    return {
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      phone: this.$store.state.user.phone,
      rate: this.$store.state.user.rate,
      salaried: this.$store.state.user.salaried,
      edit: false,
    };
  },
  methods: {
    savePicture() {
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
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);
        this.$store.state.user.profile_picture = res.data.picture;
        document.getElementById('pictureForm').reset();
        this.edit = false;
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
    changepassword() {
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
        setTimeout(() => axios.post('/api/users/logout'), 5000);
      }).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);
        this.$store.dispatch('deleteUser');
        this.$router.push('/');
      }).catch((err) => {
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

.personal {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 1024px) {
  .personal {
    grid-template-columns: 1fr 1fr;
  }

}
</style>
