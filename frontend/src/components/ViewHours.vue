<template>
<div class="ViewHours">
  <div class="title">
    <h2>View Hour</h2>
    <div class="line"></div>
  </div>
  <form @submit.prevent="submit">
    <div class="form-row">
      <div class="form-group">
        <h3>Start Date</h3><input type="date" v-model="startDate">
      </div>
      <div class="form-group">
        <h3>End Date</h3><input type="date" v-model="endDate">
      </div>
    </div>
    <button>Search</button>
  </form>
 <div class="HoursDisplay" v-for="hour in hours" :key="`hour_${hour.hour_id}`">

    <div class="result">
      <h3>Date : {{hour.date}}</h3>
      <div class="row">
        <div class="time-slots">
          <p>Time In</p>
          <p>{{hour.clock_in}}</p>
        </div>
        <div class="time-slots">
          <p>Meal In</p>
          <p>{{hour.meal_in}}</p>
        </div>
        <div class="time-slots">
          <p>Meal Out</p>
          <p>{{hour.meal_out}}</p>
        </div>
        <div class="time-slots">
          <p>Time Out</p>
          <p>{{hour.clock_out}}</p>
        </div>
        <div class="time-slots">
          <p>Total</p>
          <p>{{hour.total}}</p>
        </div>
      </div>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'View Hours',
  data() {
    return {
      startDate: '',
      endDate: '',
      hours: [],
      // result: '',
    };
  },
  methods: {
    submit() {
      let body = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      // console.log(this.startDate);
      // console.log(this.endDate);
      // console.log(body.startDate);
      // console.log(body.endDate);
      axios.post('/api/hours/search', body).then((res) => {
        // console.log(res);
        this.hours = res.data.hour;
        console.log(this.hours);
        // console.log(res.data.hour);
        // console.log(hours);
        // this.timein = res.data.hour[0].clock_in;
        // this.timeout = res.data.hour[0].clock_out;
        // this.mealin = res.data.hour[0].meal_in;
        // this.mealout = res.data.hour[0].meal_out;
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ViewHours{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  background-color:white;
  padding: 20px;
  .HoursDisplay{
    .result{
      margin-bottom: 20px;
      .row{
        display:flex;
        border-bottom: 2px solid #f7f7f7;
        padding-bottom: 5px;
        .time-slots{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
