<template>
  <div class="ViewHours">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>View Hour</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
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
    <div class="HoursDisplay"  >
      <div class="result" v-for="hour in hours" :key="`hour_${hour.hour_id}`">
        <h3>{{hour.formatted_date}}</h3>
        <table>
          <tr>
            <th>Time In</th>
            <th>Meal In</th>
            <th>Meal Out</th>
            <th>Time Out</th>
            <th>Total Hours</th>
          </tr>
          <tr>
            <td>{{hour.formatted_clock_in}}</td>
            <td>{{hour.formatted_meal_in}}</td>
            <td>{{hour.formatted_meal_out}}</td>
            <td>{{hour.formatted_clock_out}}</td>
            <td>{{hour.total}}</td>
          </tr>
        </table>
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
      loading: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      let body = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      axios.post('/api/hours/search', body).then((res) => {
        this.loading = false;
        this.hours = res.data.hour;
      }).catch((err) => {
        this.loading = false;
        console.log(err);
        let message = {
          message: err.response.data.message,
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
.ViewHours {
  position: relative;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  .HoursDisplay {
    .result {
      width:100%;
      margin-bottom: 20px;
      h3{
        margin-bottom: 10px;
      }
      table{
        text-align: left;
        background-color:#eee;
        width:100%;
        tr{
          border-bottom: red 1px solid;
        }
        td, th {
          padding: 5px;
          background-color:white;
        }
      }
    }
  }
}

</style>
