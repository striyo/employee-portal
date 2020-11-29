<template>
  <div class="timesheets page">
    <h1>Timesheets</h1>
    <div class="title">
      <h2>View Hours</h2>
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
        class="result_hours"
        v-for="(hour, index) in hours"
        :key="`hour_${hour.hours_id}`"
      >
        <h3 v-if="isNameDiff(hours, index)">{{ hour.name }}</h3>
        <h4>{{ hour.date }}</h4>
        <div class="row">
          <div class="time-slots">
            <p>Time In</p>
            <p>{{ hour.clock_in }}</p>
          </div>
          <div class="time-slots">
            <p>Meal In</p>
            <p>{{ hour.meal_in }}</p>
          </div>
          <div class="time-slots">
            <p>Meal Out</p>
            <p>{{ hour.meal_out }}</p>
          </div>
          <div class="time-slots">
            <p>Time Out</p>
            <p>{{ hour.clock_out }}</p>
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
    isNameDiff(hours, index) {
      if ((index === 0) || (hours[index - 1].name !== hours[index].name)) {
        return true;
      }
      return false;
    },

    submit() {
      let body = {
        search: this.search,
        startDate: this.startDate,
        endDate: this.endDate,
      };

      axios.post('/api/users/search', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.users);
        this.users = res.data.users;

        console.log(`length of users: ${res.data.users.length}`);
        if (res.data.users.length === 0) {
          this.$store.dispatch('pushNotifications', 'No employees found.');
        } else {
          axios.post('/api/hours/id', body).then((res1) => {
            let message1 = {
              message: res1.data.message,
              error: false,
            };

            this.$store.dispatch('pushNotifications', message1);
            console.log(`length of hours: ${res1.data.hours.length}`);
            console.log(res1.data.hours);
            this.hours = res1.data.hours;
          }).catch((err) => {
            let message1 = {
              message: err.response.data.message,
              error: true,
            };

            this.$store.dispatch('pushNotifications', message1);
          });
        }
      }).catch((err) => {
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
}

.ViewHours {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  .result_hours {
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
}
</style>
