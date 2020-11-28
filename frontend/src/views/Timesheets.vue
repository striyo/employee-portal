<template>
  <div class="timesheets page">
    <h1>Timesheets</h1>
    <div class="title">
      <h2>View Hour</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <input type="text" placeholder="Enter name or email" v-model="search" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Start Date</h3>
          <input type="date" v-model="startDate" />
        </div>
        <div class="form-group">
          <h3>End Date</h3>
          <input type="date" v-model="endDate" />
        </div>
      </div>
      <button>Search</button>
    </form>

    <div class="search-result">
      <div
        class="result_users"
        v-for="user in users"
        :key="`user_${user.user_id}`"
      >
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <div
          class="result_hours"
          v-for="hour in hours"
          :key="`hour_${hour.hour_id}`"
        >
          <h3>{{ hour.date }}</h3>
          <div class="row">
            <p>{{ hour.timein }}</p>
            <p>{{ hour.mealin }}</p>
            <p>{{ hour.mealout }}</p>
            <p>{{ hour.timeout }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="HoursDisplay">
      <div class="result">
        <h3>Date: 11/10/2020</h3>
        <div class="row">
          <div class="time-slots">
            <p>Time In</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Meal In</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Meal Out</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Time Out</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Total</p>
            <p>9 hours</p>
          </div>
        </div>
      </div>
      <div class="result">
        <h3>Date: 11/10/2020</h3>
        <div class="row">
          <div class="time-slots">
            <p>Time In</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Meal In</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Meal Out</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Time Out</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Total</p>
            <p>9 hours</p>
          </div>
        </div>
      </div>
      <div class="result">
        <h3>Date: 11/10/2020</h3>
        <div class="row">
          <div class="time-slots">
            <p>Time In</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Meal In</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Meal Out</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Time Out</p>
            <p>9:00</p>
          </div>
          <div class="time-slots">
            <p>Total</p>
            <p>9 hours</p>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'View Hours',
  data() {
    return {
      search: '',
      startDate: '',
      endDate: '',
    };
  },
  methods: {
    submit() {
      let body = {
        search: this.search,
        startDate: this.startDate,
        endDate: this.endDate,
        search_id: null,
      };

      axios.post('/api/users/search', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.users);
        this.users = res.data.users;
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
      });
      /*
      axios.post('/api/hours/search', body).then((res2) => {
            console.log(res2);
            // this.timein = res.data.hour[0].clock_in;
            // this.timeout = res.data.hour[0].clock_out;
            // this.mealin = res.data.hour[0].meal_in;
            // this.mealout = res.data.hour[0].meal_out;
          }).catch((err) => {
            let message2 = {
              message: err,
              error: true,
            };
            this.$store.dispatch('pushNotifications', message2);
          });
          */
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.result_user .result_hour {
  width: 100%;
  border-bottom: 2px solid #f7f7f7;
  padding-bottom: 5px;
  margin-top: 10px;
  .row {
    display: flex;
    border-bottom: 2px solid #f7f7f7;
    padding-bottom: 5px;
    .time-slots {
      margin-right: 10px;
    }
  }
}
</style>
