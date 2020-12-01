<template>
  <div class="search">
    <div class="loading" v-if="loading">
      <div class="circle"></div>
    </div>
    <div class="title">
      <h2>Search Employee</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="searchEmployee">
      <div class="form-group">
        <input type="text" placeholder="Enter name or email" v-model="search" />
      </div>
      <button>Search</button>
    </form>
    <div class="search-result">
      <div class="result" v-for="user in users" :key="`user_${user.user_id}`">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Employee Search',
  data() {
    return {
      users: [],
      search: '',
      loading: false,
    };
  },
  methods: {
    searchEmployee() {
      this.loading = true;
      let body = {
        search: this.search,
      };

      axios.post('/api/users/search', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.users);

        this.users = res.data.users;
        this.loading = false;
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
.search {
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 60vh;
  overflow: auto;
}

.result {
  width: 100%;
  border-bottom: 2px solid #f7f7f7;
  padding-bottom: 5px;
  margin-top: 10px;
}
</style>
