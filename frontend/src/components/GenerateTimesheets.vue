<template>
  <div class="generatetime">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>Generate Timesheets</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="generate">
      <div class="form-checkbox">
        <input type="checkbox" v-model="all"> <label>Generate for all users</label>
      </div>
      <div class="form-group" v-if="all == false">
        <h3>Select Employee</h3>
        <div class="selection" v-if="employees.length != 0">
          <p style="margin-bottom: 5px; color:darkgreen;">Click to remove a selection</p>
          <label v-for="employee in employees" :key="`employee_${employee.user_id}`" @click="removeSelection(employee)">{{employee.name}}</label>
        </div>
        <div class="no-selection" v-else>
          <label>No employees selected</label>
        </div>
        <div style="position:relative; width:100%">
          <input type="text" v-model="showEmployee" placeholder="Enter an employee's name or email and click on the desired person">
          <div class="auto-complete">
            <p v-for="user in users " :key="`auto_${user.user_id}`" @click="selectUser(user)">{{user.name}} -- {{user.email}}</p>
          </div>
        </div>
      </div>
      <div class="form-group">
        <h3>Start Date</h3>
        <input type="date" v-model="startDate">
      </div>
      <div class="form-group">
        <h3>End Date</h3>
        <input type="date" placeholder="End Date" v-model="endDate">
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
      employees: [],
      startDate: null,
      endDate: null,
      timeout: null,
      clicked: false,
      users: [],
      loading: false,
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
        }, 500);
      } else {
        this.users = [];
      }
    },
  },
  methods: {
    selectUser(user) {
      this.employees.push(user);
      this.showEmployee = '';
      this.users = [];
      this.click = true;
    },
    removeSelection(user) {
      this.employees = this.employees.filter((employee) => employee.user_id !== user.user_id);
    },
    generate() {
      this.loading = true;
      let body = {
        all: this.all,
        employees: this.employees,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      console.log(body);
      let route = '/api/timesheets';
      if (this.all) {
        route = '/api/timesheets/all';
      }

      axios.post(route, body).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.startDate = null;
        this.endDate = null;
        this.employees = [];
        this.showEmployee = '';
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
.generatetime{
  padding: 20px;
  background-color:white;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  position: relative;
}

.selection{
  margin-bottom: 10px;
  label{
    background-color:#f7f7f7;
    padding: 5px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    margin-right: 5px;
    display:inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
.no-selection{
  margin-bottom: 10px;
  label{
    background-color:#f7f7f7;
    padding: 5px;
  }
}

.auto-complete{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  width:100%;
  position:absolute;
  top:30px;
  z-index:2;
  background-color:white;
  p{
    padding: 5px 10px;
    cursor: pointer;
    &:hover{
      background-color:#f6f6f6;
    }
  }
}
</style>
