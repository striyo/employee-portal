<template>
  <div class="personal page">
    <div class="grid">
      <div class="left">
        <div class="profile">
          <div class="title">
            <h2>Profile</h2>
            <div class="line"></div>
          </div>
          <img
            src="https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png"
            alt=""
          />
          <p>{{ name }}</p>
          <p>{{ email }}</p>
          <p>{{ phone }}</p>
          <p>${{ `${rate}${salaried == 0 ? "/hr" : " salary"}` }}</p>
          <button class="submit-btn" @click="changepassword">
            Change Password
          </button>
        </div>
      </div>
      <div class="right">
        <Todos />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Todos from '../components/Todos.vue';

export default {
  name: 'Personal',
  components: {
    Todos,
  },
  data() {
    return {
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      phone: this.$store.state.user.phone,
      rate: this.$store.state.user.rate,
      salaried: this.$store.state.user.salaried,
    };
  },
  methods: {
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
.grid {
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 2fr 2fr;
}

.personal {
  display: grid;
  grid-template-columns: 1fr;
}
.profile {
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

  img {
    max-width: 300px;
  }
}
@media (min-width: 1024px) {
  .personal {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
