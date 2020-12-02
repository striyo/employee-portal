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
      <h3>{{setDate(hour.date)}}</h3>
      <div class="row">
        <div class="time-slots">
          <p>Time In</p>
          <p>{{setTime(hour.clock_in)}}</p>
        </div>
        <div class="time-slots">
          <p>Meal In</p>
          <p>{{setTime(hour.meal_in)}}</p>
        </div>
        <div class="time-slots">
          <p>Meal Out</p>
          <p>{{setTime(hour.meal_out)}}</p>
        </div>
        <div class="time-slots">
          <p>Time Out</p>
          <p>{{setTime(hour.clock_out)}}</p>
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
      axios.post('/api/hours/search', body).then((res) => {
        this.hours = res.data.hour;
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
    setDate(paramDate) {
      let theDay = new Date(paramDate);
      let weekday = (theDay.toString().split(' ')[0]);
      let month = (theDay.toString().split(' ')[1]);
      let date = (theDay.toString().split(' ')[2]);
      let year = (theDay.toString().split(' ')[3]);
      return weekday.concat(', ').concat(date).concat(' ').concat(month)
        .concat(' ')
        .concat(year);
    },
    setTime(time) {
      let theTime = (time.split(':'));
      let hour = theTime[0];
      let minute = theTime[1];
      if (hour < 12) {
        return (hour.toString()).concat(':').concat(minute.toString()).concat(' AM');
      }
      if (hour === '24' || hour === '12') {
        return ('12'.concat(':')).concat(minute.toString()).concat(' PM');
      }
      hour %= 12;
      return (hour.toString()).concat(':').concat(minute.toString()).concat(' PM');
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
