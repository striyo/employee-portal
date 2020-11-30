<template>
  <div class="generatetime">
    <div class="title">
      <h2>Generate Timesheets</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="generate">
      <div class="form-checkbox">
        <input type="checkbox" v-model="all" />
        <label>Generate for all users</label>
      </div>
      <div class="form-group" v-if="all == false">
        <input type="text" v-model="showEmployee" placeholder="Employee" />
        <div class="auto-complete">
          <p
            v-for="user in users"
            :key="`auto_${user.user_id}`"
            @click="selectUser(user)"
          >
            {{ user.name }} -- {{ user.email }}
          </p>
        </div>
      </div>
      <div class="form-group">
        <input type="date" placeholder="Start Date" v-model="startDate" />
      </div>
      <div class="form-group">
        <input type="date" placeholder="End Date" v-model="endDate" />
      </div>
      <button>Generate</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Generate Timesheets',
  data() {
    return {
      all: false,
      showEmployee: '',
      employee: null,
      startDate: null,
      endDate: null,
      timeout: null,
      clicked: false,
      users: [],
    };
  },
  watch: {
    showEmployee(val) {
      if (this.timeout != null) {
        clearTimeout(this.timeout);
      }

      if (this.click) {
        this.click = false;
        return;
      }

      let self = this;
      if (val.length !== 0) {
        this.timeout = setTimeout(() => {
          let body = {
            search: self.showEmployee,
          };

          axios.post('/api/users/search', body).then((res) => {
            self.users = res.data.users;
          }).catch((err) => {
            console.log(err.response.data);
          });
        }, 1000);
      } else {
        this.users = [];
      }
    },
  },
  methods: {
    selectUser(user) {
      this.employee = user;
      this.showEmployee = user.name;
      this.users = [];
      this.click = true;
    },
    generate() {
      let body = {
        all: this.all,
        employee: this.employee,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      console.log(body);
      axios.post('/api/timesheets', body).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err.response.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.generatetime {
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.auto-complete {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: absolute;
  top: 30px;
  z-index: 2;
  background-color: white;
  p {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
  }
}
</style>
