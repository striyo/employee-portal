<template>
  <div class="LogHours">
    <div class="title">
      <h2>Log Hours</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group">
          <h3>Time In:</h3>
          <input type="time" v-model="timein" />
        </div>
        <div class="form-group">
          <h3>Meal In:</h3>
          <input type="time" v-model="mealin" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Meal Out:</h3>
          <input type="time" v-model="mealout" />
        </div>
        <div class="form-group">
          <h3>Time Out:</h3>
          <input type="time" v-model="timeout" />
        </div>
      </div>
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Log Hours',
  data() {
    return {
      mealin: null,
      timein: null,
      mealout: null,
      timeout: null,
    };
  },
  created() {
    // get today's hours
    // set the variables to those hours
    const today = new Date();
    const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    // console.log(typeof todayDate);
    let body = {
      startDate: todayDate,
      endDate: todayDate,
    };
    axios.post('/api/hours/search', body).then((res) => {
      if (res.data.hour.length === 0) {
        this.timein = null;
        this.timeout = null;
        this.mealin = null;
        this.mealout = null;
      } else {
        this.timein = res.data.hour[0].clock_in;
        this.timeout = res.data.hour[0].clock_out;
        this.mealin = res.data.hour[0].meal_in;
        this.mealout = res.data.hour[0].meal_out;
      }
    }).catch((err) => {
      let message = {
        message: err,
        error: true,
      };
      this.$store.dispatch('pushNotifications', message);
    });
  },
  methods: {
    submit() {
      let body = {
        mealin: this.mealin,
        timein: this.timein,
        mealout: this.mealout,
        timeout: this.timeout,
      };

      axios.post('/api/hours/log', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.message);
      })
        .catch((err) => {
          let message = {
            message: err.response.data.message,
            error: true,
          };

          this.$store.dispatch('pushNotifications', message);
          console.log(err.response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.LogHours {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
}
</style>
