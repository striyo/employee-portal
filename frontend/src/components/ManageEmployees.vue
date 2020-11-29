<template>
  <div class="search">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>Manage Employee Accounts</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="searchEmployee">
      <div class="form-group">
        <input type="text" placeholder="Enter name or email" v-model="search">
      </div>
      <button>Search</button>
    </form>
    <div class="search-result">
      <div class="result" v-for="user in users" :key="`user_${user.user_id}`">
        <form @submit.prevent="updateEmployee(user)">
          <div class="form-group">
            <input type="text" :placeholder="user.name" v-model="user.name">
          </div>
          <div class="form-group">
            <input type="email" :placeholder="user.email" v-model="user.email">
          </div>
          <div class="form-group">
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" :placeholder="user.phone" v-model="user.phone">
          </div>
          <div class="form-group">
            <input type="number" placeholder="Rate" v-model="user.rate">
          </div>
          <div class="form-group">
            <label>Salaried Employee</label>
            <select v-model="user.salaried">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div class="form-group">
            <label>Admin</label>
            <select v-model="user.is_admin">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div class="form-group">
            <label>Active</label>
            <select v-model="user.is_active">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <button>Save</button>
        </form>
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
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.users);

        this.users = res.data.users;
      }).catch((err) => {
        this.loading = false;
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
      });
    },
    updateEmployee(user) {
      this.loading = true;
      let body = {
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          rate: user.rate,
          salaried: user.salaried === '0' ? 0 : 1,
          is_admin: user.is_admin === '0' ? 0 : 1,
          is_active: user.is_active === '0' ? 0 : 1,
        },
      };

      axios.put('/api/users', body).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);
        console.log(res.data);
      }).catch((err) => {
        this.loading = false;
        console.log(err.response.data);
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
.search{
  padding: 20px;
  background-color:white;
  position:relative;
  max-height: 80vh;
  overflow: auto;
}

.result{
  width:100%;
  border-bottom: 2px solid #f7f7f7;
  padding-bottom: 5px;
  margin-top: 10px;
}
</style>
